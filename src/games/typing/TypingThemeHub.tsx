import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGamesByTheme } from '../registry';
import type { GameConfig } from '../registry';
import { getGameSeriesSnapshot } from '../../data/gameSeriesCatalog';
import { track } from '../../lib/analytics';
import { aiTypingDesignNotes } from './typingData';

function HubGameCard({
  game,
  index,
  onClick,
}: {
  game: GameConfig;
  index: number;
  onClick: () => void;
}) {
  const series = getGameSeriesSnapshot(game.id);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(135deg, #F3E5F5, #E1F5FE, #FFF8E1)',
        boxShadow: '0 12px 24px rgba(124, 77, 255, 0.14)',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '52px', lineHeight: 1 }}>{game.icon}</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '10px',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#311B92' }}>{game.name}</div>
            {series ? (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#5E35B1',
                  background: '#FFFFFF',
                  padding: '6px 10px',
                  borderRadius: '999px',
                }}
              >
                {series.ladderLabel}
              </span>
            ) : null}
          </div>
          <p style={{ margin: '0 0 12px 0', color: '#3949AB', fontSize: '15px', lineHeight: 1.7 }}>
            {game.description}
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {game.learningPath?.skillFocus.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0277BD',
                  background: 'rgba(255,255,255,0.8)',
                  padding: '6px 10px',
                  borderRadius: '999px',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '28px', color: '#5E35B1' }}>→</div>
      </div>
    </motion.button>
  );
}

export default function TypingThemeHub() {
  const navigate = useNavigate();
  const games = getGamesByTheme('ai-typing-hub');

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: 'ai-typing' });
      navigate(game.path);
    },
    [navigate]
  );

  return (
    <PageLayout maxWidth="980px">
      <GamePageHeader
        title="AI 打字训练营"
        icon="🤖"
        subtitle="把键盘变成 AI 控制台，用一串串小游戏认识键位、节奏和输入成就感。"
        gradient="linear-gradient(135deg, #7C4DFF, #26C6DA, #FFD54F)"
        progressColor="#7C4DFF"
        onBack={handleBack}
      />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          borderRadius: '28px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(124,77,255,0.14), rgba(38,198,218,0.18), rgba(255,213,79,0.18))',
          border: '2px solid rgba(124, 77, 255, 0.18)',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#311B92', marginBottom: '10px' }}>
          训练路线：认识键位 → 挡住字母雨 → 输入 AI 指令 → 连打节奏组合
        </div>
        <p style={{ margin: 0, color: '#3949AB', lineHeight: 1.8, fontSize: '16px' }}>
          这套主题专门面向刚接触键盘的小朋友：每局时长短、反馈快、难度爬坡清楚，
          可以像早期打字游戏一样练到“手知道键在哪里”，又带一点 AI 冒险的故事感。
        </p>
      </motion.section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {aiTypingDesignNotes.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            style={{
              borderRadius: '22px',
              padding: '20px',
              background: '#FFFFFF',
              border: '2px solid #D1C4E9',
              boxShadow: '0 10px 18px rgba(49, 27, 146, 0.08)',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#4527A0', marginBottom: '10px' }}>
              {item.title}
            </div>
            <div style={{ color: '#5C6BC0', lineHeight: 1.7, fontSize: '14px' }}>{item.detail}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {games.map((game, index) => (
          <HubGameCard
            key={game.id}
            game={game}
            index={index}
            onClick={() => handleGameSelect(game)}
          />
        ))}
      </div>
    </PageLayout>
  );
}
