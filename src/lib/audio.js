let activeAudio = null

const pinyinTextMap = {
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
  'li': '里'
}

function getPinyinSpeechText(text) {
  if (pinyinTextMap[text]) {
    return pinyinTextMap[text]
  }
  return text
}

function speakText(text, lang = 'zh-CN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return
  const utterance = new SpeechSynthesisUtterance(getPinyinSpeechText(text))
  utterance.lang = lang
  utterance.rate = 0.7
  utterance.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export function stopAudio() {
  if (activeAudio) {
    activeAudio.pause()
    activeAudio.currentTime = 0
    activeAudio = null
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function playSound(path, { fallbackText, lang = 'zh-CN' } = {}) {
  return new Promise((resolve) => {
    try {
      stopAudio()
      if (!path) {
        speakText(fallbackText, lang)
        window.setTimeout(resolve, 500)
        return
      }

      const audio = new Audio(path)
      activeAudio = audio
      let settled = false

      const done = () => {
        if (!settled) {
          settled = true
          resolve()
        }
      }

      audio.addEventListener(
        'canplaythrough',
        () => {
          audio.play().catch(() => speakText(fallbackText, lang))
          done()
        },
        { once: true }
      )

      audio.addEventListener(
        'error',
        () => {
          speakText(fallbackText, lang)
          done()
        },
        { once: true }
      )

      audio.load()
      window.setTimeout(done, 600)
    } catch {
      speakText(fallbackText, lang)
      window.setTimeout(resolve, 600)
    }
  })
}

export default { playSound, stopAudio }
