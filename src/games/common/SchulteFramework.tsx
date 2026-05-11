import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { FrameworkStatGrid, CompletionPanel } from '../frameworks/frameworkHelpers';
import {
  type LevelConfig,
  type KnowledgeScopeTag,
  LevelSelectScreen,
  LevelCompleteOverlay,
  useLevelProgress,
} from './LevelSystem';

export interface SchulteStage {
  id: string;
  title: string;
  gridSize: number;
  boards: number;
  targetMs: number;
  summary: string;
  difficultyLabel: string;
  /** Optional knowledge scope for this stage */
  knowledgeScope?: KnowledgeScopeTag[];
}

/** Convert a SchulteStage to a LevelConfig for LevelSystem compatibility */
function schulteStageToLevel(stage: SchulteStage, index: number): LevelConfig {
  return {
    id: stage.id,
    title: stage.title,
    description: stage.summary,
    difficulty: index === 0 ? 'easy' : index === 1 ? 'medium' : 'hard',
    itemCount: stage.boards,
    knowledgeScope: stage.knowledgeScope,
    passingStars: 1,
    extra: {
      gridSize: stage.gridSize,
      boards: stage.boards,
      targetMs: stage.targetMs,
      difficultyLabel: stage.difficultyLabel,
    },
  };
}

export interface SchulteFrameworkProps {
  gameId: string;
  title: string;
  icon: string;
  subtitle: string;
  gradient: string;
  progressColor: string;
  stages: SchulteStage[];
  onComplete: (result: {
    success: boolean;
    stars: number;
    tasksCompleted: number;
    accuracy: number;
    xp: number;
  }) => void;
  onBack: () => void;
  generateContent?: (size: number) => any[];
  renderItem?: (item: any, isFound: boolean, isFlash: boolean) => React.ReactNode;
  checkMatch?: (item: any, target: any) => boolean;
  getNextTarget?: (found: any[], items: any[]) => any;
}

