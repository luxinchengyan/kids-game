/**
 * 统一练习
 * 混合声母 + 韵母 + 整体认读音节，随机出题，选择正确汉字/发音
 * 每轮 10 题，完成后显示成绩
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { speak } from '../../lib/audio';
import { track } from '../../lib/analytics';
import { INITIALS, ALL_FINALS, WHOLE_SYLLABLES, type PinyinItem } from './pinyinData';

const ALL_ITEMS = [...INITIALS, ...ALL_FINALS, ...WHOLE_SYLLABLES];
const ROUND_SIZE = 10;

type Question = {
  target: PinyinItem;
  choices: PinyinItem[];
  mode: 'pinyin2hanzi' | 'hanzi2pinyin';
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function buildQuestion(target: PinyinItem, mode: Question['mode']): Question {
  // 4 choices: target + 3 distractors
  const pool = ALL_ITEMS.filter((x) => x.pinyin !== target.pinyin);
  const distractors = sample(pool, 3);
  const choices = shuffle([target, ...distractors]);
  return { target, choices, mode };
}

function buildRound(): Question[] {
  const targets = sample(ALL_ITEMS, ROUND_SIZE);
  return targets.map((t, i) => buildQuestion(t, i % 2 === 0 ? 'pinyin2hanzi' : 'hanzi2pinyin'));
}

// ── 选项按钮 ─────────────────────────────────────────────────
type OptionState = 'idle' | 'correct' | 'wrong';

function ChoiceButton({
  item,
  state,
  mode,
  onClick,
}: {
  item: PinyinItem;
  state: OptionState;
  mode: Question['mode'];
  onClick: () => void;
}) {
  const bg =
    state === 'correct'
      ? 'linear-gradient(135deg, #4CAF50, #81C784)'
      : state === 'wrong'
        ? 'linear-gradient(135deg, #F44336, #EF9A9A)'
        : 'linear-gradient(135deg, #FFFFFF, #FFF8E1)';
  const textColor = state !== 'idle' ? '#FFFFFF' : '#3E2723';
  const label = mode === 'pinyin2hanzi' ? item.hanzi : item.pinyin;

  return (
    <motion.button
      type="button"
      whileHover={state === 'idle' ? { scale: 1.04, y: -3 } : {}}
      whileTap={state === 'idle' ? { scale: 0.96 } : {}}
      onClick={state === 'idle' ? onClick : undefined}
      style={{
        padding: '18px 12px',
        borderRadius: '18px',
        border: `2px solid ${state === 'correct' ? '#4CAF50' : state === 'wrong' ? '#F44336' : 'rgba(255,152,0,0.25)'}`,
        background: bg,
        color: textColor,
        fontSize: mode === 'pinyin2hanzi' ? '28px' : '22px',
        fontWeight: 900,
        cursor: state === 'idle' ? 'pointer' : 'default',
        width: '100%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
        fontFamily: mode === 'hanzi2pinyin' ? 'monospace' : 'inherit',
      }}
    >
      {label}
      {state !== 'idle' && (
        <span style={{ marginLeft: '8px', fontSize: '18px' }}>
          {state === 'correct' ? '✓' : '✗'}
        </span>
      )}
    </motion.button>
  );
}

// ── 结果面板 ─────────────────────────────────────────────────
function ResultPanel({
  correct,
  total,
  onRetry,
  onBack,
}: {
  correct: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFFDE7, #FFFFFF)',
        borderRadius: '30px',
        padding: '40px 28px',
        boxShadow: '0 20px 48px rgba(0,0,0,0.1)',
        border: '2px solid rgba(255,152,0,0.25)',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '12px' }}>
        {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
      </div>
      <div style={{ fontSize: '42px', fontWeight: 900, color: '#FF9800', marginBottom: '8px' }}>
        {correct} / {total}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#6D4C41', marginBottom: '28px' }}>
        {pct >= 90 ? '太棒了！全部掌握 🎉' : pct >= 70 ? '不错，继续加油！💪' : '多练几次就好啦 📚'}
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          style={{
            padding: '14px 32px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 8px 18px rgba(255,152,0,0.3)',
          }}
        >
          再来一轮 🔄
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          style={{
            padding: '14px 32px',
            borderRadius: '16px',
            border: 'none',
            background: '#ECEFF1',
            color: '#546E7A',
            fontSize: '16px',
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          返回
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── 主组件 ───────────────────────────────────────────────────
export default function PinyinUnifiedPractice() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-unified-practice');

  const [questions, setQuestions] = useState<Question[]>(() => buildRound());
  const [qIdx, setQIdx] = useState(0);
  const [optionStates, setOptionStates] = useState<Record<string, OptionState>>({});
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = questions[qIdx];

  // Auto-speak question when it appears
  useEffect(() => {
    if (!current) return;
    if (current.mode === 'hanzi2pinyin') {
      speak(current.target.hanzi, 'zh-CN');
    } else {
      speak(current.target.pinyin);
    }
  }, [qIdx, questions]);

  const handleChoiceClick = useCallback(
    (chosen: PinyinItem) => {
      if (answered) return;
      const isCorrect = chosen.pinyin === current.target.pinyin;
      setAnswered(true);
      const newStates: Record<string, OptionState> = {};
      current.choices.forEach((c) => {
        if (c.pinyin === current.target.pinyin) newStates[c.pinyin] = 'correct';
        else if (c.pinyin === chosen.pinyin) newStates[c.pinyin] = 'wrong';
        else newStates[c.pinyin] = 'idle';
      });
      setOptionStates(newStates);
      if (isCorrect) {
        setCorrectCount((n) => n + 1);
      } else {
        speak(current.target.pinyin);
      }
      track('pinyin_practice_answer', { pinyin: current.target.pinyin, correct: isCorrect });

      nextTimer.current = setTimeout(() => {
        const nextIdx = qIdx + 1;
        if (nextIdx >= ROUND_SIZE) {
          setDone(true);
          handleGameComplete({ stars: isCorrect ? 3 : 2, correct: correctCount + (isCorrect ? 1 : 0), total: ROUND_SIZE });
        } else {
          setQIdx(nextIdx);
          setOptionStates({});
          setAnswered(false);
        }
      }, 1100);
    },
    [answered, current, qIdx, correctCount, handleGameComplete],
  );

  const handleRetry = useCallback(() => {
    if (nextTimer.current) clearTimeout(nextTimer.current);
    setQuestions(buildRound());
    setQIdx(0);
    setOptionStates({});
    setAnswered(false);
    setCorrectCount(0);
    setDone(false);
  }, []);

  const handleBack = useCallback(() => navigate('/games/pinyin'), [navigate]);

  return (
    <PageLayout maxWidth="680px">
      <GamePageHeader
        title="统一练习"
        icon="📝"
        subtitle="声母 · 韵母 · 整体认读混合练习，每轮 10 题"
        gradient="linear-gradient(135deg, #2196F3, #64B5F6)"
        progressColor="#2196F3"
        currentTask={done ? ROUND_SIZE : qIdx}
        totalTasks={ROUND_SIZE}
        onBack={handleBack}
      />

      <AnimatePresence mode="wait">
        {done ? (
          <ResultPanel
            key="result"
            correct={correctCount}
            total={ROUND_SIZE}
            onRetry={handleRetry}
            onBack={handleBack}
          />
        ) : (
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F3F7FF)',
                borderRadius: '28px',
                padding: '32px 28px',
                boxShadow: '0 16px 36px rgba(33,150,243,0.1)',
                border: '2px solid rgba(33,150,243,0.15)',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              {/* Progress */}
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#90A4AE',
                  marginBottom: '12px',
                }}
              >
                第 {qIdx + 1} / {ROUND_SIZE} 题
              </div>

              {/* Prompt */}
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1565C0',
                  marginBottom: '10px',
                }}
              >
                {current.mode === 'pinyin2hanzi' ? '这个拼音读哪个字？' : '选出正确的拼音'}
              </div>

              {/* Target */}
              <div
                style={{
                  fontSize: current.mode === 'pinyin2hanzi' ? '72px' : '56px',
                  fontWeight: 900,
                  color: '#1565C0',
                  lineHeight: 1.1,
                  fontFamily: current.mode === 'pinyin2hanzi' ? 'monospace' : 'inherit',
                  marginBottom: '8px',
                }}
              >
                {current.mode === 'pinyin2hanzi' ? current.target.pinyin : current.target.hanzi}
              </div>
              <div style={{ fontSize: '36px' }}>{current.target.emoji}</div>
            </div>

            {/* Choices */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {current.choices.map((c) => (
                <ChoiceButton
                  key={c.pinyin}
                  item={c}
                  mode={current.mode}
                  state={optionStates[c.pinyin] ?? 'idle'}
                  onClick={() => handleChoiceClick(c)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
