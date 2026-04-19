// 简体中文文案表（产品仅面向中国大陆市场）
const zhTranslations = {
  app_title: '童梦乐园',
  app_subtitle: '面向 3～6 岁家庭的拼音、数学、英语与传统文化启蒙互动学习',
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
}

export function t(key) {
  return zhTranslations[key] || key
}

export default { t }
