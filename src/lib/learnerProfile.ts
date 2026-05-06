import type { Child } from '../types';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export function getEffectiveChildAge(child?: Pick<Child, 'inferredAge' | 'age'> | null): number {
  return child?.inferredAge ?? child?.age ?? 5;
}

export function getRecommendedDifficulty(
  child?: Pick<Child, 'inferredDifficulty'> | null,
  fallback: DifficultyLevel = 'easy'
): DifficultyLevel {
  return child?.inferredDifficulty ?? fallback;
}
