import { useCallback, useRef } from 'react';
import { useRewardStore } from '../stores/useRewardStore';
import { updateGameProgress } from '../lib/gameHelpers';
import { track } from '../lib/analytics';
import type { TaskResult, GameResult } from '../types';

/**
 * Hook to handle game completion logic
 * Centralizes reward distribution, analytics tracking, and progress saving
 */
export function useGameCompletion(gameId: string) {
  const addStars = useRewardStore((s) => s.addStars);
  const addXP = useRewardStore((s) => s.addXP);
  const sessionStartedAt = useRef<number>(Date.now());

  const handleGameComplete = useCallback(
    (result: Omit<GameResult, 'gameId' | 'completedAt' | 'timeSpent'>) => {
      const timeSpent = Date.now() - sessionStartedAt.current;
      const xp = result.xp || (result.success ? 12 + result.stars * 4 : 4);

      // Distribute rewards
      if (result.success) {
        addStars(result.stars);
        addXP(xp);
      }

      // Save progress
      updateGameProgress(gameId, {
        success: result.success,
        stars: result.stars,
      });

      // Track analytics
      track('game_complete', {
        gameId,
        success: result.success,
        stars: result.stars,
        xp,
        tasksCompleted: result.tasksCompleted,
        accuracy: result.accuracy,
        timeSpent,
      });
    },
    [gameId, addStars, addXP]
  );

  const handleTaskComplete = useCallback(
    (result: TaskResult) => {
      const timeSpent = Date.now() - sessionStartedAt.current;
      
      // Track individual task completion
      track('task_complete', {
        gameId,
        success: result.success,
        stars: result.stars,
        timeSpent,
      });
    },
    [gameId]
  );

  return {
    handleGameComplete,
    handleTaskComplete,
    sessionStartedAt,
  };
}
