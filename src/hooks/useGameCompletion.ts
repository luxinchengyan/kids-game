import { useCallback, useRef } from 'react';
import { updateGameProgress } from '../lib/gameHelpers';
import { track } from '../lib/analytics';
import type { GameResult, TaskResult } from '../types';

/**
 * Hook to handle game completion logic
 * Centralizes analytics tracking and per-game progress saving.
 * Rewards are now handled exclusively by useGameStore.recordTaskResult
 * to ensure consistency and prevent double-counting.
 */
export function useGameCompletion(gameId: string) {
  const sessionStartedAt = useRef<number>(Date.now());

  const handleGameComplete = useCallback(
    (result: Omit<GameResult, 'gameId' | 'completedAt' | 'timeSpent'>) => {
      const timeSpent = Date.now() - sessionStartedAt.current;

      // Save high-level game progress (e.g. bestStars, totalSessions)
      updateGameProgress(gameId, {
        success: result.success,
        stars: result.stars,
      });

      // Track analytics
      track('game_complete', {
        gameId,
        success: result.success,
        stars: result.stars,
        xp: result.xp,
        tasksCompleted: result.tasksCompleted,
        accuracy: result.accuracy,
        timeSpent,
      });
    },
    [gameId]
  );

  const handleTaskComplete = useCallback(
    (result: TaskResult) => {
      const timeSpent = Date.now() - sessionStartedAt.current;
      
      // Track individual task completion for analytics
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
