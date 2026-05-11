import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { FrameworkStatGrid, CompletionPanel } from '../frameworks/frameworkHelpers';
import { playSuccess, playError, speak } from '../../lib/audio';
import {
  type LevelConfig,
  LevelSelectScreen,
  LevelCompleteOverlay,
  useLevelProgress,
} from './LevelSystem';

export interface MatchPair {
  id: string;
  left: {
    content: string;
    type: 'text' | 'image' | 'emoji';
    audio?: string;
  };
  right: {
    content: string;
    type: 'text' | 'image' | 'emoji';
    audio?: string;
  };
}

export interface MatchFrameworkProps {
  gameId: string;
  title: string;
  /** 全量配对数据（关卡模式或自由模式均可提供） */
  pairs: MatchPair[];
  onComplete: (result: {
    success: boolean;
    stars: number;
    tasksCompleted: number;
    accuracy: number;
    xp: number;
  }) => void;
  onBack: () => void;
  themeColor: string;
  gradient: string;
  gridCols?: number;
  /**
   * 关卡列表（可选）。
   * 提供后进入「闯关模式」：每关通过 LevelConfig.extra.pairCount 控制本关对数，
   * 通过 LevelConfig.extra.pairIds 过滤特定配对子集（字符串数组）。
   */
  levels?: LevelConfig[];
}

