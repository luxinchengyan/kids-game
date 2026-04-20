import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

interface SpellRound {
  id: string;
  word: string;
  emoji: string;
  meaning: string;
  hint: string;
}

const ROUND_BANK: SpellRound[] = [
  { id: 'cat', word: 'CAT', emoji: '🐱', meaning: '小猫', hint: '会喵喵叫的小动物' },
  { id: 'dog', word: 'DOG', emoji: '🐶', meaning: '小狗', hint: '会汪汪叫的小伙伴' },
  { id: 'sun', word: 'SUN', emoji: '☀️', meaning: '太阳', hint: '白天在天空发光' },
  { id: 'book', word: 'BOOK', emoji: '📚', meaning: '书本', hint: '翻开可以阅读' },
  { id: 'cake', word: 'CAKE', emoji: '🎂', meaning: '蛋糕', hint: '生日时常常会看到它' },
  { id: 'ball', word: 'BALL', emoji: '⚽', meaning: '球', hint: '可以踢也可以拍' },
  { id: 'fish', word: 'FISH', emoji: '🐟', meaning: '小鱼', hint: '住在水里' },
  { id: 'tree', word: 'TREE', emoji: '🌳', meaning: '大树', hint: '有树干和树叶' },
];

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildLetterBank(word: string) {
  const distractors = shuffleArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    .filter((letter) => !word.includes(letter))
    .slice(0, Math.min(4, Math.max(2, 8 - word.length)));

  return shuffleArray([...word.split(''), ...distractors]).map((letter, index) => ({
    id: `${letter}-${index}`,
    letter,
  }));
}

