import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

type GridSize = 3 | 4 | 5;

type StageConfig = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  gridSize: GridSize;
  boards: number;
  targetMs: number;
};

const STAGES: StageConfig[] = [
  {
    id: 'scan',
    title: '热身扫描',
    difficultyLabel: '入门',
    summary: '先用较小方格熟悉顺序搜索，找稳比找快更重要。',
    gridSize: 3,
    boards: 2,
    targetMs: 15000,
  },
  {
    id: 'track',
    title: '稳定追踪',
    difficultyLabel: '进阶',
    summary: '扩大搜索范围，开始要求速度和准确率同时稳定。',
    gridSize: 4,
    boards: 2,
    targetMs: 24000,
  },
  {
    id: 'sprint',
    title: '极速冲刺',
    difficultyLabel: '挑战',
    summary: '面对最高密度数字，训练快速扫描和抑制冲动。',
    gridSize: 5,
    boards: 2,
    targetMs: 36000,
  },
];

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildGrid(size: GridSize) {
  return shuffle(Array.from({ length: size * size }, (_, index) => index + 1));
}

export default function SchulteGridGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('schulte-grid');
  const series = getGameSeriesConfig('schulte-grid');

  const [stageIndex, setStageIndex] = useState(0);
  const [boardIndex, setBoardIndex] = useState(0);
  const [numbers, setNumbers] = useState<number[]>(() => buildGrid(STAGES[0].gridSize));
  const [nextTarget, setNextTarget] = useState(1);
  const [found, setFound] = useState<number[]>([]);
  const [totalErrors, setTotalErrors] = useState(0);
  const [campaignStartedAt, setCampaignStartedAt] = useState<number | null>(null);
  const [campaignCompletedAt, setCampaignCompletedAt] = useState<number | null>(null);
  const [flashNumber, setFlashNumber] = useState<number | null>(null);
  const [completedBoards, setCompletedBoards] = useState(0);

  const currentStage = STAGES[stageIndex];
  const totalBoards = useMemo(() => STAGES.reduce((sum, stage) => sum + stage.boards, 0), []);
  const totalTargetMs = useMemo(
    () => STAGES.reduce((sum, stage) => sum + stage.targetMs * stage.boards, 0),
    []
  );
  const totalTargets = useMemo(
    () => STAGES.reduce((sum, stage) => sum + stage.gridSize * stage.gridSize * stage.boards, 0),
    []
  );
  const completionMs =
    campaignStartedAt && campaignCompletedAt ? campaignCompletedAt - campaignStartedAt : 0;

  const stars = useMemo(() => {
    if (!campaignCompletedAt || !campaignStartedAt) {
      return 0;
    }
    if (completionMs <= totalTargetMs && totalErrors === 0) {
      return 3;
    }
    if (completionMs <= totalTargetMs * 1.35 && totalErrors <= 4) {
      return 2;
    }
    return 1;
  }, [campaignCompletedAt, campaignStartedAt, completionMs, totalErrors, totalTargetMs]);

  const resetBoard = useCallback((stage: StageConfig) => {
    setNumbers(buildGrid(stage.gridSize));
    setNextTarget(1);
    setFound([]);
    setFlashNumber(null);
  }, []);

  const resetGame = useCallback(() => {
    setStageIndex(0);
    setBoardIndex(0);
    setTotalErrors(0);
    setCampaignStartedAt(null);
    setCampaignCompletedAt(null);
    setCompletedBoards(0);
    resetBoard(STAGES[0]);
    track('game_start', { gameId: 'schulte-grid', stages: STAGES.length, totalBoards });
  }, [resetBoard, totalBoards]);

  const handleBack = useCallback(() => {
    navigate('/games/frameworks');
  }, [navigate]);

  const handleBoardComplete = useCallback(() => {
    const nextCompletedBoards = completedBoards + 1;
    setCompletedBoards(nextCompletedBoards);

    const isLastBoardInStage = boardIndex >= currentStage.boards - 1;
    const isLastStage = stageIndex >= STAGES.length - 1;

    if (isLastBoardInStage && isLastStage) {
      const finishedAt = Date.now();
      setCampaignCompletedAt(finishedAt);
      const accuracy = totalTargets / Math.max(totalTargets + totalErrors, 1);
      handleGameComplete({
        success: true,
        stars:
          finishedAt - (campaignStartedAt ?? finishedAt) <= totalTargetMs && totalErrors === 0
            ? 3
            : finishedAt - (campaignStartedAt ?? finishedAt) <= totalTargetMs * 1.35 && totalErrors <= 4
              ? 2
              : 1,
        tasksCompleted: totalBoards,
        accuracy,
        xp: 30,
      });
      return;
    }

    if (isLastBoardInStage) {
      const nextStage = STAGES[stageIndex + 1];
      setStageIndex((value) => value + 1);
      setBoardIndex(0);
      resetBoard(nextStage);
      return;
    }

    setBoardIndex((value) => value + 1);
    resetBoard(currentStage);
  }, [
    boardIndex,
    campaignStartedAt,
    completedBoards,
    currentStage,
    handleGameComplete,
    resetBoard,
    stageIndex,
    totalBoards,
    totalErrors,
    totalTargets,
    totalTargetMs,
  ]);

  const handleNumberClick = useCallback(
    (value: number) => {
      if (campaignCompletedAt || found.includes(value)) {
        return;
      }

      if (!campaignStartedAt) {
        setCampaignStartedAt(Date.now());
      }

      if (value === nextTarget) {
        const nextFound = [...found, value];
        const targetAfterClick = nextTarget + 1;
        setFound(nextFound);
        setNextTarget(targetAfterClick);

        if (targetAfterClick > currentStage.gridSize * currentStage.gridSize) {
          track('task_complete', {
            success: true,
            gameId: 'schulte-grid',
            stageId: currentStage.id,
            boardIndex: boardIndex + 1,
          });

          window.setTimeout(() => {
            handleBoardComplete();
          }, 420);
        }
      } else {
        setTotalErrors((current) => current + 1);
        setFlashNumber(value);
        window.setTimeout(() => setFlashNumber(null), 220);
      }
    },
    [
      boardIndex,
      campaignCompletedAt,
      campaignStartedAt,
      currentStage.gridSize,
      currentStage.id,
      found,
      handleBoardComplete,
      nextTarget,
    ]
  );

  return (
    <PageLayout maxWidth="940px">
      <GamePageHeader
        title="舒尔特方格"
        icon="🧠"
        subtitle="把专注训练从单局体验升级成 3 段连续冲刺营。"
        gradient="linear-gradient(135deg, #E91E63, #F06292, #FFB74D)"
        progressColor="#E91E63"
        onBack={handleBack}
        backLabel="← 返回设计工坊"
        currentTask={Math.min(completedBoards + 1, totalBoards)}
        totalTasks={totalBoards}
      />

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          {[
            { label: '系列路线', value: series?.progressionLabel ?? '三段训练', note: series?.arcTitle },
            {
              label: '当前级别',
              value: `${currentStage.difficultyLabel} · ${stageIndex + 1}/${STAGES.length}`,
              note: currentStage.title,
            },
            {
              label: '当前棋盘',
              value: `${boardIndex + 1}/${currentStage.boards}`,
              note: `${currentStage.gridSize} x ${currentStage.gridSize}`,
            },
            { label: '错误次数', value: String(totalErrors), note: `目标 ${Math.round(totalTargetMs / 1000)} 秒内` },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#FFF3E0',
                borderRadius: '18px',
                padding: '16px',
                textAlign: 'center',
                border: '2px solid #FFE0B2',
              }}
            >
              <div style={{ color: '#8D6E63', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#E91E63', fontWeight: 900, fontSize: '28px' }}>{item.value}</div>
              {item.note && <div style={{ marginTop: '6px', color: '#6D4C41', fontSize: '12px' }}>{item.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {STAGES.map((stage, index) => {
            const active = index === stageIndex && !campaignCompletedAt;
            const done = index < stageIndex || !!campaignCompletedAt;
            return (
              <div
                key={stage.id}
                style={{
                  flex: '1 1 190px',
                  borderRadius: '18px',
                  padding: '14px',
                  background: active
                    ? 'linear-gradient(135deg, #FCE4EC, #FFFFFF)'
                    : done
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${active ? '#F48FB1' : done ? '#81C784' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#8D6E63', marginBottom: '4px' }}>
                  第 {index + 1} 站 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#AD1457', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#6D4C41', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${currentStage.gridSize}, minmax(0, 1fr))`,
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {numbers.map((value) => {
            const isFound = found.includes(value);
            const isFlash = flashNumber === value;
            return (
              <motion.button
                key={value}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNumberClick(value)}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '20px',
                  border: isFound ? '3px solid #66BB6A' : isFlash ? '3px solid #E53935' : '3px solid #F8BBD0',
                  background: isFound
                    ? 'linear-gradient(135deg, #E8F5E9, #C8E6C9)'
                    : isFlash
                      ? 'linear-gradient(135deg, #FFEBEE, #FFCDD2)'
                      : 'linear-gradient(135deg, #FFFFFF, #FFF8E1)',
                  fontSize: currentStage.gridSize === 5 ? '24px' : '32px',
                  fontWeight: 900,
                  color: isFound ? '#2E7D32' : '#5D4037',
                  cursor: 'pointer',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
                }}
              >
                {isFound ? '✓' : value}
              </motion.button>
            );
          })}
        </div>

        {campaignCompletedAt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, #FCE4EC, #FFF3E0)',
              borderRadius: '20px',
              padding: '24px',
              border: '3px solid #F48FB1',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '52px', marginBottom: '10px' }}>{stars === 3 ? '🏆' : stars === 2 ? '⭐' : '👏'}</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#AD1457' }}>专注力冲刺营完成啦！</h3>
            <p style={{ margin: '0 0 16px 0', color: '#6D4C41', fontWeight: 700, lineHeight: 1.7 }}>
              共完成 <strong>{totalBoards}</strong> 局，用时 <strong>{(completionMs / 1000).toFixed(1)} 秒</strong>，
              错误 <strong>{totalErrors}</strong> 次，获得 <strong>{stars}</strong> 颗星。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回工坊
              </Button>
              <Button onClick={resetGame}>再挑战一次</Button>
            </div>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={resetGame}>
              重新开始系列
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
