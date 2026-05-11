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
  shuffleArray,
} from '../frameworks/frameworkHelpers';

type Difficulty = 'easy' | 'medium' | 'hard';

interface BalanceRound {
  leftValues: number[];
  answer: number[];
  options: number[];
}

// ── 随机题目生成器 ──────────────────────────────────────────────
// 知识点覆盖范围：
//   简单：2个数相加，和在 2–12；右边放 1 个数
//   中等：2个数相加，和在 8–20；右边放 2 个数
//   困难：3个数相加，和在 15–30；右边放 3 个数

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** 把 total 拆成 n 个在 [min,max] 范围内的整数（每次随机） */
function splitIntoN(total: number, n: number, min: number, max: number): number[] {
  if (n === 1) return [total];
  const parts: number[] = [];
  let remaining = total;
  for (let i = 0; i < n - 1; i++) {
    const lo = Math.max(min, remaining - (n - i - 1) * max);
    const hi = Math.min(max, remaining - (n - i - 1) * min);
    if (lo > hi) return Array(n).fill(Math.round(total / n)); // 兜底
    const part = randInt(lo, hi);
    parts.push(part);
    remaining -= part;
  }
  if (remaining < min || remaining > max) return Array(n).fill(Math.round(total / n));
  parts.push(remaining);
  return parts;
}

/** 生成 count 个干扰项（不与 answers 重复） */
function makeDistractors(answers: number[], min: number, max: number, count: number): number[] {
  const used = new Set(answers);
  const result: number[] = [];
  // 优先生成贴近答案的数字，增加难度
  for (const a of answers) {
    for (const delta of [-2, -1, 1, 2, 3, -3]) {
      const c = a + delta;
      if (c >= min && c <= max && !used.has(c) && result.length < count) {
        result.push(c);
        used.add(c);
      }
    }
  }
  // 不够时随机补充
  let safety = 0;
  while (result.length < count && safety++ < 200) {
    const c = randInt(min, max);
    if (!used.has(c)) { result.push(c); used.add(c); }
  }
  return result;
}

const DIFF_CFG = {
  easy:   { leftCount: 2, leftMin: 1, leftMax: 6,  answerCount: 1, answerMin: 1, answerMax: 12, distractors: 3 },
  medium: { leftCount: 2, leftMin: 3, leftMax: 10, answerCount: 2, answerMin: 2, answerMax: 12, distractors: 4 },
  hard:   { leftCount: 3, leftMin: 4, leftMax: 10, answerCount: 3, answerMin: 3, answerMax: 12, distractors: 3 },
} as const;

function generateRound(difficulty: Difficulty, usedTotals: Set<number>): BalanceRound {
  const cfg = DIFF_CFG[difficulty];
  let leftValues: number[];
  let leftTotal: number;
  let tries = 0;
  // 保证题目左边的和不重复（最多尝试 30 次）
  do {
    leftValues = Array.from({ length: cfg.leftCount }, () => randInt(cfg.leftMin, cfg.leftMax));
    leftTotal = leftValues.reduce((s, v) => s + v, 0);
    tries++;
  } while (usedTotals.has(leftTotal) && tries < 30);
  usedTotals.add(leftTotal);

  const answer = splitIntoN(leftTotal, cfg.answerCount, cfg.answerMin, cfg.answerMax);
  const distractors = makeDistractors(answer, cfg.answerMin, cfg.answerMax, cfg.distractors);
  const options = shuffleArray([...answer, ...distractors]);
  return { leftValues, answer, options };
}

/** 生成一局所有题目（保证左边总和各不相同） */
function buildSession(difficulty: Difficulty, count: number): BalanceRound[] {
  const usedTotals = new Set<number>();
  return Array.from({ length: count }, () => generateRound(difficulty, usedTotals));
}

const DIFFICULTY_META: Record<Difficulty, { label: string; emoji: string; rounds: number; color: string }> = {
  easy:   { label: '简单', emoji: '🌟', rounds: 5, color: '#43A047' },
  medium: { label: '中等', emoji: '⭐', rounds: 6, color: '#FB8C00' },
  hard:   { label: '困难', emoji: '🔥', rounds: 7, color: '#E53935' },
};

// 积分规则：首次答对 10 分，第二次 7 分，第三次及以上 4 分
const calcRoundScore = (roundAttempts: number) =>
  roundAttempts === 1 ? 10 : roundAttempts === 2 ? 7 : 4;

