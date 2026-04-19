import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameProgress } from '../../hooks/useGameProgress';
import type { GameConfig } from '../../games/registry';

interface GameCardProps {
  game: GameConfig;
  onClick: () => void;
  index: number;
}

// Category-based gradient backgrounds
const categoryGradients = {
  pinyin: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
  math: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
  english: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
  stories: 'linear-gradient(135deg, #9C27B0 0%, #CE93D8 100%)',
  poetry: 'linear-gradient(135deg, #673AB7 0%, #9575CD 100%)',
  sports: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
  other: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
};

// Function to speak text using Web Speech API
function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN'; // Chinese
    utterance.rate = 0.85; // Slightly slower for children
    utterance.pitch = 1.1; // Slightly higher pitch (more friendly)
    window.speechSynthesis.speak(utterance);
  }
}

export function GameCard({ game, onClick, index }: GameCardProps) {
  const { completedSessions, totalSessions } = useGameProgress(game.id);
  const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
  const gradient = categoryGradients[game.category] || categoryGradients.other;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsSpeaking(true);
    speakText(game.name);
    // Reset speaking state after utterance completes
    setTimeout(() => setIsSpeaking(false), game.name.length * 400 + 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: '100%', height: '100%', minHeight: '280px' }}
      onClick={onClick}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: gradient,
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative corner */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
          }}
        />

        {/* Game Icon */}
        <div
          style={{
            fontSize: '72px',
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            zIndex: 1,
          }}
        >
          {game.icon}
        </div>

        {/* Game Info */}
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 800,
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                margin: 0,
              }}
            >
              {game.name}
            </h3>
            <button
              type="button"
              onClick={handleSpeak}
              title="播放游戏名称"
              style={{
                flexShrink: 0,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: isSpeaking
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSpeaking ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isSpeaking ? '🔊' : '🔉'}
            </button>
          </div>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}
          >
            {game.description}
          </p>
        </div>

        {/* Progress Bar */}
        {totalSessions > 0 && (
          <div style={{ width: '100%', zIndex: 1 }}>
            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                color: '#FFFFFF',
                marginBottom: '4px',
                textAlign: 'center',
              }}
            >
              已玩 {completedSessions}/{totalSessions} 次
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${completionRate}%`,
                  height: '100%',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
