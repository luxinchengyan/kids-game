// 音频播放库
// 音频文件优先，回退到 Web Speech API TTS

export function speak(text: string, lang: 'zh-CN' | 'en-US' = 'zh-CN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis not available');
  }
}

export async function playAudio(url: string, fallbackText?: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const AudioClass = (window as any).Audio;
      if (!AudioClass) {
        if (fallbackText) speak(fallbackText);
        resolve();
        return;
      }
      
      const audio = new AudioClass(url);
      audio.onended = () => resolve();
      audio.onerror = () => {
        if (fallbackText) {
          speak(fallbackText);
        }
        resolve();
      };
      audio.play().catch(() => {
        if (fallbackText) {
          speak(fallbackText);
        }
        resolve();
      });
    } catch {
      if (fallbackText) {
        speak(fallbackText);
      }
      resolve();
    }
  });
}

export const Audio = {
  speak,
  play: playAudio,
};

export default Audio;
