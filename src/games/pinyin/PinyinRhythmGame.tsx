import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  speakText,
} from '../frameworks/frameworkHelpers';

interface RhythmRound {
  syllable: string;
  hint: string;
  pattern: boolean[];
  note: string;
}

const RHYTHM_BANK: RhythmRound[] = [
  { syllable: 'ma', hint: '🐴', pattern: [true, false, true, false], note: '轻轻拍两下' },
  { syllable: 'gua', hint: '🍉', pattern: [true, true, false, true], note: '前快后停再来' },
  { syllable: 'xue', hint: '❄️', pattern: [false, true, true, false], note: '中间连着拍' },
  { syllable: 'qiao', hint: '🌉', pattern: [true, false, true, true], note: '尾巴要连拍' },
  { syllable: 'shui', hint: '💧', pattern: [true, true, false, false], note: '先拍两下后休息' },
  { syllable: 'yuan', hint: '🌙', pattern: [false, true, false, true], note: '隔一拍再拍' },
];

const TOTAL_ROUNDS = 5;

export default function PinyinRhythmGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-rhythm');
  const [sessionSeed, setSessionSeed] = useState(0);
  const rounds = useMemo(() => sampleItems(RHYTHM_BANK, TOTAL_ROUNDS), [sessionSeed]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [playerPattern, setPlayerPattern] = useState<boolean[]>([false, false, false, false]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [completed, setCompleted] = useState(false);
  const previewTimers = useRef<number[]>([]);

  const currentRound = rounds[roundIndex];

  const clearPreviewTimers = useCallback(() => {
    previewTimers.current.forEach((timer) => window.clearTimeout(timer));
    previewTimers.current = [];
  }, []);

  const startPreview = useCallback(() => {
    if (!currentRound) {
      return;
    }

    clearPreviewTimers();
    setIsPreviewing(true);
    setPreviewIndex(null);
    speakText(currentRound.syllable);

    currentRound.pattern.forEach((_, index) => {
      previewTimers.current.push(
        window.setTimeout(() => {
          setPreviewIndex(index);
        }, index * 420)
      );
    });

    previewTimers.current.push(
      window.setTimeout(() => {
        setPreviewIndex(null);
        setIsPreviewing(false);
      }, currentRound.pattern.length * 420 + 160)
    );
  }, [clearPreviewTimers, currentRound]);

  useEffect(() => {
    track('game_start', { gameId: 'pinyin-rhythm', rounds: TOTAL_ROUNDS });
    return clearPreviewTimers;
  }, [clearPreviewTimers]);

  useEffect(() => {
    setPlayerPattern([false, false, false, false]);
    setFeedback('idle');
    if (!completed) {
      startPreview();
    }
  }, [completed, roundIndex, sessionSeed, startPreview]);

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setPlayerPattern([false, false, false, false]);
    setAttempts(0);
    setCorrectCount(0);
    setFeedback('idle');
    setCompleted(false);
    clearPreviewTimers();
    track('game_start', { gameId: 'pinyin-rhythm', rounds: TOTAL_ROUNDS });
  }, [clearPreviewTimers]);

  const submitPattern = useCallback(() => {
    if (!currentRound || isPreviewing || completed) {
      return;
    }

    const isCorrect = playerPattern.every((value, index) => value === currentRound.pattern[index]);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setFeedback(isCorrect ? 'success' : 'error');

    window.setTimeout(() => {
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
            xp: 24,
          });
        } else {
          setRoundIndex((value) => value + 1);
        }
      } else {
        setPlayerPattern([false, false, false, false]);
        startPreview();
        setFeedback('idle');
      }
    }, isCorrect ? 520 : 720);
  }, [attempts, completed, correctCount, currentRound, handleGameComplete, isPreviewing, playerPattern, roundIndex, rounds.length, startPreview]);

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  const accuracy = attempts === 0 ? 0 : correctCount / attempts;
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.75 ? 2 : accuracy > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="860px">
      <GamePageHeader
        title="拼音节奏大师"
        icon="🥁"
        subtitle="先听一遍节奏，再把正确拍点点亮。"
        gradient="linear-gradient(135deg, #AB47BC, #FF8A65, #FFA726)"
        progressColor="#AB47BC"
        onBack={handleBack}
        backLabel="← 返回拼音冒险岛"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#CE93D8" background="linear-gradient(135deg, #FFFFFF, #FCE4EC)">
        <FrameworkStatGrid
          accent="#8E24AA"
          surface="#FFFFFF"
          items={[
            { label: '当前拼音', value: currentRound?.syllable ?? '--', note: currentRound?.hint ?? '' },
            { label: '完成轮数', value: `${correctCount}/${rounds.length}` },
            { label: '准确率', value: `${Math.round(accuracy * 100)}%` },
            { label: '状态', value: isPreviewing ? '示范中' : '轮到你' },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🎵' : stars === 2 ? '🎶' : '👏'}
            title="节奏接住啦"
            summary={`你完成了 ${rounds.length} 轮节奏模仿，准确率 ${Math.round(
              accuracy * 100
            )}% ，拿到 ${stars} 颗星。`}
            accent="#8E24AA"
            background="linear-gradient(135deg, #F3E5F5, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回岛屿
              </Button>
              <Button onClick={resetGame}>再来一首</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                borderRadius: '22px',
                padding: '18px',
                marginBottom: '18px',
                background: feedback === 'success' ? '#E8F5E9' : feedback === 'error' ? '#FFEBEE' : '#FFF3E0',
                border: `2px solid ${feedback === 'success' ? '#66BB6A' : feedback === 'error' ? '#EF5350' : '#F8BBD0'}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '8px' }}>{currentRound?.hint}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#6A1B9A', marginBottom: '6px' }}>
                {currentRound?.syllable}
              </div>
              <div style={{ color: '#8D6E63', fontWeight: 700 }}>
                {isPreviewing
                  ? '正在示范节奏，请先用眼睛和耳朵记住。'
                  : feedback === 'error'
                    ? '节奏还差一点，再听一遍。'
                    : feedback === 'success'
                      ? '完全对拍，继续下一轮。'
                      : `提示：${currentRound?.note ?? ''}`}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {currentRound?.pattern.map((active, index) => {
                const selected = playerPattern[index];
                const previewing = previewIndex === index;
                return (
                  <button
                    key={`beat-${index}`}
                    type="button"
                    disabled={isPreviewing}
                    onClick={() =>
                      setPlayerPattern((value) => value.map((item, itemIndex) => (itemIndex === index ? !item : item)))
                    }
                    style={{
                      minHeight: '110px',
                      borderRadius: '22px',
                      border: previewing ? '4px solid #AB47BC' : selected ? '3px solid #8E24AA' : '2px solid #E1BEE7',
                      background: previewing
                        ? 'linear-gradient(135deg, #F8BBD0, #F3E5F5)'
                        : selected
                          ? 'linear-gradient(135deg, #E1BEE7, #F3E5F5)'
                          : '#FFFDFE',
                      color: active || selected ? '#6A1B9A' : '#B39DDB',
                      fontSize: '28px',
                      fontWeight: 900,
                      cursor: isPreviewing ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {previewing ? '🎵' : selected ? '👏' : '·'}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => setPlayerPattern([false, false, false, false])} disabled={isPreviewing}>
                清空拍点
              </Button>
              <Button variant="secondary" onClick={startPreview}>
                再听一遍
              </Button>
              <Button onClick={submitPattern} disabled={isPreviewing}>
                提交节奏
              </Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
