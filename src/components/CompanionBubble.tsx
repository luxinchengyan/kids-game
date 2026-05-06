import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompanionBubbleProps {
  companionId: string;
  message: string;
  visible: boolean;
}

export const COMPANIONS = {
  aisha: { name: '艾莎', emoji: '❄️', color: '#B3E5FC' },
  rocky: { name: '罗奇', emoji: '🐶', color: '#DCEDC8' },
  peppa: { name: '佩奇', emoji: '🐷', color: '#F8BBD0' },
  marshall: { name: '毛毛', emoji: '🚒', color: '#FFCDD2' },
};

export const CompanionBubble: React.FC<CompanionBubbleProps> = ({ companionId, message, visible }) => {
  const companion = COMPANIONS[companionId as keyof typeof COMPANIONS] || COMPANIONS.aisha;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: '#FFFFFF',
            padding: '16px 24px',
            borderRadius: '24px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            border: `3px solid ${companion.color}`,
            maxWidth: '300px',
          }}
        >
          <div style={{ fontSize: '40px' }}>{companion.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#9E9E9E', marginBottom: '4px' }}>{companion.name}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#424242', lineHeight: 1.5 }}>{message}</div>
          </div>
          {/* Triangle tail */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '40px',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `12px solid ${companion.color}`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
