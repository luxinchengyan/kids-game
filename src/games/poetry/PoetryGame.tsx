import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

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
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <Suspense fallback={<LazyFallback />}>
          <StoryReader
            story={selectedPoem}
            onComplete={handlePoemComplete}
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
        <PoetryList onSelectPoem={handleSelectPoem} onBack={handleBack} />
      </Suspense>
    </div>
  );
}