export default function LetterSpellGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('english-letter-spell');
  const [sessionSeed, setSessionSeed] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState('看图拼单词，把正确字母按顺序放进去。');

  const rounds = useMemo(() => shuffleArray(ROUND_BANK).slice(0, 4), [sessionSeed]);
  const currentRound = rounds[roundIndex];
  const letterBank = useMemo(() => (currentRound ? buildLetterBank(currentRound.word) : []), [currentRound]);

  useEffect(() => {
    track('game_start', { gameId: 'english-letter-spell', rounds: rounds.length });
  }, [rounds.length]);

  const resetSession = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setAnswers([]);
    setMistakes(0);
    setCompletedWords(0);
    setCompleted(false);
    setFeedback('看图拼单词，把正确字母按顺序放进去。');
  }, []);

  const handleBack = useCallback(() => {
    navigate('/games/english');
  }, [navigate]);

  const finishGame = useCallback(
    (finalMistakes: number, finalCompletedWords: number) => {
      const stars = finalMistakes === 0 ? 3 : finalMistakes <= 2 ? 2 : 1;
      const accuracy = finalCompletedWords / Math.max(finalCompletedWords + finalMistakes, 1);
      setCompleted(true);
      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: finalCompletedWords,
        accuracy,
        xp: 24,
      });
    },
    [handleGameComplete]
  );

  const moveToNextRound = useCallback(() => {
    setAnswers([]);
    setFeedback('太棒了，继续拼下一个单词！');
    setRoundIndex((value) => {
      const nextIndex = value + 1;
      if (nextIndex >= rounds.length) {
        finishGame(mistakes, completedWords + 1);
        return value;
      }
      return nextIndex;
    });
    setCompletedWords((value) => value + 1);
  }, [completedWords, finishGame, mistakes, rounds.length]);

  const handleLetterClick = useCallback(
    (letter: string) => {
      if (!currentRound || completed) {
        return;
      }

      const nextAnswers = [...answers, letter];
      setAnswers(nextAnswers);

      const nextAttempt = nextAnswers.join('');
      const expectedPrefix = currentRound.word.slice(0, nextAttempt.length);

      if (nextAttempt !== expectedPrefix) {
        setMistakes((value) => value + 1);
        setFeedback(`再试一次，提示：${currentRound.hint}`);
        window.setTimeout(() => setAnswers([]), 450);
        return;
      }

      if (nextAttempt === currentRound.word) {
        setFeedback(`答对啦！${currentRound.word} 就是 ${currentRound.meaning}。`);
        window.setTimeout(() => {
          moveToNextRound();
        }, 600);
      } else {
        setFeedback('继续，把剩下的字母也拼出来。');
      }
    },
    [answers, completed, currentRound, moveToNextRound]
  );

  const removeLastLetter = useCallback(() => {
    setAnswers((value) => value.slice(0, -1));
    setFeedback('没关系，换一个字母试试。');
  }, []);

  const usedLetterCounts = useMemo(() => {
    return answers.reduce<Record<string, number>>((counts, letter) => {
      counts[letter] = (counts[letter] ?? 0) + 1;
      return counts;
    }, {});
  }, [answers]);

  return (
    <PageLayout maxWidth="880px">
      <GamePageHeader
        title="字母拼图"
        icon="🔤"
        subtitle="看图片、找字母、拼单词，让孩子在操作中建立拼写意识。"
        gradient="linear-gradient(135deg, #4CAF50, #81C784, #26A69A)"
        progressColor="#43A047"
        onBack={handleBack}
        backLabel="← 返回英语游乐园"
      />

      <section
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,245,233,0.96))',
          borderRadius: '32px',
          padding: '28px',
          boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            marginBottom: '22px',
          }}
        >
          {[
            { label: '当前回合', value: `${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}` },
            { label: '已完成', value: String(completedWords) },
            { label: '错误次数', value: String(mistakes) },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#FFFFFF',
                borderRadius: '22px',
                padding: '18px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#6D4C41', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#2E7D32' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {completed ? (
          <div
            style={{
              background: 'linear-gradient(135deg, #E8F5E9, #FFFFFF)',
              borderRadius: '28px',
              padding: '28px',
              textAlign: 'center',
              border: '2px solid rgba(76, 175, 80, 0.24)',
            }}
          >
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ margin: '0 0 12px 0', color: '#2E7D32' }}>拼写闯关成功</h2>
            <p style={{ margin: '0 0 18px 0', color: '#5D4037', fontWeight: 700 }}>
              你一共完成了 {completedWords} 个单词，继续保持这种观察和拼读节奏。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回乐园
              </Button>
              <Button onClick={resetSession}>再玩一轮</Button>
            </div>
          </div>
        ) : (
          currentRound && (
            <>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  padding: '24px',
                  textAlign: 'center',
                  marginBottom: '22px',
                }}
              >
                <div style={{ fontSize: '68px', lineHeight: 1, marginBottom: '10px' }}>{currentRound.emoji}</div>
                <div style={{ color: '#6D4C41', fontWeight: 800, marginBottom: '8px' }}>中文提示：{currentRound.meaning}</div>
                <div style={{ color: '#8D6E63', fontWeight: 700 }}>线索：{currentRound.hint}</div>
              </div>

              <div
                style={{
                  background: '#F8FBFF',
                  borderRadius: '24px',
                  padding: '18px',
                  marginBottom: '22px',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#1565C0', fontWeight: 800, marginBottom: '14px' }}>{feedback}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', minHeight: '66px' }}>
                  {currentRound.word.split('').map((_, index) => (
                    <div
                      key={`${currentRound.id}-${index}`}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: '#FFFFFF',
                        border: '2px dashed #90CAF9',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '24px',
                        fontWeight: 900,
                        color: '#1565C0',
                      }}
                    >
                      {answers[index] ?? ''}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(72px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {letterBank.map((item) => {
                  const usedCount = usedLetterCounts[item.letter] ?? 0;
                  const totalCount = answers.filter((letter) => letter === item.letter).length;
                  const disabled = usedCount > 0 && totalCount >= currentRound.word.split('').filter((letter) => letter === item.letter).length;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={disabled ? {} : { y: -2, scale: 1.03 }}
                      whileTap={disabled ? {} : { scale: 0.95 }}
                      onClick={() => handleLetterClick(item.letter)}
                      disabled={disabled}
                      style={{
                        minHeight: '72px',
                        borderRadius: '20px',
                        border: 'none',
                        background: disabled ? '#CFD8DC' : 'linear-gradient(135deg, #4FC3F7, #29B6F6)',
                        color: '#FFFFFF',
                        fontSize: '28px',
                        fontWeight: 900,
                        cursor: disabled ? 'default' : 'pointer',
                        boxShadow: disabled ? 'none' : '0 10px 22px rgba(41, 182, 246, 0.28)',
                      }}
                    >
                      {item.letter}
                    </motion.button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Button variant="secondary" onClick={removeLastLetter} disabled={!answers.length}>
                  撤回一个字母
                </Button>
                <Button variant="secondary" onClick={resetSession}>
                  重新开始
                </Button>
              </div>
            </>
          )
        )}
      </section>
    </PageLayout>
  );
}
