/**
 * StreakMilestoneCelebration — 连续打卡里程碑全屏庆祝弹窗
 * 当 checkIn() 触发里程碑时由 HomePage 调用
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type StreakMilestone } from '../stores/useRewardStore';

interface Props {
  milestone: StreakMilestone | null;
  onClose: () => void;
}

export function StreakMilestoneCelebration({ milestone, onClose }: Props) {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={onClose}
        >
          {/* Confetti particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: (Math.cos((i / 12) * Math.PI * 2) * 180),
                y: (Math.sin((i / 12) * Math.PI * 2) * 180),
              }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: ['#FF9800','#4CAF50','#2196F3','#E91E63','#9C27B0','#FF5722'][i % 6],
                pointerEvents: 'none',
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, y: 60 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 60 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 50%, #FCE4EC 100%)',
              borderRadius: '36px',
              padding: '40px 32px 32px',
              maxWidth: '340px',
              width: '100%',
              boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
              border: '3px solid rgba(255,152,0,0.4)',
              textAlign: 'center',
            }}
          >
            {/* Big icon */}
            <motion.div
              animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ fontSize: '80px', lineHeight: 1, marginBottom: '16px' }}
            >
              {milestone.icon}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#E65100', letterSpacing: '2px', marginBottom: '8px' }}>
                连续打卡里程碑
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#3E2723', marginBottom: '12px', lineHeight: 1.3 }}>
                {milestone.title}
              </div>
              <div style={{ fontSize: '16px', color: '#6D4C41', fontWeight: 700, marginBottom: '20px', lineHeight: 1.6 }}>
                坚持了 <span style={{ color: '#E91E63', fontSize: '22px', fontWeight: 900 }}>{milestone.days}</span> 天！
                <br />超棒的，继续加油！
              </div>

              {/* Reward display */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '20px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#FF9800' }}>
                    +⭐{milestone.reward.stars}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8D6E63', fontWeight: 700 }}>星星奖励</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,152,0,0.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#9C27B0' }}>
                    +{milestone.reward.xp} XP
                  </div>
                  <div style={{ fontSize: '12px', color: '#8D6E63', fontWeight: 700 }}>经验值</div>
                </div>
                {milestone.reward.unlockItem && (
                  <>
                    <div style={{ width: '1px', background: 'rgba(255,152,0,0.2)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: '#4CAF50' }}>🔓</div>
                      <div style={{ fontSize: '12px', color: '#8D6E63', fontWeight: 700 }}>新道具解锁</div>
                    </div>
                  </>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  width: '100%',
                  minHeight: '56px',
                  fontSize: '18px',
                  fontWeight: 900,
                  border: 'none',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #FF9800, #E91E63)',
                  color: '#FFF',
                  boxShadow: '0 6px 20px rgba(255,152,0,0.45)',
                }}
              >
                太棒了！继续冒险 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
