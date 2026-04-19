import React, { useMemo, useState } from 'react'
import { createDragSession, enableDragStart, handleDrop, tolerantMatcher } from '../lib/dragdrop'

function shuffle(list) {
  return list
    .map((value) => ({ value, rank: Math.random() }))
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => entry.value)
}

export default function MatchTask({
  task = {
    prompt: '配对任务',
    hint: '拖一拖，完成配对。',
    pairs: [{ id: 'a', left: 'A', right: '🍎' }, { id: 'b', left: 'B', right: '🍌' }]
  },
  onComplete = () => {}
}) {
  const [matches, setMatches] = useState({})
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')

  const left = useMemo(() => shuffle(task.pairs), [task.pairs])
  const right = useMemo(() => shuffle(task.pairs), [task.pairs])

  const session = useMemo(
    () =>
      createDragSession((id, target) => {
        setMatches((current) => {
          const next = { ...current, [target]: id }
          if (Object.keys(next).length === task.pairs.length) {
            onComplete({
              success: true,
              stars: 2,
              response: next
            })
          }
          return next
        })
        setFeedback('配对成功，继续完成剩下的卡片')
      }),
    [onComplete, task.pairs.length]
  )

  function onDragKey(event, id) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelected(id)
      setFeedback('已选中卡片，移动到目标框按回车')
    }
  }

  function onSelectChip(id) {
    setSelected(id)
    setFeedback('已选中卡片，请点击正确的目标框')
  }

  function assignSelected(targetId) {
    if (!selected) return
    if (tolerantMatcher(selected, targetId)) {
      session.recordMatch(selected, targetId)
      setSelected(null)
    } else {
      setFeedback('这组还不对')
    }
  }

  function onDropKey(event, targetId) {
    if ((event.key === 'Enter' || event.key === ' ') && selected) {
      event.preventDefault()
      assignSelected(targetId)
    }
  }

  return (
    <section className="task-card" data-testid="match-card">
      <p className="eyebrow">Match</p>
      <h2>{task.prompt}</h2>
      <p className="task-hint">{task.hint}</p>
      <div className="match-board">
        <div className="match-column">
          {left.map((pair) => (
            <button
              key={pair.id}
              type="button"
              draggable
              onDragStart={(event) => enableDragStart(event, pair.id)}
              data-testid={`drag-${pair.id}`}
              onKeyDown={(event) => onDragKey(event, pair.id)}
              onClick={() => onSelectChip(pair.id)}
              className={`match-chip ${selected === pair.id ? 'is-selected' : ''}`}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="match-column">
          {right.map((pair) => (
            <div
              key={pair.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const ok = handleDrop(event, pair.id, session, tolerantMatcher)
                setFeedback(ok ? '配对成功' : '这里不对，再试试')
              }}
              onClick={() => assignSelected(pair.id)}
              data-testid={`drop-${pair.id}`}
              role="button"
              tabIndex={0}
              aria-label={`drop target ${pair.id}`}
              onKeyDown={(event) => onDropKey(event, pair.id)}
              className={`match-drop ${matches[pair.id] ? 'is-filled' : ''}`}
            >
              <span>{pair.right}</span>
              <strong>{matches[pair.id] ? '已配对' : '放这里'}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="task-feedback" aria-live="polite">{feedback}</div>
    </section>
  )
}
