import React, { useMemo, useState } from 'react'
import { playSound } from '../lib/audio'

export default function PinyinBattle({ task, language = 'zh', onComplete = () => {} }) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [monsterHp, setMonsterHp] = useState(3)
  const lang = useMemo(() => (language === 'en' ? 'en-US' : 'zh-CN'), [language])

  function attack(optionId) {
    setSelected(optionId)
    const success = optionId === task.correct
    if (success) {
      const nextHp = Math.max(0, monsterHp - 3)
      setMonsterHp(nextHp)
      setFeedback(task.reviewMode ? '复习命中，记忆更牢了' : '命中怪物，继续前进')
      onComplete({
        success: true,
        stars: task.reviewMode ? 1 : 2,
        response: optionId
      })
    } else {
      setFeedback(`这个音容易和 ${task.correct} 混淆，再听一遍`)
    }
  }

  return (
    <section className="task-card battle-card" data-testid="battle-card">
      <div className="task-head">
        <div>
          <p className="eyebrow">{task.reviewMode ? 'Review Battle' : 'Pinyin Battle'}</p>
          <h2>{task.prompt}</h2>
        </div>
        <button
          type="button"
          className="secondary-button"
          data-testid={`play-${task.answer}`}
          onClick={() => playSound(`/audio/${task.answer}.mp3`, { fallbackText: task.answer, lang })}
        >
          再听一次
        </button>
      </div>
      <div className="battle-stage">
        <div className="battle-copy">
          <p className="task-hint">{task.hint}</p>
          <div className="question-box battle-question">{task.question}</div>
          <div className="battle-options">
            {task.options.map((option) => (
              <button
                key={option.id}
                type="button"
                data-testid={`battle-${option.id}`}
                className={`option-button battle-option ${selected === option.id ? 'is-selected' : ''}`}
                onClick={() => attack(option.id)}
              >
                {task.attackLabel} {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="monster-panel">
          <div className="monster-avatar">👾</div>
          <strong>{task.monster}</strong>
          <div className="monster-hp">
            <div className="monster-hp-fill" style={{ width: `${(monsterHp / 3) * 100}%` }} />
          </div>
          <span>{monsterHp === 0 ? '已击败' : `生命值 ${monsterHp}/3`}</span>
        </div>
      </div>
      <div className="task-feedback" aria-live="polite">{feedback}</div>
    </section>
  )
}
