import React, { useState } from 'react'

export default function ChoiceTask({
  task = {
    prompt: 'Which is A?',
    hint: 'Pick the correct answer.',
    question: 'Which is A?',
    options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }],
    correct: 'a'
  },
  onComplete = () => {}
}) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')

  function choose(id) {
    setSelected(id)
    const success = id === task.correct
    setFeedback(success ? '答对了，继续前进' : '再试一次，我们一起做')
    if (success) {
      onComplete({
        success: true,
        stars: 1,
        response: id
      })
    }
  }

  return (
    <section className="task-card" data-testid="choice-card">
      <p className="eyebrow">Choice</p>
      <h2>{task.prompt}</h2>
      <p className="task-hint">{task.hint}</p>
      <div className="question-box">{task.question}</div>
      <div className="choice-grid compact">
        {task.options.map((option) => (
          <button
            key={option.id}
            type="button"
            data-testid={`choice-${option.id}`}
            className={`option-button ${selected === option.id ? 'is-selected' : ''}`}
            onClick={() => choose(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="task-feedback" aria-live="polite">{feedback}</div>
    </section>
  )
}
