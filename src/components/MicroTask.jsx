import React, { useState } from 'react';

export default function MicroTask({ items = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] }) {
  const [lastPlayed, setLastPlayed] = useState(null);
  const [reward, setReward] = useState(false);

  function handlePlay(id) {
    // In a real app this would play a short audio clip.
    setLastPlayed(id);
    setReward(true);
    setTimeout(() => setReward(false), 800);
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

      {/* reward */}
      {reward && (
        <div data-testid="reward" style={{ position: 'fixed', right: 20, top: 20, background: '#fff3e0', padding: 10, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}>
          ✨ +1 星
        </div>
      )}
    </div>
  );
}
