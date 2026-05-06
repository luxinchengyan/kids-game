import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { track } from '../lib/analytics';
import { FrameworkStatGrid, CompletionPanel } from '../games/frameworks/frameworkHelpers';
import { playSuccess, playError, speak } from '../lib/audio';

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
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const leftItems = useMemo(() => shuffle(pairs), [pairs]);
  const rightItems = useMemo(() => shuffle(pairs), [pairs]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    const item = pairs.find(p => p.id === id);
    if (item?.left.audio) speak(item.left.audio);
    else if (item?.left.type === 'text') speak(item.left.content);
    
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedRight(id);
    const item = pairs.find(p => p.id === id);
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
      
      if (newMatched.size === pairs.length) {
        track('game_complete', { gameId, attempts: attempts + 1 });
        setTimeout(() => finishGame(), 600);
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

  const finishGame = () => {
    setIsCompleted(true);
    const accuracy = pairs.length / Math.max(attempts, pairs.length);
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
    onComplete({
      success: true,
      stars,
      tasksCompleted: pairs.length,
      accuracy,
      xp: pairs.length * 5 + stars * 5,
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <FrameworkStatGrid
        accent={themeColor}
        surface="#FFFFFF"
        items={[
          { label: '已配对', value: `${matchedIds.size}/${pairs.length}`, note: '进度' },
          { label: '尝试次数', value: String(attempts), note: '细心观察' },
          { label: '准确率', value: `${Math.round((pairs.length / Math.max(attempts, 1)) * 100)}%`, note: '挑战自我' },
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

      {isCompleted && (
        <CompletionPanel
          emoji="🎯"
          title="完美配对！"
          summary={`你完成了 ${pairs.length} 组配对，太棒了！`}
          accent={themeColor}
          background={gradient}
        >
          <Button onClick={onBack}>完成</Button>
        </CompletionPanel>
      )}
    </div>
  );
};
