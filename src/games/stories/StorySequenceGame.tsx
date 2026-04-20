import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

type StoryRound = {
  title: string;
  emoji: string;
  steps: string[];
};

type StoryStage = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  rounds: StoryRound[];
};

const STORY_STAGES: StoryStage[] = [
  {
    id: 'myth',
    title: '神话启程站',
    difficultyLabel: '入门',
    summary: '先从结构清晰的神话故事开始，认识起因和结果。',
    rounds: [
      {
        title: '盘古开天地',
        emoji: '🪓',
        steps: ['宇宙像大鸡蛋', '盘古醒来劈开天地', '轻的升天重的沉地', '盘古化成万物'],
      },
      {
        title: '女娲补天',
        emoji: '🌈',
        steps: ['天空破了大洞', '女娲炼五色石', '女娲补好了天空', '人们重新快乐生活'],
      },
    ],
  },
  {
    id: 'growth',
    title: '成长故事站',
    difficultyLabel: '进阶',
    summary: '加入人物选择和转折，理解“为什么会这样发展”。',
    rounds: [
      {
        title: '花木兰',
        emoji: '⚔️',
        steps: ['国家征兵', '木兰替父从军', '木兰英勇作战', '凯旋后大家知道她是女孩'],
      },
      {
        title: '司马光砸缸',
        emoji: '🫙',
        steps: ['小伙伴掉进大水缸', '大家一下子慌了', '司马光搬起石头砸缸', '缸破了，小伙伴得救'],
      },
    ],
  },
  {
    id: 'classic',
    title: '经典挑战站',
    difficultyLabel: '挑战',
    summary: '面对更长的情节链，练习整段复述和顺序判断。',
    rounds: [
      {
        title: '西游记·三打白骨精',
        emoji: '🐵',
        steps: ['白骨精第一次变成村姑', '孙悟空识破妖怪出手', '白骨精继续变化迷惑唐僧', '唐僧误会悟空并赶走他'],
      },
      {
        title: '愚公移山',
        emoji: '⛰️',
        steps: ['大山挡住了出行的路', '愚公决定带家人挖山', '别人笑他太傻太慢', '愚公的坚持感动了天神'],
      },
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

export default function StorySequenceGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('story-sequence');
  const series = getGameSeriesConfig('story-sequence');

  const [stageIndex, setStageIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [pickedSteps, setPickedSteps] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState('先找到故事的第一步。');
  const [completed, setCompleted] = useState(false);

  const currentStage = STORY_STAGES[stageIndex];
  const round = currentStage.rounds[roundIndex];
  const options = useMemo(
    () => shuffle(round.steps.filter((step) => !pickedSteps.includes(step))),
    [pickedSteps, round.steps]
  );
  const totalRounds = STORY_STAGES.reduce((sum, stage) => sum + stage.rounds.length, 0);
  const completedRoundsBeforeStage = STORY_STAGES.slice(0, stageIndex).reduce(
    (sum, stage) => sum + stage.rounds.length,
    0
  );
  const currentTask = completed ? totalRounds : completedRoundsBeforeStage + roundIndex + 1;

  const finishGame = useCallback(
    (finalCorrect: number, finalAttempts: number) => {
      const accuracy = finalAttempts > 0 ? finalCorrect / finalAttempts : 0;
      const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.75 ? 2 : 1;
      setCompleted(true);
      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: STORY_STAGES.reduce((sum, stage) => sum + stage.rounds.reduce((count, item) => count + item.steps.length, 0), 0),
        accuracy,
        xp: 34,
      });
    },
    [handleGameComplete]
  );

  const handleStepPick = useCallback(
    (step: string) => {
      if (completed) {
        return;
      }

      const expectedStep = round.steps[pickedSteps.length];
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (step === expectedStep) {
        const nextPicked = [...pickedSteps, step];
        const nextCorrect = correctCount + 1;
        setPickedSteps(nextPicked);
        setCorrectCount(nextCorrect);
        setFeedback(nextPicked.length === round.steps.length ? '这一段故事排对啦！' : '对啦，再找下一步。');
        track('task_complete', { gameId: 'story-sequence', success: true, story: round.title, stageId: currentStage.id });

        if (nextPicked.length === round.steps.length) {
          window.setTimeout(() => {
            const isLastRoundInStage = roundIndex >= currentStage.rounds.length - 1;
            const isLastStage = stageIndex >= STORY_STAGES.length - 1;

            if (isLastRoundInStage && isLastStage) {
              finishGame(nextCorrect, nextAttempts);
              return;
            }

            if (isLastRoundInStage) {
              setStageIndex((value) => value + 1);
              setRoundIndex(0);
              setPickedSteps([]);
              setFeedback('新车站开启啦，先找故事的第一步。');
              return;
            }

            setRoundIndex((value) => value + 1);
            setPickedSteps([]);
            setFeedback('新故事开始啦，先找第一步。');
          }, 720);
        }
      } else {
        setFeedback('这一步还太靠后啦，再想一想。');
        track('task_complete', { gameId: 'story-sequence', success: false, story: round.title, stageId: currentStage.id });
      }
    },
    [attempts, completed, correctCount, currentStage.id, currentStage.rounds.length, finishGame, pickedSteps, round.steps, round.title, roundIndex, stageIndex]
  );

  const handleBack = useCallback(() => {
    navigate('/games/stories');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setStageIndex(0);
    setRoundIndex(0);
    setPickedSteps([]);
    setAttempts(0);
    setCorrectCount(0);
    setFeedback('先找到故事的第一步。');
    setCompleted(false);
    track('game_start', { gameId: 'story-sequence', stages: STORY_STAGES.length });
  }, []);

  const accuracy = attempts > 0 ? correctCount / attempts : 0;

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="故事排序"
        icon="🪄"
        subtitle="从神话到经典，一路把故事线排成连贯系列。"
        gradient="linear-gradient(135deg, #9C27B0, #CE93D8, #FFB74D)"
        progressColor="#9C27B0"
        onBack={handleBack}
        backLabel="← 返回故事王国"
        currentTask={Math.min(currentTask, totalRounds)}
        totalTasks={totalRounds}
      />

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          {[
            { label: '系列路线', value: series?.progressionLabel ?? '三站主线', note: series?.arcTitle },
            {
              label: '当前级别',
              value: `${currentStage.difficultyLabel} · ${stageIndex + 1}/${STORY_STAGES.length}`,
              note: currentStage.title,
            },
            { label: '排序表现', value: `${Math.round(accuracy * 100)}%`, note: `正确 ${correctCount} / 尝试 ${attempts}` },
            { label: '当前故事', value: round.title, note: currentStage.summary },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#FBF6FD',
                borderRadius: '16px',
                padding: '14px',
                border: '2px solid #E1BEE7',
              }}
            >
              <div style={{ color: '#607D8B', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#6A1B9A', fontWeight: 900, fontSize: '22px' }}>{item.value}</div>
              {item.note && <div style={{ marginTop: '6px', color: '#78909C', fontSize: '12px' }}>{item.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {STORY_STAGES.map((stage, index) => {
            const active = index === stageIndex && !completed;
            const done = index < stageIndex || completed;
            return (
              <div
                key={stage.id}
                style={{
                  flex: '1 1 190px',
                  borderRadius: '18px',
                  padding: '14px',
                  background: active
                    ? 'linear-gradient(135deg, #F3E5F5, #FFFFFF)'
                    : done
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${active ? '#CE93D8' : done ? '#81C784' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#8D6E63', marginBottom: '4px' }}>
                  第 {index + 1} 站 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#6A1B9A', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#6D4C41', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        {completed ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>📚</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#6A1B9A' }}>故事列车到站啦！</h3>
            <p style={{ margin: '0 0 18px 0', color: '#6D4C41', fontWeight: 700, lineHeight: 1.7 }}>
              你完成了 <strong>{STORY_STAGES.length}</strong> 个级别、共 <strong>{totalRounds}</strong> 段故事排序，
              当前正确率 <strong>{Math.round(accuracy * 100)}%</strong>。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回
              </Button>
              <Button onClick={handleRestart}>再玩一次</Button>
            </div>
          </motion.div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#F3E5F5',
                borderRadius: '20px',
                padding: '18px',
                marginBottom: '18px',
              }}
            >
              <div style={{ fontSize: '44px' }}>{round.emoji}</div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#6A1B9A' }}>{round.title}</h3>
                <p style={{ margin: '0 0 4px 0', color: '#7B1FA2', fontWeight: 700 }}>{feedback}</p>
                <p style={{ margin: 0, color: '#8D6E63', fontWeight: 600 }}>{currentStage.summary}</p>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ color: '#8D6E63', fontWeight: 800, marginBottom: '10px' }}>已排好的故事线</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {round.steps.map((step, index) => {
                  const unlocked = pickedSteps.includes(step);
                  return (
                    <div
                      key={step}
                      style={{
                        borderRadius: '16px',
                        padding: '14px 16px',
                        background: unlocked ? 'linear-gradient(135deg, #EDE7F6, #D1C4E9)' : '#F5F5F5',
                        color: unlocked ? '#4A148C' : '#9E9E9E',
                        fontWeight: 800,
                        border: unlocked ? '2px solid #B39DDB' : '2px dashed #E0E0E0',
                      }}
                    >
                      {index + 1}. {unlocked ? step : '???'}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {options.map((step) => (
                <motion.button
                  key={step}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStepPick(step)}
                  style={{
                    minHeight: '96px',
                    borderRadius: '18px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FFFFFF, #F3E5F5)',
                    color: '#4A148C',
                    fontWeight: 800,
                    fontSize: '18px',
                    padding: '16px',
                    textAlign: 'left',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  {step}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
