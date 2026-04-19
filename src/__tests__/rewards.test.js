import { describe, it, expect } from 'vitest';
import {
  calculateStarsEarned,
  checkAchievements,
  getLevelProgress,
  getUnlockedPets,
  getUnlockedBuildings,
  achievements
} from '../data/rewards';

describe('Reward System', () => {
  describe('calculateStarsEarned', () => {
    it('returns 0 stars for failed task', () => {
      expect(calculateStarsEarned({ success: false })).toBe(0);
      expect(calculateStarsEarned({ success: false, accuracy: 1 })).toBe(0);
    });

    it('returns 3 stars for high accuracy (>=0.9)', () => {
      expect(calculateStarsEarned({ success: true, accuracy: 1 })).toBe(3);
      expect(calculateStarsEarned({ success: true, accuracy: 0.9 })).toBe(3);
      expect(calculateStarsEarned({ success: true, accuracy: 0.95 })).toBe(3);
    });

    it('returns 2 stars for medium accuracy (>=0.7)', () => {
      expect(calculateStarsEarned({ success: true, accuracy: 0.7 })).toBe(2);
      expect(calculateStarsEarned({ success: true, accuracy: 0.8 })).toBe(2);
      expect(calculateStarsEarned({ success: true, accuracy: 0.89 })).toBe(2);
    });

    it('returns 1 star for low accuracy (<0.7)', () => {
      expect(calculateStarsEarned({ success: true, accuracy: 0.5 })).toBe(1);
      expect(calculateStarsEarned({ success: true, accuracy: 0.69 })).toBe(1);
    });

    it('defaults accuracy to 1 if not provided', () => {
      expect(calculateStarsEarned({ success: true })).toBe(3);
    });
  });

  describe('checkAchievements', () => {
    it('returns empty array when no achievements unlocked', () => {
      const stats = { stars: 0, completedTasks: 0, streakDays: 0, level: 1 };
      const history = [];
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements).toEqual([]);
    });

    it('detects first_star achievement', () => {
      const stats = { stars: 1, completedTasks: 0, streakDays: 0, level: 1 };
      const history = [];
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'first_star')).toBe(true);
    });

    it('detects first_task achievement', () => {
      const stats = { stars: 0, completedTasks: 1, streakDays: 0, level: 1 };
      const history = [];
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'first_task')).toBe(true);
    });

    it('detects streak achievements', () => {
      const stats = { stars: 0, completedTasks: 0, streakDays: 7, level: 1 };
      const history = [];
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'streak_3')).toBe(true);
      expect(newAchievements.some(a => a.id === 'streak_7')).toBe(true);
    });

    it('does not return already unlocked achievements', () => {
      const stats = { stars: 1, completedTasks: 0, streakDays: 0, level: 1 };
      const history = [];
      const unlocked = ['first_star'];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'first_star')).toBe(false);
    });

    it('detects perfect_10 achievement with 10 consecutive correct answers', () => {
      const stats = { stars: 0, completedTasks: 10, streakDays: 0, level: 1 };
      const history = Array(10).fill(null).map((_, i) => ({
        taskId: `task_${i}`,
        success: true,
        completedAt: new Date().toISOString()
      }));
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'perfect_10')).toBe(true);
    });

    it('does not trigger perfect_10 with less than 10 correct answers', () => {
      const stats = { stars: 0, completedTasks: 9, streakDays: 0, level: 1 };
      const history = Array(9).fill(null).map((_, i) => ({
        taskId: `task_${i}`,
        success: true,
        completedAt: new Date().toISOString()
      }));
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'perfect_10')).toBe(false);
    });

    it('detects pinyin_master achievement', () => {
      const stats = { stars: 0, completedTasks: 10, streakDays: 0, level: 1 };
      const history = Array(10).fill(null).map((_, i) => ({
        taskId: `task_${i}`,
        skill: 'pinyin',
        success: true,
        completedAt: new Date().toISOString()
      }));
      const unlocked = [];

      const newAchievements = checkAchievements(stats, history, unlocked);
      expect(newAchievements.some(a => a.id === 'pinyin_master')).toBe(true);
    });
  });

  describe('getLevelProgress', () => {
    it('calculates level 1 for 0 XP', () => {
      const progress = getLevelProgress(0);
      expect(progress.level).toBe(1);
      expect(progress.progress).toBe(0);
    });

    it('calculates level 2 for 60 XP', () => {
      const progress = getLevelProgress(60);
      expect(progress.level).toBe(2);
      expect(progress.progress).toBe(0);
    });

    it('calculates 50% progress for 30 XP at level 1', () => {
      const progress = getLevelProgress(30);
      expect(progress.level).toBe(1);
      expect(progress.progress).toBe(0.5);
    });

    it('calculates correct progress for various XP values', () => {
      expect(getLevelProgress(120).level).toBe(3);
      expect(getLevelProgress(180).level).toBe(4);
      expect(getLevelProgress(59).level).toBe(1);
      expect(getLevelProgress(59).progress).toBeCloseTo(0.983, 2);
    });

    it('ensures minimum level is 1', () => {
      expect(getLevelProgress(-10).level).toBe(1);
    });
  });

  describe('getUnlockedPets', () => {
    it('returns empty array with no achievements', () => {
      const pets = getUnlockedPets([]);
      expect(pets).toEqual([]);
    });

    it('unlocks dog with first_star achievement', () => {
      const pets = getUnlockedPets(['first_star']);
      expect(pets.some(p => p.id === 'dog')).toBe(true);
    });

    it('unlocks multiple pets with multiple achievements', () => {
      const pets = getUnlockedPets(['first_star', 'streak_3', 'level_5']);
      expect(pets.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getUnlockedBuildings', () => {
    it('returns only shop at level 1', () => {
      const buildings = getUnlockedBuildings(1);
      expect(buildings.some(b => b.id === 'shop')).toBe(true);
      expect(buildings.some(b => b.id === 'school')).toBe(false);
    });

    it('unlocks more buildings at higher levels', () => {
      const buildings = getUnlockedBuildings(5);
      expect(buildings.some(b => b.id === 'park')).toBe(true);
      expect(buildings.length).toBeGreaterThanOrEqual(3);
    });

    it('unlocks all buildings at level 10', () => {
      const buildings = getUnlockedBuildings(10);
      expect(buildings.length).toBe(5);
    });
  });
});
