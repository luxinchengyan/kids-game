export function playSound(path, { fallbackText } = {}) {
  return new Promise((resolve) => {
    try {
      if (path) {
        const audio = new Audio(path)
        let played = false
        audio.addEventListener('canplaythrough', () => {
          audio.play().catch(()=>{})
          played = true
          resolve()
        }, { once: true })
        audio.addEventListener('error', () => {
          // fallback to TTS
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(fallbackText || '')
            window.speechSynthesis.speak(u)
          }
          resolve()
        }, { once: true })
        // try loading; if it doesn't load quickly, still resolve after 200ms to provide visual feedback
        audio.load()
        setTimeout(() => {
          if (!played) resolve()
        }, 200)
      } else {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(fallbackText || '')
          window.speechSynthesis.speak(u)
        }
        // 200ms visual feedback guarantee
        setTimeout(resolve, 200)
      }
    } catch (e) {
      try { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(fallbackText || '')) } catch(e){}
      setTimeout(resolve, 200)
    }
  })
}

export default { playSound }
