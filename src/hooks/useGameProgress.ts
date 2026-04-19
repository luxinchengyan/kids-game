import { useState, useEffect } from 'react';
import { loadGameProgress } from '../lib/gameHelpers';
import type { GameProgress } from '../types';

/**
 * Hook to track and manage per-game progress
 */
export function useGameProgress(gameId: string) {
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load progress on mount
    const loaded = loadGameProgress(gameId);
    setProgress(loaded);
    setIsLoading(false);
  }, [gameId]);

  const refreshProgress = () => {
    const loaded = loadGameProgress(gameId);
    setProgress(loaded);
  };

  return {
    progress,
    isLoading,
    refreshProgress,
    totalSessions: progress?.totalSessions || 0,
    completedSessions: progress?.completedSessions || 0,
    bestStars: progress?.bestStars || 0,
    totalStars: progress?.totalStars || 0,
    lastPlayedAt: progress?.lastPlayedAt || null,
  };
}
