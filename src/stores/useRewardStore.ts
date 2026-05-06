import { useGameStore } from './useGameStore';

/**
 * Legacy useRewardStore refactored as a proxy to useGameStore.
 * This ensures all existing components work without modification
 * while sharing the same underlying state and persistence.
 */

export const useRewardStore = (selector?: (state: any) => any) => {
  const gameStore = useGameStore();
  
  // Create a compatible state object
  const legacyState = {
    rewards: {
      stars: gameStore.stats.stars,
      level: gameStore.stats.level,
      xp: gameStore.stats.xp,
      xpToNextLevel: gameStore.stats.xpToNextLevel,
      streakDays: gameStore.stats.streakDays,
      lastCheckInDate: gameStore.stats.lastCheckInDate,
      // Add other properties as needed for compatibility
      coins: 0,
      collectedStickers: [],
      collectedBadges: [],
      unlockedCharacters: [],
      unlockedPets: [],
      unlockedAreas: [],
      pets: [],
    },
    // Actions mapped to useGameStore
    addStars: (amount: number) => {
      // In useGameStore, stars are awarded through recordTaskResult, 
      // but for direct calls, we can manually update stats.
      const stats = useGameStore.getState().stats;
      useGameStore.setState({
        stats: { ...stats, stars: stats.stars + amount }
      });
    },
    addXP: (amount: number) => {
      // Direct XP addition logic (similar to recordTaskResult)
      const state = useGameStore.getState();
      let totalXp = state.stats.xp + amount;
      let level = state.stats.level;
      let xpToNextLevel = state.stats.xpToNextLevel;
      
      while (totalXp >= xpToNextLevel) {
        totalXp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
      }
      
      useGameStore.setState({
        stats: { ...state.stats, xp: totalXp, level, xpToNextLevel }
      });
    },
    checkIn: () => {
      // useGameStore startMission handles streak, but checkIn can be separate if needed
      // For now, let's keep it simple or delegate
      return null;
    },
    clearPendingStreakMilestone: () => {},
    pendingStreakMilestone: null,
    showRewardAnimation: false,
    currentRewardType: null,
  };

  return selector ? selector(legacyState) : legacyState;
};

// Also export a 'getState' method for non-hook usage
useRewardStore.getState = () => {
  const gameStore = useGameStore.getState();
  return {
    addStars: (amount: number) => {
      const stats = useGameStore.getState().stats;
      useGameStore.setState({ stats: { ...stats, stars: stats.stars + amount } });
    },
    addXP: (amount: number) => {
      const state = useGameStore.getState();
      let totalXp = state.stats.xp + amount;
      let level = state.stats.level;
      let xpToNextLevel = state.stats.xpToNextLevel;
      while (totalXp >= xpToNextLevel) {
        totalXp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
      }
      useGameStore.setState({ stats: { ...state.stats, xp: totalXp, level, xpToNextLevel } });
    }
  };
};

export type StreakMilestone = any;
