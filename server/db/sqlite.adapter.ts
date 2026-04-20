/**
 * SQLite 适配器 — 本地开发默认驱动
 * 使用 Node.js 内置 node:sqlite（Node 22.5+），无需原生编译
 */
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'crypto';
import path from 'path';
import type {
  IDatabase,
  DBParent, CreateParentInput, UpdateParentInput,
  DBChild, CreateChildInput, UpdateChildInput,
  DBOtpRecord, DBSession,
  DBLearningProgress, DBRewards, DBUserAchievement,
  DBStudyPlan, CreateStudyPlanInput,
} from './types';

export class SQLiteAdapter implements IDatabase {
  private db!: DatabaseSync;
  private dbPath: string;

  constructor(dbPath?: string) {
    this.dbPath = dbPath || path.resolve(process.cwd(), 'data', 'kids-game.sqlite');
  }

  async connect(): Promise<void> {
    const { mkdirSync } = await import('fs');
    mkdirSync(path.dirname(this.dbPath), { recursive: true });
    this.db = new DatabaseSync(this.dbPath);
    this.db.exec('PRAGMA journal_mode = WAL');
    this.db.exec('PRAGMA foreign_keys = ON');
    this.runMigrations();
  }

  async disconnect(): Promise<void> {
    this.db?.close();
  }

