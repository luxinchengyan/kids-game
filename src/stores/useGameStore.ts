import { create } from 'zustand';
import { createInitialKnowledgeState } from '../data/learningContent';
import {
  checkAchievements,
  calculateStarsEarned,
  getLevelProgress,
  achievements
} from '../data/rewards';
import { useDailyQuestStore } from './useDailyQuestStore';

// LocalStorage keys
const PROFILE_KEY = 'kids-game-profile';
const HISTORY_KEY = 'kids-game-history';
const KNOWLEDGE_KEY = 'kids-game-knowledge';
const ACHIEVEMENT_KEY = 'kids-game-achievements';
const STREAK_KEY = 'kids-game-streak';

// Helper functions
function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail
  }
}

interface Profile {
  childName: string;
  ageGroup: string;
  gender: 'boy' | 'girl';
  focus: string;
  language: string;
  companion: string;
}

interface HistoryEntry {
  taskId: string;
  skill?: string;
  knowledgeUnitId?: string;
  prompt?: string;
  success: boolean;
  stars: number;
  response?: string;
  responseTime?: number;
  completedAt: string;
}

interface Stats {
  completedTasks: number;
  correctAnswers: number;
  mistakes: number;
  stars: number;
  streakDays: number;
  level: number;
  xp: number;
  sessionStartedAt: number | null;
  history: HistoryEntry[];
}

interface KnowledgeUnit {
  id: string;
  type: string;
  content: string;
  mnemonic?: string;
  example?: string;
  emoji?: string;
  audio?: string;
  difficulty: number;
  nextReviewAt: number;
  lastReviewedAt: number;
  errorCount: number;
  accuracy: number;
  correctCount: number;
  seenCount: number;
  confusionSet?: string[];
}

interface Reward {
  type: string;
  amount?: number;
  achievement?: any;
}

function loadKnowledgeState(): Record<string, KnowledgeUnit> {
  const defaults = createInitialKnowledgeState();
  const saved = loadJson(KNOWLEDGE_KEY, {});
  return { ...defaults, ...saved };
}

function scheduleNextReview(accuracy: number, previousNextReviewAt: number): number {
  const now = Date.now();
  const intervals = [10 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];
  if (accuracy > 0.9 && previousNextReviewAt > now) {
    return previousNextReviewAt + intervals[0];
  }
  if (accuracy > 0.85) return now + intervals[1];
  if (accuracy > 0.6) return now + intervals[0];
  return now + 5 * 60 * 1000;
}

function updateStreak(): number {
  const today = new Date().toDateString();
  const lastPlayDate = loadJson(STREAK_KEY, { date: null, count: 0 });
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let newStreak = lastPlayDate.count;
  if (lastPlayDate.date === today) {
    // Already played today
  } else if (lastPlayDate.date === yesterday) {
    newStreak += 1;
  } else if (lastPlayDate.date) {
    newStreak = 1;
  } else {
    newStreak = 1;
  }

  saveJson(STREAK_KEY, { date: today, count: newStreak });
  return newStreak;
}

const defaultProfile: Profile = {
  childName: '',
  ageGroup: '4-5',
  gender: 'girl',
  focus: 'mixed',
  language: 'zh',
  companion: 'astro'
};

const defaultStats: Stats = {
  completedTasks: 0,
  correctAnswers: 0,
  mistakes: 0,
  stars: 0,
  streakDays: 0,
  level: 1,
  xp: 0,
  sessionStartedAt: null,
  history: []
};

interface GameState {
  // Island navigation
  currentIsland: 'home' | 'pinyin' | 'math' | 'english' | 'stories' | 'parent';
  isGameLocked: boolean;
  currentQuestion: any;
  feedback: string | null;
  
  // Profile & mission
  profile: Profile;
  mission: any[];
  missionIndex: number;
  rewards: Reward[];
  newAchievements: any[];
  parentSummary: any;
  unlockedAchievements: string[];
  stats: Stats;
  knowledge: Record<string, KnowledgeUnit>;
  
  // Actions - Navigation
  setCurrentIsland: (island: GameState['currentIsland']) => void;
  setGameLocked: (locked: boolean) => void;
  setCurrentQuestion: (question: any) => void;
  setFeedback: (feedback: string | null) => void;
  clearGame: () => void;
  
  // Actions - Profile & Mission
  setProfile: (profile: Partial<Profile>) => void;
  startMission: (mission: any[]) => void;
  recordTaskResult: (result: {
    taskId: string;
    success: boolean;
    stars?: number;
    skill?: string;
    prompt?: string;
    responseTime?: number;
    knowledgeUnitId?: string;
    response?: string;
  }) => void;
  queueReward: (reward: Reward) => void;
  clearRewards: () => void;
  clearNewAchievements: () => void;
  nextTask: () => void;
  setParentSummary: (summary: any) => void;
  resetMission: () => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
  // Initial state
  currentIsland: 'home',
  isGameLocked: false,
  currentQuestion: null,
  feedback: null,
  profile: loadJson(PROFILE_KEY, defaultProfile),
  mission: [],
  missionIndex: 0,
  rewards: [],
  newAchievements: [],
  parentSummary: null,
  unlockedAchievements: loadJson(ACHIEVEMENT_KEY, []),
  stats: {
    ...defaultStats,
    history: loadJson(HISTORY_KEY, []),
    streakDays: loadJson(STREAK_KEY, { count: 0 }).count
  },
  knowledge: loadKnowledgeState(),
  
