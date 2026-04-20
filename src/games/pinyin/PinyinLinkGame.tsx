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
  speakText,
} from '../frameworks/frameworkHelpers';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

interface LinkRound {
  syllable: string;
  initial: string;
  final: string;
  hint: string;
  word: string;
  distractorInitials: string[];
  distractorFinals: string[];
}

type LinkStage = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  roundsToPlay: number;
  bank: LinkRound[];
};

const LINK_STAGES: LinkStage[] = [
  {
    id: 'basic',
    title: '基础拼读岛',
    difficultyLabel: '入门',
    summary: '先练最常见的声母加单韵母，拼出简单音节。',
    roundsToPlay: 5,
    bank: [
      { syllable: 'ma', initial: 'm', final: 'a', hint: '🐴', word: '小马', distractorInitials: ['b', 'd', 'n'], distractorFinals: ['o', 'e', 'i'] },
      { syllable: 'mi', initial: 'm', final: 'i', hint: '🍚', word: '米饭', distractorInitials: ['l', 'n', 'h'], distractorFinals: ['a', 'u', 'o'] },
      { syllable: 'tu', initial: 't', final: 'u', hint: '🐰', word: '小兔', distractorInitials: ['p', 'k', 'j'], distractorFinals: ['a', 'e', 'i'] },
      { syllable: 'bo', initial: 'b', final: 'o', hint: '🏀', word: '篮球', distractorInitials: ['p', 'm', 'f'], distractorFinals: ['a', 'e', 'u'] },
      { syllable: 'he', initial: 'h', final: 'e', hint: '🥤', word: '喝水', distractorInitials: ['k', 'g', 'f'], distractorFinals: ['i', 'a', 'o'] },
      { syllable: 'na', initial: 'n', final: 'a', hint: '🧤', word: '拿着', distractorInitials: ['l', 'm', 't'], distractorFinals: ['e', 'i', 'o'] },
      { syllable: 'le', initial: 'l', final: 'e', hint: '🎵', word: '快乐', distractorInitials: ['n', 'r', 'd'], distractorFinals: ['a', 'u', 'i'] },
      { syllable: 'fo', initial: 'f', final: 'o', hint: '🪁', word: '风筝', distractorInitials: ['h', 'm', 'b'], distractorFinals: ['e', 'a', 'u'] },
    ],
  },
  {
    id: 'compound',
    title: '复合拼读岛',
    difficultyLabel: '进阶',
    summary: '加入复韵母和介母组合，开始处理更完整的拼读结构。',
    roundsToPlay: 6,
    bank: [
      { syllable: 'gua', initial: 'g', final: 'ua', hint: '🍉', word: '西瓜', distractorInitials: ['k', 'h', 'm'], distractorFinals: ['ai', 'an', 'ou'] },
      { syllable: 'xue', initial: 'x', final: 'ue', hint: '❄️', word: '雪花', distractorInitials: ['q', 's', 'r'], distractorFinals: ['ie', 'uo', 'en'] },
      { syllable: 'qiao', initial: 'q', final: 'iao', hint: '🌉', word: '小桥', distractorInitials: ['j', 'x', 'zh'], distractorFinals: ['ian', 'ua', 'ou'] },
      { syllable: 'shui', initial: 'sh', final: 'ui', hint: '💧', word: '喝水', distractorInitials: ['s', 'ch', 'r'], distractorFinals: ['iu', 'un', 'ei'] },
      { syllable: 'piao', initial: 'p', final: 'iao', hint: '🎈', word: '漂浮', distractorInitials: ['b', 't', 'q'], distractorFinals: ['ua', 'ie', 'ou'] },
      { syllable: 'kuai', initial: 'k', final: 'uai', hint: '⚡', word: '很快', distractorInitials: ['g', 'h', 'd'], distractorFinals: ['uan', 'ui', 'ao'] },
      { syllable: 'chuan', initial: 'ch', final: 'uan', hint: '⛵', word: '船只', distractorInitials: ['c', 'sh', 'zh'], distractorFinals: ['ui', 'ie', 'en'] },
      { syllable: 'jiao', initial: 'j', final: 'iao', hint: '🦶', word: '小脚', distractorInitials: ['q', 'x', 'z'], distractorFinals: ['uan', 'ie', 'ai'] },
    ],
  },
  {
    id: 'mission',
    title: '高阶音节岛',
    difficultyLabel: '挑战',
    summary: '挑战更长的音节和更像的干扰项，把拼音结构真正拼稳。',
    roundsToPlay: 7,
    bank: [
      { syllable: 'yuan', initial: 'y', final: 'uan', hint: '🌙', word: '月圆', distractorInitials: ['w', 'n', 'l'], distractorFinals: ['ang', 'ing', 'iao'] },
      { syllable: 'xiong', initial: 'x', final: 'iong', hint: '🐻', word: '黑熊', distractorInitials: ['q', 'j', 's'], distractorFinals: ['ong', 'iang', 'ian'] },
      { syllable: 'zhuan', initial: 'zh', final: 'uan', hint: '🌀', word: '转圈', distractorInitials: ['z', 'ch', 'sh'], distractorFinals: ['iang', 'ui', 'ao'] },
      { syllable: 'lve', initial: 'l', final: 've', hint: '📘', word: '略过', distractorInitials: ['n', 'r', 'y'], distractorFinals: ['ue', 'ie', 'un'] },
      { syllable: 'qiong', initial: 'q', final: 'iong', hint: '🏔️', word: '苍穹', distractorInitials: ['x', 'j', 'zh'], distractorFinals: ['ong', 'uan', 'iao'] },
      { syllable: 'shuang', initial: 'sh', final: 'uang', hint: '🧊', word: '冰霜', distractorInitials: ['s', 'ch', 'r'], distractorFinals: ['uan', 'ang', 'iong'] },
      { syllable: 'kuang', initial: 'k', final: 'uang', hint: '⛏️', word: '矿石', distractorInitials: ['g', 'h', 't'], distractorFinals: ['uan', 'iong', 'iao'] },
      { syllable: 'jue', initial: 'j', final: 'ue', hint: '🧠', word: '觉得', distractorInitials: ['q', 'x', 'zh'], distractorFinals: ['ve', 'iao', 'un'] },
    ],
  },
];

