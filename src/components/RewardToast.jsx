import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../stores/useGameStore'
import { t } from '../lib/i18n'

export default function RewardToast() {
  const rewards = useGameStore((state) => state.rewards)
  const clearRewards = useGameStore((state) => state.clearRewards)

  useEffect(() => {
    if (!rewards.length) return undefined
    const timer = window.setTimeout(() => clearRewards(), 1800)
    return () => window.clearTimeout(timer)
  }, [rewards, clearRewards])

  return (
    <div className="reward-stack" aria-live="polite">
      <AnimatePresence>
        {rewards.map((reward, index) => (
          <motion.div
            key={`${reward.type}-${index}-${reward.createdAt || index}`}
            data-testid="reward"
            className="reward-toast"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.92 }}
          >
            <div className="reward-icon">{reward.type === 'badge' ? '🏅' : '✨'}</div>
            <div>
              <strong>{reward.type === 'badge' ? t('reward_badge') : t('reward_star')}</strong>
              <div>{reward.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
