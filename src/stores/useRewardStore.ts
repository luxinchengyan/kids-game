import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Rewards } from '../types';

export interface StreakMilestone {
  days: number;
  title: string;
  icon: string;
  reward: { stars: number; xp: number; unlockItem?: string };
}

/** 连续打卡里程碑配置 */
export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3,  title: '三天小勇士', icon: '🌱', reward: { stars: 20,  xp: 30,  unlockItem: 'pet_egg' } },
  { days: 7,  title: '一周小达人', icon: '🔥', reward: { stars: 50,  xp: 80,  unlockItem: 'pet_evolve' } },
  { days: 14, title: '两周超人',   icon: '⚡', reward: { stars: 100, xp: 150, unlockItem: 'area_forest' } },
  { days: 30, title: '月度冠军',   icon: '🏆', reward: { stars: 200, xp: 300, unlockItem: 'area_space' } },
  { days: 60, title: '坚持小英雄', icon: '👑', reward: { stars: 500, xp: 600, unlockItem: 'pet_legendary' } },
];

export function getStreakMilestone(days: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.days === days) ?? null;
}

interface RewardState {
  rewards: Rewards;
  showRewardAnimation: boolean;
  currentRewardType: 'star' | 'badge' | 'level' | 'streak' | null;
  pendingStreakMilestone: StreakMilestone | null;

  setRewards: (rewards: Partial<Rewards>) => void;
  addStars: (amount: number) => void;
  addXP: (amount: number) => void;
  setShowRewardAnimation: (show: boolean) => void;
  setCurrentRewardType: (type: RewardState['currentRewardType']) => void;
  checkIn: () => StreakMilestone | null;
  clearPendingStreakMilestone: () => void;
  clearRewards: () => void;
}

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

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      rewards: defaultRewards,
      showRewardAnimation: false,
      currentRewardType: null,
      pendingStreakMilestone: null,
      
      setRewards: (rewards) => set((state) => ({
        rewards: { ...state.rewards, ...rewards },
      })),
      
      addStars: (amount) => set((state) => ({
        rewards: {
          ...state.rewards,
          stars: state.rewards.stars + amount,
        },
        showRewardAnimation: true,
        currentRewardType: 'star',
      })),
      
      addXP: (amount) => set((state) => {
        let { xp, xpToNextLevel, level } = state.rewards;
        xp += amount;
        
        while (xp >= xpToNextLevel) {
          xp -= xpToNextLevel;
          level += 1;
          xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
        }
        
        return {
          rewards: {
            ...state.rewards,
            xp,
            xpToNextLevel,
            level,
          },
          showRewardAnimation: true,
          currentRewardType: 'level',
        };
      }),
      
      setShowRewardAnimation: (showRewardAnimation) => set({ showRewardAnimation }),
      setCurrentRewardType: (currentRewardType) => set({ currentRewardType }),
       clearPendingStreakMilestone: () => set({ pendingStreakMilestone: null }),
       
       checkIn: () => {
         const state = get();
         const today = new Date().toDateString();
         const lastCheckIn = state.rewards.lastCheckInDate
           ? new Date(state.rewards.lastCheckInDate).toDateString()
           : null;

         if (lastCheckIn === today) {
           return null;
         }

         let streakDays = state.rewards.streakDays;

         const yesterday = new Date();
         yesterday.setDate(yesterday.getDate() - 1);

         if (lastCheckIn === yesterday.toDateString()) {
           streakDays += 1;
         } else {
           streakDays = 1;
         }

         const milestone = getStreakMilestone(streakDays);
        const bonusStars = milestone ? milestone.reward.stars : 0;
        const bonusXP = milestone ? milestone.reward.xp : 0;

        // 升级计算（含里程碑 XP）
        let { xp, xpToNextLevel, level } = state.rewards;
        xp += bonusXP;
        while (xp >= xpToNextLevel) {
          xp -= xpToNextLevel;
          level += 1;
          xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
        }

        set({
          rewards: {
            ...state.rewards,
            lastCheckInDate: new Date(),
            streakDays,
            stars: state.rewards.stars + bonusStars,
            xp,
            xpToNextLevel,
            level,
          },
          pendingStreakMilestone: milestone,
          showRewardAnimation: milestone !== null,
          currentRewardType: milestone ? 'streak' : state.currentRewardType,
        });

        return milestone;
      },
      
      clearRewards: () => set({
        rewards: defaultRewards,
        showRewardAnimation: false,
        currentRewardType: null,
        pendingStreakMilestone: null,
      }),
    }),
    {
      name: 'kids-game-reward-storage',
    }
  )
);
