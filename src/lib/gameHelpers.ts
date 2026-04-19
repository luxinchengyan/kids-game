import type { GameProgress, TaskResult } from '../types';

const PROGRESS_KEY_PREFIX = 'kids-game-progress-';

/**
 * Calculate stars earned based on performance
 * Standard star calculation across all games
 */
export function calculateStarsEarned(accuracy: number, timeSpent?: number): number {
  // Base stars on accuracy
  let stars = 0;
  if (accuracy >= 0.9) stars = 3;
  else if (accuracy >= 0.7) stars = 2;
  else if (accuracy >= 0.5) stars = 1;
  
  // Optional time bonus (faster completion = bonus star)
  if (timeSpent && timeSpent < 30000 && stars > 0) {
    stars = Math.min(stars + 1, 3);
  }
  
  return stars;
}

/**
 * Get encouragement message based on performance
 * Standard encouragement messages for all games
 */
export function getEncouragementMessage(success: boolean, streak: number = 0): string {
  if (success) {
    const messages = [
      '太棒了！🎉',
      '你真聪明！⭐',
      '做得好！👏',
      '继续加油！💪',
      '非常好！🌟',
    ];
    if (streak >= 3) {
      return `连续${streak}次正确！太厉害了！🔥`;
    }
    return messages[Math.floor(Math.random() * messages.length)];
  } else {
    const messages = [
      '再试一次吧！💪',
      '没关系，继续加油！🌈',
      '下次一定会更好！⭐',
      '别灰心，你可以的！🎯',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

/**
 * Save game progress to localStorage
 */
export function saveGameProgress(gameId: string, progress: GameProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `${PROGRESS_KEY_PREFIX}${gameId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // Silently fail
  }
}

/**
 * Load game progress from localStorage
 */
export function loadGameProgress(gameId: string): GameProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = `${PROGRESS_KEY_PREFIX}${gameId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Update game progress after a session
 */
export function updateGameProgress(gameId: string, result: { success: boolean; stars: number }): GameProgress {
  const existing = loadGameProgress(gameId) || {
    gameId,
    totalSessions: 0,
    completedSessions: 0,
    bestStars: 0,
    totalStars: 0,
    lastPlayedAt: '',
  };

  const updated: GameProgress = {
    ...existing,
    totalSessions: existing.totalSessions + 1,
    completedSessions: existing.completedSessions + (result.success ? 1 : 0),
    bestStars: Math.max(existing.bestStars, result.stars),
    totalStars: existing.totalStars + result.stars,
    lastPlayedAt: new Date().toISOString(),
  };

  saveGameProgress(gameId, updated);
  return updated;
}

/**
 * Calculate XP earned from task completion
 */
export function calculateXPEarned(result: TaskResult): number {
  const baseXP = result.success ? 12 : 4;
  const starBonus = result.stars * 4;
  return baseXP + starBonus;
}
