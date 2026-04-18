import React, { useState, useMemo } from 'react'
import useGameStore from '../store/gameStore'

function shuffle(arr){
  return arr.map(v=>({v, r:Math.random()})).sort((a,b)=>a.r-b.r).map(a=>a.v)
}

export default function MatchTask({ pairs = [{ id: 'a', label: '🍎' }, { id: 'b', label: '🍌' }] }){
  const [matches, setMatches] = useState({})
  const addScore = useGameStore(state=>state.addScore)
  const pushReward = useGameStore(state=>state.pushReward)

  const left = useMemo(()=>shuffle(pairs),[pairs])
  const right = useMemo(()=>shuffle(pairs),[pairs])

  function onDragStart(e,id){
    e.dataTransfer.setData('text/plain', id)
  }

  function onDrop(e, targetId){
    const id = e.dataTransfer.getData('text/plain')
    e.preventDefault()
    if(!id) return
    if(id === targetId && !matches[targetId]){
      setMatches(m=>({ ...m, [targetId]: id }))
      addScore(1)
      pushReward({ type: 'star', source: id })
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <h3>配对任务（拖拽配对）</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          {left.map(it => (
            <div key={it.id} draggable onDragStart={(e)=>onDragStart(e,it.id)} data-testid={`drag-${it.id}`} style={{ padding: 12, margin: 6, background: '#fff', borderRadius: 8, cursor: 'grab' }}>
              <div style={{ fontSize: 28 }}>{it.label}</div>
            </div>
          ))}
        </div>
        <div>
          {right.map(t => (
            <div key={t.id} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e,t.id)} data-testid={`drop-${t.id}`} style={{ padding: 16, margin: 6, minHeight: 64, background: matches[t.id] ? '#e8f5e9' : '#f7f7f7', borderRadius: 8 }}>
              <div style={{ fontSize: 18 }}>{t.label}</div>
              {matches[t.id] && <div style={{ color: '#2e7d32' }}>已配对</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
