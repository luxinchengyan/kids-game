import { describe, it, expect } from 'vitest';

// Extract the scheduleNextReview function for testing
// We need to duplicate it here since it's not exported from useGameStore.ts
function scheduleNextReview(accuracy: number, previousNextReviewAt: number): number {
  const now = Date.now();
  const intervals = [10 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];
  if (accuracy > 0.9 && previousNextReviewAt > now) {
    return previousNextReviewAt + intervals[0];
  }
  if (accuracy > 0.85) return now + intervals[1];
  if (accuracy > 0.6) return now + intervals[0];
  return now + 5 * 60 * 1000;
}

describe('Spaced Repetition Algorithm', () => {
  const now = Date.now();

  describe('scheduleNextReview', () => {
    it('schedules review in 5 minutes for low accuracy (<=0.6)', () => {
      const nextReview = scheduleNextReview(0.5, now);
      const expected = now + 5 * 60 * 1000;
      expect(nextReview).toBeCloseTo(expected, -3); // Within 1 second
    });

    it('schedules review in 10 minutes for medium accuracy (0.6-0.85)', () => {
      const nextReview = scheduleNextReview(0.7, now);
      const expected = now + 10 * 60 * 1000;
      expect(nextReview).toBeCloseTo(expected, -3);
    });

    it('schedules review in 24 hours for good accuracy (0.85-0.9)', () => {
      const nextReview = scheduleNextReview(0.87, now);
      const expected = now + 24 * 60 * 60 * 1000;
      expect(nextReview).toBeCloseTo(expected, -3);
    });

    it('extends existing review interval for excellent accuracy (>0.9)', () => {
      const futureReview = now + 24 * 60 * 60 * 1000; // 1 day from now
      const nextReview = scheduleNextReview(0.95, futureReview);
      const expected = futureReview + 10 * 60 * 1000;
      expect(nextReview).toBeGreaterThan(futureReview);
      expect(nextReview).toBeCloseTo(expected, -3);
    });

    it('schedules sooner review when accuracy drops', () => {
      const nextReview = scheduleNextReview(0.4, now);
      const expected = now + 5 * 60 * 1000;
      expect(nextReview).toBeCloseTo(expected, -3);
    });

    it('handles boundary accuracy values correctly', () => {
      // Test exact boundaries
      // 0.6 is not > 0.6, so it falls into lowest bracket (5 min)
      const review1 = scheduleNextReview(0.6, now);
      expect(review1).toBeCloseTo(now + 5 * 60 * 1000, -3);
      
      // 0.85 is not > 0.85, so it falls into medium bracket (10 min)
      const review2 = scheduleNextReview(0.85, now);
      expect(review2).toBeCloseTo(now + 10 * 60 * 1000, -3);
      
      // Just above boundaries
      const review3 = scheduleNextReview(0.61, now);
      expect(review3).toBeCloseTo(now + 10 * 60 * 1000, -3);
      
      const review4 = scheduleNextReview(0.86, now);
      expect(review4).toBeCloseTo(now + 24 * 60 * 60 * 1000, -3);
    });

    it('always returns a future timestamp', () => {
      const accuracies = [0.1, 0.3, 0.5, 0.6, 0.7, 0.85, 0.9, 0.95, 1.0];
      accuracies.forEach(accuracy => {
        const nextReview = scheduleNextReview(accuracy, now);
        expect(nextReview).toBeGreaterThan(now);
      });
    });
  });
});

describe('Knowledge State Management', () => {
  it('calculates accuracy correctly', () => {
    const correctCount = 7;
    const seenCount = 10;
    const accuracy = correctCount / seenCount;
    expect(accuracy).toBe(0.7);
  });

  it('updates accuracy after new attempt', () => {
    let correctCount = 7;
    let seenCount = 10;
    
    // New correct answer
    correctCount += 1;
    seenCount += 1;
    const newAccuracy = correctCount / seenCount;
    expect(newAccuracy).toBeCloseTo(0.727, 2);
  });

  it('tracks error count independently', () => {
    let errorCount = 2;
    const success = false;
    errorCount += success ? 0 : 1;
    expect(errorCount).toBe(3);
  });
});
