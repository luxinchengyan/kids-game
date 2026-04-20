import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGamesByTheme } from '../registry';
import type { GameConfig } from '../registry';
import { getGameSeriesSnapshot } from '../../data/gameSeriesCatalog';

const StoryList = lazy(() => import('../../components/StoryList'));
const StoryReader = lazy(() => import('../../components/StoryReader'));

function LazyFallback() {
  return (
    <div
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-text-secondary)',
        fontWeight: 600,
      }}
    >
      加载中…
    </div>
  );
}

export default function StoriesGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('stories');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'list' | 'reader'>('list');
  const storyGames = getGamesByTheme('stories-hub');

  const handleSelectStory = useCallback((story: any) => {
    track('story_select', { storyId: story?.id ?? '' });
    setSelectedStory(story);
    setCurrentView('reader');
  }, []);

  const handleStoryComplete = useCallback(
    (result: any) => {
      track('story_complete', { success: !!result.success, stars: result.stars ?? 0 });
      
      handleGameComplete({
        success: result.success,
        stars: result.stars || 0,
        xp: result.stars ? 12 + result.stars * 4 : 4,
        tasksCompleted: 1,
        accuracy: result.success ? 1 : 0,
      });

      setCurrentView('list');
      setSelectedStory(null);
    },
    [handleGameComplete]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedStory(null);
  }, []);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: 'stories' });
      navigate(game.path);
    },
    [navigate]
  );

  if (currentView === 'reader' && selectedStory) {
    return (
      <PageLayout maxWidth="700px">
        <GamePageHeader
          title="故事王国"
          icon="📚"
          gradient="linear-gradient(135deg, #9C27B0, #CE93D8, #9C27B0)"
          progressColor="#9C27B0"
          onBack={handleBackToList}
          backLabel="← 返回故事列表"
        />
        <Suspense fallback={<LazyFallback />}>
          <StoryReader
            story={selectedStory}
            onComplete={handleStoryComplete}
            onBack={handleBackToList}
          />
        </Suspense>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="700px">
      <GamePageHeader
        title="故事王国"
        icon="📚"
        subtitle="有趣的故事等你来读！✨"
        gradient="linear-gradient(135deg, #9C27B0, #CE93D8, #9C27B0)"
        progressColor="#9C27B0"
        onBack={handleBack}
      />

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#6A1B9A', fontSize: '24px' }}>🎮 故事小游戏</h3>
        <p style={{ margin: '0 0 16px 0', color: '#7B1FA2', fontWeight: 600 }}>
          先读故事，也可以直接进入排序、打地鼠和测试小挑战。
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          {storyGames.map((game, index) => (
            <motion.button
              key={game.id}
              type="button"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGameSelect(game)}
              style={{
                border: 'none',
                borderRadius: '18px',
                padding: '16px',
                background: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(156, 39, 176, 0.12)',
                animationDelay: `${index * 80}ms`,
              }}
            >
              {(() => {
                const series = getGameSeriesSnapshot(game.id);
                return (
                  <>
                    <div style={{ fontSize: '30px', marginBottom: '8px' }}>{game.icon}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#4A148C', marginBottom: '6px' }}>{game.name}</div>
                    <div style={{ color: '#6A1B9A', fontWeight: 600, lineHeight: 1.6, marginBottom: '10px' }}>
                      {game.description}
                    </div>
                    {series && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            color: '#6A1B9A',
                            background: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '6px 10px',
                          }}
                        >
                          {series.stageLabel}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            color: '#6A1B9A',
                            background: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '6px 10px',
                          }}
                        >
                          {series.bankLabel}
                        </span>
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.button>
          ))}
        </div>
      </div>

      <Suspense fallback={<LazyFallback />}>
        <StoryList onSelectStory={handleSelectStory} onBack={handleBack} />
      </Suspense>
    </PageLayout>
  );
}
