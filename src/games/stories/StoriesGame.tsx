import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

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

  if (currentView === 'reader' && selectedStory) {
    return (
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <Suspense fallback={<LazyFallback />}>
          <StoryReader
            story={selectedStory}
            onComplete={handleStoryComplete}
            onBack={handleBackToList}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '700px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← 返回首页
        </Button>
      </div>
      <Suspense fallback={<LazyFallback />}>
        <StoryList onSelectStory={handleSelectStory} onBack={handleBack} />
      </Suspense>
    </div>
  );
}