  private runMigrations(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS parents (
        id TEXT PRIMARY KEY,
        phone TEXT UNIQUE,
        wechat_open_id TEXT UNIQUE,
        wechat_union_id TEXT,
        wechat_nickname TEXT,
        wechat_avatar_url TEXT,
        password_hash TEXT,
        daily_time_limit INTEGER NOT NULL DEFAULT 60,
        sound_enabled INTEGER NOT NULL DEFAULT 1,
        music_enabled INTEGER NOT NULL DEFAULT 1,
        notifications_enabled INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS otp_records (
        id TEXT PRIMARY KEY,
        phone TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        used INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_records(phone);

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        parent_id TEXT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
        refresh_token TEXT NOT NULL UNIQUE,
        device_info TEXT,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS children (
        id TEXT PRIMARY KEY,
        parent_id TEXT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
        nickname TEXT NOT NULL,
        age INTEGER NOT NULL DEFAULT 5,
        gender TEXT NOT NULL DEFAULT 'girl',
        avatar_id TEXT NOT NULL DEFAULT 'star_girl',
        pet_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_children_parent ON children(parent_id);

      CREATE TABLE IF NOT EXISTS learning_progress (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
        parent_id TEXT NOT NULL,
        total_learning_minutes INTEGER NOT NULL DEFAULT 0,
        total_tasks_completed INTEGER NOT NULL DEFAULT 0,
        total_correct INTEGER NOT NULL DEFAULT 0,
        total_wrong INTEGER NOT NULL DEFAULT 0,
        overall_accuracy REAL NOT NULL DEFAULT 0,
        streak_days INTEGER NOT NULL DEFAULT 0,
        last_active_date TEXT,
        today_date TEXT,
        today_learning_minutes INTEGER NOT NULL DEFAULT 0,
        today_tasks_completed INTEGER NOT NULL DEFAULT 0,
        today_correct INTEGER NOT NULL DEFAULT 0,
        today_wrong INTEGER NOT NULL DEFAULT 0,
        subjects_json TEXT NOT NULL DEFAULT '{}',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS rewards (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
        stars INTEGER NOT NULL DEFAULT 0,
        coins INTEGER NOT NULL DEFAULT 0,
        level INTEGER NOT NULL DEFAULT 1,
        xp INTEGER NOT NULL DEFAULT 0,
        xp_to_next_level INTEGER NOT NULL DEFAULT 100,
        streak_days INTEGER NOT NULL DEFAULT 0,
        last_check_in_date TEXT,
        collected_stickers_json TEXT NOT NULL DEFAULT '[]',
        collected_badges_json TEXT NOT NULL DEFAULT '[]',
        unlocked_characters_json TEXT NOT NULL DEFAULT '["star_girl"]',
        unlocked_pets_json TEXT NOT NULL DEFAULT '[]',
        unlocked_areas_json TEXT NOT NULL DEFAULT '["home"]',
        current_pet_id TEXT,
        pets_json TEXT NOT NULL DEFAULT '[]',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_achievements (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
        achievement_id TEXT NOT NULL,
        unlocked_at TEXT NOT NULL,
        progress REAL NOT NULL DEFAULT 0,
        UNIQUE(child_id, achievement_id)
      );

      CREATE TABLE IF NOT EXISTS study_plans (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
        parent_id TEXT NOT NULL,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        target_minutes_per_day INTEGER NOT NULL DEFAULT 15,
        start_date TEXT NOT NULL,
        end_date TEXT,
        active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_plans_child ON study_plans(child_id);
    `);
  }

  // ---- Helpers ----
  private now(): string { return new Date().toISOString(); }
  private uuid(): string { return randomUUID(); }
  private boolVal(v: number): boolean { return v === 1; }

  private rowToParent(row: Record<string, unknown>): DBParent {
    return {
      id: row.id as string,
      phone: (row.phone as string) ?? undefined,
      wechatOpenId: (row.wechat_open_id as string) ?? undefined,
      wechatUnionId: (row.wechat_union_id as string) ?? undefined,
      wechatNickname: (row.wechat_nickname as string) ?? undefined,
      wechatAvatarUrl: (row.wechat_avatar_url as string) ?? undefined,
      passwordHash: (row.password_hash as string) ?? undefined,
      dailyTimeLimit: row.daily_time_limit as number,
      soundEnabled: this.boolVal(row.sound_enabled as number),
      musicEnabled: this.boolVal(row.music_enabled as number),
      notificationsEnabled: this.boolVal(row.notifications_enabled as number),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  }

  private rowToChild(row: Record<string, unknown>): DBChild {
    return {
      id: row.id as string,
      parentId: row.parent_id as string,
      nickname: row.nickname as string,
      age: row.age as number,
      gender: row.gender as 'boy' | 'girl',
      avatarId: row.avatar_id as string,
      petId: (row.pet_id as string) ?? undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  }

  private rowToProgress(row: Record<string, unknown>): DBLearningProgress {
    return {
      id: row.id as string,
      childId: row.child_id as string,
      parentId: row.parent_id as string,
      totalLearningMinutes: row.total_learning_minutes as number,
      totalTasksCompleted: row.total_tasks_completed as number,
      totalCorrect: row.total_correct as number,
      totalWrong: row.total_wrong as number,
      overallAccuracy: row.overall_accuracy as number,
      streakDays: row.streak_days as number,
      lastActiveDate: (row.last_active_date as string) ?? undefined,
      todayDate: (row.today_date as string) ?? undefined,
      todayLearningMinutes: row.today_learning_minutes as number,
      todayTasksCompleted: row.today_tasks_completed as number,
      todayCorrect: row.today_correct as number,
      todayWrong: row.today_wrong as number,
      subjectsJson: row.subjects_json as string,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  }

  private rowToRewards(row: Record<string, unknown>): DBRewards {
    return {
      id: row.id as string,
      childId: row.child_id as string,
      stars: row.stars as number,
      coins: row.coins as number,
      level: row.level as number,
      xp: row.xp as number,
      xpToNextLevel: row.xp_to_next_level as number,
      streakDays: row.streak_days as number,
      lastCheckInDate: (row.last_check_in_date as string) ?? undefined,
      collectedStickersJson: row.collected_stickers_json as string,
      collectedBadgesJson: row.collected_badges_json as string,
      unlockedCharactersJson: row.unlocked_characters_json as string,
      unlockedPetsJson: row.unlocked_pets_json as string,
      unlockedAreasJson: row.unlocked_areas_json as string,
      currentPetId: (row.current_pet_id as string) ?? undefined,
      petsJson: row.pets_json as string,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  }

  // ---- Parent ----
  async findParentByPhone(phone: string): Promise<DBParent | null> {
    const row = this.db.prepare('SELECT * FROM parents WHERE phone = ?').get(phone) as Record<string, unknown> | undefined;
    return row ? this.rowToParent(row) : null;
  }

  async findParentByWechat(openId: string): Promise<DBParent | null> {
    const row = this.db.prepare('SELECT * FROM parents WHERE wechat_open_id = ?').get(openId) as Record<string, unknown> | undefined;
    return row ? this.rowToParent(row) : null;
  }

  async findParentById(id: string): Promise<DBParent | null> {
    const row = this.db.prepare('SELECT * FROM parents WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    return row ? this.rowToParent(row) : null;
  }

  async createParent(input: CreateParentInput): Promise<DBParent> {
    const id = this.uuid();
    const now = this.now();
    this.db.prepare(`
      INSERT INTO parents (id, phone, wechat_open_id, wechat_union_id, wechat_nickname,
        wechat_avatar_url, password_hash, daily_time_limit, sound_enabled, music_enabled,
        notifications_enabled, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      input.phone ?? null,
      input.wechatOpenId ?? null,
      input.wechatUnionId ?? null,
      input.wechatNickname ?? null,
      input.wechatAvatarUrl ?? null,
      input.passwordHash ?? null,
      input.dailyTimeLimit,
      input.soundEnabled ? 1 : 0,
      input.musicEnabled ? 1 : 0,
      input.notificationsEnabled ? 1 : 0,
      now, now,
    );
    return (await this.findParentById(id))!;
  }

  async updateParent(id: string, input: UpdateParentInput): Promise<DBParent | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.phone !== undefined) { fields.push('phone = ?'); values.push(input.phone); }
    if (input.wechatOpenId !== undefined) { fields.push('wechat_open_id = ?'); values.push(input.wechatOpenId); }
    if (input.wechatUnionId !== undefined) { fields.push('wechat_union_id = ?'); values.push(input.wechatUnionId); }
    if (input.wechatNickname !== undefined) { fields.push('wechat_nickname = ?'); values.push(input.wechatNickname); }
    if (input.wechatAvatarUrl !== undefined) { fields.push('wechat_avatar_url = ?'); values.push(input.wechatAvatarUrl); }
    if (input.passwordHash !== undefined) { fields.push('password_hash = ?'); values.push(input.passwordHash); }
    if (input.dailyTimeLimit !== undefined) { fields.push('daily_time_limit = ?'); values.push(input.dailyTimeLimit); }
    if (input.soundEnabled !== undefined) { fields.push('sound_enabled = ?'); values.push(input.soundEnabled ? 1 : 0); }
    if (input.musicEnabled !== undefined) { fields.push('music_enabled = ?'); values.push(input.musicEnabled ? 1 : 0); }
    if (input.notificationsEnabled !== undefined) { fields.push('notifications_enabled = ?'); values.push(input.notificationsEnabled ? 1 : 0); }

    if (fields.length === 0) return this.findParentById(id);
    fields.push('updated_at = ?'); values.push(this.now());
    values.push(id);
    this.db.prepare(`UPDATE parents SET ${fields.join(', ')} WHERE id = ?`).run(...(values as import('node:sqlite').SQLInputValue[]));
    return this.findParentById(id);
  }

  // ---- OTP ----
  async upsertOtp(phone: string, code: string, expiresAt: string): Promise<void> {
    const id = this.uuid();
    const now = this.now();
    this.db.prepare(`
      INSERT INTO otp_records (id, phone, code, expires_at, used, created_at)
      VALUES (?, ?, ?, ?, 0, ?)
    `).run(id, phone, code, expiresAt, now);
  }

  async findValidOtp(phone: string, code: string): Promise<DBOtpRecord | null> {
    const now = this.now();
    const row = this.db.prepare(`
      SELECT * FROM otp_records
      WHERE phone = ? AND code = ? AND used = 0 AND expires_at > ?
      ORDER BY created_at DESC LIMIT 1
    `).get(phone, code, now) as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
      id: row.id as string,
      phone: row.phone as string,
      code: row.code as string,
      expiresAt: row.expires_at as string,
      used: this.boolVal(row.used as number),
      createdAt: row.created_at as string,
    };
  }

  async markOtpUsed(id: string): Promise<void> {
    this.db.prepare('UPDATE otp_records SET used = 1 WHERE id = ?').run(id);
  }

  // ---- Sessions ----
  async createSession(parentId: string, refreshToken: string, deviceInfo?: string, expiresAt?: string): Promise<DBSession> {
    const id = this.uuid();
    const now = this.now();
    const exp = expiresAt || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
    this.db.prepare(`
      INSERT INTO sessions (id, parent_id, refresh_token, device_info, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, parentId, refreshToken, deviceInfo ?? null, exp, now);
    return { id, parentId, refreshToken, deviceInfo, expiresAt: exp, createdAt: now };
  }

  async findSession(refreshToken: string): Promise<DBSession | null> {
    const row = this.db.prepare('SELECT * FROM sessions WHERE refresh_token = ?').get(refreshToken) as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
      id: row.id as string,
      parentId: row.parent_id as string,
      refreshToken: row.refresh_token as string,
      deviceInfo: (row.device_info as string) ?? undefined,
      expiresAt: row.expires_at as string,
      createdAt: row.created_at as string,
    };
  }

  async deleteSession(refreshToken: string): Promise<void> {
    this.db.prepare('DELETE FROM sessions WHERE refresh_token = ?').run(refreshToken);
  }

  async deleteSessionsByParent(parentId: string): Promise<void> {
    this.db.prepare('DELETE FROM sessions WHERE parent_id = ?').run(parentId);
  }

  // ---- Children ----
  async findChildrenByParent(parentId: string): Promise<DBChild[]> {
    const rows = this.db.prepare('SELECT * FROM children WHERE parent_id = ? ORDER BY created_at').all(parentId) as Record<string, unknown>[];
    return rows.map(r => this.rowToChild(r));
  }

  async findChildById(id: string): Promise<DBChild | null> {
    const row = this.db.prepare('SELECT * FROM children WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    return row ? this.rowToChild(row) : null;
  }

  async createChild(input: CreateChildInput): Promise<DBChild> {
    const id = this.uuid();
    const now = this.now();
    this.db.prepare(`
      INSERT INTO children (id, parent_id, nickname, age, gender, avatar_id, pet_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, input.parentId, input.nickname, input.age, input.gender, input.avatarId, input.petId ?? null, now, now);
    return (await this.findChildById(id))!;
  }

  async updateChild(id: string, input: UpdateChildInput): Promise<DBChild | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    if (input.nickname !== undefined) { fields.push('nickname = ?'); values.push(input.nickname); }
    if (input.age !== undefined) { fields.push('age = ?'); values.push(input.age); }
    if (input.gender !== undefined) { fields.push('gender = ?'); values.push(input.gender); }
    if (input.avatarId !== undefined) { fields.push('avatar_id = ?'); values.push(input.avatarId); }
    if (input.petId !== undefined) { fields.push('pet_id = ?'); values.push(input.petId); }
    if (fields.length === 0) return this.findChildById(id);
    fields.push('updated_at = ?'); values.push(this.now());
    values.push(id);
    this.db.prepare(`UPDATE children SET ${fields.join(', ')} WHERE id = ?`).run(...(values as import('node:sqlite').SQLInputValue[]));
    return this.findChildById(id);
  }

  async deleteChild(id: string): Promise<void> {
    this.db.prepare('DELETE FROM children WHERE id = ?').run(id);
  }

  // ---- Learning Progress ----
  async getProgressByChild(childId: string): Promise<DBLearningProgress | null> {
    const row = this.db.prepare('SELECT * FROM learning_progress WHERE child_id = ?').get(childId) as Record<string, unknown> | undefined;
    return row ? this.rowToProgress(row) : null;
  }

  async upsertProgress(childId: string, data: Partial<DBLearningProgress>): Promise<DBLearningProgress> {
    const existing = await this.getProgressByChild(childId);
    const now = this.now();
    if (!existing) {
      const id = this.uuid();
      this.db.prepare(`
        INSERT INTO learning_progress (id, child_id, parent_id, total_learning_minutes, total_tasks_completed,
          total_correct, total_wrong, overall_accuracy, streak_days, last_active_date, today_date,
          today_learning_minutes, today_tasks_completed, today_correct, today_wrong, subjects_json,
          created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, childId,
        data.parentId ?? '',
        data.totalLearningMinutes ?? 0,
        data.totalTasksCompleted ?? 0,
        data.totalCorrect ?? 0,
        data.totalWrong ?? 0,
        data.overallAccuracy ?? 0,
        data.streakDays ?? 0,
        data.lastActiveDate ?? null,
        data.todayDate ?? null,
        data.todayLearningMinutes ?? 0,
        data.todayTasksCompleted ?? 0,
        data.todayCorrect ?? 0,
        data.todayWrong ?? 0,
        data.subjectsJson ?? '{}',
        now, now,
      );
    } else {
      const fields: string[] = [];
      const values: unknown[] = [];
      const setField = (col: string, val: unknown) => { fields.push(`${col} = ?`); values.push(val); };
      if (data.totalLearningMinutes !== undefined) setField('total_learning_minutes', data.totalLearningMinutes);
      if (data.totalTasksCompleted !== undefined) setField('total_tasks_completed', data.totalTasksCompleted);
      if (data.totalCorrect !== undefined) setField('total_correct', data.totalCorrect);
      if (data.totalWrong !== undefined) setField('total_wrong', data.totalWrong);
      if (data.overallAccuracy !== undefined) setField('overall_accuracy', data.overallAccuracy);
      if (data.streakDays !== undefined) setField('streak_days', data.streakDays);
      if (data.lastActiveDate !== undefined) setField('last_active_date', data.lastActiveDate);
      if (data.todayDate !== undefined) setField('today_date', data.todayDate);
      if (data.todayLearningMinutes !== undefined) setField('today_learning_minutes', data.todayLearningMinutes);
      if (data.todayTasksCompleted !== undefined) setField('today_tasks_completed', data.todayTasksCompleted);
      if (data.todayCorrect !== undefined) setField('today_correct', data.todayCorrect);
      if (data.todayWrong !== undefined) setField('today_wrong', data.todayWrong);
      if (data.subjectsJson !== undefined) setField('subjects_json', data.subjectsJson);
      if (fields.length > 0) {
        setField('updated_at', now);
        values.push(childId);
        this.db.prepare(`UPDATE learning_progress SET ${fields.join(', ')} WHERE child_id = ?`).run(...(values as import('node:sqlite').SQLInputValue[]));
      }
    }
    return (await this.getProgressByChild(childId))!;
  }

  // ---- Rewards ----
  async getRewardsByChild(childId: string): Promise<DBRewards | null> {
    const row = this.db.prepare('SELECT * FROM rewards WHERE child_id = ?').get(childId) as Record<string, unknown> | undefined;
    return row ? this.rowToRewards(row) : null;
  }

  async upsertRewards(childId: string, data: Partial<DBRewards>): Promise<DBRewards> {
    const existing = await this.getRewardsByChild(childId);
    const now = this.now();
    if (!existing) {
      const id = this.uuid();
      this.db.prepare(`
        INSERT INTO rewards (id, child_id, stars, coins, level, xp, xp_to_next_level, streak_days,
          last_check_in_date, collected_stickers_json, collected_badges_json, unlocked_characters_json,
          unlocked_pets_json, unlocked_areas_json, current_pet_id, pets_json, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, childId,
        data.stars ?? 0, data.coins ?? 0, data.level ?? 1, data.xp ?? 0,
        data.xpToNextLevel ?? 100, data.streakDays ?? 0,
        data.lastCheckInDate ?? null,
        data.collectedStickersJson ?? '[]',
        data.collectedBadgesJson ?? '[]',
        data.unlockedCharactersJson ?? '["star_girl"]',
        data.unlockedPetsJson ?? '[]',
        data.unlockedAreasJson ?? '["home"]',
        data.currentPetId ?? null,
        data.petsJson ?? '[]',
        now, now,
      );
    } else {
      const fields: string[] = [];
      const values: unknown[] = [];
      const s = (col: string, val: unknown) => { fields.push(`${col} = ?`); values.push(val); };
      if (data.stars !== undefined) s('stars', data.stars);
      if (data.coins !== undefined) s('coins', data.coins);
      if (data.level !== undefined) s('level', data.level);
      if (data.xp !== undefined) s('xp', data.xp);
      if (data.xpToNextLevel !== undefined) s('xp_to_next_level', data.xpToNextLevel);
      if (data.streakDays !== undefined) s('streak_days', data.streakDays);
      if (data.lastCheckInDate !== undefined) s('last_check_in_date', data.lastCheckInDate);
      if (data.collectedStickersJson !== undefined) s('collected_stickers_json', data.collectedStickersJson);
      if (data.collectedBadgesJson !== undefined) s('collected_badges_json', data.collectedBadgesJson);
      if (data.unlockedCharactersJson !== undefined) s('unlocked_characters_json', data.unlockedCharactersJson);
      if (data.unlockedPetsJson !== undefined) s('unlocked_pets_json', data.unlockedPetsJson);
      if (data.unlockedAreasJson !== undefined) s('unlocked_areas_json', data.unlockedAreasJson);
      if (data.currentPetId !== undefined) s('current_pet_id', data.currentPetId);
      if (data.petsJson !== undefined) s('pets_json', data.petsJson);
      if (fields.length > 0) {
        s('updated_at', now);
        values.push(childId);
        this.db.prepare(`UPDATE rewards SET ${fields.join(', ')} WHERE child_id = ?`).run(...(values as import('node:sqlite').SQLInputValue[]));
      }
    }
    return (await this.getRewardsByChild(childId))!;
  }

  // ---- Achievements ----
  async getUserAchievements(childId: string): Promise<DBUserAchievement[]> {
    const rows = this.db.prepare('SELECT * FROM user_achievements WHERE child_id = ?').all(childId) as Record<string, unknown>[];
    return rows.map(r => ({
      id: r.id as string,
      childId: r.child_id as string,
      achievementId: r.achievement_id as string,
      unlockedAt: r.unlocked_at as string,
      progress: r.progress as number,
    }));
  }

  async upsertUserAchievement(childId: string, achievementId: string, progress: number): Promise<void> {
    const now = this.now();
    const existing = this.db.prepare('SELECT id FROM user_achievements WHERE child_id = ? AND achievement_id = ?').get(childId, achievementId);
    if (!existing) {
      this.db.prepare(`
        INSERT INTO user_achievements (id, child_id, achievement_id, unlocked_at, progress)
        VALUES (?, ?, ?, ?, ?)
      `).run(this.uuid(), childId, achievementId, now, progress);
    } else {
      this.db.prepare('UPDATE user_achievements SET progress = ? WHERE child_id = ? AND achievement_id = ?').run(progress, childId, achievementId);
    }
  }

  // ---- Study Plans ----
  async getStudyPlansByChild(childId: string): Promise<DBStudyPlan[]> {
    const rows = this.db.prepare('SELECT * FROM study_plans WHERE child_id = ? ORDER BY created_at DESC').all(childId) as Record<string, unknown>[];
    return rows.map(r => ({
      id: r.id as string,
      childId: r.child_id as string,
      parentId: r.parent_id as string,
      title: r.title as string,
      subject: r.subject as string,
      targetMinutesPerDay: r.target_minutes_per_day as number,
      startDate: r.start_date as string,
      endDate: (r.end_date as string) ?? undefined,
      active: this.boolVal(r.active as number),
      createdAt: r.created_at as string,
      updatedAt: r.updated_at as string,
    }));
  }

  async createStudyPlan(input: CreateStudyPlanInput): Promise<DBStudyPlan> {
    const id = this.uuid();
    const now = this.now();
    this.db.prepare(`
      INSERT INTO study_plans (id, child_id, parent_id, title, subject, target_minutes_per_day,
        start_date, end_date, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, input.childId, input.parentId, input.title, input.subject,
      input.targetMinutesPerDay, input.startDate, input.endDate ?? null,
      input.active ? 1 : 0, now, now);
    return (await this.getStudyPlansByChild(input.childId)).find(p => p.id === id)!;
  }

  async updateStudyPlan(id: string, data: Partial<DBStudyPlan>): Promise<DBStudyPlan | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    const s = (col: string, val: unknown) => { fields.push(`${col} = ?`); values.push(val); };
    if (data.title !== undefined) s('title', data.title);
    if (data.subject !== undefined) s('subject', data.subject);
    if (data.targetMinutesPerDay !== undefined) s('target_minutes_per_day', data.targetMinutesPerDay);
    if (data.startDate !== undefined) s('start_date', data.startDate);
    if (data.endDate !== undefined) s('end_date', data.endDate);
    if (data.active !== undefined) s('active', data.active ? 1 : 0);
    if (fields.length === 0) return null;
    s('updated_at', this.now());
    values.push(id);
    this.db.prepare(`UPDATE study_plans SET ${fields.join(', ')} WHERE id = ?`).run(...(values as import('node:sqlite').SQLInputValue[]));
    const row = this.db.prepare('SELECT * FROM study_plans WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
      id: row.id as string,
      childId: row.child_id as string,
      parentId: row.parent_id as string,
      title: row.title as string,
      subject: row.subject as string,
      targetMinutesPerDay: row.target_minutes_per_day as number,
      startDate: row.start_date as string,
      endDate: (row.end_date as string) ?? undefined,
      active: this.boolVal(row.active as number),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  }

  async deleteStudyPlan(id: string): Promise<void> {
    this.db.prepare('DELETE FROM study_plans WHERE id = ?').run(id);
  }
}
