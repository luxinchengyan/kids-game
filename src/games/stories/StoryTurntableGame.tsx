import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import {
  CompletionPanel,
  FrameworkPanel,
  FrameworkStatGrid,
  sampleItems,
} from '../frameworks/frameworkHelpers';

interface StoryQuestion {
  category: '人物' | '情节' | '原因' | '结局';
  question: string;
  options: string[];
  answer: string;
}

const QUESTION_BANK: StoryQuestion[] = [
  { category: '人物', question: '《龟兔赛跑》中，谁一直坚持跑到了终点？', options: ['小兔', '乌龟', '小马'], answer: '乌龟' },
  { category: '情节', question: '《三只小猪》里，最后谁的房子最结实？', options: ['草房子', '木房子', '砖房子'], answer: '砖房子' },
  { category: '原因', question: '乌鸦为什么要往瓶子里放石子？', options: ['想玩石子', '想把水喝到', '想让瓶子变大'], answer: '想把水喝到' },
  { category: '结局', question: '《狼来了》的结果是什么？', options: ['大家不再相信他', '狼变成了朋友', '小羊来帮忙'], answer: '大家不再相信他' },
  { category: '人物', question: '《猴子捞月》里，谁先发现了水里的月亮？', options: ['小猴子', '老虎', '喜鹊'], answer: '小猴子' },
  { category: '情节', question: '《孔融让梨》中，孔融把大的梨让给了谁？', options: ['哥哥们', '自己', '小猫'], answer: '哥哥们' },
  { category: '原因', question: '小马过河时为什么要先去问别人？', options: ['因为不确定深浅', '因为想睡觉', '因为想比赛'], answer: '因为不确定深浅' },
  { category: '结局', question: '《守株待兔》告诉我们什么？', options: ['不能总靠运气', '要一直等兔子', '树桩会长果子'], answer: '不能总靠运气' },
];

const TOTAL_ROUNDS = 5;

const categoryGradients = {
  人物: 'linear-gradient(135deg, #F8BBD0, #F3E5F5)',
  情节: 'linear-gradient(135deg, #D1C4E9, #F3E5F5)',
  原因: 'linear-gradient(135deg, #BBDEFB, #E1F5FE)',
  结局: 'linear-gradient(135deg, #C8E6C9, #F1F8E9)',
};

export default function StoryTurntableGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('story-turntable');
  const [sessionSeed, setSessionSeed] = useState(0);
  const rounds = useMemo(() => sampleItems(QUESTION_BANK, TOTAL_ROUNDS), [sessionSeed]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [spun, setSpun] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = rounds[roundIndex];

  useEffect(() => {
    track('game_start', { gameId: 'story-turntable', rounds: TOTAL_ROUNDS });
  }, [sessionSeed]);

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setRotation(0);
    setSpun(false);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setCompleted(false);
  }, []);

  const handleBack = useCallback(() => {
    navigate('/games/stories');
  }, [navigate]);

  const handleSpin = useCallback(() => {
    if (spun || completed) {
      return;
    }
    setRotation((value) => value + 720 + Math.floor(Math.random() * 360));
    setSpun(true);
  }, [completed, spun]);

  const handleAnswer = useCallback(
    (option: string) => {
      if (!spun || selectedAnswer || completed) {
        return;
      }

      setSelectedAnswer(option);
      const isCorrect = option === currentQuestion.answer;
      const nextCorrect = correctCount + (isCorrect ? 1 : 0);
      if (isCorrect) {
        setCorrectCount(nextCorrect);
      }

      window.setTimeout(() => {
        if (roundIndex + 1 >= rounds.length) {
          const accuracy = nextCorrect / rounds.length;
          const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({
            success: true,
            stars,
            tasksCompleted: rounds.length,
            accuracy,
            xp: 24,
          });
        } else {
          setRoundIndex((value) => value + 1);
          setSpun(false);
          setSelectedAnswer(null);
        }
      }, 820);
    },
    [completed, correctCount, currentQuestion.answer, handleGameComplete, roundIndex, rounds.length, selectedAnswer, spun]
  );

  const accuracy = correctCount / rounds.length;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : correctCount > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="故事问答转盘"
        icon="🎡"
        subtitle="先转出题目，再回答故事里的关键线索。"
        gradient="linear-gradient(135deg, #8E24AA, #CE93D8, #AB47BC)"
        progressColor="#8E24AA"
        onBack={handleBack}
        backLabel="← 返回故事王国"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#D1C4E9" background="linear-gradient(135deg, #FFFFFF, #F3E5F5)">
        <FrameworkStatGrid
          accent="#6A1B9A"
          surface="#FFFFFF"
          items={[
            { label: '题型', value: currentQuestion?.category ?? '--' },
            { label: '进度', value: `${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}` },
            { label: '答对', value: `${correctCount}` },
            { label: '评级', value: completed ? `${stars} 星` : `${Math.round(accuracy * 100)}%` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji="📚"
            title="转盘通关"
            summary={`你完成了 ${rounds.length} 道故事理解题，答对 ${correctCount} 题，获得 ${stars} 颗星。`}
            accent="#6A1B9A"
            background="linear-gradient(135deg, #F3E5F5, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回王国
              </Button>
              <Button onClick={resetGame}>再转一次</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(260px, 320px) 1fr',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <motion.div
                  animate={{ rotate: rotation }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  style={{
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: categoryGradients[currentQuestion.category],
                    border: '10px solid #BA68C8',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '42px',
                    fontWeight: 900,
                    color: '#6A1B9A',
                    boxShadow: '0 18px 30px rgba(142, 36, 170, 0.18)',
                  }}
                >
                  {currentQuestion.category}
                </motion.div>
                <Button onClick={handleSpin} disabled={spun}>
                  {spun ? '题目已生成' : '转动转盘'}
                </Button>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '20px',
                  border: '2px solid #D1C4E9',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {spun ? (
                  <>
                    <div style={{ color: '#8E24AA', fontWeight: 800, marginBottom: '8px' }}>
                      {currentQuestion.category}题
                    </div>
                    <div style={{ fontSize: '28px', color: '#4A148C', fontWeight: 900, lineHeight: 1.6, marginBottom: '16px' }}>
                      {currentQuestion.question}
                    </div>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === currentQuestion.answer;
                        const borderColor = !selectedAnswer
                          ? '#CE93D8'
                          : isCorrect
                            ? '#66BB6A'
                            : isSelected
                              ? '#EF5350'
                              : '#E0E0E0';

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedAnswer}
                            style={{
                              minHeight: '78px',
                              borderRadius: '18px',
                              border: `3px solid ${borderColor}`,
                              background: '#FFFFFF',
                              color: '#4A148C',
                              fontWeight: 800,
                              fontSize: '20px',
                              cursor: selectedAnswer ? 'default' : 'pointer',
                            }}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#8D6E63', fontWeight: 700, lineHeight: 1.8 }}>
                    先点“转动转盘”，让这一轮的故事问题跳出来。
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