export const MatchFramework: React.FC<MatchFrameworkProps> = ({
  gameId,
  title,
  pairs,
  onComplete,
  onBack,
  themeColor,
  gradient,
  gridCols = 3,
  levels,
}) => {
  // 关卡模式
  const isLevelMode = Boolean(levels && levels.length > 0);
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null);
  const [phase, setPhase] = useState<'level-select' | 'playing' | 'results'>(
    isLevelMode ? 'level-select' : 'playing'
  );
  const { submitResult } = useLevelProgress(gameId, levels ?? []);

  // 当前关卡实际使用的配对列表
  const activePairs = useMemo(() => {
    if (!isLevelMode || !currentLevel) return pairs;
    const extra = currentLevel.extra ?? {};
    const pairIds = extra.pairIds as string[] | undefined;
    const pairCount = (extra.pairCount as number | undefined) ?? currentLevel.itemCount ?? pairs.length;
    let filtered = pairIds ? pairs.filter((p) => pairIds.includes(p.id)) : pairs;
    // 随机截取
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(pairCount, shuffled.length));
  }, [isLevelMode, currentLevel, pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastResult, setLastResult] = useState<{ stars: number; accuracy: number } | null>(null);

  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const leftItems = useMemo(() => shuffle(activePairs), [activePairs]);
  const rightItems = useMemo(() => shuffle(activePairs), [activePairs]);

  // Reset when activePairs change (new level started)
  useEffect(() => {
    setMatchedIds(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setAttempts(0);
    setIsCompleted(false);
    setLastResult(null);
  }, [activePairs]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    const item = activePairs.find(p => p.id === id);
    if (item?.left.audio) speak(item.left.audio);
    else if (item?.left.type === 'text') speak(item.left.content);
    
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedRight(id);
    const item = activePairs.find(p => p.id === id);
    if (item?.right.audio) speak(item.right.audio);
    else if (item?.right.type === 'text') speak(item.right.content);

    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    setAttempts(prev => prev + 1);
    if (leftId === rightId) {
      // Success
      playSuccess();
      const newMatched = new Set(matchedIds);
      newMatched.add(leftId);
      setMatchedIds(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      
      if (newMatched.size === activePairs.length) {
        track('game_complete', { gameId, attempts: attempts + 1 });
        setTimeout(() => finishGame(newMatched.size), 600);
      }
    } else {
      // Error
      playError();
      setWrongPair([leftId, rightId]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  };

  const finishGame = (matchedCount: number) => {
    const accuracy = matchedCount / Math.max(attempts + 1, matchedCount);
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
    const passed = stars >= 1;

    setLastResult({ stars, accuracy });
    setIsCompleted(true);

    // 关卡模式：持久化进度
    if (isLevelMode && currentLevel) {
      submitResult(currentLevel.id, stars, passed);
    }

    onComplete({
      success: passed,
      stars,
      tasksCompleted: matchedCount,
      accuracy,
      xp: matchedCount * 5 + stars * 5,
    });
  };

  // 关卡选择界面
  if (phase === 'level-select' && isLevelMode && levels) {
    return (
      <LevelSelectScreen
        gameId={gameId}
        levels={levels}
        onSelectLevel={(level) => {
          setCurrentLevel(level);
          setPhase('playing');
        }}
        onBack={onBack}
        themeColor={themeColor}
        title={title}
        gradient={gradient}
      />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* 关卡信息条（关卡模式时显示） */}
      {isLevelMode && currentLevel && (
        <div style={{
          background: `${themeColor}18`,
          borderRadius: '14px',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '22px' }}>{currentLevel.icon ?? '🗺️'}</span>
          <div>
            <div style={{ fontWeight: 800, color: themeColor, fontSize: '15px' }}>
              第 {currentLevel.order} 关 · {currentLevel.name}
            </div>
            {currentLevel.knowledgeScope.length > 0 && (
              <div style={{ fontSize: '12px', color: '#757575' }}>
                {currentLevel.knowledgeScope.map(t => t.label).join(' · ')}
              </div>
            )}
          </div>
        </div>
      )}

      <FrameworkStatGrid
        accent={themeColor}
        surface="#FFFFFF"
        items={[
          { label: '已配对', value: `${matchedIds.size}/${activePairs.length}`, note: '进度' },
          { label: '尝试次数', value: String(attempts), note: '细心观察' },
          { label: '准确率', value: `${Math.round((activePairs.length / Math.max(attempts, 1)) * 100)}%`, note: '挑战自我' },
        ]}
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px',
        margin: '40px 0'
      }}>
        {/* Left Column */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {leftItems.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedLeft === pair.id;
            const isWrong = wrongPair?.[0] === pair.id;

            return (
              <motion.button
                key={`left-${pair.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleLeftClick(pair.id)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: isSelected ? `4px solid ${themeColor}` : isWrong ? '4px solid #F44336' : isMatched ? '4px solid #C8E6C9' : '2px solid #E0E0E0',
                  background: isMatched ? '#F1F8E9' : isSelected ? '#E3F2FD' : '#FFFFFF',
                  cursor: isMatched ? 'default' : 'pointer',
                  opacity: isMatched ? 0.6 : 1,
                  fontSize: '24px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80px',
                  boxShadow: isSelected ? '0 8px 16px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {pair.left.type === 'emoji' ? <span style={{ fontSize: '40px' }}>{pair.left.content}</span> : pair.left.content}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {rightItems.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedRight === pair.id;
            const isWrong = wrongPair?.[1] === pair.id;

            return (
              <motion.button
                key={`right-${pair.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleRightClick(pair.id)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: isSelected ? `4px solid ${themeColor}` : isWrong ? '4px solid #F44336' : isMatched ? '4px solid #C8E6C9' : '2px solid #E0E0E0',
                  background: isMatched ? '#F1F8E9' : isSelected ? '#E3F2FD' : '#FFFFFF',
                  cursor: isMatched ? 'default' : 'pointer',
                  opacity: isMatched ? 0.6 : 1,
                  fontSize: '24px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80px',
                  boxShadow: isSelected ? '0 8px 16px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {pair.right.type === 'emoji' ? <span style={{ fontSize: '40px' }}>{pair.right.content}</span> : pair.right.content}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 关卡完成弹窗（关卡模式） */}
      {isCompleted && isLevelMode && currentLevel && levels && lastResult && (
        <LevelCompleteOverlay
          level={currentLevel}
          stars={lastResult.stars}
          accuracy={lastResult.accuracy}
          themeColor={themeColor}
          hasNextLevel={levels.findIndex((l) => l.id === currentLevel.id) < levels.length - 1}
          onNextLevel={() => {
            const idx = levels.findIndex((l) => l.id === currentLevel.id);
            if (idx < levels.length - 1) {
              setCurrentLevel(levels[idx + 1]);
              setPhase('playing');
            }
          }}
          onRetry={() => {
            setCurrentLevel({ ...currentLevel });
            setPhase('playing');
          }}
          onBackToMap={() => setPhase('level-select')}
        />
      )}

      {/* 自由模式完成面板 */}
      {isCompleted && !isLevelMode && (
        <CompletionPanel
          emoji="🎯"
          title="完美配对！"
          summary={`你完成了 ${activePairs.length} 组配对，太棒了！`}
          accent={themeColor}
          background={gradient}
        >
          <Button onClick={onBack}>完成</Button>
        </CompletionPanel>
      )}
    </div>
  );
};
