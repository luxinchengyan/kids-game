import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import {
  CompletionPanel,
  FrameworkPanel,
  FrameworkStatGrid,
  sampleItems,
  shuffleArray,
  speakText,
} from '../frameworks/frameworkHelpers';

interface BingoItem {
  id: string;
  word: string;
  emoji: string;
  meaning: string;
}

const WORD_BANK: BingoItem[] = [
  { id: 'cat', word: 'cat', emoji: '🐱', meaning: '小猫' },
  { id: 'dog', word: 'dog', emoji: '🐶', meaning: '小狗' },
  { id: 'sun', word: 'sun', emoji: '☀️', meaning: '太阳' },
  { id: 'fish', word: 'fish', emoji: '🐟', meaning: '小鱼' },
  { id: 'book', word: 'book', emoji: '📚', meaning: '书本' },
  { id: 'cake', word: 'cake', emoji: '🎂', meaning: '蛋糕' },
  { id: 'ball', word: 'ball', emoji: '⚽', meaning: '球' },
  { id: 'bird', word: 'bird', emoji: '🐦', meaning: '小鸟' },
  { id: 'moon', word: 'moon', emoji: '🌙', meaning: '月亮' },
  { id: 'star', word: 'star', emoji: '⭐', meaning: '星星' },
  { id: 'tree', word: 'tree', emoji: '🌳', meaning: '大树' },
  { id: 'frog', word: 'frog', emoji: '🐸', meaning: '青蛙' },
];

function hasBingo(markedIndexes: number[]) {
  const marked = new Set(markedIndexes);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return lines.some((line) => line.every((index) => marked.has(index)));
}

export default function EnglishBingoGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('english-bingo');
  const [sessionSeed, setSessionSeed] = useState(0);
  const boardItems = useMemo(() => sampleItems(WORD_BANK, 9), [sessionSeed]);
  const callOrder = useMemo(() => shuffleArray(boardItems), [boardItems]);
  const [currentCallIndex, setCurrentCallIndex] = useState(0);
  const [markedIds, setMarkedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<'idle' | 'success' | 'error'>('idle');

  const currentCall = callOrder[currentCallIndex];
  const markedIndexes = markedIds
    .map((id) => boardItems.findIndex((item) => item.id === id))
    .filter((index) => index >= 0);

  useEffect(() => {
    track('game_start', { gameId: 'english-bingo', cells: 9 });
  }, [sessionSeed]);

  useEffect(() => {
    if (currentCall && !completed) {
      speakText(currentCall.word, 'en-US');
    }
  }, [completed, currentCall]);

  const finishGame = useCallback(
    (finalMarkedIds: string[]) => {
      const finalIndexes = finalMarkedIds
        .map((id) => boardItems.findIndex((item) => item.id === id))
        .filter((index) => index >= 0);
      const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
      const accuracy = finalMarkedIds.length / (finalMarkedIds.length + mistakes);
      setCompleted(true);
      handleGameComplete({
        success: hasBingo(finalIndexes),
        stars,
        tasksCompleted: finalMarkedIds.length,
        accuracy,
        xp: 26,
      });
    },
    [boardItems, handleGameComplete, mistakes]
  );

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setCurrentCallIndex(0);
    setMarkedIds([]);
    setMistakes(0);
    setCompleted(false);
    setLastFeedback('idle');
  }, []);

  const handleBack = useCallback(() => {
    navigate('/games/english');
  }, [navigate]);

  const handleCellClick = useCallback(
    (item: BingoItem) => {
      if (!currentCall || completed || markedIds.includes(item.id)) {
        return;
      }

      if (item.id === currentCall.id) {
        const nextMarked = [...markedIds, item.id];
        setMarkedIds(nextMarked);
        setLastFeedback('success');

        const nextIndexes = nextMarked
          .map((id) => boardItems.findIndex((boardItem) => boardItem.id === id))
          .filter((index) => index >= 0);

        if (hasBingo(nextIndexes) || currentCallIndex + 1 >= callOrder.length) {
          finishGame(nextMarked);
        } else {
          setCurrentCallIndex((value) => value + 1);
        }
      } else {
        setMistakes((value) => value + 1);
        setLastFeedback('error');
      }
    },
    [boardItems, callOrder.length, completed, currentCall, currentCallIndex, finishGame, markedIds]
  );

  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <PageLayout maxWidth="920px">
      <GamePageHeader
        title="英语宾果"
        icon="🎯"
        subtitle="听单词，找到对应图片，先连成一条线就 Bingo！"
        gradient="linear-gradient(135deg, #43A047, #66BB6A, #26A69A)"
        progressColor="#43A047"
        onBack={handleBack}
        backLabel="← 返回英语游乐园"
      />

      <FrameworkPanel borderColor="#A5D6A7" background="linear-gradient(135deg, #FFFFFF, #F1F8E9)">
        <FrameworkStatGrid
          accent="#2E7D32"
          surface="#FFFFFF"
          items={[
            { label: '已标记', value: `${markedIds.length}/9` },
            { label: '当前词', value: currentCall?.word.toUpperCase() ?? 'BINGO' },
            { label: '错误次数', value: String(mistakes) },
            { label: '评级', value: `${completed ? stars : '--'} 星` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji="🎉"
            title="Bingo 成功"
            summary={`你成功连成一线，共标记 ${markedIds.length} 个单词，拿到 ${stars} 颗星。`}
            accent="#2E7D32"
            background="linear-gradient(135deg, #E8F5E9, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回乐园
              </Button>
              <Button onClick={resetGame}>再来一局</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                background: lastFeedback === 'success' ? '#E8F5E9' : lastFeedback === 'error' ? '#FFEBEE' : '#F1F8E9',
                borderRadius: '22px',
                padding: '18px',
                border: `2px solid ${lastFeedback === 'success' ? '#66BB6A' : lastFeedback === 'error' ? '#EF5350' : '#C5E1A5'}`,
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '18px', color: '#2E7D32', fontWeight: 800, marginBottom: '8px' }}>Teacher says...</div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#1B5E20', marginBottom: '6px' }}>
                {currentCall?.word.toUpperCase()}
              </div>
              <div style={{ color: '#558B2F', fontWeight: 700, marginBottom: '12px' }}>{currentCall?.meaning}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Button variant="secondary" onClick={() => speakText(currentCall?.word ?? '', 'en-US')}>
                  再听一次
                </Button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              {boardItems.map((item) => {
                const marked = markedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCellClick(item)}
                    style={{
                      minHeight: '140px',
                      borderRadius: '22px',
                      border: marked ? '3px solid #43A047' : '2px solid #C5E1A5',
                      background: marked ? 'linear-gradient(135deg, #C8E6C9, #E8F5E9)' : '#FFFFFF',
                      cursor: marked ? 'default' : 'pointer',
                      boxShadow: '0 8px 18px rgba(76, 175, 80, 0.08)',
                    }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>{item.emoji}</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#1B5E20', marginBottom: '6px' }}>
                      {item.word.toUpperCase()}
                    </div>
                    <div style={{ color: '#558B2F', fontWeight: 700 }}>{item.meaning}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
