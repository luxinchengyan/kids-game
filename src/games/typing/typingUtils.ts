export const TYPING_KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['SPACE'],
] as const;

export function normalizeTypingKey(key: string): string | null {
  if (!key) {
    return null;
  }

  if (key === ' ' || key === 'Space' || key === 'Spacebar') {
    return 'SPACE';
  }

  const normalized = key.toUpperCase();
  return /^[A-Z]$/.test(normalized) ? normalized : null;
}

export function displayTypingKey(key: string) {
  return key === 'SPACE' ? 'Space' : key;
}

export function displayPromptText(text: string) {
  return text.replaceAll(' ', ' ␣ ');
}

export function calculateTypingStars(accuracy: number, completionRate = 1) {
  const score = accuracy * 0.7 + completionRate * 0.3;

  if (score >= 0.9) {
    return 3;
  }

  if (score >= 0.72) {
    return 2;
  }

  return 1;
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
