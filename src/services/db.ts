// Database Service 接口
// MVP 使用 localStorage 实现，Phase 3 无缝切换到 MongoDB

import type { LearningProgress, Rewards, UserAchievement, Achievement } from '../types';
import Storage from '../lib/storage';

const KEYS = {
  LEARNING_PROGRESS: 'kids-game-learning-progress',
  REWARDS: 'kids-game-rewards',
  ACHIEVEMENTS: 'kids-game-achievements',
};

export interface DatabaseService {
  // Learning Progress
  getLearningProgress: (childId?: string) => Promise<LearningProgress | null>;
  updateLearningProgress: (childId: string, data: Partial<LearningProgress>) => Promise<void>;
  recordTaskComplete: (childId: string, subject: string, correct: boolean) => Promise<void>;
  
  // Rewards
  getRewards: (childId?: string) => Promise<Rewards | null>;
  updateRewards: (childId: string, data: Partial<Rewards>) => Promise<void>;
  addStars: (childId: string, amount: number) => Promise<void>;
  
  // Achievements
  getAchievements: () => Promise<Achievement[]>;
  getUserAchievements: (childId: string) => Promise<UserAchievement[]>;
  unlockAchievement: (childId: string, achievementId: string) => Promise<void>;
}

export class LocalDatabaseService implements DatabaseService {
  // ==========================================
  // Learning Progress
  // ==========================================
  async getLearningProgress(childId?: string): Promise<LearningProgress | null> {
    const defaultProgress: LearningProgress = {
      totalLearningMinutes: 0,
      totalTasksCompleted: 0,
      totalCorrect: 0,
      totalWrong: 0,
      overallAccuracy: 0,
      today: {
        date: new Date(),
        learningMinutes: 0,
        tasksCompleted: 0,
        correct: 0,
        wrong: 0,
      },
      subjects: {
        pinyin: { started: false, level: 1, totalMinutes: 0, tasksCompleted: 0, correct: 0, wrong: 0, accuracy: 0, knowledgeUnits: [], reviewQueue: [], unlockedAreas: [] },
        math: { started: false, level: 1, totalMinutes: 0, tasksCompleted: 0, correct: 0, wrong: 0, accuracy: 0, knowledgeUnits: [], reviewQueue: [], unlockedAreas: [] },
        english: { started: false, level: 1, totalMinutes: 0, tasksCompleted: 0, correct: 0, wrong: 0, accuracy: 0, knowledgeUnits: [], reviewQueue: [], unlockedAreas: [] },
        stories: { started: false, level: 1, totalMinutes: 0, tasksCompleted: 0, correct: 0, wrong: 0, accuracy: 0, knowledgeUnits: [], reviewQueue: [], unlockedAreas: [] },
      },
      streakDays: 0,
      lastActiveDate: new Date(),
    };
    
    return Storage.get<LearningProgress>(KEYS.LEARNING_PROGRESS, defaultProgress);
  }

  async updateLearningProgress(childId: string, data: Partial<LearningProgress>): Promise<void> {
    const current = await this.getLearningProgress(childId);
    if (current) {
      Storage.set(KEYS.LEARNING_PROGRESS, { ...current, ...data });
    }
  }

  async recordTaskComplete(childId: string, subject: string, correct: boolean): Promise<void> {
    const progress = await this.getLearningProgress(childId);
    if (!progress) return;
    
    const today = new Date().toDateString();
    const lastDate = progress.today.date ? new Date(progress.today.date).toDateString() : null;
    
    if (lastDate !== today) {
      progress.today = {
        date: new Date(),
        learningMinutes: 0,
        tasksCompleted: 0,
        correct: 0,
        wrong: 0,
      };
    }
    
    progress.totalTasksCompleted += 1;
    progress.today.tasksCompleted += 1;
    
    if (correct) {
      progress.totalCorrect += 1;
      progress.today.correct += 1;
    } else {
      progress.totalWrong += 1;
      progress.today.wrong += 1;
    }
    
    progress.overallAccuracy = progress.totalTasksCompleted > 0 
      ? progress.totalCorrect / progress.totalTasksCompleted 
      : 0;
    
    if (subject && progress.subjects[subject as keyof typeof progress.subjects]) {
      const subj = progress.subjects[subject as keyof typeof progress.subjects];
      subj.started = true;
      subj.tasksCompleted += 1;
      if (correct) subj.correct += 1; else subj.wrong += 1;
      subj.accuracy = subj.tasksCompleted > 0 ? subj.correct / subj.tasksCompleted : 0;
    }
    
    Storage.set(KEYS.LEARNING_PROGRESS, progress);
  }

  // ==========================================
  // Rewards
  // ==========================================
  async getRewards(childId?: string): Promise<Rewards | null> {
    const defaultRewards: Rewards = {
      stars: 0,
      coins: 0,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      streakDays: 0,
      collectedStickers: [],
      collectedBadges: [],
      unlockedCharacters: ['star_girl'],
      unlockedPets: [],
      unlockedAreas: ['home'],
      pets: [],
    };
    return Storage.get<Rewards>(KEYS.REWARDS, defaultRewards);
  }

  async updateRewards(childId: string, data: Partial<Rewards>): Promise<void> {
    const current = await this.getRewards(childId);
    if (current) {
      Storage.set(KEYS.REWARDS, { ...current, ...data });
    }
  }

  async addStars(childId: string, amount: number): Promise<void> {
    const rewards = await this.getRewards(childId);
    if (rewards) {
      rewards.stars += amount;
      Storage.set(KEYS.REWARDS, rewards);
    }
  }

  // ==========================================
  // Achievements
  // ==========================================
  async getAchievements(): Promise<Achievement[]> {
    return [
      {
        id: 'first_star',
        name: '第一颗星',
        description: '获得第一颗星星',
        icon: '⭐',
        rarity: 'common',
        category: 'reward',
        condition: { type: 'task_count', value: 1 },
        reward: { stars: 5 },
      },
      {
        id: 'streak_3',
        name: '连续三天',
        description: '连续学习3天',
        icon: '🔥',
        rarity: 'rare',
        category: 'streak',
        condition: { type: 'streak_days', value: 3 },
        reward: { stars: 20 },
      },
      {
        id: 'streak_7',
        name: '周冠军',
        description: '连续学习7天',
        icon: '🏆',
        rarity: 'epic',
        category: 'streak',
        condition: { type: 'streak_days', value: 7 },
        reward: { stars: 50, badge: 'weekly_champion' },
      },
    ];
  }

  async getUserAchievements(childId: string): Promise<UserAchievement[]> {
    const result = Storage.get<UserAchievement[]>(KEYS.ACHIEVEMENTS, []);
    return result || [];
  }

  async unlockAchievement(childId: string, achievementId: string): Promise<void> {
    const achievements = await this.getUserAchievements(childId);
    const exists = achievements.find(a => a.achievementId === achievementId);
    if (!exists) {
      achievements.push({
        childId,
        achievementId,
        unlockedAt: new Date(),
        progress: 1,
      });
      Storage.set(KEYS.ACHIEVEMENTS, achievements);
    }
  }
}

// 导出单例
export const db = new LocalDatabaseService();
export default db;
