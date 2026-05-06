import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createInitialKnowledgeState } from '../data/learningContent';
import {
  checkAchievements,
  calculateStarsEarned,
  getLevelProgress,
  achievements
} from '../data/rewards';
import { useDailyQuestStore } from './useDailyQuestStore';
import { useUserStore } from './useUserStore';
import api from '../services/api';
import { getEffectiveChildAge } from '../lib/learnerProfile';

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
  xpToNextLevel: number;
  sessionStartedAt: number | null;
  history: HistoryEntry[];
  lastCheckInDate?: string;
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
  easinessFactor: number;
  interval: number;
  minAge?: number;
  maxAge?: number;
}

interface Reward {
  type: string;
  amount?: number;
  achievement?: any;
}

interface GameState {
  // Island navigation
  currentIsland: 'home' | 'pinyin' | 'math' | 'english' | 'stories' | 'parent';
  isGameLocked: boolean;
  currentQuestion: any;
  feedback: string | null;
  
  // Profile & mission
  profile: Profile;
  companionId: string;
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
  setCompanion: (id: string) => void;
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
  syncKnowledgeWithAge: (age: number) => void;
}

// SM-2 Spaced Repetition Algorithm
function calculateNextReview(unit: KnowledgeUnit, success: boolean, accuracy: number): { nextReviewAt: number; interval: number; easinessFactor: number } {
  const now = Date.now();
  
  // Map accuracy to SM-2 quality (0-5)
  // 5: perfect response
  // 4: correct response after a hesitation
  // 3: correct response recalled with serious difficulty
  // 2: incorrect response; where the correct one seemed easy to recall
  // 1: incorrect response; the correct one remembered
  // 0: complete blackout.
  let quality = 0;
  if (success) {
    if (accuracy >= 0.9) quality = 5;
    else if (accuracy >= 0.7) quality = 4;
    else quality = 3;
  } else {
    if (accuracy >= 0.3) quality = 2;
    else if (accuracy >= 0.1) quality = 1;
    else quality = 0;
  }

  let { interval, easinessFactor, seenCount } = unit;
  
  if (quality >= 3) {
    if (seenCount <= 1) {
      interval = 1; // 1 day
    } else if (seenCount === 2) {
      interval = 6; // 6 days
    } else {
      interval = Math.round(interval * easinessFactor);
    }
    
    // Update Easiness Factor
    easinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easinessFactor < 1.3) easinessFactor = 1.3;
  } else {
    // Reset interval on failure
    interval = 1;
    // Don't increase seenCount for SM-2 purposes on failure if you want to restart the 1, 6, ... sequence
    // but here we just reset interval.
  }

  // Convert day interval to milliseconds
  const msInDay = 24 * 60 * 60 * 1000;
  // For kids, let's make the first few intervals shorter (minutes instead of days)
  const realNextReviewAt = now + (interval === 1 && seenCount <= 1 ? 10 * 60 * 1000 : interval * msInDay);

  return {
    nextReviewAt: realNextReviewAt,
    interval,
    easinessFactor
  };
}

const defaultProfile: Profile = {
  childName: '',
  ageGroup: '4-5',
  gender: 'girl',
  focus: 'mixed',
  language: 'zh',
  companion: 'aisha'
};

