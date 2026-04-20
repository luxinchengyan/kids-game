/**
 * 拼音训练
 * 快速反应训练：屏幕展示拼音，用户快速点击对应汉字（4 选 1）
 * 计时 60 秒，尽量多答。正确 +1，错误不扣分但有视觉反馈。
 * 连续答对增加 combo 奖励
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { speak } from '../../lib/audio';
import { track } from '../../lib/analytics';
import { INITIALS, ALL_FINALS, WHOLE_SYLLABLES, type PinyinItem } from './pinyinData';

const POOL = [...INITIALS, ...ALL_FINALS, ...WHOLE_SYLLABLES];
const TRAINING_SECONDS = 60;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestion(): { target: PinyinItem; choices: PinyinItem[] } {
  const sh = shuffle(POOL);
  const target = sh[0];
  const distractors = sh.slice(1, 4);
  return { target, choices: shuffle([target, ...distractors]) };
}

type Phase = 'ready' | 'playing' | 'done';

// Circular progress ring for countdown
function CountdownRing({ timeLeft, total }: { timeLeft: number; total: number }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const strokeDash = circ * progress;
  const color = timeLeft <= 10 ? '#F44336' : timeLeft <= 20 ? '#FF9800' : '#4CAF50';

  return (
    <div style={{ position: 'relative', width: 70, height: 70, flexShrink: 0 }}>
      <svg width={70} height={70} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={35} cy={35} r={radius} fill="none" stroke="#ECEFF1" strokeWidth={6} />
        <motion.circle
          cx={35}
          cy={35}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${strokeDash} ${circ}`}
          strokeLinecap="round"
          animate={{ strokeDasharray: `${strokeDash} ${circ}` }}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 900,
          color,
        }}
      >
        {timeLeft}
      </div>
    </div>
  );
}

export default function PinyinTraining() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-training');

  const [phase, setPhase] = useState<Phase>('ready');
  const [timeLeft, setTimeLeft] = useState(TRAINING_SECONDS);
  const [question, setQuestion] = useState(() => pickQuestion());
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const endGame = useCallback((finalScore: number, finalTotal: number, finalWrong: number, finalMaxCombo: number) => {
    stopTimer();
    setPhase('done');
    const stars = finalScore >= 20 ? 3 : finalScore >= 10 ? 2 : 1;
    handleGameComplete({ stars, correct: finalScore, total: finalTotal });
    track('pinyin_training_end', { score: finalScore, total: finalTotal, wrong: finalWrong, maxCombo: finalMaxCombo });
  }, [stopTimer, handleGameComplete]);

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Will trigger endGame via the done phase
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, stopTimer]);

  // Watch timeLeft hitting 0
  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      endGame(score, totalAnswered, wrongCount, maxCombo);
    }
  }, [phase, timeLeft, score, totalAnswered, wrongCount, maxCombo, endGame]);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setTimeLeft(TRAINING_SECONDS);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalAnswered(0);
    setWrongCount(0);
    setQuestion(pickQuestion());
    setAnswered(false);
    setLastCorrect(null);
  }, []);

  const handleChoiceClick = useCallback(
    (chosen: PinyinItem) => {
      if (answered || phase !== 'playing') return;
      const isCorrect = chosen.pinyin === question.target.pinyin;
      setAnswered(true);
      setLastCorrect(isCorrect);
      setTotalAnswered((n) => n + 1);

      if (isCorrect) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo((m) => Math.max(m, newCombo));
        const bonus = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
        setScore((s) => s + bonus);
      } else {
        setCombo(0);
        setWrongCount((n) => n + 1);
        speak(question.target.pinyin);
      }

      nextTimer.current = setTimeout(() => {
        setQuestion(pickQuestion());
        setAnswered(false);
        setLastCorrect(null);
      }, 480);
    },
    [answered, phase, question, combo],
  );

  const handleBack = useCallback(() => navigate('/games/pinyin'), [navigate]);

  return (
    <PageLayout maxWidth="640px">
      <GamePageHeader
        title="拼音训练"
        icon="⚡"
        subtitle="60 秒极速挑战，看拼音点汉字，连击加分！"
        gradient="linear-gradient(135deg, #F44336, #EF9A9A)"
        progressColor="#F44336"
        onBack={handleBack}
      />

      <AnimatePresence mode="wait">
        {/* Ready screen */}
        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FFFFFF, #FFF3E0)',
              borderRadius: '30px',
              padding: '48px 28px',
              boxShadow: '0 20px 48px rgba(244,67,54,0.12)',
              border: '2px solid rgba(244,67,54,0.18)',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚡</div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#3E2723', marginBottom: '12px' }}>准备好了吗？</h2>
            <div style={{ fontSize: '16px', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7, marginBottom: '28px' }}>
              限时 60 秒，看到拼音快速选出对应汉字。<br />
              连续答对 3 次得 2 分，连续 5 次得 3 分！
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleStart}
              style={{
                padding: '18px 48px',
                borderRadius: '22px',
                border: 'none',
                background: 'linear-gradient(135deg, #F44336, #EF9A9A)',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 12px 28px rgba(244,67,54,0.35)',
              }}
            >
              开始训练 ⚡
            </motion.button>
          </motion.div>
        )}

        {/* Playing screen */}
        {phase === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HUD */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '14px 20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF9800' }}>{score}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8D6E63' }}>得分</div>
              </div>
              <CountdownRing timeLeft={timeLeft} total={TRAINING_SECONDS} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: combo >= 3 ? '#F44336' : '#546E7A' }}>
                  {combo >= 1 ? `🔥×${combo}` : '–'}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8D6E63' }}>连击</div>
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={question.target.pinyin + totalAnswered}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.22 }}
              >
                <div
                  style={{
                    background: lastCorrect === true
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : lastCorrect === false
                        ? 'linear-gradient(135deg, #FFEBEE, #FFFFFF)'
                        : 'linear-gradient(135deg, #FFFFFF, #FFF8E1)',
                    borderRadius: '26px',
                    padding: '30px 24px',
                    textAlign: 'center',
                    marginBottom: '18px',
                    border: '2px solid rgba(244,67,54,0.12)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.07)',
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#90A4AE', marginBottom: '6px' }}>
                    选出正确的汉字
                  </div>
                  <div
                    style={{
                      fontSize: '80px',
                      fontWeight: 900,
                      color: '#F44336',
                      fontFamily: 'monospace',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {question.target.pinyin}
                  </div>
                  <div style={{ fontSize: '36px' }}>{question.target.emoji}</div>
                </div>

                {/* Choices */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {question.choices.map((c) => (
                    <motion.button
                      key={c.pinyin}
                      type="button"
                      whileHover={!answered ? { scale: 1.04, y: -3 } : {}}
                      whileTap={!answered ? { scale: 0.96 } : {}}
                      onClick={() => handleChoiceClick(c)}
                      style={{
                        padding: '22px 12px',
                        borderRadius: '18px',
                        border: `2px solid ${
                          answered && c.pinyin === question.target.pinyin
                            ? '#4CAF50'
                            : answered && lastCorrect === false && c.pinyin !== question.target.pinyin
                              ? '#F44336'
                              : 'rgba(244,67,54,0.2)'
                        }`,
                        background:
                          answered && c.pinyin === question.target.pinyin
                            ? 'linear-gradient(135deg,#4CAF50,#81C784)'
                            : '#FFFFFF',
                        color:
                          answered && c.pinyin === question.target.pinyin ? '#FFFFFF' : '#3E2723',
                        fontSize: '32px',
                        fontWeight: 900,
                        cursor: answered ? 'default' : 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                      }}
                    >
                      {c.hanzi}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Done screen */}
        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
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
            <div style={{ fontSize: '64px', marginBottom: '12px' }}>🏆</div>
            <div style={{ fontSize: '52px', fontWeight: 900, color: '#FF9800', marginBottom: '4px' }}>
              {score} 分
            </div>
            <div style={{ fontSize: '16px', color: '#8D6E63', fontWeight: 700, marginBottom: '20px' }}>
              共作答 {totalAnswered} 题 · 错误 {wrongCount} 次 · 最高连击 ×{maxCombo}
            </div>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleStart}
                style={{
                  padding: '14px 32px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #F44336, #EF9A9A)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(244,67,54,0.28)',
                }}
              >
                再来一次 ⚡
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleBack}
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
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
