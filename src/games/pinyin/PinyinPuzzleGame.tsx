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

interface PuzzleRound {
  target: string;
  pieces: string[];
  hint: string;
  word: string;
}

const PUZZLE_BANK: PuzzleRound[] = [
  { target: 'ma', pieces: ['m', 'a'], hint: '🐴', word: '小马' },
  { target: 'gua', pieces: ['g', 'ua'], hint: '🍉', word: '西瓜' },
  { target: 'xue', pieces: ['x', 'ue'], hint: '❄️', word: '雪花' },
  { target: 'shui', pieces: ['sh', 'ui'], hint: '💧', word: '喝水' },
  { target: 'qiao', pieces: ['q', 'iao'], hint: '🌉', word: '小桥' },
  { target: 'yuan', pieces: ['y', 'uan'], hint: '🌙', word: '月圆' },
];

const TOTAL_ROUNDS = 5;

export default function PinyinPuzzleGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-puzzle');
  const [sessionSeed, setSessionSeed] = useState(0);
  const rounds = useMemo(() => sampleItems(PUZZLE_BANK, TOTAL_ROUNDS), [sessionSeed]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [completed, setCompleted] = useState(false);

  const currentRound = rounds[roundIndex];
  const availablePieces = useMemo(
    () => (currentRound ? shuffleArray(currentRound.pieces.filter((piece) => !placedPieces.includes(piece))) : []),
    [currentRound, placedPieces]
  );

  const resetRound = useCallback(() => {
    setPlacedPieces([]);
    setFeedback('idle');
  }, []);

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setPlacedPieces([]);
    setAttempts(0);
    setSolvedCount(0);
    setFeedback('idle');
    setCompleted(false);
    track('game_start', { gameId: 'pinyin-puzzle', rounds: TOTAL_ROUNDS });
  }, []);

  useEffect(() => {
    track('game_start', { gameId: 'pinyin-puzzle', rounds: TOTAL_ROUNDS });
  }, []);

  useEffect(() => {
    if (!currentRound || placedPieces.length !== currentRound.pieces.length || completed) {
      return;
    }

    const nextWord = placedPieces.join('');
    const isCorrect = nextWord === currentRound.target;
    setAttempts((value) => value + 1);
    setFeedback(isCorrect ? 'success' : 'error');

    const timer = window.setTimeout(() => {
      if (isCorrect) {
        const nextSolvedCount = solvedCount + 1;
        setSolvedCount(nextSolvedCount);
        if (roundIndex + 1 >= rounds.length) {
          const accuracy = nextSolvedCount / (attempts + 1);
          const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({
            success: true,
            stars,
            tasksCompleted: rounds.length,
            accuracy,
            xp: 28,
          });
        } else {
          setRoundIndex((value) => value + 1);
          resetRound();
        }
      } else {
        resetRound();
      }
    }, isCorrect ? 550 : 700);

    return () => window.clearTimeout(timer);
  }, [attempts, completed, currentRound, handleGameComplete, placedPieces, resetRound, roundIndex, rounds.length, solvedCount]);

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  const accuracy = attempts === 0 ? 0 : solvedCount / attempts;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : accuracy > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="860px">
      <GamePageHeader
        title="拼音拼图"
        icon="🧩"
        subtitle="把拼音碎片按顺序拼起来，让小图画回家。"
        gradient="linear-gradient(135deg, #FF7043, #FFB74D, #FFA726)"
        progressColor="#FF7043"
        onBack={handleBack}
        backLabel="← 返回拼音冒险岛"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#FFCC80" background="linear-gradient(135deg, #FFFFFF, #FFF3E0)">
        <FrameworkStatGrid
          accent="#F4511E"
          surface="#FFFFFF"
          items={[
            { label: '目标图片', value: currentRound?.hint ?? '--', note: currentRound?.word ?? '' },
            { label: '拼好数量', value: `${solvedCount}/${rounds.length}` },
            { label: '当前拼音', value: placedPieces.join('') || '◯◯' },
            { label: '准确率', value: `${Math.round(accuracy * 100)}%` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🏅' : stars === 2 ? '🌈' : '🎈'}
            title="拼图完成"
            summary={`你成功拼好了 ${rounds.length} 个拼音结构，准确率 ${Math.round(
              accuracy * 100
            )}% ，获得 ${stars} 颗星。`}
            accent="#F4511E"
            background="linear-gradient(135deg, #FFF3E0, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回岛屿
              </Button>
              <Button onClick={resetGame}>再拼一次</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                background: feedback === 'success' ? '#E8F5E9' : feedback === 'error' ? '#FFEBEE' : '#FFF8E1',
                border: `2px solid ${feedback === 'success' ? '#66BB6A' : feedback === 'error' ? '#EF5350' : '#FFCC80'}`,
                borderRadius: '20px',
                padding: '18px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '8px' }}>{currentRound?.hint}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#BF360C', marginBottom: '6px' }}>{currentRound?.word}</div>
              <div style={{ color: '#8D6E63', fontWeight: 700 }}>
                点下面的拼音碎片，按顺序拼出 <strong>{currentRound?.word}</strong> 的发音。
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.max(currentRound?.pieces.length ?? 2, 2)}, minmax(0, 1fr))`,
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              {currentRound?.pieces.map((_, index) => (
                <div
                  key={`slot-${index}`}
                  style={{
                    minHeight: '92px',
                    borderRadius: '20px',
                    border: '3px dashed #FFCC80',
                    background: '#FFFDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 900,
                    color: '#BF360C',
                  }}
                >
                  {placedPieces[index] ?? '？'}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {availablePieces.map((piece) => (
                <button
                  key={piece}
                  type="button"
                  onClick={() => setPlacedPieces((value) => [...value, piece])}
                  style={{
                    minHeight: '86px',
                    borderRadius: '18px',
                    border: '2px solid #FFCC80',
                    background: 'linear-gradient(135deg, #FFFFFF, #FFE0B2)',
                    color: '#BF360C',
                    fontSize: '30px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  {piece}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => setPlacedPieces((value) => value.slice(0, -1))} disabled={placedPieces.length === 0}>
                撤回一步
              </Button>
              <Button variant="secondary" onClick={resetRound}>
                清空
              </Button>
              <Button onClick={() => speakText(currentRound?.target ?? '')}>播放目标发音</Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