function buildCampaign(seed: number) {
  return LINK_STAGES.map((stage) => ({
    ...stage,
    rounds: shuffleArray(stage.bank).slice(0, stage.roundsToPlay),
  }));
}

export default function PinyinLinkGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-link');
  const series = getGameSeriesConfig('pinyin-link');
  const [campaignSeed, setCampaignSeed] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [selectedFinal, setSelectedFinal] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const campaign = useMemo(() => buildCampaign(campaignSeed), [campaignSeed]);
  const currentStage = campaign[stageIndex];
  const currentRound = currentStage?.rounds[roundIndex];
  const totalRounds = campaign.reduce((sum, stage) => sum + stage.rounds.length, 0);
  const completedRoundsBeforeStage = campaign
    .slice(0, stageIndex)
    .reduce((sum, stage) => sum + stage.rounds.length, 0);
  const currentTask = completed ? totalRounds : completedRoundsBeforeStage + roundIndex + 1;

  const resetSelections = useCallback(() => {
    setSelectedInitial(null);
    setSelectedFinal(null);
    setFeedback('idle');
  }, []);

  const resetGame = useCallback(() => {
    setCampaignSeed((value) => value + 1);
    setStageIndex(0);
    setRoundIndex(0);
    setSelectedInitial(null);
    setSelectedFinal(null);
    setFeedback('idle');
    setAttempts(0);
    setCorrectCount(0);
    setCompleted(false);
    track('game_start', { gameId: 'pinyin-link', stages: LINK_STAGES.length, rounds: totalRounds });
  }, [totalRounds]);

  useEffect(() => {
    track('game_start', { gameId: 'pinyin-link', stages: LINK_STAGES.length, rounds: totalRounds });
  }, [totalRounds]);

  useEffect(() => {
    if (!currentRound || !selectedInitial || !selectedFinal || completed) {
      return;
    }

    const isCorrect = selectedInitial === currentRound.initial && selectedFinal === currentRound.final;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setFeedback(isCorrect ? 'success' : 'error');

    const timer = window.setTimeout(() => {
      if (isCorrect) {
        const nextCorrect = correctCount + 1;
        setCorrectCount(nextCorrect);
        const isLastRoundInStage = roundIndex >= currentStage.rounds.length - 1;
        const isLastStage = stageIndex >= campaign.length - 1;

        if (isLastRoundInStage && isLastStage) {
          const accuracy = nextCorrect / nextAttempts;
          const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({
            success: true,
            stars,
            tasksCompleted: totalRounds,
            accuracy,
            xp: 32,
          });
        } else if (isLastRoundInStage) {
          setStageIndex((value) => value + 1);
          setRoundIndex(0);
          resetSelections();
        } else {
          setRoundIndex((value) => value + 1);
          resetSelections();
        }
      } else {
        resetSelections();
      }
    }, isCorrect ? 550 : 700);

    return () => window.clearTimeout(timer);
  }, [
    attempts,
    campaign.length,
    completed,
    correctCount,
    currentRound,
    currentStage.rounds.length,
    handleGameComplete,
    resetSelections,
    roundIndex,
    selectedFinal,
    selectedInitial,
    stageIndex,
    totalRounds,
  ]);

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  const initialOptions = useMemo(
    () => (currentRound ? shuffleArray([currentRound.initial, ...currentRound.distractorInitials]) : []),
    [currentRound]
  );
  const finalOptions = useMemo(
    () => (currentRound ? shuffleArray([currentRound.final, ...currentRound.distractorFinals]) : []),
    [currentRound]
  );

  const accuracy = attempts === 0 ? 0 : correctCount / attempts;
  const assembled = `${selectedInitial ?? '◯'} + ${selectedFinal ?? '◯'}`;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : accuracy > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="920px">
      <GamePageHeader
        title="拼音连连看"
        icon="🪢"
        subtitle="跟着 3 座拼读小岛闯关，把声母、韵母和完整音节串起来。"
        gradient="linear-gradient(135deg, #FB8C00, #FFB74D, #FF7043)"
        progressColor="#FB8C00"
        onBack={handleBack}
        backLabel="← 返回拼音冒险岛"
        currentTask={Math.min(currentTask, totalRounds)}
        totalTasks={totalRounds}
      />

      <FrameworkPanel borderColor="#FFCC80" background="linear-gradient(135deg, #FFFFFF, #FFF8E1)">
        <FrameworkStatGrid
          accent="#EF6C00"
          surface="#FFFFFF"
          items={[
            { label: '系列路线', value: series?.progressionLabel ?? '三岛闯关', note: series?.arcTitle },
            {
              label: '当前级别',
              value: currentStage ? `${currentStage.difficultyLabel} · ${stageIndex + 1}/${campaign.length}` : '--',
              note: currentStage?.title,
            },
            { label: '已完成', value: `${correctCount}/${totalRounds}`, note: `尝试 ${attempts} 次` },
            { label: '组合结果', value: assembled, note: `准确率 ${Math.round(accuracy * 100)}%` },
          ]}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {campaign.map((stage, index) => {
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
                    ? 'linear-gradient(135deg, #FFF3E0, #FFFFFF)'
                    : done
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${active ? '#FFB74D' : done ? '#81C784' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#8D6E63', marginBottom: '4px' }}>
                  第 {index + 1} 岛 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#E65100', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#6D4C41', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🌟' : stars === 2 ? '👏' : '😊'}
            title="拼读主线通关"
            summary={`你完成了 ${campaign.length} 个级别、共 ${totalRounds} 轮拼音组合，准确率 ${Math.round(
              accuracy * 100
            )}% ，拿到 ${stars} 颗星。`}
            accent="#EF6C00"
            background="linear-gradient(135deg, #FFF3E0, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回岛屿
              </Button>
              <Button onClick={resetGame}>再连一次</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                borderRadius: '20px',
                padding: '18px',
                marginBottom: '18px',
                background: feedback === 'success' ? '#E8F5E9' : feedback === 'error' ? '#FFEBEE' : '#FFF3E0',
                border: `2px solid ${feedback === 'success' ? '#66BB6A' : feedback === 'error' ? '#EF5350' : '#FFCC80'}`,
              }}
            >
              <div style={{ fontSize: '52px', textAlign: 'center', marginBottom: '8px' }}>{currentRound?.hint}</div>
              <div style={{ textAlign: 'center', color: '#5D4037', fontWeight: 900, fontSize: '30px', marginBottom: '6px' }}>
                {currentRound?.word}
              </div>
              <div style={{ textAlign: 'center', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>
                {currentStage.title}：{currentStage.summary}
                <br />
                把它的拼音 <strong>{currentRound?.syllable}</strong> 连出来。
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px', fontWeight: 800, color: '#6D4C41' }}>
                {feedback === 'success'
                  ? '答对啦，拼音精灵已经连上线！'
                  : feedback === 'error'
                    ? '这次没有连对，再想一想声母和韵母。'
                    : '先点左边的声母，再点右边的韵母。'}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              {[
                { title: '声母小岛', options: initialOptions, selected: selectedInitial, setter: setSelectedInitial },
                { title: '韵母小岛', options: finalOptions, selected: selectedFinal, setter: setSelectedFinal },
              ].map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '18px',
                    border: '2px solid #FFE0B2',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, color: '#E65100', fontSize: '22px' }}>{section.title}</h3>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => speakText(section.selected ?? currentRound?.syllable ?? '')}
                    >
                      听一听
                    </Button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                    {section.options.map((option) => {
                      const isSelected = section.selected === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => section.setter(option)}
                          style={{
                            minHeight: '84px',
                            borderRadius: '18px',
                            border: isSelected ? '3px solid #FB8C00' : '2px solid #FFE0B2',
                            background: isSelected ? 'linear-gradient(135deg, #FFE0B2, #FFFFFF)' : '#FFFDF7',
                            color: '#6D4C41',
                            fontWeight: 900,
                            fontSize: '28px',
                            cursor: 'pointer',
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={resetSelections}>
                清空重选
              </Button>
              <Button onClick={() => speakText(currentRound?.syllable ?? '')}>播放目标发音</Button>
              <Button variant="secondary" onClick={resetGame}>
                重开整条主线
              </Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
