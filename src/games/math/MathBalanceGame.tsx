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
} from '../frameworks/frameworkHelpers';

interface BalanceRound {
  leftValues: number[];
  answer: number[];
  options: number[];
}

const ROUND_BANK: BalanceRound[] = [
  { leftValues: [2, 3], answer: [5], options: [5, 4, 1, 6] },
  { leftValues: [4, 1], answer: [2, 3], options: [2, 3, 5, 4] },
  { leftValues: [3, 3], answer: [1, 5], options: [1, 5, 6, 2] },
  { leftValues: [6, 2], answer: [4, 4], options: [4, 4, 3, 5] },
  { leftValues: [5, 4], answer: [2, 7], options: [2, 7, 5, 6] },
  { leftValues: [7, 1], answer: [3, 5], options: [3, 5, 4, 6] },
];

const TOTAL_ROUNDS = 5;

export default function MathBalanceGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-balance');
  const [sessionSeed, setSessionSeed] = useState(0);
  const rounds = useMemo(() => sampleItems(ROUND_BANK, TOTAL_ROUNDS), [sessionSeed]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [completed, setCompleted] = useState(false);

  const currentRound = rounds[roundIndex];
  const leftTotal = currentRound?.leftValues.reduce((sum, value) => sum + value, 0) ?? 0;
  const rightTotal = selectedValues.reduce((sum, value) => sum + value, 0);
  const optionPool = useMemo(() => (currentRound ? shuffleArray([...currentRound.options]) : []), [currentRound]);

  const resetRound = useCallback(() => {
    setSelectedValues([]);
    setFeedback('idle');
  }, []);

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setSelectedValues([]);
    setAttempts(0);
    setCorrectCount(0);
    setFeedback('idle');
    setCompleted(false);
    track('game_start', { gameId: 'math-balance', rounds: TOTAL_ROUNDS });
  }, []);

  useEffect(() => {
    track('game_start', { gameId: 'math-balance', rounds: TOTAL_ROUNDS });
  }, []);

  useEffect(() => {
    if (!currentRound || selectedValues.length === 0 || completed) {
      return;
    }

    const maxSelections = currentRound.answer.length;
    const isTooLarge = rightTotal > leftTotal;
    const hasEnoughValues = selectedValues.length >= maxSelections;

    if (!isTooLarge && !(hasEnoughValues && rightTotal !== leftTotal) && rightTotal !== leftTotal) {
      return;
    }

    const isCorrect =
      rightTotal === leftTotal &&
      selectedValues.length === currentRound.answer.length &&
      [...selectedValues].sort((a, b) => a - b).join(',') === [...currentRound.answer].sort((a, b) => a - b).join(',');

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setFeedback(isCorrect ? 'success' : 'error');

    const timer = window.setTimeout(() => {
      if (isCorrect) {
        const nextCorrect = correctCount + 1;
        setCorrectCount(nextCorrect);
        if (roundIndex + 1 >= rounds.length) {
          const accuracy = nextCorrect / nextAttempts;
          const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({
            success: true,
            stars,
            tasksCompleted: rounds.length,
            accuracy,
            xp: 26,
          });
        } else {
          setRoundIndex((value) => value + 1);
          resetRound();
        }
      } else {
        resetRound();
      }
    }, isCorrect ? 550 : 720);

    return () => window.clearTimeout(timer);
  }, [attempts, completed, correctCount, currentRound, handleGameComplete, leftTotal, resetRound, rightTotal, roundIndex, rounds.length, selectedValues]);

  const handleBack = useCallback(() => {
    navigate('/games/math');
  }, [navigate]);

  const accuracy = attempts === 0 ? 0 : correctCount / attempts;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : accuracy > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="比大小跷跷板"
        icon="⚖️"
        subtitle="挑对数字，让左右两边一样重。"
        gradient="linear-gradient(135deg, #42A5F5, #26C6DA, #66BB6A)"
        progressColor="#42A5F5"
        onBack={handleBack}
        backLabel="← 返回数字小镇"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#81D4FA" background="linear-gradient(135deg, #FFFFFF, #E1F5FE)">
        <FrameworkStatGrid
          accent="#0277BD"
          surface="#FFFFFF"
          items={[
            { label: '当前关卡', value: `${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}` },
            { label: '左边总和', value: `${leftTotal}` },
            { label: '右边总和', value: `${rightTotal}` },
            { label: '准确率', value: `${Math.round(accuracy * 100)}%` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🎡' : stars === 2 ? '🌟' : '👏'}
            title="平衡成功"
            summary={`你完成了 ${rounds.length} 轮数值比较，准确率 ${Math.round(
              accuracy * 100
            )}% ，获得 ${stars} 颗星。`}
            accent="#0277BD"
            background="linear-gradient(135deg, #E1F5FE, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回小镇
              </Button>
              <Button onClick={resetGame}>再平衡一次</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                borderRadius: '24px',
                padding: '20px',
                background: '#FFFFFF',
                border: `2px solid ${feedback === 'success' ? '#66BB6A' : feedback === 'error' ? '#EF5350' : '#B3E5FC'}`,
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '220px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '78px',
                    width: '78%',
                    height: '18px',
                    borderRadius: '999px',
                    background: '#4FC3F7',
                    transform: `rotate(${(rightTotal - leftTotal) * 1.6}deg)`,
                    transition: 'transform 0.25s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '44px',
                    width: '28px',
                    height: '96px',
                    borderRadius: '18px',
                    background: '#29B6F6',
                  }}
                />
                {[
                  { title: '左边', values: currentRound?.leftValues ?? [], align: 'left', color: '#42A5F5' },
                  { title: '右边', values: selectedValues, align: 'right', color: '#26C6DA' },
                ].map((side) => (
                  <div
                    key={side.title}
                    style={{
                      position: 'absolute',
                      bottom: '94px',
                      [side.align]: '8%',
                      width: '32%',
                      minHeight: '84px',
                      borderRadius: '22px',
                      background: `${side.color}18`,
                      border: `2px solid ${side.color}`,
                      padding: '12px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    {side.values.map((value, index) => (
                      <div
                        key={`${side.title}-${value}-${index}`}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '18px',
                          background: '#FFFFFF',
                          color: '#0277BD',
                          fontSize: '24px',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    {side.values.length === 0 && <div style={{ color: '#607D8B', fontWeight: 700 }}>挑数字放上来</div>}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', color: '#546E7A', fontWeight: 700 }}>
                {feedback === 'success'
                  ? '平衡啦！跷跷板稳住了。'
                  : feedback === 'error'
                    ? '这次不平衡，换一组数字试试。'
                    : `请选出 ${currentRound?.answer.length ?? 0} 个数字，让右边总和和左边一样。`}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {optionPool.map((value, index) => (
                <button
                  key={`${value}-${index}`}
                  type="button"
                  onClick={() => {
                    if ((currentRound?.answer.length ?? 0) > selectedValues.length) {
                      setSelectedValues((current) => [...current, value]);
                    }
                  }}
                  style={{
                    minHeight: '86px',
                    borderRadius: '18px',
                    border: '2px solid #81D4FA',
                    background: 'linear-gradient(135deg, #FFFFFF, #B3E5FC)',
                    color: '#0277BD',
                    fontSize: '28px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  {value}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => setSelectedValues((current) => current.slice(0, -1))} disabled={selectedValues.length === 0}>
                撤回一个
              </Button>
              <Button variant="secondary" onClick={resetRound}>
                清空重选
              </Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
