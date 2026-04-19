// 基础类型定义
// 基于 0-DATABASE.md 和 0-AUTH.md

// ==========================
// 用户相关类型
// ==========================
export interface Parent {
  _id?: string;
  email?: string;
  phone?: string;
  settings: ParentSettings;
  children: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ParentSettings {
  dailyTimeLimit: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface Child {
  _id?: string;
  parentId?: string;
  nickname: string;
  age: number;
  gender: 'boy' | 'girl';
  avatarId: string;
  petId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==========================
// 激励相关类型
// ==========================
export interface Rewards {
  _id?: string;
  childId?: string;
  stars: number;
  coins: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastCheckInDate?: Date;
  collectedStickers: string[];
  collectedBadges: string[];
  unlockedCharacters: string[];
  unlockedPets: string[];
  unlockedAreas: string[];
  currentPetId?: string;
  pets: Pet[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Pet {
  id: string;
  name: string;
  level: number;
  xp: number;
  happiness: number;
  hunger: number;
  lastFedAt?: Date;
  lastPlayedAt?: Date;
}

export interface Achievement {
  _id?: string;
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'learning' | 'streak' | 'reward' | 'special';
  condition: AchievementCondition;
  reward: AchievementReward;
  createdAt?: Date;
}

export interface AchievementCondition {
  type: 'task_count' | 'streak_days' | 'accuracy' | 'custom';
  value: number;
  subject?: string;
}

export interface AchievementReward {
  stars?: number;
  coins?: number;
  badge?: string;
  character?: string;
}

export interface UserAchievement {
  _id?: string;
  childId: string;
  achievementId: string;
  unlockedAt?: Date;
  progress: number;
}

// ==========================
// 学习进度相关类型
// ==========================
export interface LearningProgress {
  _id?: string;
  childId?: string;
  parentId?: string;
  totalLearningMinutes: number;
  totalTasksCompleted: number;
  totalCorrect: number;
  totalWrong: number;
  overallAccuracy: number;
  today: DailyProgress;
  subjects: SubjectProgressMap;
  streakDays: number;
  lastActiveDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DailyProgress {
  date: Date;
  learningMinutes: number;
  tasksCompleted: number;
  correct: number;
  wrong: number;
}

export interface SubjectProgressMap {
  pinyin: SubjectProgress;
  math: SubjectProgress;
  english: SubjectProgress;
  stories: SubjectProgress;
}

export interface SubjectProgress {
  started: boolean;
  level: number;
  totalMinutes: number;
  tasksCompleted: number;
  correct: number;
  wrong: number;
  accuracy: number;
  knowledgeUnits: KnowledgeUnitProgress[];
  reviewQueue: ReviewItem[];
  unlockedAreas: string[];
}

export interface KnowledgeUnitProgress {
  id: string;
  type: 'pinyin' | 'math' | 'english' | 'story';
  content: string;
  learnedAt?: Date;
  reviewCount: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  nextReviewAt?: Date;
  interval: number;
  easinessFactor: number;
  difficulty: number;
  masteryLevel: number;
}

export interface ReviewItem {
  knowledgeUnitId: string;
  priority: number;
  scheduledAt: Date;
}

// ==========================
// 内容相关类型
// ==========================
export interface PinyinContent {
  _id?: string;
  id: string;
  type: 'initial' | 'final' | 'syllable';
  content: string;
  display: string;
  audioUrl?: string;
  sprite?: PinyinSprite;
  difficulty: number;
  minAge: number;
  maxAge: number;
  relatedInitials?: string[];
  relatedFinals?: string[];
  similarItems?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PinyinSprite {
  name: string;
  emoji?: string;
  description?: string;
}

export interface MathContent {
  _id?: string;
  id: string;
  type: 'number' | 'shape' | 'operation' | 'comparison';
  content: string;
  display: string;
  emoji?: string;
  example?: string;
  audioUrl?: string;
  difficulty: number;
  minAge: number;
  maxAge: number;
  similarItems?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EnglishContent {
  _id?: string;
  id: string;
  type: 'word' | 'phrase' | 'dialogue';
  category: 'places' | 'objects' | 'family' | 'animals' | 'numbers' | 'colors';
  content: string;
  display: string;
  chineseMeaning: string;
  emoji?: string;
  imageUrl?: string;
  audioUrl?: string;
  difficulty: number;
  minAge: number;
  maxAge: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StoryContent {
  _id?: string;
  id: string;
  type: 'myth' | 'poem' | 'idiom' | 'history';
  title: string;
  titlePinyin?: string;
  pages: StoryPage[];
  questions: StoryQuestion[];
  difficulty: number;
  minAge: number;
  maxAge: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  textPinyin?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface StoryQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

// ==========================
// 游戏相关类型
// ==========================
export interface GameResult {
  gameId: string;
  success: boolean;
  stars: number;
  xp: number;
  tasksCompleted: number;
  accuracy: number;
  timeSpent: number;
  completedAt: string;
}

export interface GameProgress {
  gameId: string;
  totalSessions: number;
  completedSessions: number;
  bestStars: number;
  totalStars: number;
  lastPlayedAt: string;
}

export interface TaskResult {
  success: boolean;
  stars: number;
  xp?: number;
  response?: string;
  responseTime?: number;
}
