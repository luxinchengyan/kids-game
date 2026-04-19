import React, { useEffect, useMemo, useState } from 'react'
import ChoiceTask from './components/ChoiceTask'
import MatchTask from './components/MatchTask'
import MicroTask from './components/MicroTask'
import ParentSummary from './components/ParentSummary'
import RewardToast from './components/RewardToast'
import { createMission, getCompanion } from './data/learningContent'
import { setLocale, t } from './lib/i18n'
import useGameStore from './store/gameStore'

function ProfileSetup({ profile, onSave }) {
  const [draft, setDraft] = useState(profile)

  function update(key, value) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <section className="hero-card" data-testid="profile-setup">
      <div className="hero-copy">
        <p className="eyebrow">Onboarding</p>
        <h1>{t('app_title')}</h1>
        <p>{t('app_subtitle')}</p>
      </div>
      <div className="setup-grid">
        <label>
          小朋友昵称
          <input value={draft.childName} onChange={(event) => update('childName', event.target.value)} placeholder="例如：朵朵" />
        </label>
        <label>
          年龄段
          <select value={draft.ageGroup} onChange={(event) => update('ageGroup', event.target.value)}>
            <option value="3-4">3-4 岁</option>
            <option value="4-5">4-5 岁</option>
            <option value="5-6">5-6 岁</option>
          </select>
        </label>
        <label>
          偏好主题
          <select value={draft.focus} onChange={(event) => update('focus', event.target.value)}>
            <option value="mixed">混合课程</option>
            <option value="pinyin">拼音</option>
            <option value="math">数字数学</option>
            <option value="english">英语</option>
          </select>
        </label>
        <label>
          互动角色
          <select value={draft.companion} onChange={(event) => update('companion', event.target.value)}>
            <option value="elsa">爱莎公主</option>
            <option value="paw">汪汪队队长</option>
            <option value="astro">星际探险家</option>
          </select>
        </label>
        <label>
          语言
          <select value={draft.language} onChange={(event) => update('language', event.target.value)}>
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </label>
        <label>
          性别
          <select value={draft.gender} onChange={(event) => update('gender', event.target.value)}>
            <option value="girl">女孩</option>
            <option value="boy">男孩</option>
            <option value="other">其他</option>
          </select>
        </label>
      </div>
      <button type="button" className="primary-button" data-testid="start-mission" onClick={() => onSave(draft)}>
        {t('save_profile')}
      </button>
    </section>
  )
}

function ProgressPanel({ companion, profile, stats, missionIndex, mission }) {
  const progress = mission.length ? Math.round((missionIndex / mission.length) * 100) : 0
  return (
    <aside className="progress-panel">
      <div className="companion-card">
        <p className="eyebrow">Companion</p>
        <h2>{companion.name}</h2>
        <p>{companion.tone}</p>
        <div className="companion-badge">{profile.focus === 'mixed' ? '拼音 + 数学 + 英语' : profile.focus}</div>
      </div>
      <div className="stat-grid">
        <div><strong>{stats.stars}</strong><span>累计星星</span></div>
        <div><strong>Lv.{stats.level}</strong><span>成长等级</span></div>
        <div><strong>{stats.streakDays}</strong><span>连续学习</span></div>
        <div><strong>{progress}%</strong><span>今日任务</span></div>
      </div>
      <div className="progress-rail" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="memory-note">根据记忆保留曲线，系统会建议在 10 分钟和 1 小时后再次复习同类题目。</p>
    </aside>
  )
}

function MissionStage({ task, onComplete, language }) {
  if (!task) return null
  if (task.type === 'choice') return <ChoiceTask task={task} onComplete={onComplete} />
  if (task.type === 'match') return <MatchTask task={task} onComplete={onComplete} />
  return <MicroTask task={task} onComplete={onComplete} language={language} />
}

export default function App() {
  const profile = useGameStore((state) => state.profile)
  const mission = useGameStore((state) => state.mission)
  const missionIndex = useGameStore((state) => state.missionIndex)
  const stats = useGameStore((state) => state.stats)
  const setProfile = useGameStore((state) => state.setProfile)
  const startMission = useGameStore((state) => state.startMission)
  const nextTask = useGameStore((state) => state.nextTask)
  const resetMission = useGameStore((state) => state.resetMission)
  const recordTaskResult = useGameStore((state) => state.recordTaskResult)
  const queueReward = useGameStore((state) => state.queueReward)

  const [showSummary, setShowSummary] = useState(false)
  const [sessionSeed, setSessionSeed] = useState(0)

  useEffect(() => {
    setLocale(profile.language)
  }, [profile.language])

  const companion = useMemo(() => getCompanion(profile), [profile])
  const activeTask = mission[missionIndex]
  const isMissionComplete = mission.length > 0 && missionIndex >= mission.length

  function beginMission(nextProfile = profile) {
    setProfile(nextProfile)
    const generatedMission = createMission(nextProfile)
    startMission(generatedMission)
    setShowSummary(false)
  }

  function handleTaskComplete(result) {
    if (!activeTask) return
    recordTaskResult({
      taskId: activeTask.id,
      success: result.success,
      stars: result.stars,
      skill: activeTask.skill,
      prompt: activeTask.prompt,
      responseTime: 12
    })
    queueReward({
      type: result.stars > 1 ? 'badge' : 'star',
      message: `${companion.name} 为你点亮了 ${result.stars} 颗星`,
      createdAt: Date.now()
    })
    nextTask()
  }

  function restartMission() {
    resetMission()
    setSessionSeed((value) => value + 1)
    beginMission(profile)
  }

  return (
    <div className="shell" data-session-seed={sessionSeed}>
      <RewardToast />
      <header className="app-header">
        <div>
          <p className="eyebrow">Commercial MVP</p>
          <h1>{t('app_title')}</h1>
          <p className="header-subtitle">{t('app_subtitle')}</p>
        </div>
        <button type="button" className="secondary-button" onClick={restartMission}>
          {t('restart')}
        </button>
      </header>

      {!mission.length ? (
        <ProfileSetup profile={profile} onSave={beginMission} />
      ) : (
        <main className="dashboard">
          <ProgressPanel companion={companion} profile={profile} stats={stats} missionIndex={missionIndex} mission={mission} />
          <section className="main-stage">
            <div className="mission-banner" data-testid="mission-banner">
              <div>
                <p className="eyebrow">{t('mission_ready')}</p>
                <h2>{profile.childName || '小朋友'}，和 {companion.name} 一起完成 3 个任务</h2>
              </div>
              <div className="mission-step">
                第 {Math.min(missionIndex + 1, mission.length)} / {mission.length} 题
              </div>
            </div>

            {!isMissionComplete && !showSummary ? (
              <MissionStage task={activeTask} onComplete={handleTaskComplete} language={profile.language} />
            ) : (
              <div className="completion-panel">
                <div className="completion-copy">
                  <p className="eyebrow">Finish</p>
                  <h2>今日微任务完成</h2>
                  <p>孩子已经完成本轮练习，已形成一次完整的“提示 → 互动 → 奖励 → 总结”学习闭环。</p>
                </div>
                <div className="completion-actions">
                  <button type="button" className="primary-button" data-testid="view-summary" onClick={() => setShowSummary(true)}>
                    {t('finish_session')}
                  </button>
                </div>
              </div>
            )}

            {(showSummary || isMissionComplete) ? <ParentSummary /> : null}
          </section>
        </main>
      )}
    </div>
  )
}
