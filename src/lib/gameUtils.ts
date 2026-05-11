/**
 * Shared lightweight utilities used across game modules.
 * Kept separate so heavy game framework files (WhackAMole, etc.)
 * don't need to be fully loaded just to access these helpers.
 */

/** Fisher-Yates shuffle */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Web Speech API TTS helper */
export function defaultSpeakText(text: string, lang: string = 'zh-CN') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}
