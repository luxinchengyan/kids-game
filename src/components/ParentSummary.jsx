import React, { useState } from 'react'
import useGameStore from '../store/gameStore'
import { t } from '../lib/i18n'

function buildSummary(profile, stats, mission) {
  const accuracy = stats.completedTasks ? Math.round((stats.correctAnswers / stats.completedTasks) * 100) : 0
  const durationSeconds = stats.sessionStartedAt ? Math.max(45, Math.round((Date.now() - stats.sessionStartedAt) / 1000)) : mission.length * 45

  return {
    timestamp: new Date().toISOString(),
    childName: profile.childName || '小朋友',
    focus: profile.focus,
    language: profile.language,
    completedTasks: stats.completedTasks,
    accuracy,
    stars: stats.stars,
    durationSeconds,
    level: stats.level,
    note: `${profile.childName || '孩子'} 今天完成了 ${stats.completedTasks} 个微任务，正确率 ${accuracy}%，推荐在 10 分钟后复习一次最易错内容。`,
    recommendation:
      accuracy >= 80
        ? '建议明天加入一次家庭共读，巩固今天最强的知识点。'
        : '建议晚些时候做一次 1 分钟复习，按记忆曲线再次触发同类题型。'
  }
}

export default function ParentSummary() {
  const profile = useGameStore((state) => state.profile)
  const stats = useGameStore((state) => state.stats)
  const mission = useGameStore((state) => state.mission)
  const setParentSummary = useGameStore((state) => state.setParentSummary)
  const parentSummary = useGameStore((state) => state.parentSummary)

  const [copied, setCopied] = useState(false)
  const summary = parentSummary || buildSummary(profile, stats, mission)

  function handleCopy(){
    const json = JSON.stringify(summary, null, 2)
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
    const data = JSON.stringify(summary, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `parent-summary-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleSave(){
    setParentSummary(summary)
  }

  return (
    <section className="summary-card" data-testid="parent-summary">
      <div className="task-head">
        <div>
          <p className="eyebrow">Report</p>
          <h2>{t('summary_title')}</h2>
        </div>
        <button type="button" className="secondary-button" onClick={handleSave} data-testid="save-summary">
          保存摘要
        </button>
      </div>
      <div className="summary-grid">
        <div>
          <strong>{summary.completedTasks}</strong>
          <span>个任务</span>
        </div>
        <div>
          <strong>{summary.accuracy}%</strong>
          <span>正确率</span>
        </div>
        <div>
          <strong>{summary.durationSeconds}s</strong>
          <span>练习时长</span>
        </div>
        <div>
          <strong>Lv.{summary.level}</strong>
          <span>成长等级</span>
        </div>
      </div>
      <p className="summary-note">{summary.note}</p>
      <p className="summary-recommendation">{summary.recommendation}</p>
      <div className="summary-actions">
        <button type="button" className="secondary-button" data-testid="copy-summary" onClick={handleCopy}>复制摘要</button>
        <button type="button" className="secondary-button" data-testid="download-summary" onClick={handleDownload}>下载 JSON</button>
        {copied && <span className="copy-feedback">Copied!</span>}
      </div>
    </section>
  )
}
