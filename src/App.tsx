import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ALL_INITIALS = ['b', 'p', 'm', 'f', 'd']
const SCORE_KEY = 'kids-game-score'

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'zh-CN'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [score, setScore] = useState<number>(0)
  const [locked, setLocked] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string>('b')
  const [choices, setChoices] = useState<string[]>(['b','p','m'])
  const [showStar, setShowStar] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCORE_KEY)
      if (raw) setScore(Number(raw))
    } catch (e) {
      // ignore
    }
    nextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(SCORE_KEY, String(score))
    } catch (e) {
      // ignore
    }
  }, [score])

  function play(target: string) {
    const audioPath = `/audio/${target}.mp3`
    if (!audioRef.current) audioRef.current = new Audio()
    audioRef.current.src = audioPath
    audioRef.current.play().catch(() => {
      // fallback to TTS
      speak(target)
    })
  }

  function nextQuestion() {
    const target = ALL_INITIALS[Math.floor(Math.random() * ALL_INITIALS.length)]
    const others = ALL_INITIALS.filter((x) => x !== target)
    const picks = shuffle(others).slice(0, 2)
    const opts = shuffle([target, ...picks])
    setAnswer(target)
    setChoices(opts)
  }

  const choose = (o: string) => {
    if (locked) return
    setLocked(true)
    if (o === answer) {
      setScore((s) => s + 1)
      setFeedback('正确 🎉')
      setShowStar(true)
      setTimeout(() => setShowStar(false), 800)
      setTimeout(() => {
        setFeedback(null)
        setLocked(false)
        nextQuestion()
      }, 800)
    } else {
      setFeedback('再试一次')
      setTimeout(() => {
        setFeedback(null)
        setLocked(false)
      }, 800)
    }
  }

  return (
    <div className="app">
      <h1>拼音学习 — 声母</h1>
      <div className="card">
        <button className="play" onClick={() => play(answer)} aria-label="播放发音">🔊 播放发音</button>
        <div className="choices">
          {choices.map((o) => (
            <button key={o} className="choice" onClick={() => choose(o)}>
              {o}
            </button>
          ))}
        </div>
        <div className="meta">
          <div className="score">得分: {score}</div>
          {feedback && (
            <motion.div key={feedback} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className="feedback">
              {feedback}
            </motion.div>
          )}
        </div>
        {showStar && (
          <motion.div className="star" initial={{ scale: 0 }} animate={{ scale: 1.6, rotate: 20 }} transition={{ duration: 0.5 }}>
            ⭐
          </motion.div>
        )}
      </div>
    </div>
  )
}
