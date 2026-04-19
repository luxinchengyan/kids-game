import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievements, pets, buildings, badges, getUnlockedPets, getUnlockedBuildings, getLevelProgress } from '../data/rewards'

function StarReward({ amount, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="reward-popup star-reward"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="stars-container">
        {[...Array(amount)].map((_, i) => (
          <motion.span
            key={i}
            className="star-icon"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <p className="reward-text">获得 {amount} 颗星星！</p>
    </motion.div>
  )
}

function AchievementUnlock({ achievement, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="reward-popup achievement-reward"
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-content">
        <h3>🎉 成就解锁！</h3>
        <p className="achievement-name">{achievement.name}</p>
        <p className="achievement-desc">{achievement.description}</p>
      </div>
    </motion.div>
  )
}

export function RewardPopup({ rewards, onRewardComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!rewards || rewards.length === 0) return null

  const currentReward = rewards[currentIndex]

  const handleComplete = () => {
    if (currentIndex < rewards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onRewardComplete()
    }
  }

  return (
    <div className="reward-overlay">
      <AnimatePresence mode="wait">
        {currentReward.type === 'star' && (
          <StarReward
            key={`star-${currentIndex}`}
            amount={currentReward.amount}
            onComplete={handleComplete}
          />
        )}
        {currentReward.type === 'achievement' && (
          <AchievementUnlock
            key={`achievement-${currentIndex}`}
            achievement={currentReward.achievement}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export function LevelProgress({ xp, level }) {
  const progress = getLevelProgress(xp)
  const percentage = Math.round(progress.progress * 100)

  return (
    <div className="level-progress-bar">
      <div className="level-info">
        <span className="level-label">等级 {progress.level}</span>
        <span className="xp-text">{xp} XP</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="level-milestone">
        <span>下一等级: {progress.nextLevelXp} XP</span>
      </div>
    </div>
  )
}

export function AchievementWall({ unlockedAchievements }) {
  return (
    <div className="achievement-wall">
      <h2>🏆 成就墙</h2>
      <div className="achievements-grid">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id)
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon-large">
                {isUnlocked ? achievement.icon : '🔒'}
              </div>
              <div className="achievement-details">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CollectionPanel({ unlockedAchievements, level }) {
  const unlockedPets = getUnlockedPets(unlockedAchievements)
  const unlockedBuildings = getUnlockedBuildings(level)

  return (
    <div className="collection-panel">
      <div className="collection-section">
        <h3>🐾 宠物收藏</h3>
        <div className="pets-grid">
          {pets.map((pet) => {
            const isUnlocked = unlockedPets.some(p => p.id === pet.id)
            return (
              <div
                key={pet.id}
                className={`pet-card ${isUnlocked ? 'unlocked' : 'locked'} ${pet.rarity}`}
              >
                <span className="pet-emoji">{isUnlocked ? pet.emoji : '❓'}</span>
                <span className="pet-name">{isUnlocked ? pet.name : '???'}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="collection-section">
        <h3>🏪 建筑收藏</h3>
        <div className="buildings-grid">
          {buildings.map((building) => {
            const isUnlocked = unlockedBuildings.some(b => b.id === building.id)
            return (
              <div
                key={building.id}
                className={`building-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <span className="building-emoji">{isUnlocked ? building.emoji : '🔒'}</span>
                <span className="building-name">{isUnlocked ? building.name : `Lv.${building.unlockLevel} 解锁`}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="collection-section">
        <h3>🎖️ 徽章收藏</h3>
        <div className="badges-grid">
          {badges.map((badge) => {
            const isUnlocked = unlockedAchievements.some(a => badge.id.includes(a))
            return (
              <div
                key={badge.id}
                className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <span className="badge-emoji">{isUnlocked ? badge.emoji : '🔒'}</span>
                <span className="badge-name">{isUnlocked ? badge.name : '???'}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RewardPopup
