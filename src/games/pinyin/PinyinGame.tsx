import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { useGameStore } from '../../stores/useGameStore';
import { createMission } from '../../data/learningContent';
import { track } from '../../lib/analytics';

const ChoiceTask = lazy(() => import('../../components/ChoiceTask'));
const PinyinBattle = lazy(() => import('../../components/PinyinBattle'));
const MatchTask = lazy(() => import('../../components/MatchTask'));
const MicroTask = lazy(() => import('../../components/MicroTask'));

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

export default function PinyinGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin');
  const currentIsland = useGameStore((s) => s.currentIsland);
  const setCurrentIsland = useGameStore((s) => s.setCurrentIsland);
  
  const [currentTasks, setCurrentTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const taskStartedAt = useState<number>(Date.now())[0];

  useEffect(() => {
    const profile = {
      language: 'zh',
      focus: 'pinyin',
      companion: 'astro',
    };
    const knowledgeState = {};
    const mission = createMission(profile, knowledgeState);
    setCurrentTasks(mission);
    setCurrentTaskIndex(0);
    track('game_start', { gameId: 'pinyin', taskCount: mission.length });
  }, []);

  const handleTaskComplete = useCallback(
    (result: any) => {
      const durationMs = Date.now() - taskStartedAt;
      const task = currentTasks[currentTaskIndex];
      
      track('task_complete', {
        success: !!result.success,
        duration_ms: durationMs,
        taskIndex: currentTaskIndex,
        taskType: task?.type ?? 'unknown',
        taskId: task?.id ?? '',
        gameId: 'pinyin',
      });

      if (currentTaskIndex < currentTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        // Game complete
        handleGameComplete({
          success: result.success,
          stars: result.stars || 0,
          tasksCompleted: currentTasks.length,
          accuracy: result.success ? 1 : 0,
        });
        navigate('/');
      }
    },
    [currentTaskIndex, currentTasks, handleGameComplete, navigate, taskStartedAt]
  );

  const handleBack = useCallback(() => {
    navigate('/');
    setCurrentIsland('home');
  }, [navigate, setCurrentIsland]);

  if (currentTasks.length === 0) {
    return <LazyFallback />;
  }

  const task = currentTasks[currentTaskIndex];

  const renderTask = () => {
    switch (task.type) {
      case 'choice':
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
      case 'battle':
        return <PinyinBattle task={task} onComplete={handleTaskComplete} />;
      case 'match':
        return <MatchTask task={task} onComplete={handleTaskComplete} />;
      case 'micro':
        return <MicroTask task={task} onComplete={handleTaskComplete} />;
      default:
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '700px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← 返回首页
        </Button>
        <div
          style={{
            marginTop: '12px',
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}
        >
          📚 任务 {currentTaskIndex + 1} / {currentTasks.length}
        </div>
      </div>
      <Suspense fallback={<LazyFallback />}>{renderTask()}</Suspense>
    </div>
  );
}
