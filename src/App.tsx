import React, { useState } from 'react'

const options = ['b', 'p', 'm']

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'zh-CN'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

export default function App() {
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const play = () => speak('b')

  const choose = (o: string) => {
    if (locked) return
    setLocked(true)
    if (o === 'b') {
      setScore((s) => s + 1)
      setFeedback('正确 🎉')
    } else {
      setFeedback('再试一次')
    }
    setTimeout(() => {
      setFeedback(null)
      setLocked(false)
    }, 1000)
  }

  return (
    <div className="app">
      <h1>拼音学习 — 声母</h1>
      <div className="card">
        <button className="play" onClick={play} aria-label="播放发音">🔊 播放发音</button>
        <div className="choices">
          {options.map((o) => (
            <button key={o} className="choice" onClick={() => choose(o)}>
              {o}
            </button>
          ))}
        </div>
        <div className="meta">
          <div className="score">得分: {score}</div>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      </div>
    </div>
  )
}
