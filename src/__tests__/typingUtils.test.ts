import { describe, expect, it } from 'vitest';
import {
  calculateTypingStars,
  displayPromptText,
  normalizeTypingKey,
} from '../games/typing/typingUtils';

describe('typing helpers', () => {
  it('normalizes letters and spacebar input', () => {
    expect(normalizeTypingKey('a')).toBe('A');
    expect(normalizeTypingKey('Z')).toBe('Z');
    expect(normalizeTypingKey(' ')).toBe('SPACE');
    expect(normalizeTypingKey('Space')).toBe('SPACE');
    expect(normalizeTypingKey(';')).toBeNull();
  });

  it('formats prompt text for kid-friendly display', () => {
    expect(displayPromptText('HI AI')).toBe('HI ␣ AI');
  });

  it('scores strong accuracy and completion with more stars', () => {
    expect(calculateTypingStars(0.96, 1)).toBe(3);
    expect(calculateTypingStars(0.78, 0.8)).toBe(2);
    expect(calculateTypingStars(0.45, 0.5)).toBe(1);
  });
});
