import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Rewards } from '../types';

interface RewardState {
  rewards: Rewards;
  showRewardAnimation: boolean;
  currentRewardType: 'star' | 'badge' | 'level' | null;
  
  setRewards: (rewards: Partial<Rewards>) => void;
  addStars: (amount: number) => void;
  addXP: (amount: number) => void;
  setShowRewardAnimation: (show: boolean) => void;
  setCurrentRewardType: (type: RewardState['currentRewardType']) => void;
  checkIn: () => void;
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
      
      checkIn: () => set((state) => {
        const today = new Date().toDateString();
        const lastCheckIn = state.rewards.lastCheckInDate 
          ? new Date(state.rewards.lastCheckInDate).toDateString() 
          : null;
        
        let streakDays = state.rewards.streakDays;
        
        if (lastCheckIn !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastCheckIn === yesterday.toDateString()) {
            streakDays += 1;
          } else if (lastCheckIn !== today) {
            streakDays = 1;
          }
        }
        
        return {
          rewards: {
            ...state.rewards,
            lastCheckInDate: new Date(),
            streakDays,
          },
        };
      }),
      
      clearRewards: () => set({
        rewards: defaultRewards,
        showRewardAnimation: false,
        currentRewardType: null,
      }),
    }),
    {
      name: 'kids-game-reward-storage',
    }
  )
);
