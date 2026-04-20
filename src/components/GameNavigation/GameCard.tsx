import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getAgeRangeLabel } from '../../games/registry';
import type { GameConfig } from '../../games/registry';

interface GameCardProps {
  game: GameConfig;
  onClick: () => void;
  index: number;
}

// Category-based gradient backgrounds
const categoryGradients: Record<string, string> = {
  pinyin: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
  math: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
  english: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
  stories: 'linear-gradient(135deg, #9C27B0 0%, #CE93D8 100%)',
  poetry: 'linear-gradient(135deg, #673AB7 0%, #9575CD 100%)',
  sports: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
  other: 'linear-gradient(135deg, #FF6F00 0%, #FFAB40 100%)',
};

// Per-hub overrides — ensures each hub card has a distinct color
const hubGradients: Record<string, string> = {
  'geography-hub':    'linear-gradient(135deg, #00897B 0%, #4DB6AC 100%)',
  'history-hub':      'linear-gradient(135deg, #6D4C41 0%, #A1887F 100%)',
  'chemistry-hub':    'linear-gradient(135deg, #7B1FA2 0%, #CE93D8 100%)',
  'physics-hub':      'linear-gradient(135deg, #283593 0%, #7986CB 100%)',
  'biology-hub':      'linear-gradient(135deg, #2E7D32 0%, #81C784 100%)',
  'ai-hub':           'linear-gradient(135deg, #00695C 0%, #26C6DA 55%, #7E57C2 100%)',
  'encyclopedia-hub': 'linear-gradient(135deg, #01579B 0%, #29B6F6 100%)',
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
  const gradient = hubGradients[game.id] ?? categoryGradients[game.category] ?? categoryGradients.other;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const ageRangeLabel = getAgeRangeLabel(game);
  const assessmentLabel = game.learningPath?.assessmentScope.slice(0, 2).join(' · ');

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
      role="button"
      tabIndex={0}
      aria-label={`进入${game.name}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
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
          outline: 'none',
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
        <div style={{ textAlign: 'center', zIndex: 1, width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            {game.learningPath?.levelLabel && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.24)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                {game.learningPath.levelLabel}
              </span>
            )}
            <span
              style={{
                background: 'rgba(255,255,255,0.18)',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              适龄 {ageRangeLabel}
            </span>
          </div>
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
              margin: '0 0 10px 0',
            }}
          >
            {game.description}
          </p>
          {assessmentLabel && (
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.95)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              考察范围：{assessmentLabel}
            </p>
          )}
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
