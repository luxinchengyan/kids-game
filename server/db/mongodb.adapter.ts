/**
 * MongoDB 适配器 — 生产环境驱动
 */
import { MongoClient, Db, Collection } from 'mongodb';
import { randomUUID } from 'crypto';
import type {
  IDatabase,
  DBParent, CreateParentInput, UpdateParentInput,
  DBChild, CreateChildInput, UpdateChildInput,
  DBOtpRecord, DBSession,
  DBLearningProgress, DBRewards, DBUserAchievement,
  DBStudyPlan, CreateStudyPlanInput,
} from './types';

export class MongoDBAdapter implements IDatabase {
  private client!: MongoClient;
  private db!: Db;
  private uri: string;
  private dbName: string;

  constructor(uri?: string, dbName?: string) {
    this.uri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.dbName = dbName || process.env.MONGODB_DB || 'kids_game';
  }

  async connect(): Promise<void> {
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    await this.createIndexes();
  }

  async disconnect(): Promise<void> {
    await this.client?.close();
  }

  private async createIndexes(): Promise<void> {
    await this.db.collection('parents').createIndexes([
      { key: { phone: 1 }, unique: true, sparse: true },
      { key: { wechatOpenId: 1 }, unique: true, sparse: true },
    ]);
    await this.db.collection('children').createIndex({ parentId: 1 });
    await this.db.collection('sessions').createIndex({ refreshToken: 1 }, { unique: true });
    await this.db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await this.db.collection('otp_records').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await this.db.collection('otp_records').createIndex({ phone: 1 });
    await this.db.collection('study_plans').createIndex({ childId: 1 });
    await this.db.collection('user_achievements').createIndexes([
      { key: { childId: 1, achievementId: 1 }, unique: true },
    ]);
  }

  private col<T extends object>(name: string): Collection<T> {
    return this.db.collection<T>(name);
  }

  private now(): string { return new Date().toISOString(); }
  private uuid(): string { return randomUUID(); }

  private docToParent(doc: Record<string, unknown>): DBParent {
    return {
      id: doc.id as string,
      phone: (doc.phone as string) ?? undefined,
      wechatOpenId: (doc.wechatOpenId as string) ?? undefined,
      wechatUnionId: (doc.wechatUnionId as string) ?? undefined,
      wechatNickname: (doc.wechatNickname as string) ?? undefined,
      wechatAvatarUrl: (doc.wechatAvatarUrl as string) ?? undefined,
      passwordHash: (doc.passwordHash as string) ?? undefined,
      dailyTimeLimit: doc.dailyTimeLimit as number,
      soundEnabled: doc.soundEnabled as boolean,
      musicEnabled: doc.musicEnabled as boolean,
      notificationsEnabled: doc.notificationsEnabled as boolean,
      createdAt: doc.createdAt as string,
      updatedAt: doc.updatedAt as string,
    };
  }

  private docToChild(doc: Record<string, unknown>): DBChild {
    return {
      id: doc.id as string,
      parentId: doc.parentId as string,
      nickname: doc.nickname as string,
      age: doc.age as number,
      gender: doc.gender as 'boy' | 'girl',
      avatarId: doc.avatarId as string,
      petId: (doc.petId as string) ?? undefined,
      createdAt: doc.createdAt as string,
      updatedAt: doc.updatedAt as string,
    };
  }

  // ---- Parent ----
  async findParentByPhone(phone: string): Promise<DBParent | null> {
    const doc = await this.col('parents').findOne({ phone } as any);
    return doc ? this.docToParent(doc as Record<string, unknown>) : null;
  }

  async findParentByWechat(openId: string): Promise<DBParent | null> {
    const doc = await this.col('parents').findOne({ wechatOpenId: openId } as any);
    return doc ? this.docToParent(doc as Record<string, unknown>) : null;
  }

  async findParentById(id: string): Promise<DBParent | null> {
    const doc = await this.col('parents').findOne({ id } as any);
    return doc ? this.docToParent(doc as Record<string, unknown>) : null;
  }

  async createParent(input: CreateParentInput): Promise<DBParent> {
    const id = this.uuid();
    const now = this.now();
    await this.col('parents').insertOne({ id, ...input, createdAt: now, updatedAt: now } as any);
    return (await this.findParentById(id))!;
  }

  async updateParent(id: string, input: UpdateParentInput): Promise<DBParent | null> {
    if (Object.keys(input).length === 0) return this.findParentById(id);
    await this.col('parents').updateOne({ id } as any, { $set: { ...input, updatedAt: this.now() } });
    return this.findParentById(id);
  }

  // ---- OTP ----
  async upsertOtp(phone: string, code: string, expiresAt: string): Promise<void> {
    const id = this.uuid();
    const now = this.now();
    await this.col('otp_records').insertOne({ id, phone, code, expiresAt, used: false, createdAt: now } as any);
  }

