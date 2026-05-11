import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { FrameworkStatGrid, CompletionPanel } from '../frameworks/frameworkHelpers';
import {
  type LevelConfig,
  LevelSelectScreen,
  LevelCompleteOverlay,
  useLevelProgress,
} from './LevelSystem';

export interface PuzzleRound {
  id: string;
  image?: string;
  emoji?: string;
  content: string;
  pieces: any[]; // The pieces that need to be arranged
  solution: any[]; // The correct order
}

export interface PuzzleFrameworkProps {
  gameId: string;
  title: string;
  icon: string;
  subtitle: string;
  gradient: string;
  progressColor: string;
  rounds: PuzzleRound[];
  onComplete: (result: {
    success: boolean;
    stars: number;
    tasksCompleted: number;
    accuracy: number;
    xp: number;
  }) => void;
  onBack: () => void;
  renderPiece?: (piece: any, isSelected: boolean) => React.ReactNode;
  /**
   * 关卡列表（可选）。
   * 提供后进入「闯关模式」：每关通过 LevelConfig.extra.roundIds 过滤本关子集，
   * 或取全部 rounds 的前 itemCount 个。
   */
  levels?: LevelConfig[];
}

export function PuzzleFramework({
  gameId,
  title,
  icon,
  subtitle,
  gradient,
  progressColor,
  rounds,
  onComplete,
  onBack,
  renderPiece,
  levels,
}: PuzzleFrameworkProps) {
  // 关卡模式
  const isLevelMode = Boolean(levels && levels.length > 0);
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null);
  const [levelPhase, setLevelPhase] = useState<'level-select' | 'playing'>(
    isLevelMode ? 'level-select' : 'playing'
  );
  const { submitResult } = useLevelProgress(gameId, levels ?? []);

  // 当前关卡实际使用的 rounds
  const activeRounds = useMemo(() => {
    if (!isLevelMode || !currentLevel) return rounds;
    const extra = currentLevel.extra ?? {};
    const roundIds = extra.roundIds as string[] | undefined;
    const count = (extra.roundCount as number | undefined) ?? currentLevel.itemCount ?? rounds.length;
    let filtered = roundIds ? rounds.filter((r) => roundIds.includes(r.id)) : rounds;
    return filtered.slice(0, Math.min(count, filtered.length));
  }, [isLevelMode, currentLevel, rounds]);

  const [roundIndex, setRoundIndex] = useState(0);
  const [currentPieces, setCurrentPieces] = useState<any[]>([]);
  const [placedPieces, setPlacedPieces] = useState<any[]>([]);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [lastResult, setLastResult] = useState<{ stars: number; accuracy: number } | null>(null);
  const [startTime, setStartTime] = useState(Date.now());

  const currentRound = activeRounds[roundIndex];

  const shuffle = (arr: any[]) => {
    const next = [...arr];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  };

  const initRound = useCallback(() => {
    if (!currentRound) return;
    setCurrentPieces(shuffle(currentRound.pieces));
    setPlacedPieces([]);
  }, [currentRound]);

  // Reset game state when level changes
  useEffect(() => {
    setRoundIndex(0);
    setErrors(0);
    setCompleted(false);
    setLastResult(null);
    setStartTime(Date.now());
  }, [currentLevel]);

  useEffect(() => {
    initRound();
  }, [initRound]);

  const handlePieceClick = (piece: any) => {
    if (completed) return;

    const nextTarget = currentRound.solution[placedPieces.length];
    if (piece === nextTarget) {
      const nextPlaced = [...placedPieces, piece];
      setPlacedPieces(nextPlaced);
      setCurrentPieces(prev => prev.filter(p => p !== piece));

      if (nextPlaced.length === currentRound.solution.length) {
        track('task_complete', { gameId, roundIndex });
        setTimeout(advance, 600);
      }
    } else {
      setErrors(prev => prev + 1);
    }
  };

  const advance = () => {
    if (roundIndex < activeRounds.length - 1) {
      setRoundIndex(prev => prev + 1);
    } else {
      const accuracy = activeRounds.length / (activeRounds.length + errors);
      const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;

      if (isLevelMode && currentLevel) {
        submitResult(currentLevel.id, {
          stars,
          accuracy,
          timeTakenMs: Date.now() - startTime,
          taskCount: activeRounds.length,
        });
        setLastResult({ stars, accuracy });
        setCompleted(true);
      } else {
        setCompleted(true);
        onComplete({
          success: true,
          stars,
          tasksCompleted: activeRounds.length,
          accuracy,
          xp: activeRounds.length * 8,
        });
      }
    }
  };

  const restart = () => {
    setRoundIndex(0);
    setErrors(0);
    setCompleted(false);
    setLastResult(null);
    setStartTime(Date.now());
    initRound();
    track('game_start', { gameId });
  };

  // Level select screen
  if (isLevelMode && levelPhase === 'level-select') {
    return (
      <LevelSelectScreen
        gameId={gameId}
        levels={levels!}
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

  if (!currentRound) return null;

  return (
    <div style={{ width: '100%' }}>
      <FrameworkStatGrid
        accent={progressColor}
        surface="#FFFFFF"
        items={[
          { label: '关卡', value: `${roundIndex + 1}/${activeRounds.length}`, note: '拼图挑战' },
          { label: '错误', value: String(errors), note: '细心观察' },
          { label: '已放置', value: `${placedPieces.length}/${currentRound.solution.length}`, note: '拼图进度' },
        ]}
      />

      <div style={{ 
        background: '#FFFFFF', 
        borderRadius: '24px', 
        padding: '32px',
        margin: '24px 0',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: '64px' }}>{currentRound.emoji}</div>
        <h3 style={{ fontSize: '28px', color: '#3E2723', margin: 0 }}>{currentRound.content}</h3>

        {/* Target slots */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentRound.solution.map((_, i) => (
            <div key={i} style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              border: '2px dashed #BDBDBD',
              background: placedPieces[i] ? '#E8F5E9' : '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 900,
              color: '#2E7D32'
            }}>
              {placedPieces[i]}
            </div>
          ))}
        </div>

        {/* Source pieces */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {currentPieces.map((piece, i) => (
            <motion.button
              key={`${i}-${piece}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePieceClick(piece)}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                border: 'none',
                background: progressColor,
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {renderPiece ? renderPiece(piece, false) : piece}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Level mode complete overlay */}
      {isLevelMode && completed && lastResult && currentLevel && (
        <LevelCompleteOverlay
          level={currentLevel}
          stars={lastResult.stars}
          accuracy={lastResult.accuracy}
          onNext={() => {
            const idx = levels!.findIndex((l) => l.id === currentLevel.id);
            if (idx < levels!.length - 1) {
              setCurrentLevel(levels![idx + 1]);
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

      {/* Free-play complete panel */}
      {!isLevelMode && completed && (
        <CompletionPanel
          emoji="🧩"
          title="拼图达人！"
          summary={`挑战成功！共完成 ${activeRounds.length} 个拼图。`}
          accent={progressColor}
          background="#FFFFFF"
        >
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={onBack}>返回</Button>
            <Button onClick={restart}>再拼一次</Button>
          </div>
        </CompletionPanel>
      )}
    </div>
  );
}
