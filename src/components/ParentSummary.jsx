import React, { useState } from 'react'
import { useGameStore } from '../stores/useGameStore'
import { t } from '../lib/i18n'
import { getWeakKnowledgePoints } from '../data/learningContent'

function buildSummary(profile, stats, mission, knowledge) {
  const accuracy = stats.completedTasks ? Math.round((stats.correctAnswers / stats.completedTasks) * 100) : 0
  const durationSeconds = stats.sessionStartedAt ? Math.max(45, Math.round((Date.now() - stats.sessionStartedAt) / 1000)) : mission.length * 45
  const weakPoints = getWeakKnowledgePoints(knowledge).map((unit) => unit.content)
  const weakText = weakPoints.length ? weakPoints.join(' / ') : '暂无'
  const focusName = profile.focus === 'math' ? '数学主线' : profile.focus === 'english' ? '英语主线' : profile.focus === 'stories' ? '故事主线' : profile.focus === 'mixed' ? '综合主线' : '拼音主线'
  const recommendationTarget = weakPoints[0] || '当前主线的检查点'

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
    weakPoints,
    note: `${profile.childName || '孩子'} 今天完成了 ${stats.completedTasks} 个微任务，正确率 ${accuracy}%，当前薄弱点：${weakText}。`,
    recommendation:
      accuracy >= 80
        ? `建议明天先复习 ${recommendationTarget}，然后继续推进${focusName}的新任务。`
        : `建议今天 10 分钟后先回补 ${recommendationTarget}，再用 1 个低难度任务重新建立信心。`
  }
}

export default function ParentSummary() {
  const profile = useGameStore((state) => state.profile)
  const stats = useGameStore((state) => state.stats)
  const mission = useGameStore((state) => state.mission)
  const knowledge = useGameStore((state) => state.knowledge)
  const setParentSummary = useGameStore((state) => state.setParentSummary)
  const parentSummary = useGameStore((state) => state.parentSummary)

  const [copied, setCopied] = useState(false)
  const summary = parentSummary || buildSummary(profile, stats, mission, knowledge)

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
    <section className="summary-card" data-testid="parent-summary" role="region" aria-labelledby="summary-title">
      <div className="task-head">
        <div>
          <p className="eyebrow">学习报告</p>
          <h2 id="summary-title">{t('summary_title')}</h2>
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
      <p className="summary-note">薄弱知识点：{summary.weakPoints.length ? summary.weakPoints.join(' / ') : '暂无'}</p>
      <p className="summary-recommendation">{summary.recommendation}</p>
      <div className="summary-actions">
        <button type="button" className="secondary-button" data-testid="copy-summary" onClick={handleCopy}>复制摘要</button>
        <button type="button" className="secondary-button" data-testid="download-summary" onClick={handleDownload}>下载 JSON</button>
        {copied && <span className="copy-feedback">Copied!</span>}
      </div>
    </section>
  )
}