  async findValidOtp(phone: string, code: string): Promise<DBOtpRecord | null> {
    const now = this.now();
    const doc = await this.col('otp_records').findOne({
      phone, code, used: false, expiresAt: { $gt: now }
    } as any, { sort: { createdAt: -1 } });
    if (!doc) return null;
    const d = doc as Record<string, unknown>;
    return { id: d.id as string, phone: d.phone as string, code: d.code as string, expiresAt: d.expiresAt as string, used: d.used as boolean, createdAt: d.createdAt as string };
  }

  async markOtpUsed(id: string): Promise<void> {
    await this.col('otp_records').updateOne({ id } as any, { $set: { used: true } });
  }

  // ---- Sessions ----
  async createSession(parentId: string, refreshToken: string, deviceInfo?: string, expiresAt?: string): Promise<DBSession> {
    const id = this.uuid();
    const now = this.now();
    const exp = expiresAt || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
    await this.col('sessions').insertOne({ id, parentId, refreshToken, deviceInfo, expiresAt: exp, createdAt: now } as any);
    return { id, parentId, refreshToken, deviceInfo, expiresAt: exp, createdAt: now };
  }

  async findSession(refreshToken: string): Promise<DBSession | null> {
    const doc = await this.col('sessions').findOne({ refreshToken } as any);
    if (!doc) return null;
    const d = doc as Record<string, unknown>;
    return { id: d.id as string, parentId: d.parentId as string, refreshToken: d.refreshToken as string, deviceInfo: d.deviceInfo as string | undefined, expiresAt: d.expiresAt as string, createdAt: d.createdAt as string };
  }

  async deleteSession(refreshToken: string): Promise<void> {
    await this.col('sessions').deleteOne({ refreshToken } as any);
  }

  async deleteSessionsByParent(parentId: string): Promise<void> {
    await this.col('sessions').deleteMany({ parentId } as any);
  }

  // ---- Children ----
  async findChildrenByParent(parentId: string): Promise<DBChild[]> {
    const docs = await this.col('children').find({ parentId } as any).sort({ createdAt: 1 }).toArray();
    return docs.map(d => this.docToChild(d as Record<string, unknown>));
  }

  async findChildById(id: string): Promise<DBChild | null> {
    const doc = await this.col('children').findOne({ id } as any);
    return doc ? this.docToChild(doc as Record<string, unknown>) : null;
  }

  async createChild(input: CreateChildInput): Promise<DBChild> {
    const id = this.uuid();
    const now = this.now();
    await this.col('children').insertOne({ id, ...input, createdAt: now, updatedAt: now } as any);
    return (await this.findChildById(id))!;
  }

  async updateChild(id: string, input: UpdateChildInput): Promise<DBChild | null> {
    if (Object.keys(input).length === 0) return this.findChildById(id);
    await this.col('children').updateOne({ id } as any, { $set: { ...input, updatedAt: this.now() } });
    return this.findChildById(id);
  }

  async deleteChild(id: string): Promise<void> {
    await this.col('children').deleteOne({ id } as any);
  }

  // ---- Learning Progress ----
  async getProgressByChild(childId: string): Promise<DBLearningProgress | null> {
    const doc = await this.col('learning_progress').findOne({ childId } as any);
    if (!doc) return null;
    const d = doc as Record<string, unknown>;
    return {
      id: d.id as string, childId: d.childId as string, parentId: d.parentId as string,
      totalLearningMinutes: d.totalLearningMinutes as number,
      totalTasksCompleted: d.totalTasksCompleted as number,
      totalCorrect: d.totalCorrect as number, totalWrong: d.totalWrong as number,
      overallAccuracy: d.overallAccuracy as number, streakDays: d.streakDays as number,
      lastActiveDate: d.lastActiveDate as string | undefined,
      todayDate: d.todayDate as string | undefined,
      todayLearningMinutes: d.todayLearningMinutes as number,
      todayTasksCompleted: d.todayTasksCompleted as number,
      todayCorrect: d.todayCorrect as number, todayWrong: d.todayWrong as number,
      subjectsJson: d.subjectsJson as string,
      createdAt: d.createdAt as string, updatedAt: d.updatedAt as string,
    };
  }

  async upsertProgress(childId: string, data: Partial<DBLearningProgress>): Promise<DBLearningProgress> {
    const now = this.now();
    const existing = await this.getProgressByChild(childId);
    if (!existing) {
      const id = this.uuid();
      await this.col('learning_progress').insertOne({
        id, childId, parentId: data.parentId ?? '',
        totalLearningMinutes: 0, totalTasksCompleted: 0, totalCorrect: 0, totalWrong: 0,
        overallAccuracy: 0, streakDays: 0, todayLearningMinutes: 0,
        todayTasksCompleted: 0, todayCorrect: 0, todayWrong: 0,
        subjectsJson: '{}', ...data, createdAt: now, updatedAt: now,
      } as any);
    } else {
      await this.col('learning_progress').updateOne({ childId } as any, { $set: { ...data, updatedAt: now } });
    }
    return (await this.getProgressByChild(childId))!;
  }

