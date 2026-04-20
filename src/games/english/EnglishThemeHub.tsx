import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGamesByTheme } from '../registry';
import type { GameConfig } from '../registry';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGameSeriesSnapshot } from '../../data/gameSeriesCatalog';

// Speak text using Web Speech API (English)
function speakText(text: string, lang = 'en-US') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

function ThemeGameCard({
  game,
  onClick,
  index,
}: {
  game: GameConfig;
  onClick: () => void;
  index: number;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const series = getGameSeriesSnapshot(game.id);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    speakText(game.name, 'zh-CN');
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
        background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        border: '3px solid #66BB6A',
        boxShadow: '0 4px 12px rgba(102, 187, 106, 0.3)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>{game.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1B5E20', margin: 0 }}>
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
                background: isSpeaking ? 'rgba(76, 175, 80, 0.9)' : 'rgba(76, 175, 80, 0.2)',
                color: '#4CAF50',
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
          <p style={{ fontSize: '15px', color: '#2E7D32', margin: '0 0 12px 0' }}>
            {game.description}
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#4CAF50',
                background: '#F1F8E9',
                padding: '4px 12px',
                borderRadius: '12px',
              }}
            >
              {series?.ladderLabel ?? '入门 - 挑战'}
            </span>
            {series && (
              <>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2E7D32',
                    background: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                  }}
                >
                  {series.stageLabel}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2E7D32',
                    background: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                  }}
                >
                  {series.bankLabel}
                </span>
              </>
            )}
            {game.minAge && game.maxAge && (
              <span
                style={{
                  fontSize: '13px',
                  color: '#388E3C',
                  fontWeight: 600,
                }}
              >
                {game.minAge}-{game.maxAge}岁
              </span>
            )}
          </div>
        </div>
        <div style={{ fontSize: '32px', color: '#4CAF50' }}>→</div>
      </div>
    </motion.div>
  );
}

export default function EnglishThemeHub() {
  const navigate = useNavigate();
  const englishGames = getGamesByTheme('english-hub');

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: 'english' });
      navigate(game.path);
    },
    [navigate]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <PageLayout maxWidth="800px">
      <GamePageHeader
        title="英语游乐园"
        icon="🌍"
        subtitle="选择一个英语游戏开始学习吧！✨"
        gradient="linear-gradient(135deg, #4CAF50, #81C784, #4CAF50)"
        progressColor="#4CAF50"
        onBack={handleBack}
      />

      {/* Game List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {englishGames.map((game, index) => (
          <ThemeGameCard
            key={game.id}
            game={game}
            index={index}
            onClick={() => handleGameSelect(game)}
          />
        ))}
      </div>

      {/* Empty State */}
      {englishGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#388E3C',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎮</div>
          <p style={{ fontSize: '18px', fontWeight: 600 }}>
            更多游戏即将上线，敬请期待！
          </p>
        </motion.div>
      )}
    </PageLayout>
  );
}
