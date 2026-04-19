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
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        border: '3px solid #FFB74D',
        boxShadow: '0 4px 12px rgba(255, 183, 77, 0.3)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>{game.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#3E2723', margin: 0 }}>
              {game.name}
            </h3>
            <button
              type="button"
              onClick={handleSpeak}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: isSpeaking ? 'rgba(255, 152, 0, 0.9)' : 'rgba(255, 152, 0, 0.2)',
                color: '#FF9800',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {isSpeaking ? '🔊' : '🔉'}
            </button>
          </div>
          <p style={{ fontSize: '15px', color: '#6D4C41', margin: '0 0 12px 0' }}>
            {game.description}
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#FF9800',
                background: '#FFF3E0',
                padding: '4px 12px',
                borderRadius: '12px',
              }}
            >
              入门 - 挑战
            </span>
            {game.minAge && game.maxAge && (
              <span
                style={{
                  fontSize: '13px',
                  color: '#8D6E63',
                  fontWeight: 600,
                }}
              >
                {game.minAge}-{game.maxAge}岁
              </span>
            )}
          </div>
        </div>
        <div style={{ fontSize: '32px', color: '#FF9800' }}>→</div>
      </div>
    </motion.div>
  );
}

export default function PinyinThemeHub() {
  const navigate = useNavigate();
  const pinyinGames = getGamesByTheme('pinyin');

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: 'pinyin' });
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
            background: 'linear-gradient(135deg, #FF9800, #FFB74D, #FF9800)',
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
          📖 拼音冒险岛
        </motion.h1>
        <p style={{ fontSize: '20px', color: '#6D4C41', fontWeight: 600 }}>
          选择一个拼音游戏开始冒险吧！✨
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
        {pinyinGames.map((game, index) => (
          <ThemeGameCard
            key={game.id}
            game={game}
            index={index}
            onClick={() => handleGameSelect(game)}
          />
        ))}
      </div>

      {/* Empty State */}
      {pinyinGames.length === 0 && (
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
