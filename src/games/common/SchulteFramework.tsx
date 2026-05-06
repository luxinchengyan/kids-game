import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { FrameworkStatGrid, CompletionPanel } from './frameworkHelpers';

export interface SchulteStage {
  id: string;
  title: string;
  gridSize: number;
  boards: number;
  targetMs: number;
  summary: string;
  difficultyLabel: string;
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
  generateContent?: (size: number) => any[]; // Default is numbers 1..N
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
  getNextTarget = (found, items) => {
    // This assumes items are sorted or sequential if numbers.
    // For general content, logic might differ.
    return found.length + 1;
  }
}: SchulteFrameworkProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [boardIndex, setBoardIndex] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [found, setFound] = useState<any[]>([]);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [flashItem, setFlashItem] = useState<any | null>(null);
  const [completedBoards, setCompletedBoards] = useState(0);

  const currentStage = stages[stageIndex];
  const totalBoards = useMemo(() => stages.reduce((sum, s) => sum + s.boards, 0), [stages]);
  const totalTargetMs = useMemo(() => stages.reduce((sum, s) => sum + s.targetMs * s.boards, 0), [stages]);

  const shuffle = (arr: any[]) => {
    const next = [...arr];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  };

  const initBoard = useCallback(() => {
    const content = generateContent(currentStage.gridSize);
    setItems(shuffle(content));
    setFound([]);
    setFlashItem(null);
  }, [currentStage, generateContent]);

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
        track('task_complete', { gameId, stageId: currentStage.id, boardIndex });
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

    if (boardIndex < currentStage.boards - 1) {
      setBoardIndex(prev => prev + 1);
    } else if (stageIndex < stages.length - 1) {
      setStageIndex(prev => prev + 1);
      setBoardIndex(0);
    } else {
      const finishedAt = Date.now();
      setEndTime(finishedAt);
      const duration = finishedAt - (startTime || finishedAt);
      
      let stars = 1;
      if (duration <= totalTargetMs && totalErrors === 0) stars = 3;
      else if (duration <= totalTargetMs * 1.4 && totalErrors <= 4) stars = 2;

      onComplete({
        success: true,
        stars,
        tasksCompleted: totalBoards,
        accuracy: (totalBoards * items.length) / (totalBoards * items.length + totalErrors),
        xp: 30 + (stars * 10),
      });
    }
  };

  const restart = () => {
    setStageIndex(0);
    setBoardIndex(0);
    setTotalErrors(0);
    setStartTime(null);
    setEndTime(null);
    setCompletedBoards(0);
    initBoard();
    track('game_start', { gameId });
  };

  return (
    <div style={{ width: '100%' }}>
      <FrameworkStatGrid
        accent={progressColor}
        surface="#FFFFFF"
        items={[
          { label: '挑战进度', value: `${completedBoards + 1}/${totalBoards}`, note: '当前关卡' },
          { label: '错误次数', value: String(totalErrors), note: '保持专注' },
          { label: '目标用时', value: `${Math.round(totalTargetMs / 1000)}s`, note: '速度挑战' },
        ]}
      />

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

      {endTime && (
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
