/**
 * 数据库抽象层类型定义
 * 所有适配器必须实现 IDatabase 接口，保证上层代码完全解耦
 */

// ==========================
// 数据模型
// ==========================

export interface DBParent {
  id: string;
  phone?: string;
  wechatOpenId?: string;
  wechatUnionId?: string;
  wechatNickname?: string;
  wechatAvatarUrl?: string;
  passwordHash?: string;
  dailyTimeLimit: number;  // minutes
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  createdAt: string;  // ISO string
  updatedAt: string;
}

export interface DBChild {
  id: string;
  parentId: string;
  nickname: string;
  age: number;
  gender: 'boy' | 'girl';
  avatarId: string;
  petId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBOtpRecord {
  id: string;
  phone: string;
  code: string;
  expiresAt: string;  // ISO string
  used: boolean;
  createdAt: string;
}

export interface DBSession {
  id: string;
  parentId: string;
  refreshToken: string;
  deviceInfo?: string;
  expiresAt: string;
  createdAt: string;
}

export interface DBLearningProgress {
  id: string;
  childId: string;
  parentId: string;
  totalLearningMinutes: number;
  totalTasksCompleted: number;
  totalCorrect: number;
  totalWrong: number;
  overallAccuracy: number;
  streakDays: number;
  lastActiveDate?: string;
  todayDate?: string;
  todayLearningMinutes: number;
  todayTasksCompleted: number;
  todayCorrect: number;
  todayWrong: number;
  subjectsJson: string;  // JSON serialized SubjectProgressMap
  createdAt: string;
  updatedAt: string;
}

export interface DBRewards {
  id: string;
  childId: string;
  stars: number;
  coins: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastCheckInDate?: string;
  collectedStickersJson: string;  // JSON array
  collectedBadgesJson: string;
  unlockedCharactersJson: string;
  unlockedPetsJson: string;
  unlockedAreasJson: string;
  currentPetId?: string;
  petsJson: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBUserAchievement {
  id: string;
  childId: string;
  achievementId: string;
  unlockedAt: string;
  progress: number;
}

export interface DBStudyPlan {
  id: string;
  childId: string;
  parentId: string;
  title: string;
  subject: string;
  targetMinutesPerDay: number;
  startDate: string;
  endDate?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================
// 查询/创建参数
// ==========================

export type CreateParentInput = Omit<DBParent, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateParentInput = Partial<Omit<DBParent, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateChildInput = Omit<DBChild, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateChildInput = Partial<Omit<DBChild, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>>;

export type CreateStudyPlanInput = Omit<DBStudyPlan, 'id' | 'createdAt' | 'updatedAt'>;

// ==========================
// 核心数据库接口
// ==========================

export interface IDatabase {
  /** 连接/初始化数据库（建表、迁移等） */
  connect(): Promise<void>;

  /** 断开连接 */
  disconnect(): Promise<void>;

  // ---------- 家长账号 ----------
  findParentByPhone(phone: string): Promise<DBParent | null>;
  findParentByWechat(openId: string): Promise<DBParent | null>;
  findParentById(id: string): Promise<DBParent | null>;
  createParent(input: CreateParentInput): Promise<DBParent>;
  updateParent(id: string, input: UpdateParentInput): Promise<DBParent | null>;

  // ---------- OTP 验证码 ----------
  upsertOtp(phone: string, code: string, expiresAt: string): Promise<void>;
  findValidOtp(phone: string, code: string): Promise<DBOtpRecord | null>;
  markOtpUsed(id: string): Promise<void>;

  // ---------- 会话/RefreshToken ----------
  createSession(parentId: string, refreshToken: string, deviceInfo?: string, expiresAt?: string): Promise<DBSession>;
  findSession(refreshToken: string): Promise<DBSession | null>;
  deleteSession(refreshToken: string): Promise<void>;
  deleteSessionsByParent(parentId: string): Promise<void>;

  // ---------- 孩子信息 ----------
  findChildrenByParent(parentId: string): Promise<DBChild[]>;
  findChildById(id: string): Promise<DBChild | null>;
  createChild(input: CreateChildInput): Promise<DBChild>;
  updateChild(id: string, input: UpdateChildInput): Promise<DBChild | null>;
  deleteChild(id: string): Promise<void>;

  // ---------- 学习进度 ----------
  getProgressByChild(childId: string): Promise<DBLearningProgress | null>;
  upsertProgress(childId: string, data: Partial<DBLearningProgress>): Promise<DBLearningProgress>;

  // ---------- 奖励 ----------
  getRewardsByChild(childId: string): Promise<DBRewards | null>;
  upsertRewards(childId: string, data: Partial<DBRewards>): Promise<DBRewards>;

  // ---------- 成就 ----------
  getUserAchievements(childId: string): Promise<DBUserAchievement[]>;
  upsertUserAchievement(childId: string, achievementId: string, progress: number): Promise<void>;

  // ---------- 学习计划 ----------
  getStudyPlansByChild(childId: string): Promise<DBStudyPlan[]>;
  createStudyPlan(input: CreateStudyPlanInput): Promise<DBStudyPlan>;
  updateStudyPlan(id: string, data: Partial<DBStudyPlan>): Promise<DBStudyPlan | null>;
  deleteStudyPlan(id: string): Promise<void>;
}
