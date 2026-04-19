import React, { useMemo, useState } from 'react'
import { playSound } from '../lib/audio'
import { t } from '../lib/i18n'

export default function MicroTask({
  task = {
    prompt: '点一点，听声母 b 的发音',
    hint: '先听，再跟着读。',
    narration: 'b',
    items: [{ id: 'b', label: 'b', subtitle: '玻璃球' }],
    targetId: 'b'
  },
  language = 'zh',
  onComplete = () => {}
}) {
  const [lastPlayed, setLastPlayed] = useState(null)
  const [feedback, setFeedback] = useState('')
  const lang = useMemo(() => (language === 'en' ? 'en-US' : 'zh-CN'), [language])

  function handlePlay(item) {
    setLastPlayed(item.id)
    setFeedback(item.id === task.targetId ? '找到了正确声音' : '继续听一听')
    playSound(`/audio/${item.id}.mp3`, { fallbackText: item.label, lang }).catch(() => {})
  }

  return (
    <section className="task-card" data-testid="microtask-card" role="region" aria-labelledby="microtask-title">
      <div className="task-head">
        <div>
          <p className="eyebrow">听音练习</p>
          <h2 id="microtask-title">{task.prompt}</h2>
        </div>
        <button className="secondary-button" type="button" onClick={() => playSound('', { fallbackText: task.narration, lang })}>
          {t('play_prompt')}
        </button>
      </div>
      <p className="task-hint">{task.hint}</p>
      <div className="choice-grid">
        {task.items.map((item) => (
          <article key={item.id} className={`learning-card ${lastPlayed === item.id ? 'is-active' : ''}`}>
            <button
              className="sound-button"
              type="button"
              data-testid={`play-${item.id}`}
              onClick={() => handlePlay(item)}
            >
              {t('replay_audio')}
            </button>
            <div className="learning-symbol">{item.label}</div>
            <div className="learning-subtitle">{item.subtitle}</div>
            <button
              className="primary-button full-width"
              type="button"
              data-testid={`select-${item.id}`}
              onClick={() => {
                const success = item.id === task.targetId
                setFeedback(success ? '太棒了，答对啦' : '这次不对，我们再试一次')
                if (success) {
                  onComplete({
                    success: true,
                    stars: 1,
                    response: item.id
                  })
                }
              }}
            >
              选这个
            </button>
          </article>
        ))}
      </div>
      <div className="task-feedback" aria-live="polite">{feedback}</div>
    </section>
  )
}
