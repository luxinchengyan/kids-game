import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { getGamesByTheme } from '../registry';
import type { GameConfig } from '../registry';
import { track } from '../../lib/analytics';

// Function to speak text using Web Speech API
function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

// Game card component for theme hub
function ThemeGameCard({ game, onClick, index }: { game: GameConfig; onClick: () => void; index: number }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    speakText(game.name);
    setTimeout(() => setIsSpeaking(false), game.name.length * 400 + 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        cursor: 'pointer',
        border: '3px solid #64B5F6',
        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.15)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), transparent)',
          borderRadius: '0 24px 0 100%',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div
          style={{
            fontSize: '56px',
            flexShrink: 0,
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
            borderRadius: '20px',
          }}
        >
          {game.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#1976D2',
                margin: 0,
              }}
            >
              {game.name}
            </h3>
            <button
              onClick={handleSpeak}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: isSpeaking
                  ? 'linear-gradient(135deg, #BDBDBD, #9E9E9E)'
                  : 'linear-gradient(135deg, #2196F3, #64B5F6)',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {isSpeaking ? '🔊' : '🔈'}
            </button>
          </div>
          <p
            style={{
              fontSize: '16px',
              color: '#6D4C41',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {game.description}
          </p>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: '32px',
            color: '#2196F3',
            fontWeight: 800,
          }}
        >
          →
        </div>
      </div>
    </motion.div>
  );
}

export default function PoetryThemeHub() {
  const navigate = useNavigate();
  const poetryGames = getGamesByTheme('poetry-hub');

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: 'poetry' });
      navigate(game.path);
    },
    [navigate]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        padding: '0 var(--spacing-md)',
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '32px' }}
      >
        <motion.h1
          style={{
            fontSize: '48px',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #2196F3, #64B5F6, #2196F3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🏛️ 古典诗词
        </motion.h1>
        <p style={{ fontSize: '20px', color: '#6D4C41', fontWeight: 600 }}>
          学习优美的古诗词，感受传统文化的魅力！✨
        </p>
      </motion.div>

      {/* Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← 返回首页
        </Button>
      </div>

      {/* Game List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {poetryGames.map((game, index) => (
          <ThemeGameCard
            key={game.id}
            game={game}
            index={index}
            onClick={() => handleGameSelect(game)}
          />
        ))}
      </div>

      {/* Empty State */}
      {poetryGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#8D6E63',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎮</div>
          <p style={{ fontSize: '18px', fontWeight: 600 }}>
            更多游戏即将上线，敬请期待！
          </p>
        </motion.div>
      )}
    </div>
  );
}
