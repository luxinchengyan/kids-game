import React, { useState, useMemo } from 'react'
import useGameStore from '../store/gameStore'
import { createDragSession, enableDragStart, handleDrop, tolerantMatcher } from '../lib/dragdrop'

function shuffle(arr){
  return arr.map(v=>({v, r:Math.random()})).sort((a,b)=>a.r-b.r).map(a=>a.v)
}

export default function MatchTask({ pairs = [{ id: 'a', label: '🍎' }, { id: 'b', label: '🍌' }] }){
  const [matches, setMatches] = useState({})
  const [selected, setSelected] = useState(null)
  const addScore = useGameStore(state=>state.addScore)
  const pushReward = useGameStore(state=>state.pushReward)

  const left = useMemo(()=>shuffle(pairs),[pairs])
  const right = useMemo(()=>shuffle(pairs),[pairs])

  const session = useMemo(()=>createDragSession((id, target)=>{
    setMatches(m=>({ ...m, [target]: id }))
    addScore(1)
    pushReward({ type: 'star', source: id })
  }), [addScore, pushReward])

  function onDragStart(e,id){
    enableDragStart(e,id)
  }

  function onDrop(e, targetId){
    const ok = handleDrop(e, targetId, session, tolerantMatcher)
    if(!ok){
      // visual feedback could be added here
    }
  }

  function onDragKey(e, id){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault()
      setSelected(id)
    }
  }

  function onDropKey(e, targetId){
    if((e.key === 'Enter' || e.key === ' ') && selected){
      e.preventDefault()
      // attempt match
      if(tolerantMatcher(selected, targetId)){
        session.recordMatch(selected, targetId)
        setSelected(null)
      } else {
        // mismatch feedback
      }
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <h3>配对任务（拖拽或键盘选择）</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          {left.map(it => (
            <div key={it.id} draggable onDragStart={(e)=>onDragStart(e,it.id)} data-testid={`drag-${it.id}`} role="button" tabIndex={0} aria-pressed={selected===it.id} onKeyDown={(e)=>onDragKey(e,it.id)} style={{ padding: 12, margin: 6, background: '#fff', borderRadius: 8, cursor: 'grab' }}>
              <div style={{ fontSize: 28 }}>{it.label}</div>
            </div>
          ))}
        </div>
        <div>
          {right.map(t => (
            <div key={t.id} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e,t.id)} data-testid={`drop-${t.id}`} role="region" tabIndex={0} aria-label={`drop target ${t.id}`} onKeyDown={(e)=>onDropKey(e,t.id)} style={{ padding: 16, margin: 6, minHeight: 64, background: matches[t.id] ? '#e8f5e9' : '#f7f7f7', borderRadius: 8 }}>
              <div style={{ fontSize: 18 }}>{t.label}</div>
              {matches[t.id] && <div style={{ color: '#2e7d32' }}>已配对</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
