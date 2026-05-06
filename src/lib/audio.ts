// 音频播放库
// 音频文件优先，回退到 Web Speech API TTS

let activeAudio: HTMLAudioElement | null = null;

// Complete pinyin text mapping for TTS fallback
const pinyinTextMap: Record<string, string> = {
  'b': '波',
  'p': '泼',
  'm': '摸',
  'f': '佛',
  'd': '得',
  't': '特',
  'n': '呢',
  'l': '乐',
  'g': '哥',
  'k': '科',
  'h': '喝',
  'j': '鸡',
  'q': '七',
  'x': '西',
  'zh': '知',
  'ch': '吃',
  'sh': '师',
  'r': '日',
  'z': '资',
  'c': '次',
  's': '思',
  'y': '衣',
  'w': '乌',
  'a': '啊',
  'o': '哦',
  'e': '鹅',
  'i': '衣',
  'u': '乌',
  'ü': '鱼',
  'ai': '哎',
  'ei': '诶',
  'ui': '威',
  'ao': '奥',
  'ou': '欧',
  'iu': '优',
  'ie': '耶',
  'üe': '约',
  'er': '儿',
  'an': '安',
  'en': '恩',
  'in': '因',
  'un': '温',
  'ün': '晕',
  'ang': '昂',
  'eng': '亨',
  'ing': '英',
  'ong': '翁',
  'zhi': '知',
  'chi': '吃',
  'shi': '师',
  'ri': '日',
  'zi': '资',
  'ci': '次',
  'si': '思',
  'yi': '衣',
  'wu': '乌',
  'yu': '鱼',
  'ye': '耶',
  'yue': '约',
  'yuan': '元',
  'yin': '因',
  'yun': '晕',
  'ying': '英',
  'ba': '八',
  'pa': '爬',
  'ma': '妈',
  'fa': '发',
  'da': '大',
  'ta': '他',
  'na': '那',
  'la': '拉',
  'ga': '嘎',
  'ka': '卡',
  'ha': '哈',
  'jia': '家',
  'qia': '恰',
  'xia': '下',
  'zha': '炸',
  'cha': '茶',
  'sha': '沙',
  'za': '杂',
  'ca': '擦',
  'sa': '撒',
  'ya': '呀',
  'wa': '哇',
  'bo': '波',
  'po': '坡',
  'mo': '摸',
  'fo': '佛',
  'bi': '笔',
  'pi': '皮',
  'mi': '米',
  'ti': '题',
  'li': '里',
  'tu': '兔',
  'he': '喝',
  'na': '那',
  'le': '乐',
  'ge': '哥',
  'ke': '科',
  'ga': '嘎',
  'ka': '卡',
  'ha': '哈',
  'lu': '路',
  'nu': '怒',
  'ju': '居',
  'qu': '区',
  'xu': '虚'
};

/**
 * 将拼音字母映射为发音接近的汉字，优化 TTS 朗读效果
 */
export function getPinyinSpeechText(text: string): string {
  return pinyinTextMap[text.toLowerCase()] || text;
}

export function speak(text: string, lang: 'zh-CN' | 'en-US' = 'zh-CN'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  try {
    const utterance = new SpeechSynthesisUtterance(getPinyinSpeechText(text));
    utterance.lang = lang;
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis not available');
  }
}

export function stopAudio(): void {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function playSound(
  path: string,
  options?: { fallbackText?: string; lang?: 'zh-CN' | 'en-US' }
): Promise<void> {
  return new Promise((resolve) => {
    try {
      stopAudio();
      
      const { fallbackText, lang = 'zh-CN' } = options || {};
      
      if (!path) {
        speak(fallbackText || '', lang);
        window.setTimeout(resolve, 500);
        return;
      }

      const audioElement = new window.Audio(path);
      activeAudio = audioElement;
      let settled = false;

      const done = () => {
        if (!settled) {
          settled = true;
          resolve();
        }
      };

      audioElement.addEventListener(
        'canplaythrough',
        () => {
          audioElement.play().catch(() => speak(fallbackText || '', lang));
          done();
        },
        { once: true }
      );

      audioElement.addEventListener(
        'error',
        () => {
          speak(fallbackText || '', lang);
          done();
        },
        { once: true }
      );

      audioElement.load();
      window.setTimeout(done, 600);
    } catch {
      if (options?.fallbackText) {
        speak(options.fallbackText, options.lang || 'zh-CN');
      }
      window.setTimeout(resolve, 600);
    }
  });
}

export async function playAudio(url: string, fallbackText?: string): Promise<void> {
  return playSound(url, { fallbackText });
}

/**
 * 播放成功/正确的语音提示
 */
export function playSuccess(): void {
  const praises = ['太棒了！', '你真厉害！', '答对啦！', '真聪明！'];
  const text = praises[Math.floor(Math.random() * praises.length)];
  speak(text);
}

/**
 * 播放失败/错误的语音提示
 */
export function playError(): void {
  const encouragements = ['没关系，再试一次吧', '加油，再想一想', '差一点点就对啦'];
  const text = encouragements[Math.floor(Math.random() * encouragements.length)];
  speak(text);
}

export const Audio = {
  speak,
  play: playAudio,
  playSound,
  stopAudio,
  playSuccess,
  playError,
};

export default Audio;