export function SchulteFramework({
  gameId,
  title,
  icon,
  subtitle,
  gradient,
  progressColor,
  stages,
  onComplete,
  onBack,
  generateContent = (size) => Array.from({ length: size * size }, (_, i) => i + 1),
  renderItem,
  checkMatch = (item, target) => item === target,
  getNextTarget = (found, _items) => found.length + 1,
}: SchulteFrameworkProps) {
  // Convert stages to LevelConfig[] for LevelSystem
  const levels = useMemo(() => stages.map(schulteStageToLevel), [stages]);
  const { submitResult } = useLevelProgress(gameId, levels);

  // Level select phase — always show stage chooser first
  const [levelPhase, setLevelPhase] = useState<'level-select' | 'playing'>('level-select');
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null);
  const [lastResult, setLastResult] = useState<{ stars: number; accuracy: number } | null>(null);

  // Derive active stage from currentLevel
  const currentStage = useMemo<SchulteStage | null>(() => {
    if (!currentLevel) return null;
    return stages.find((s) => s.id === currentLevel.id) ?? null;
  }, [currentLevel, stages]);

  const [boardIndex, setBoardIndex] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [found, setFound] = useState<any[]>([]);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [flashItem, setFlashItem] = useState<any | null>(null);
  const [completedBoards, setCompletedBoards] = useState(0);

  const totalBoards = currentStage?.boards ?? 1;
  const totalTargetMs = currentStage ? currentStage.targetMs * currentStage.boards : 1;

  const shuffle = (arr: any[]) => {
    const next = [...arr];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  };

  const initBoard = useCallback(() => {
    if (!currentStage) return;
    const content = generateContent(currentStage.gridSize);
    setItems(shuffle(content));
    setFound([]);
    setFlashItem(null);
  }, [currentStage, generateContent]);

  // Reset when level changes
  useEffect(() => {
    setBoardIndex(0);
    setTotalErrors(0);
    setStartTime(null);
    setEndTime(null);
    setCompletedBoards(0);
    setLastResult(null);
  }, [currentLevel]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const handleItemClick = (item: any) => {
    if (endTime || found.includes(item)) return;

    if (!startTime) setStartTime(Date.now());

    const target = getNextTarget(found, items);
    if (checkMatch(item, target)) {
      const nextFound = [...found, item];
      setFound(nextFound);

      if (nextFound.length === items.length) {
        track('task_complete', { gameId, stageId: currentStage?.id, boardIndex });
        setTimeout(advance, 400);
      }
    } else {
      setTotalErrors(prev => prev + 1);
      setFlashItem(item);
      setTimeout(() => setFlashItem(null), 200);
    }
  };

  const advance = () => {
    const nextCompletedBoards = completedBoards + 1;
    setCompletedBoards(nextCompletedBoards);

    if (currentStage && boardIndex < currentStage.boards - 1) {
      setBoardIndex(prev => prev + 1);
    } else {
      const finishedAt = Date.now();
      setEndTime(finishedAt);
      const duration = finishedAt - (startTime || finishedAt);

      let stars = 1;
      if (duration <= totalTargetMs && totalErrors === 0) stars = 3;
      else if (duration <= totalTargetMs * 1.4 && totalErrors <= 4) stars = 2;

      const accuracy = (totalBoards * (currentStage?.gridSize ?? 5) ** 2) /
        (totalBoards * (currentStage?.gridSize ?? 5) ** 2 + totalErrors);

      if (currentLevel) {
        submitResult(currentLevel.id, {
          stars,
          accuracy,
          timeTakenMs: duration,
          taskCount: totalBoards,
        });
        setLastResult({ stars, accuracy });
      } else {
        onComplete({
          success: true,
          stars,
          tasksCompleted: totalBoards,
          accuracy,
          xp: 30 + stars * 10,
        });
      }
    }
  };

  const restart = () => {
    setBoardIndex(0);
    setTotalErrors(0);
    setStartTime(null);
    setEndTime(null);
    setCompletedBoards(0);
    setLastResult(null);
    initBoard();
    track('game_start', { gameId });
  };

  // Level select screen
  if (levelPhase === 'level-select') {
    return (
      <LevelSelectScreen
        gameId={gameId}
        levels={levels}
        title={title}
        onSelectLevel={(level) => {
          setCurrentLevel(level);
          setLevelPhase('playing');
          track('level_start', { gameId, levelId: level.id });
        }}
        onBack={onBack}
      />
    );
  }

  if (!currentStage) return null;

  return (
    <div style={{ width: '100%' }}>
      <FrameworkStatGrid
        accent={progressColor}
        surface="#FFFFFF"
        items={[
          { label: '挑战进度', value: `${completedBoards + 1}/${totalBoards}`, note: currentStage.difficultyLabel },
          { label: '错误次数', value: String(totalErrors), note: '保持专注' },
          { label: '目标用时', value: `${Math.round(totalTargetMs / 1000)}s`, note: '速度挑战' },
        ]}
      />

      {/* Level info bar */}
      {currentLevel && (
        <div style={{
          textAlign: 'center',
          padding: '8px',
          marginBottom: '8px',
          background: `${progressColor}15`,
          borderRadius: '12px',
          fontSize: '14px',
          color: progressColor,
          fontWeight: 600,
        }}>
          🎯 {currentLevel.title}
          <button
            onClick={() => { setLevelPhase('level-select'); setCurrentLevel(null); }}
            style={{ marginLeft: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#999' }}
          >
            切换关卡
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentStage.gridSize}, 1fr)`,
        gap: '12px',
        margin: '24px 0'
      }}>
        {items.map((item, idx) => {
          const isFound = found.includes(item);
          const isFlash = flashItem === item;
          return (
            <motion.button
              key={`${idx}-${item}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item)}
              style={{
                aspectRatio: '1',
                borderRadius: '16px',
                border: isFound ? '3px solid #4CAF50' : isFlash ? '3px solid #F44336' : '3px solid #E0E0E0',
                background: isFound ? '#E8F5E9' : isFlash ? '#FFEBEE' : '#FFFFFF',
                fontSize: currentStage.gridSize > 4 ? '24px' : '32px',
                fontWeight: 900,
                color: isFound ? '#2E7D32' : '#3E2723',
                cursor: isFound ? 'default' : 'pointer',
              }}
            >
              {renderItem ? renderItem(item, isFound, isFlash) : (isFound ? '✓' : item)}
            </motion.button>
          );
        })}
      </div>

      {/* Level mode complete overlay */}
      {endTime && lastResult && currentLevel && (
        <LevelCompleteOverlay
          level={currentLevel}
          stars={lastResult.stars}
          accuracy={lastResult.accuracy}
          onNext={() => {
            const idx = levels.findIndex((l) => l.id === currentLevel.id);
            if (idx < levels.length - 1) {
              setCurrentLevel(levels[idx + 1]);
              restart();
            } else {
              setLevelPhase('level-select');
              setCurrentLevel(null);
            }
          }}
          onRetry={() => restart()}
          onBackToMap={() => {
            setLevelPhase('level-select');
            setCurrentLevel(null);
          }}
        />
      )}

      {/* Fallback free-play panel (no level selected) */}
      {endTime && !currentLevel && (
        <CompletionPanel
          emoji="🏆"
          title="专注挑战完成！"
          summary={`共完成 ${totalBoards} 局，错误 ${totalErrors} 次。`}
          accent={progressColor}
          background="#FFFFFF"
        >
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={onBack}>返回</Button>
            <Button onClick={restart}>再试一次</Button>
          </div>
        </CompletionPanel>
      )}
    </div>
  );
}
