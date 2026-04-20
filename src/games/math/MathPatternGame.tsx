import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

type PatternRound = {
  prompt: string;
  sequence: string[];
  answer: string;
  options: string[];
};

type PatternStage = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  roundsToPlay: number;
  bank: PatternRound[];
};

const PATTERN_STAGES: PatternStage[] = [
  {
    id: 'sprout',
    title: '第一站：规律起步',
    difficultyLabel: '入门',
    summary: '先掌握固定加减和简单重复规律。',
    roundsToPlay: 5,
    bank: [
      { prompt: '每次加 1', sequence: ['1', '2', '3', '?'], answer: '4', options: ['4', '5', '2'] },
      { prompt: '每次加 2', sequence: ['2', '4', '6', '?'], answer: '8', options: ['8', '7', '10'] },
      { prompt: '每次减 1', sequence: ['6', '5', '4', '?'], answer: '3', options: ['3', '2', '5'] },
      { prompt: '每次加 3', sequence: ['3', '6', '9', '?'], answer: '12', options: ['12', '11', '10'] },
      { prompt: '重复规律：2,4,2,4', sequence: ['2', '4', '2', '?'], answer: '4', options: ['4', '2', '6'] },
      { prompt: '每次减 2', sequence: ['10', '8', '6', '?'], answer: '4', options: ['4', '5', '6'] },
      { prompt: '每次加 5', sequence: ['5', '10', '15', '?'], answer: '20', options: ['20', '18', '25'] },
      { prompt: '重复规律：1,3,1,3', sequence: ['1', '3', '1', '?'], answer: '3', options: ['3', '2', '4'] },
    ],
  },
  {
    id: 'bridge',
    title: '第二站：双规则列车',
    difficultyLabel: '进阶',
    summary: '开始识别交替变化、跳跃规律和倍数变化。',
    roundsToPlay: 6,
    bank: [
      { prompt: '交替 +1 / +2', sequence: ['1', '2', '4', '5', '?'], answer: '7', options: ['6', '7', '8'] },
      { prompt: '每次乘 2', sequence: ['1', '2', '4', '?'], answer: '8', options: ['6', '8', '10'] },
      { prompt: '隔一个数加 2', sequence: ['1', '3', '5', '?'], answer: '7', options: ['6', '8', '7'] },
      { prompt: '交替 5, 8, 5, 8', sequence: ['5', '8', '5', '?'], answer: '8', options: ['7', '8', '9'] },
      { prompt: '每次减 3', sequence: ['15', '12', '9', '?'], answer: '6', options: ['5', '6', '7'] },
      { prompt: '每次加 4', sequence: ['4', '8', '12', '?'], answer: '16', options: ['16', '18', '14'] },
      { prompt: '交替 +2 / +3', sequence: ['2', '4', '7', '9', '?'], answer: '12', options: ['11', '12', '13'] },
      { prompt: '每次乘 3', sequence: ['1', '3', '9', '?'], answer: '27', options: ['18', '24', '27'] },
    ],
  },
  {
    id: 'summit',
    title: '第三站：挑战实验室',
    difficultyLabel: '挑战',
    summary: '把多步推理、交替和混合规则放进同一轮挑战里。',
    roundsToPlay: 7,
    bank: [
      { prompt: '交替 +2 / +4', sequence: ['2', '4', '8', '10', '?'], answer: '14', options: ['12', '14', '16'] },
      { prompt: '每次加 2、4、6', sequence: ['1', '3', '7', '?'], answer: '13', options: ['11', '12', '13'] },
      { prompt: '每次乘 2 再 +1', sequence: ['2', '5', '11', '?'], answer: '23', options: ['21', '22', '23'] },
      { prompt: '交替减 1 / 减 2', sequence: ['10', '9', '7', '6', '?'], answer: '4', options: ['4', '5', '3'] },
      { prompt: '重复规律：3,6,9', sequence: ['3', '6', '9', '3', '6', '?'], answer: '9', options: ['9', '12', '6'] },
      { prompt: '每次加 10', sequence: ['10', '20', '30', '?'], answer: '40', options: ['35', '40', '45'] },
      { prompt: '交替 ×2 / -1', sequence: ['3', '6', '5', '10', '?'], answer: '9', options: ['9', '8', '11'] },
      { prompt: '每次减 4', sequence: ['20', '16', '12', '?'], answer: '8', options: ['6', '8', '10'] },
    ],
  },
];

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildCampaign(seed: number) {
  return PATTERN_STAGES.map((stage) => ({
    ...stage,
    rounds: shuffle(stage.bank).slice(0, stage.roundsToPlay),
  }));
}

