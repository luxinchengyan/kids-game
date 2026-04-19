let activeAudio = null

function speakText(text, lang = 'zh-CN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
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
        window.setTimeout(resolve, 160)
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
      window.setTimeout(done, 180)
    } catch {
      speakText(fallbackText, lang)
      window.setTimeout(resolve, 180)
    }
  })
}

export default { playSound, stopAudio }
