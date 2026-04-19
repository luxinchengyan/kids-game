export const rewardTypes = {
  STAR: 'star',
  BADGE: 'badge',
  TROPHY: 'trophy',
  PET: 'pet',
  ITEM: 'item',
  BUILDING: 'building',
  ACHIEVEMENT: 'achievement'
}

export const achievements = [
  {
    id: 'first_star',
    name: '第一颗星',
    description: '获得第一颗星星',
    icon: '⭐',
    condition: (stats) => stats.stars >= 1,
    reward: { type: rewardTypes.STAR, amount: 1 }
  },
  {
    id: 'first_task',
    name: '初次冒险',
    description: '完成第一个任务',
    icon: '🎯',
    condition: (stats) => stats.completedTasks >= 1,
    reward: { type: rewardTypes.STAR, amount: 3 }
  },
  {
    id: 'streak_3',
    name: '连续三天',
    description: '连续学习3天',
    icon: '🔥',
    condition: (stats) => stats.streakDays >= 3,
    reward: { type: rewardTypes.BADGE, id: 'streak_badge_3' }
  },
  {
    id: 'streak_7',
    name: '周冠军',
    description: '连续学习7天',
    icon: '🏆',
    condition: (stats) => stats.streakDays >= 7,
    reward: { type: rewardTypes.TROPHY, id: 'weekly_champion' }
  },
  {
    id: 'pinyin_master',
    name: '拼音大师',
    description: '完成10个拼音任务',
    icon: '📚',
    condition: (stats, history) => {
      const pinyinCount = history.filter(h => h.skill === 'pinyin').length
      return pinyinCount >= 10
    },
    reward: { type: rewardTypes.BADGE, id: 'pinyin_master' }
  },
  {
    id: 'math_whiz',
    name: '数学小天才',
    description: '完成10个数学任务',
    icon: '🧮',
    condition: (stats, history) => {
      const mathCount = history.filter(h => h.skill === 'math').length
      return mathCount >= 10
    },
    reward: { type: rewardTypes.BADGE, id: 'math_whiz' }
  },
  {
    id: 'english_star',
    name: '英语之星',
    description: '完成10个英语任务',
    icon: '🇬🇧',
    condition: (stats, history) => {
      const englishCount = history.filter(h => h.skill === 'english').length
      return englishCount >= 10
    },
    reward: { type: rewardTypes.BADGE, id: 'english_star' }
  },
  {
    id: 'level_5',
    name: '升级达人',
    description: '达到5级',
    icon: '⬆️',
    condition: (stats) => stats.level >= 5,
    reward: { type: rewardTypes.TROPHY, id: 'level_5' }
  },
  {
    id: 'perfect_10',
    name: '完美十题',
    description: '连续答对10题',
    icon: '💯',
    condition: (stats, history) => {
      const recent = history.slice(-10)
      return recent.length >= 10 && recent.every(h => h.success)
    },
    reward: { type: rewardTypes.ACHIEVEMENT, id: 'perfect_10' }
  },
  {
    id: 'hundred_stars',
    name: '百星达人',
    description: '累计获得100颗星星',
    icon: '🌟',
    condition: (stats) => stats.stars >= 100,
    reward: { type: rewardTypes.PET, id: 'golden_dragon' }
  }
]

export const pets = [
  { id: 'dog', name: '小狗', emoji: '🐕', rarity: 'common', unlockCondition: 'first_star' },
  { id: 'cat', name: '小猫', emoji: '🐱', rarity: 'common', unlockCondition: 'streak_3' },
  { id: 'rabbit', name: '小兔子', emoji: '🐰', rarity: 'uncommon', unlockCondition: 'level_5' },
  { id: 'panda', name: '熊猫', emoji: '🐼', rarity: 'rare', unlockCondition: 'streak_7' },
  { id: 'dragon', name: '小龙', emoji: '🐲', rarity: 'legendary', unlockCondition: 'hundred_stars' }
]

export const buildings = [
  { id: 'shop', name: '小商店', emoji: '🏪', unlockLevel: 1 },
  { id: 'school', name: '学校', emoji: '🏫', unlockLevel: 3 },
  { id: 'park', name: '公园', emoji: '🌳', unlockLevel: 5 },
  { id: 'library', name: '图书馆', emoji: '📚', unlockLevel: 7 },
  { id: 'castle', name: '城堡', emoji: '🏰', unlockLevel: 10 }
]

export const badges = [
  { id: 'streak_badge_3', name: '连续3天', emoji: '🔥' },
  { id: 'streak_badge_7', name: '连续7天', emoji: '🌟' },
  { id: 'pinyin_master', name: '拼音大师', emoji: '📖' },
  { id: 'math_whiz', name: '数学天才', emoji: '🔢' },
  { id: 'english_star', name: '英语之星', emoji: '🗣️' }
]

export function calculateStarsEarned(taskResult) {
  const { success, accuracy = 1 } = taskResult
  if (!success) return 0
  if (accuracy >= 0.9) return 3
  if (accuracy >= 0.7) return 2
  return 1
}

export function checkAchievements(stats, history, unlockedAchievements) {
  const newAchievements = []
  achievements.forEach(achievement => {
    if (!unlockedAchievements.includes(achievement.id)) {
      if (achievement.condition(stats, history)) {
        newAchievements.push(achievement)
      }
    }
  })
  return newAchievements
}

export function getUnlockedPets(unlockedAchievements) {
  return pets.filter(pet => {
    const achievement = achievements.find(a => a.id === pet.unlockCondition)
    return achievement && unlockedAchievements.includes(achievement.id)
  })
}

export function getUnlockedBuildings(level) {
  return buildings.filter(building => building.unlockLevel <= level)
}

export function getLevelProgress(xp) {
  const level = Math.max(1, Math.floor(xp / 60) + 1)
  const currentLevelXp = (level - 1) * 60
  const nextLevelXp = level * 60
  const progress = (xp - currentLevelXp) / (nextLevelXp - currentLevelXp)
  return { level, progress, currentLevelXp, nextLevelXp }
}
