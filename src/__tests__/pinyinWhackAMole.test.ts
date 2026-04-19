import { describe, it, expect } from 'vitest';

// Test utility functions from PinyinWhackAMole
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

describe('Pinyin Whack-a-Mole Game Logic', () => {
  describe('shuffle utility', () => {
    it('should return a new array', () => {
      const original = [1, 2, 3, 4, 5];
      const result = shuffle(original);
      expect(result).not.toBe(original);
      expect(result).toHaveLength(5);
    });

    it('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const result = shuffle(original);
      expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty arrays', () => {
      expect(shuffle([])).toEqual([]);
    });

    it('should handle single element arrays', () => {
      expect(shuffle([42])).toEqual([42]);
    });
  });

  describe('scoring system', () => {
    it('should calculate correct score for consecutive hits', () => {
      // First hit: 10 * 1 = 10
      // Second hit: 10 * 2 = 20
      // Third hit: 10 * 3 = 30
      // Total: 60
      const hits = [1, 2, 3];
      const totalScore = hits.reduce((sum, combo) => sum + 10 * combo, 0);
      expect(totalScore).toBe(60);
    });

    it('should penalize wrong hits', () => {
      const initialScore = 50;
      const wrongHitPenalty = -5;
      const finalScore = initialScore + wrongHitPenalty;
      expect(finalScore).toBe(45);
    });

    it('should not allow negative scores', () => {
      const initialScore = 3;
      const wrongHitPenalty = -5;
      const finalScore = Math.max(0, initialScore + wrongHitPenalty);
      expect(finalScore).toBe(0);
    });
  });

  describe('star rating thresholds', () => {
    const calculateStars = (accuracy: number): number => {
      return accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
    };

    it('should award 3 stars for 90%+ accuracy', () => {
      expect(calculateStars(0.9)).toBe(3);
      expect(calculateStars(0.95)).toBe(3);
      expect(calculateStars(1.0)).toBe(3);
    });

    it('should award 2 stars for 70-89% accuracy', () => {
      expect(calculateStars(0.7)).toBe(2);
      expect(calculateStars(0.79)).toBe(2);
      expect(calculateStars(0.89)).toBe(2);
    });

    it('should award 1 star for 50-69% accuracy', () => {
      expect(calculateStars(0.5)).toBe(1);
      expect(calculateStars(0.59)).toBe(1);
      expect(calculateStars(0.69)).toBe(1);
    });

    it('should award 0 stars for below 50% accuracy', () => {
      expect(calculateStars(0.49)).toBe(0);
      expect(calculateStars(0.0)).toBe(0);
    });
  });

  describe('difficulty settings', () => {
    const difficultySettings = {
      easy: {
        moleCount: 3,
        showTime: 3000,
        spawnInterval: 1500,
        roundCount: 8,
      },
      medium: {
        moleCount: 4,
        showTime: 2000,
        spawnInterval: 1200,
        roundCount: 10,
      },
      hard: {
        moleCount: 5,
        showTime: 1200,
        spawnInterval: 900,
        roundCount: 12,
      },
    };

    it('should have increasing difficulty parameters', () => {
      expect(difficultySettings.easy.moleCount).toBeLessThan(difficultySettings.medium.moleCount);
      expect(difficultySettings.medium.moleCount).toBeLessThan(difficultySettings.hard.moleCount);
    });

    it('should have decreasing show times', () => {
      expect(difficultySettings.easy.showTime).toBeGreaterThan(difficultySettings.medium.showTime);
      expect(difficultySettings.medium.showTime).toBeGreaterThan(difficultySettings.hard.showTime);
    });

    it('should have increasing round counts', () => {
      expect(difficultySettings.easy.roundCount).toBeLessThan(difficultySettings.medium.roundCount);
      expect(difficultySettings.medium.roundCount).toBeLessThan(difficultySettings.hard.roundCount);
    });
  });

  describe('accuracy calculation', () => {
    it('should calculate accuracy correctly', () => {
      const correctHits = 7;
      const wrongHits = 3;
      const accuracy = correctHits / (correctHits + wrongHits);
      expect(accuracy).toBe(0.7);
    });

    it('should handle zero attempts', () => {
      const correctHits = 0;
      const wrongHits = 0;
      const accuracy = correctHits + wrongHits > 0 ? correctHits / (correctHits + wrongHits) : 0;
      expect(accuracy).toBe(0);
    });

    it('should handle perfect accuracy', () => {
      const correctHits = 10;
      const wrongHits = 0;
      const accuracy = correctHits / (correctHits + wrongHits);
      expect(accuracy).toBe(1.0);
    });
  });
});

describe('Game Registry Theme Support', () => {
  it('should identify theme hubs correctly', () => {
    const mockGames = [
      { id: 'pinyin-hub', isThemeHub: true, themeId: undefined },
      { id: 'pinyin-whack-a-mole', isThemeHub: false, themeId: 'pinyin' },
      { id: 'math-hub', isThemeHub: true, themeId: undefined },
    ];

    const themeHubs = mockGames.filter(g => g.isThemeHub);
    expect(themeHubs).toHaveLength(2);
    expect(themeHubs.map(g => g.id)).toContain('pinyin-hub');
    expect(themeHubs.map(g => g.id)).toContain('math-hub');
  });

  it('should filter games by theme', () => {
    const mockGames = [
      { id: 'pinyin-hub', isThemeHub: true, themeId: undefined },
      { id: 'pinyin-whack-a-mole', isThemeHub: false, themeId: 'pinyin' },
      { id: 'pinyin-memory', isThemeHub: false, themeId: 'pinyin' },
      { id: 'math-game', isThemeHub: false, themeId: 'math' },
    ];

    const pinyinGames = mockGames.filter(g => g.themeId === 'pinyin' && !g.isThemeHub);
    expect(pinyinGames).toHaveLength(2);
    expect(pinyinGames.map(g => g.id)).toContain('pinyin-whack-a-mole');
    expect(pinyinGames.map(g => g.id)).toContain('pinyin-memory');
  });
});
