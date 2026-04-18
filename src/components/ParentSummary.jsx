import React, { useState } from 'react'
import useGameStore from '../store/gameStore'

export default function ParentSummary(){
  const score = useGameStore(s=>s.score)
  const rounds = useGameStore(s=>s.currentRound)
  const rewards = useGameStore(s=>s.rewards)
  const setParentSummary = useGameStore(s=>s.setParentSummary)

  const [copied, setCopied] = useState(false)

  function buildSummary(){
    const summary = {
      timestamp: new Date().toISOString(),
      rounds: rounds,
      score: score,
      rewards: rewards.length,
      note: '短会话家长摘要 — 推荐 1 个家庭互动练习'
    }
    return summary
  }

  function handleCopy(){
    const json = JSON.stringify(buildSummary(), null, 2)
    if(typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(json).then(()=>{
        setCopied(true)
        setTimeout(()=>setCopied(false), 1500)
      }).catch(()=>{
        setCopied(true); setTimeout(()=>setCopied(false),1500)
      })
    }
  }

  function handleDownload(){
    const data = JSON.stringify(buildSummary(), null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `parent-summary-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleSave(){
    setParentSummary(buildSummary())
  }

  const s = buildSummary()

  return (
    <div style={{ padding: 12, borderTop: '1px solid rgba(0,0,0,0.04)', marginTop: 16 }}>
      <h3>家长摘要</h3>
      <div>本次练习时长预估：{Math.max(1, rounds) * 30} 秒</div>
      <div>得分：{s.score}，奖励：{s.rewards}</div>
      <div style={{ marginTop: 8 }}>
        <button data-testid="copy-summary" onClick={handleCopy} style={{ marginRight: 8 }}>复制摘要</button>
        <button data-testid="download-summary" onClick={handleDownload} style={{ marginRight: 8 }}>下载 JSON</button>
        <button data-testid="save-summary" onClick={handleSave}>保存到 store</button>
        {copied && <span style={{ marginLeft: 8, color: '#2e7d32' }}>Copied!</span>}
      </div>
    </div>
  )
}