export default function MathPatternGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-pattern');
  const series = getGameSeriesConfig('math-pattern');
  const [campaignSeed, setCampaignSeed] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const campaign = useMemo(() => buildCampaign(campaignSeed), [campaignSeed]);
  const currentStage = campaign[stageIndex];
  const round = currentStage?.rounds[roundIndex];
  const options = useMemo(() => (round ? shuffle(round.options) : []), [round]);
  const totalRounds = campaign.reduce((sum, stage) => sum + stage.rounds.length, 0);
  const completedRoundsBeforeStage = campaign
    .slice(0, stageIndex)
    .reduce((sum, stage) => sum + stage.rounds.length, 0);
  const absoluteRound = showSummary ? totalRounds : completedRoundsBeforeStage + roundIndex + 1;
  const accuracy = attempts > 0 ? correctCount / attempts : 0;

  const finishGame = useCallback(
    (finalCorrect: number, finalAttempts: number) => {
      const finalAccuracy = finalAttempts > 0 ? finalCorrect / finalAttempts : 0;
      const stars = finalAccuracy >= 0.9 ? 3 : finalAccuracy >= 0.75 ? 2 : 1;
      setShowSummary(true);
      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: totalRounds,
        accuracy: finalAccuracy,
        xp: 28,
      });
    },
    [handleGameComplete, totalRounds]
  );

  const handleOptionClick = useCallback(
    (option: string) => {
      if (!round || selected) {
        return;
      }

      const nextAttempts = attempts + 1;
      const isCorrect = option === round.answer;
      const nextCorrect = isCorrect ? correctCount + 1 : correctCount;

      setSelected(option);
      setAttempts(nextAttempts);
      if (isCorrect) {
        setCorrectCount(nextCorrect);
      }

      track('task_complete', {
        gameId: 'math-pattern',
        success: isCorrect,
        round: absoluteRound,
        stageId: currentStage.id,
        prompt: round.prompt,
      });

      window.setTimeout(() => {
        const isLastRoundInStage = roundIndex >= currentStage.rounds.length - 1;
        const isLastStage = stageIndex >= campaign.length - 1;

        if (isLastRoundInStage && isLastStage) {
          finishGame(nextCorrect, nextAttempts);
          return;
        }

        if (isLastRoundInStage) {
          setStageIndex((value) => value + 1);
          setRoundIndex(0);
        } else {
          setRoundIndex((value) => value + 1);
        }

        setSelected(null);
      }, 700);
    },
    [
      absoluteRound,
      attempts,
      campaign.length,
      correctCount,
      currentStage,
      finishGame,
      round,
      roundIndex,
      selected,
      stageIndex,
    ]
  );

  const handleBack = useCallback(() => {
    navigate('/games/math');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setCampaignSeed((value) => value + 1);
    setStageIndex(0);
    setRoundIndex(0);
    setCorrectCount(0);
    setAttempts(0);
    setSelected(null);
    setShowSummary(false);
    track('game_start', { gameId: 'math-pattern', stages: PATTERN_STAGES.length });
  }, []);

  return (
    <PageLayout maxWidth="820px">
      <GamePageHeader
        title="找规律填数"
        icon="🔍"
        subtitle="一条主线闯三站，把数字规律从会看懂升级到会推理。"
        gradient="linear-gradient(135deg, #2196F3, #64B5F6, #7E57C2)"
        progressColor="#2196F3"
        onBack={handleBack}
        backLabel="← 返回数字小镇"
        currentTask={Math.min(absoluteRound, totalRounds)}
        totalTasks={totalRounds}
      />

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          {[
            { label: '系列路线', value: series?.progressionLabel ?? '三段挑战', note: series?.arcTitle },
            {
              label: '当前级别',
              value: currentStage ? `${currentStage.difficultyLabel} · ${stageIndex + 1}/${campaign.length}` : '--',
              note: currentStage?.title,
            },
            { label: '题库规模', value: series ? `${series.totalBankSize}` : `${totalRounds}`, note: '可抽题目' },
            { label: '当前表现', value: `${Math.round(accuracy * 100)}%`, note: `答对 ${correctCount} / 尝试 ${attempts}` },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#F7FBFF',
                borderRadius: '18px',
                padding: '16px',
                textAlign: 'center',
                border: '2px solid #D6EAFB',
              }}
            >
              <div style={{ color: '#607D8B', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#1565C0', fontWeight: 900, fontSize: '22px' }}>{item.value}</div>
              {item.note && <div style={{ marginTop: '6px', color: '#78909C', fontSize: '12px' }}>{item.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {campaign.map((stage, index) => {
            const isActive = index === stageIndex && !showSummary;
            const isDone = index < stageIndex || showSummary;
            return (
              <div
                key={stage.id}
                style={{
                  flex: '1 1 180px',
                  borderRadius: '18px',
                  padding: '14px',
                  background: isActive
                    ? 'linear-gradient(135deg, #E3F2FD, #FFFFFF)'
                    : isDone
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${isActive ? '#64B5F6' : isDone ? '#81C784' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#607D8B', marginBottom: '4px' }}>
                  第 {index + 1} 站 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1565C0', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#546E7A', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        {showSummary ? (
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>{accuracy >= 0.85 ? '🎉' : '👏'}</div>
            <h3 style={{ fontSize: '28px', color: '#1565C0', margin: '0 0 8px 0' }}>规律侦探队通关啦！</h3>
            <p style={{ color: '#5D4037', fontWeight: 700, marginBottom: '16px', lineHeight: 1.7 }}>
              你完成了 <strong>{campaign.length}</strong> 个级别、共 <strong>{totalRounds}</strong> 题，
              最终正确率 <strong>{Math.round(accuracy * 100)}%</strong>。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回
              </Button>
              <Button onClick={handleRestart}>再玩一次</Button>
            </div>
          </motion.div>
        ) : round ? (
          <>
            <div
              style={{
                display: 'inline-block',
                background: '#E3F2FD',
                color: '#1565C0',
                fontWeight: 800,
                borderRadius: '999px',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              {currentStage.title} · 提示：{round.prompt}
            </div>

            <p style={{ margin: '0 0 18px 0', color: '#546E7A', fontWeight: 600, lineHeight: 1.7 }}>
              {currentStage.summary} 本级别从题库中抽取 <strong>{currentStage.rounds.length}</strong> 题连续挑战。
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '24px',
              }}
            >
              {round.sequence.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '22px',
                    background:
                      value === '?'
                        ? 'linear-gradient(135deg, #FFF3E0, #FFE0B2)'
                        : 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                    border: `3px solid ${value === '?' ? '#FFB74D' : '#64B5F6'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                    fontWeight: 900,
                    color: value === '?' ? '#EF6C00' : '#1565C0',
                  }}
                >
                  {value}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '14px',
              }}
            >
              {options.map((option) => {
                const isChosen = selected === option;
                const isCorrect = option === round.answer;
                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selected}
                    style={{
                      minHeight: '84px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: selected ? 'default' : 'pointer',
                      background: isChosen
                        ? isCorrect
                          ? 'linear-gradient(135deg, #66BB6A, #81C784)'
                          : 'linear-gradient(135deg, #EF5350, #E57373)'
                        : 'linear-gradient(135deg, #FFFFFF, #F5F5F5)',
                      color: isChosen ? '#FFFFFF' : '#37474F',
                      fontSize: '30px',
                      fontWeight: 900,
                      boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </PageLayout>
  );
}
