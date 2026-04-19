const locales = {
  zh: {
    app_title: '星光学习岛',
    app_subtitle: '3 到 6 岁儿童的沉浸式微任务学习',
    start_mission: '开始今日任务',
    mission_ready: '今日任务已准备好',
    reward_star: '✨ +1 星',
    reward_badge: '🏅 解锁贴纸',
    summary_title: '家长摘要',
    save_profile: '保存设置',
    restart: '重新生成任务',
    complete: '完成',
    next_task: '下一题',
    finish_session: '查看总结',
    replay_audio: '再听一次',
    play_prompt: '播放提示'
  },
  en: {
    app_title: 'Star Learning Island',
    app_subtitle: 'Immersive bite-sized learning for ages 3 to 6',
    start_mission: 'Start today mission',
    mission_ready: 'Today mission is ready',
    reward_star: '✨ +1 star',
    reward_badge: '🏅 Sticker unlocked',
    summary_title: 'Parent Summary',
    save_profile: 'Save settings',
    restart: 'Create new mission',
    complete: 'Complete',
    next_task: 'Next task',
    finish_session: 'View summary',
    replay_audio: 'Play again',
    play_prompt: 'Play prompt'
  }
}

let current = 'zh'

export function setLocale(locale) {
  if (locales[locale]) current = locale
}

export function t(key) {
  return locales[current]?.[key] || key
}

export default { setLocale, t }
