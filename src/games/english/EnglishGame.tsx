import { useState, useCallback, lazy, Suspense, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { createMission } from '../../data/learningContent';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameStore } from '../../stores/useGameStore';
import { useUserStore } from '../../stores/useUserStore';

const ChoiceTask = lazy(() => import('../../components/ChoiceTask'));
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

export default function EnglishGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('english');
  const profile = useGameStore((state) => state.profile);
  const knowledge = useGameStore((state) => state.knowledge);
  const startMission = useGameStore((state) => state.startMission);
  const recordTaskResult = useGameStore((state) => state.recordTaskResult);
  const currentChild = useUserStore((state) => state.currentChild);
  
  const [currentTasks, setCurrentTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const taskStartedAt = useRef<number>(Date.now());
  const sessionStatsRef = useRef({ correctCount: 0, totalStars: 0 });
  const missionContextRef = useRef({
    language: profile.language,
    companion: profile.companion,
    knowledgeState: knowledge,
    age: currentChild?.age ?? 5,
  });

  useEffect(() => {
    const mission = createMission(
      {
        language: missionContextRef.current.language,
        focus: 'english',
        companion: missionContextRef.current.companion,
        age: missionContextRef.current.age,
      },
      missionContextRef.current.knowledgeState
    );
    setCurrentTasks(mission);
    setCurrentTaskIndex(0);
    sessionStatsRef.current = { correctCount: 0, totalStars: 0 };
    taskStartedAt.current = Date.now();
    startMission(mission);
    track('game_start', { gameId: 'english', taskCount: mission.length });
  }, [startMission]);

  const handleTaskComplete = useCallback(
    (result: any) => {
      const durationMs = Date.now() - taskStartedAt.current;
      const task = currentTasks[currentTaskIndex];
      const nextCorrectCount = sessionStatsRef.current.correctCount + (result.success ? 1 : 0);
      const nextTotalStars = sessionStatsRef.current.totalStars + (result.stars || 0);
      sessionStatsRef.current = { correctCount: nextCorrectCount, totalStars: nextTotalStars };
      
      track('task_complete', {
        success: !!result.success,
        duration_ms: durationMs,
        taskIndex: currentTaskIndex,
        taskType: task?.type ?? 'unknown',
        taskId: task?.id ?? '',
        gameId: 'english',
      });
      recordTaskResult({
        taskId: task?.id ?? `english-task-${currentTaskIndex}`,
        success: !!result.success,
        stars: result.stars || 0,
        skill: task?.skill ?? 'english',
        prompt: task?.prompt,
        responseTime: durationMs,
        knowledgeUnitId: task?.knowledgeUnitId,
        response: result.response,
      });

      if (currentTaskIndex < currentTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        taskStartedAt.current = Date.now();
      } else {
        const accuracy = currentTasks.length > 0 ? nextCorrectCount / currentTasks.length : 0;
        const sessionStars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
        handleGameComplete({
          success: accuracy >= 0.5,
          stars: sessionStars,
          tasksCompleted: currentTasks.length,
          accuracy,
        });
        navigate('/');
      }
    },
    [currentTaskIndex, currentTasks, handleGameComplete, navigate, recordTaskResult]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (currentTasks.length === 0) {
    return <LazyFallback />;
  }

  const task = currentTasks[currentTaskIndex];

  const renderTask = () => {
    switch (task.type) {
      case 'choice':
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
      case 'match':
        return <MatchTask task={task} onComplete={handleTaskComplete} />;
      case 'micro':
        return <MicroTask task={task} onComplete={handleTaskComplete} />;
      default:
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
    }
  };

  return (
    <PageLayout maxWidth="700px">
      <GamePageHeader
        title="英语探险"
        icon="🌍"
        subtitle="学英语，看世界！✨"
        gradient="linear-gradient(135deg, #4CAF50, #81C784, #4CAF50)"
        currentTask={currentTaskIndex + 1}
        totalTasks={currentTasks.length}
        progressColor="#4CAF50"
        onBack={handleBack}
      />
      <Suspense fallback={<LazyFallback />}>{renderTask()}</Suspense>
    </PageLayout>
  );
}
