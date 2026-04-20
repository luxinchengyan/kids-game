import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';

const PoetryList = lazy(() => import('../../components/PoetryList'));
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

export default function PoetryGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('poetry');
  const [selectedPoem, setSelectedPoem] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'list' | 'reader'>('list');

  const handleSelectPoem = useCallback((poem: any) => {
    track('poem_select', { poemId: poem?.id ?? '' });
    setSelectedPoem(poem);
    setCurrentView('reader');
  }, []);

  const handlePoemComplete = useCallback(
    (result: any) => {
      track('poem_complete', { success: !!result.success, stars: result.stars ?? 0 });
      
      handleGameComplete({
        success: result.success,
        stars: result.stars || 0,
        xp: result.stars ? 12 + result.stars * 4 : 4,
        tasksCompleted: 1,
        accuracy: result.success ? 1 : 0,
      });

      setCurrentView('list');
      setSelectedPoem(null);
    },
    [handleGameComplete]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedPoem(null);
  }, []);

  if (currentView === 'reader' && selectedPoem) {
    return (
      <PageLayout maxWidth="700px">
        <GamePageHeader
          title="古典诗词"
          icon="🏛️"
          gradient="linear-gradient(135deg, #673AB7, #9575CD, #673AB7)"
          progressColor="#673AB7"
          onBack={handleBackToList}
          backLabel="← 返回诗词列表"
        />
        <Suspense fallback={<LazyFallback />}>
          <StoryReader
            story={selectedPoem}
            onComplete={handlePoemComplete}
            onBack={handleBackToList}
          />
        </Suspense>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="700px">
      <GamePageHeader
        title="古典诗词"
        icon="🏛️"
        subtitle="感受传统文化之美！✨"
        gradient="linear-gradient(135deg, #673AB7, #9575CD, #673AB7)"
        progressColor="#673AB7"
        onBack={handleBack}
      />
      <Suspense fallback={<LazyFallback />}>
        <PoetryList onSelectPoem={handleSelectPoem} onBack={handleBack} />
      </Suspense>
    </PageLayout>
  );
}
