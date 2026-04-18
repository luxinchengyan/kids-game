import React, { useState } from 'react'
import useGameStore from '../store/gameStore'
import { playSound } from '../lib/audio'

export default function MicroTask({ items = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] }) {
  const [lastPlayed, setLastPlayed] = useState(null)
  const pushReward = useGameStore(state => state.pushReward)

  function handlePlay(id) {
    setLastPlayed(id)
    // global reward
    pushReward({ type: 'star', source: id })
    // attempt to play an audio file in public/audio/<id>.mp3, fallback to TTS inside playSound
    playSound(`/audio/${id}.mp3`, { fallbackText: id }).catch(()=>{})
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 12 }}>
      <h2 style={{ color: '#2b6ef6' }}>MicroTask — 点击听音</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ borderRadius: 12, padding: 12, background: '#fff7f0', width: 120, textAlign: 'center', boxShadow: '0 6px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{it.label}</div>
            <button data-testid={`play-${it.id}`} onClick={() => handlePlay(it.id)} style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#ffb74d', border: 'none', cursor: 'pointer' }}>
              Play
            </button>
            {lastPlayed === it.id && (
              <div aria-live="polite" style={{ marginTop: 8, color: '#2e7d32' }}>Playing…</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