const defaultStats: Stats = {
  completedTasks: 0,
  correctAnswers: 0,
  mistakes: 0,
  stars: 0,
  streakDays: 0,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  sessionStartedAt: null,
  history: []
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentIsland: 'home',
      isGameLocked: false,
      currentQuestion: null,
      feedback: null,
      profile: defaultProfile,
      companionId: 'aisha',
      mission: [],
      missionIndex: 0,
      rewards: [],
      newAchievements: [],
      parentSummary: null,
      unlockedAchievements: [],
      stats: defaultStats,
      knowledge: {},
      
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
        set((state) => ({ profile: { ...state.profile, ...profile } }));
      },
      setCompanion: (companionId) => set((state) => ({ 
        companionId, 
        profile: { ...state.profile, companion: companionId } 
      })),

      syncKnowledgeWithAge: (age) => {
        const currentKnowledge = get().knowledge;
        const initialKnowledge = createInitialKnowledgeState(age);
        
        // Merge: keep existing progress, add new units for the age
        const mergedKnowledge = { ...initialKnowledge, ...currentKnowledge };
        
        // Filter out units too advanced for current age (only if no progress made)
        Object.keys(mergedKnowledge).forEach(id => {
          const unit = mergedKnowledge[id];
          if (unit.minAge && unit.minAge > age + 1 && unit.seenCount === 0) {
            delete mergedKnowledge[id];
          }
        });

        set({ knowledge: mergedKnowledge });
      },

      startMission: (mission) => {
        // Update streak logic
        const today = new Date().toISOString().slice(0, 10);
        const stats = get().stats;
        let streakDays = stats.streakDays;
        
        if (stats.lastCheckInDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().slice(0, 10);
          
          if (stats.lastCheckInDate === yesterdayStr) {
            streakDays += 1;
          } else {
            streakDays = 1;
          }
        }

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
            streakDays,
            lastCheckInDate: today
          }
        }));
      },

      recordTaskResult: ({ taskId, success, stars: providedStars = 0, skill, prompt, responseTime, knowledgeUnitId, response }) => {
        useDailyQuestStore.getState().recordTaskResult(success);
        
        set((state) => {
          const earnedStars = success ? calculateStarsEarned({ success, accuracy: 1 }) : 0;
          const totalStars = state.stats.stars + earnedStars;
          const gainedXp = success ? 12 + earnedStars * 4 : 4;
          
          let totalXp = state.stats.xp + gainedXp;
          let level = state.stats.level;
          let xpToNextLevel = state.stats.xpToNextLevel;
          
          while (totalXp >= xpToNextLevel) {
            totalXp -= xpToNextLevel;
            level += 1;
            xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
          }

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
            
            const { nextReviewAt, interval, easinessFactor } = calculateNextReview(unit, success, accuracy);
            
            nextKnowledge[knowledgeUnitId] = {
              ...unit,
              seenCount,
              correctCount,
              accuracy,
              errorCount: unit.errorCount + (success ? 0 : 1),
              lastReviewedAt: Date.now(),
              nextReviewAt,
              interval,
              easinessFactor
            };
          }

          const currentStats: Stats = {
            ...state.stats,
            completedTasks: state.stats.completedTasks + 1,
            correctAnswers: state.stats.correctAnswers + (success ? 1 : 0),
            mistakes: state.stats.mistakes + (success ? 0 : 1),
            stars: totalStars,
            xp: totalXp,
            xpToNextLevel,
            level,
            history
          };

          const newAchievements = checkAchievements(
            currentStats,
            history,
            state.unlockedAchievements
          );

          let updatedUnlockedAchievements = [...state.unlockedAchievements];
          if (newAchievements.length > 0) {
            updatedUnlockedAchievements = [
              ...state.unlockedAchievements,
              ...newAchievements.map((a: any) => a.id)
            ];
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
            unlockedAchievements: updatedUnlockedAchievements,
            rewards: [...state.rewards, ...rewards]
          };
        });

        const currentChild = useUserStore.getState().currentChild;
        if (currentChild?._id && skill) {
          void api.post(`/api/progress/${currentChild._id}/task`, {
            subject: skill,
            correct: success,
            minutesSpent: responseTime ? Math.max(1, Math.round(responseTime / 60000)) : 1,
          }).catch(() => {
            // Ignore persistence failures in local-first game flow.
          });
        }
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
    }),
    {
      name: 'kids-game-state-v3',
      onRehydrateStorage: () => (state) => {
        // Initial age-sync if needed
        const child = useUserStore.getState().currentChild;
        if (child && state) {
          state.syncKnowledgeWithAge(getEffectiveChildAge(child));
        }
      }
    }
  )
);
