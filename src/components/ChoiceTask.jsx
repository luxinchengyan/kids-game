import React, { useState } from 'react'
import useGameStore from '../store/gameStore'

export default function ChoiceTask({ question = 'Which is A?', options = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], correct = 'a' }){
  const [selected, setSelected] = useState(null)
  const addScore = useGameStore(state=>state.addScore)
  const pushReward = useGameStore(state=>state.pushReward)

  function choose(id){
    setSelected(id)
    if(id === correct){
      addScore(1)
      pushReward({ type: 'star', source: id })
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <h3>{question}</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        {options.map(o => (
          <button key={o.id} data-testid={`choice-${o.id}`} onClick={()=>choose(o.id)} style={{ padding: '12px 18px', borderRadius: 8 }}>
            {o.label}
          </button>
        ))}
      </div>
      {selected && selected === correct && <div style={{ marginTop: 8, color: '#2e7d32' }}>正确！</div>}
      {selected && selected !== correct && <div style={{ marginTop: 8, color: '#c62828' }}>再试一次</div>}
    </div>
  )
}