  // Navigation actions
  setCurrentIsland: (currentIsland) => set({ currentIsland }),
  setGameLocked: (isGameLocked) => set({ isGameLocked }),
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  setFeedback: (feedback) => set({ feedback }),
  clearGame: () => set({
    currentIsland: 'home',
    isGameLocked: false,
    currentQuestion: null,
    feedback: null,
  }),
  
  // Profile & Mission actions
  setProfile: (profile) => {
    const nextProfile = { ...get().profile, ...profile };
    saveJson(PROFILE_KEY, nextProfile);
    set({ profile: nextProfile });
  },

  startMission: (mission) => {
    const streakDays = updateStreak();
    set((state) => ({
      mission,
      missionIndex: 0,
      parentSummary: null,
      newAchievements: [],
      stats: {
        ...state.stats,
        completedTasks: 0,
        correctAnswers: 0,
        mistakes: 0,
        sessionStartedAt: Date.now(),
        streakDays
      }
    }));
  },

   recordTaskResult: ({ taskId, success, stars = 0, skill, prompt, responseTime, knowledgeUnitId, response }) => {
     useDailyQuestStore.getState().recordTaskResult(success);
     set((state) => {
       const completedTasks = state.stats.completedTasks + 1;
      const correctAnswers = state.stats.correctAnswers + (success ? 1 : 0);
      const mistakes = state.stats.mistakes + (success ? 0 : 1);
      const earnedStars = success ? calculateStarsEarned({ success, accuracy: 1 }) : 0;
      const totalStars = state.stats.stars + earnedStars;
      const gainedXp = success ? 12 + earnedStars * 4 : 4;
      const totalXp = state.stats.xp + gainedXp;
      const levelProgress = getLevelProgress(totalXp);

      const historyEntry: HistoryEntry = {
        taskId,
        skill,
        knowledgeUnitId,
        prompt,
        success,
        stars: earnedStars,
        response,
        responseTime,
        completedAt: new Date().toISOString()
      };
      const history = [...state.stats.history, historyEntry].slice(-50);

      const nextKnowledge = { ...state.knowledge };

      if (knowledgeUnitId && nextKnowledge[knowledgeUnitId]) {
        const unit = nextKnowledge[knowledgeUnitId];
        const seenCount = unit.seenCount + 1;
        const correctCount = unit.correctCount + (success ? 1 : 0);
        const accuracy = correctCount / seenCount;
        nextKnowledge[knowledgeUnitId] = {
          ...unit,
          seenCount,
          correctCount,
          accuracy,
          errorCount: unit.errorCount + (success ? 0 : 1),
          lastReviewedAt: Date.now(),
          nextReviewAt: scheduleNextReview(accuracy, unit.nextReviewAt)
        };
        saveJson(KNOWLEDGE_KEY, nextKnowledge);
      }

      saveJson(HISTORY_KEY, history);

      const currentStats = {
        ...state.stats,
        completedTasks,
        correctAnswers,
        mistakes,
        stars: totalStars,
        xp: totalXp,
        level: levelProgress.level,
        history
      };

      const newAchievements = checkAchievements(
        currentStats,
        history,
        state.unlockedAchievements
      );

      let updatedAchievements = [...state.unlockedAchievements];
      if (newAchievements.length > 0) {
        updatedAchievements = [
          ...state.unlockedAchievements,
          ...newAchievements.map((a: any) => a.id)
        ];
        saveJson(ACHIEVEMENT_KEY, updatedAchievements);
      }

      const rewards: Reward[] = [];
      if (earnedStars > 0) {
        rewards.push({ type: 'star', amount: earnedStars });
      }
      newAchievements.forEach((achievement: any) => {
        rewards.push({ type: 'achievement', achievement });
      });

      return {
        knowledge: nextKnowledge,
        stats: currentStats,
        newAchievements: [...state.newAchievements, ...newAchievements],
        unlockedAchievements: updatedAchievements,
        rewards: [...state.rewards, ...rewards]
      };
    });
  },

  queueReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
  clearRewards: () => set({ rewards: [] }),
  clearNewAchievements: () => set({ newAchievements: [] }),
  nextTask: () => set((state) => ({ missionIndex: Math.min(state.missionIndex + 1, state.mission.length) })),
  setParentSummary: (parentSummary) => set({ parentSummary }),

  resetMission: () =>
    set((state) => ({
      mission: [],
      missionIndex: 0,
      rewards: [],
      newAchievements: [],
      parentSummary: null,
      stats: {
        ...state.stats,
        completedTasks: 0,
        correctAnswers: 0,
        mistakes: 0,
        sessionStartedAt: null
      }
    }))
}));