  // ---- Rewards ----
  async getRewardsByChild(childId: string): Promise<DBRewards | null> {
    const doc = await this.col('rewards').findOne({ childId } as any);
    if (!doc) return null;
    const d = doc as Record<string, unknown>;
    return {
      id: d.id as string, childId: d.childId as string,
      stars: d.stars as number, coins: d.coins as number, level: d.level as number,
      xp: d.xp as number, xpToNextLevel: d.xpToNextLevel as number,
      streakDays: d.streakDays as number,
      lastCheckInDate: d.lastCheckInDate as string | undefined,
      collectedStickersJson: d.collectedStickersJson as string,
      collectedBadgesJson: d.collectedBadgesJson as string,
      unlockedCharactersJson: d.unlockedCharactersJson as string,
      unlockedPetsJson: d.unlockedPetsJson as string,
      unlockedAreasJson: d.unlockedAreasJson as string,
      currentPetId: d.currentPetId as string | undefined,
      petsJson: d.petsJson as string,
      createdAt: d.createdAt as string, updatedAt: d.updatedAt as string,
    };
  }

  async upsertRewards(childId: string, data: Partial<DBRewards>): Promise<DBRewards> {
    const now = this.now();
    const existing = await this.getRewardsByChild(childId);
    if (!existing) {
      const id = this.uuid();
      await this.col('rewards').insertOne({
        id, childId, stars: 0, coins: 0, level: 1, xp: 0, xpToNextLevel: 100,
        streakDays: 0, collectedStickersJson: '[]', collectedBadgesJson: '[]',
        unlockedCharactersJson: '["star_girl"]', unlockedPetsJson: '[]',
        unlockedAreasJson: '["home"]', petsJson: '[]',
        ...data, createdAt: now, updatedAt: now,
      } as any);
    } else {
      await this.col('rewards').updateOne({ childId } as any, { $set: { ...data, updatedAt: now } });
    }
    return (await this.getRewardsByChild(childId))!;
  }

  // ---- Achievements ----
  async getUserAchievements(childId: string): Promise<DBUserAchievement[]> {
    const docs = await this.col('user_achievements').find({ childId } as any).toArray();
    return docs.map(d => {
      const r = d as Record<string, unknown>;
      return { id: r.id as string, childId: r.childId as string, achievementId: r.achievementId as string, unlockedAt: r.unlockedAt as string, progress: r.progress as number };
    });
  }

  async upsertUserAchievement(childId: string, achievementId: string, progress: number): Promise<void> {
    const now = this.now();
    await this.col('user_achievements').updateOne(
      { childId, achievementId } as any,
      { $set: { progress, updatedAt: now }, $setOnInsert: { id: this.uuid(), childId, achievementId, unlockedAt: now } } as any,
      { upsert: true }
    );
  }

  // ---- Study Plans ----
  async getStudyPlansByChild(childId: string): Promise<DBStudyPlan[]> {
    const docs = await this.col('study_plans').find({ childId } as any).sort({ createdAt: -1 }).toArray();
    return docs.map(d => {
      const r = d as Record<string, unknown>;
      return { id: r.id as string, childId: r.childId as string, parentId: r.parentId as string, title: r.title as string, subject: r.subject as string, targetMinutesPerDay: r.targetMinutesPerDay as number, startDate: r.startDate as string, endDate: r.endDate as string | undefined, active: r.active as boolean, createdAt: r.createdAt as string, updatedAt: r.updatedAt as string };
    });
  }

  async createStudyPlan(input: CreateStudyPlanInput): Promise<DBStudyPlan> {
    const id = this.uuid();
    const now = this.now();
    await this.col('study_plans').insertOne({ id, ...input, createdAt: now, updatedAt: now } as any);
    return (await this.getStudyPlansByChild(input.childId)).find(p => p.id === id)!;
  }

  async updateStudyPlan(id: string, data: Partial<DBStudyPlan>): Promise<DBStudyPlan | null> {
    const now = this.now();
    await this.col('study_plans').updateOne({ id } as any, { $set: { ...data, updatedAt: now } });
    const doc = await this.col('study_plans').findOne({ id } as any);
    if (!doc) return null;
    const r = doc as Record<string, unknown>;
    return { id: r.id as string, childId: r.childId as string, parentId: r.parentId as string, title: r.title as string, subject: r.subject as string, targetMinutesPerDay: r.targetMinutesPerDay as number, startDate: r.startDate as string, endDate: r.endDate as string | undefined, active: r.active as boolean, createdAt: r.createdAt as string, updatedAt: r.updatedAt as string };
  }

  async deleteStudyPlan(id: string): Promise<void> {
    await this.col('study_plans').deleteOne({ id } as any);
  }
}