export default function MathBalanceGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-balance');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [sessionSeed, setSessionSeed] = useState(0);

  const meta = DIFFICULTY_META[difficulty];
  const rounds = useMemo(
    () => buildSession(difficulty, meta.rounds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionSeed, difficulty]
  );

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundAttempts, setRoundAttempts] = useState(1); // 当前题已用次数
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [completed, setCompleted] = useState(false);

  const currentRound = rounds[roundIndex];
  const leftTotal = currentRound?.leftValues.reduce((sum, value) => sum + value, 0) ?? 0;
  const rightTotal = selectedValues.reduce((sum, value) => sum + value, 0);
  const optionPool = useMemo(
    () => (currentRound ? shuffleArray([...currentRound.options]) : []),
    [currentRound]
  );

  const resetRound = useCallback(() => {
    setSelectedValues([]);
    setFeedback('idle');
  }, []);

  const resetGame = useCallback(
    (nextDifficulty: Difficulty = difficulty) => {
      setDifficulty(nextDifficulty);
      setSessionSeed((v) => v + 1);
      setRoundIndex(0);
      setSelectedValues([]);
      setTotalAttempts(0);
      setRoundAttempts(1);
      setCorrectCount(0);
      setScore(0);
      setFeedback('idle');
      setCompleted(false);
      track('game_start', { gameId: 'math-balance', difficulty: nextDifficulty });
    },
    [difficulty]
  );

  useEffect(() => {
    track('game_start', { gameId: 'math-balance', difficulty, rounds: meta.rounds });
  }, []);

  useEffect(() => {
    if (!currentRound || selectedValues.length === 0 || completed) return;

    const maxSelections = currentRound.answer.length;
    const isTooLarge = rightTotal > leftTotal;
    const hasEnoughValues = selectedValues.length >= maxSelections;

    if (!isTooLarge && !(hasEnoughValues && rightTotal !== leftTotal) && rightTotal !== leftTotal) {
      return;
    }

    const isCorrect =
      rightTotal === leftTotal &&
      selectedValues.length === currentRound.answer.length &&
      [...selectedValues].sort((a, b) => a - b).join(',') ===
        [...currentRound.answer].sort((a, b) => a - b).join(',');

    setTotalAttempts((v) => v + 1);
    setFeedback(isCorrect ? 'success' : 'error');

    const timer = window.setTimeout(() => {
      if (isCorrect) {
        const earned = calcRoundScore(roundAttempts);
        const nextScore = score + earned;
        const nextCorrect = correctCount + 1;
        setScore(nextScore);
        setCorrectCount(nextCorrect);
        setRoundAttempts(1);
        if (roundIndex + 1 >= rounds.length) {
          const nextTotal = totalAttempts + 1;
          const accuracy = nextCorrect / nextTotal;
          const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({ success: true, stars, tasksCompleted: rounds.length, accuracy, xp: 26 });
        } else {
          setRoundIndex((v) => v + 1);
          resetRound();
        }
      } else {
        setRoundAttempts((v) => v + 1);
        resetRound();
      }
    }, isCorrect ? 550 : 720);

    return () => window.clearTimeout(timer);
  }, [completed, correctCount, currentRound, handleGameComplete, leftTotal, resetRound, rightTotal, roundAttempts, roundIndex, rounds.length, score, selectedValues, totalAttempts]);

  const handleBack = useCallback(() => navigate('/games/math'), [navigate]);

  const accuracy = totalAttempts === 0 ? 0 : correctCount / totalAttempts;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : accuracy > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="比大小跷跷板"
        icon="⚖️"
        subtitle="挑对数字，让左右两边一样重。首次答对得10分，第二次7分，之后4分；准确率95%以上得三星。"
        gradient="linear-gradient(135deg, #42A5F5, #26C6DA, #66BB6A)"
        progressColor="#42A5F5"
        onBack={handleBack}
        backLabel="← 返回数字小镇"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#81D4FA" background="linear-gradient(135deg, #FFFFFF, #E1F5FE)">
        {/* 难度选择 */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
            const dm = DIFFICULTY_META[d];
            return (
              <button
                key={d}
                type="button"
                onClick={() => resetGame(d)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: `2px solid ${dm.color}`,
                  background: difficulty === d ? dm.color : 'transparent',
                  color: difficulty === d ? '#fff' : dm.color,
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {dm.emoji} {dm.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => resetGame()}
            style={{
              marginLeft: 'auto',
              padding: '8px 18px',
              borderRadius: '20px',
              border: '2px solid #90A4AE',
              background: 'transparent',
              color: '#546E7A',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            🔄 重新开始
          </button>
        </div>

        <FrameworkStatGrid
          accent="#0277BD"
          surface="#FFFFFF"
          items={[
            { label: '当前关卡', value: `${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}` },
            { label: '左边总和', value: `${leftTotal}` },
            { label: '右边总和', value: `${rightTotal}` },
            { label: '积分', value: `🏆 ${score}` },
            { label: '准确率', value: `${Math.round(accuracy * 100)}%` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🎡' : stars === 2 ? '🌟' : '👏'}
            title="平衡成功"
            summary={`完成 ${rounds.length} 轮数值比较，准确率 ${Math.round(accuracy * 100)}%，本局积分 ${score} 分，获得 ${stars} 颗星。`}
            accent="#0277BD"
            background="linear-gradient(135deg, #E1F5FE, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>返回小镇</Button>
              <Button onClick={() => resetGame()}>再来一局</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            {/* 跷跷板 */}
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
                  { title: '左边', values: currentRound?.leftValues ?? [], align: 'left',  color: '#42A5F5' },
                  { title: '右边', values: selectedValues,                  align: 'right', color: '#26C6DA' },
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
                      gap: '8px',
                    }}
                  >
                    {side.values.map((value, index) => (
                      <div
                        key={`${side.title}-${value}-${index}`}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: '#FFFFFF',
                          color: '#0277BD',
                          fontSize: '22px',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    {side.values.length === 0 && (
                      <div style={{ color: '#607D8B', fontWeight: 700, fontSize: '13px' }}>放数字</div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', color: '#546E7A', fontWeight: 700 }}>
                {feedback === 'success'
                  ? '平衡啦！跷跷板稳住了 🎉'
                  : feedback === 'error'
                    ? '这次不平衡，换一组数字试试。'
                    : `请选出 ${currentRound?.answer.length ?? 0} 个数字，让右边和左边一样重。`}
              </div>
            </div>

            {/* 选项 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '12px',
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
                    minHeight: '80px',
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

            {/* 操作按钮 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                onClick={() => setSelectedValues((current) => current.slice(0, -1))}
                disabled={selectedValues.length === 0}
              >
                撤回一个
              </Button>
              <Button variant="secondary" onClick={resetRound}>
                清空重选
              </Button>
              <Button variant="secondary" onClick={() => resetGame()}>
                重新开始
              </Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
