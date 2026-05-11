import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { APP_SHELL_MAX_WIDTH, PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGamesByTheme } from '../registry';
import type { GameConfig } from '../registry';
import { SectionHeading, SurfaceCard } from '../../components/BrandPrimitives';
import { ThemeHubGameCard } from '../../components/ThemeHubPage';

const StoryList = lazy(() => import('../../components/StoryList'));
const StoryReader = lazy(() => import('../../components/StoryReader'));

interface StorySelection {
  id?: string;
}

interface StoryCompletionResult {
  success: boolean;
  stars?: number;
}

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
  const [selectedStory, setSelectedStory] = useState<StorySelection | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'reader'>('list');
  const storyGames = getGamesByTheme('stories-hub');

  const handleSelectStory = useCallback((story: StorySelection) => {
    track('story_select', { storyId: story?.id ?? '' });
    setSelectedStory(story);
    setCurrentView('reader');
  }, []);

  const handleStoryComplete = useCallback(
      (result: StoryCompletionResult) => {
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
      <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
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
    <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
      <GamePageHeader
        title="故事王国"
        icon="📚"
        subtitle="有趣的故事等你来读！✨"
        gradient="linear-gradient(135deg, #9C27B0, #CE93D8, #9C27B0)"
        progressColor="#9C27B0"
        onBack={handleBack}
      />

      <SurfaceCard
        borderColor="rgba(156, 39, 176, 0.22)"
        background="linear-gradient(135deg, #F3E5F5, rgba(255,255,255,0.98))"
        style={{ padding: '24px 26px', marginBottom: '24px' }}
      >
        <SectionHeading
          eyebrow="Story world"
          title="先读故事，也可以切到互动挑战"
          description="把阅读、排序、闯关和测验放在同一入口里，让故事学习更像连续探索，而不是孤立功能。"
          accent="#7B1FA2"
          style={{ marginBottom: '18px' }}
        />
        <div style={{ display: 'grid', gap: '16px' }}>
          {storyGames.map((game, index) => (
            <ThemeHubGameCard
              key={game.id}
              game={game}
              index={index}
              palette={{
                primary: '#9C27B0',
                secondary: '#CE93D8',
                soft: '#F3E5F5',
                border: 'rgba(156, 39, 176, 0.22)',
                gradient: 'linear-gradient(135deg, #9C27B0, #CE93D8)',
              }}
              onClick={() => handleGameSelect(game)}
            />
          ))}
        </div>
      </SurfaceCard>

      <Suspense fallback={<LazyFallback />}>
        <StoryList onSelectStory={handleSelectStory} onBack={handleBack} />
      </Suspense>
    </PageLayout>
  );
}
