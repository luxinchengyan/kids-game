import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button';
import { track } from '../../lib/analytics';
import { useGameCompletion } from '../../hooks/useGameCompletion';

type Phase = 'ready' | 'waiting' | 'go' | 'finished';
type Difficulty = 'easy' | 'medium' | 'hard';

const difficultySettings: Record<Difficulty, { label: string; rounds: number; minDelay: number; maxDelay: number }> = {
  easy: { label: '轻松热身', rounds: 5, minDelay: 1400, maxDelay: 2400 },
  medium: { label: '专注挑战', rounds: 6, minDelay: 1200, maxDelay: 2100 },
  hard: { label: '闪电模式', rounds: 7, minDelay: 900, maxDelay: 1800 },
};

export default function ReactionChallengeGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('reaction-test');
  const timerRef = useRef<number | null>(null);
  const phaseStartRef = useRef(0);

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [phase, setPhase] = useState<Phase>('ready');
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const [falseStarts, setFalseStarts] = useState(0);
  const [lastReaction, setLastReaction] = useState<number | null>(null);

  const settings = difficultySettings[difficulty];
  const averageReaction = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, value) => sum + value, 0) / results.length);
  }, [results]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const finishGame = useCallback(
    (reactionResults: number[], mistakes: number) => {
      clearTimer();
      setPhase('finished');
      const average = reactionResults.length
        ? reactionResults.reduce((sum, value) => sum + value, 0) / reactionResults.length
        : 9999;
      const stars = average <= 500 && mistakes === 0 ? 3 : average <= 700 && mistakes <= 1 ? 2 : 1;
      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: reactionResults.length,
        accuracy: reactionResults.length / (reactionResults.length + mistakes),
        xp: 20,
      });
    },
    [clearTimer, handleGameComplete]
  );

  const startNextRound = useCallback(
    (nextRound: number) => {
      clearTimer();
      setPhase('waiting');
      phaseStartRef.current = Date.now();
      const delay =
        settings.minDelay + Math.floor(Math.random() * (settings.maxDelay - settings.minDelay + 1));
      timerRef.current = window.setTimeout(() => {
        setRound(nextRound);
        setPhase('go');
        phaseStartRef.current = Date.now();
      }, delay);
    },
    [clearTimer, settings.maxDelay, settings.minDelay]
  );

  const resetGame = useCallback(
    (nextDifficulty: Difficulty = difficulty) => {
      clearTimer();
      setDifficulty(nextDifficulty);
      setPhase('ready');
      setRound(0);
      setResults([]);
      setFalseStarts(0);
      setLastReaction(null);
      track('game_start', { gameId: 'reaction-test', difficulty: nextDifficulty });
    },
    [clearTimer, difficulty]
  );

  const handleTap = useCallback(() => {
    if (phase === 'ready') {
      startNextRound(1);
      return;
    }

    if (phase === 'waiting') {
      clearTimer();
      setFalseStarts((current) => current + 1);
      setLastReaction(null);
      startNextRound(round + 1);
      return;
    }

    if (phase === 'go') {
      const reaction = Date.now() - phaseStartRef.current;
      const nextResults = [...results, reaction];
      setResults(nextResults);
      setLastReaction(reaction);

      if (round >= settings.rounds) {
        finishGame(nextResults, falseStarts);
      } else {
        startNextRound(round + 1);
      }
    }
  }, [clearTimer, falseStarts, finishGame, phase, results, round, settings.rounds, startNextRound]);

  const handleBack = useCallback(() => {
    navigate('/games/frameworks');
  }, [navigate]);

  const phaseText =
    phase === 'ready'
      ? '点一下开始'
      : phase === 'waiting'
        ? '先别点，等绿色出现'
        : phase === 'go'
          ? '现在点！'
          : '完成啦';

  const stars =
    averageReaction <= 500 && falseStarts === 0 ? 3 : averageReaction <= 700 && falseStarts <= 1 ? 2 : 1;

  return (
    <PageLayout maxWidth="760px">
      <GamePageHeader
        title="反应测试"
        icon="⚡"
        subtitle="看到绿色就马上点击，别抢跑哦！"
        gradient="linear-gradient(135deg, #4CAF50, #26C6DA, #2196F3)"
        progressColor="#26A69A"
        onBack={handleBack}
        backLabel="← 返回设计工坊"
      />

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <Button key={level} variant={difficulty === level ? 'primary' : 'secondary'} onClick={() => resetGame(level)}>
              {difficultySettings[level].label}
            </Button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          {[
            { label: '当前回合', value: `${Math.min(round, settings.rounds)} / ${settings.rounds}` },
            { label: '抢跑次数', value: String(falseStarts) },
            { label: '平均反应', value: results.length ? `${averageReaction} ms` : '--' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#F5F5F5',
                borderRadius: '18px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#757575', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#1565C0', fontWeight: 900, fontSize: '26px' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleTap}
          style={{
            width: '100%',
            minHeight: '320px',
            borderRadius: '28px',
            border: 'none',
            cursor: 'pointer',
            color: '#FFFFFF',
            fontSize: '34px',
            fontWeight: 900,
            background:
              phase === 'go'
                ? 'linear-gradient(135deg, #43A047, #66BB6A)'
                : phase === 'finished'
                  ? 'linear-gradient(135deg, #7E57C2, #AB47BC)'
                  : 'linear-gradient(135deg, #FF7043, #EF5350)',
            boxShadow: '0 18px 36px rgba(0,0,0,0.16)',
            marginBottom: '20px',
          }}
        >
          <div>{phaseText}</div>
          {phase === 'waiting' && <div style={{ fontSize: '18px', marginTop: '12px' }}>耐心等一等～</div>}
          {phase === 'go' && <div style={{ fontSize: '18px', marginTop: '12px' }}>越快越好！</div>}
          {phase === 'finished' && (
            <div style={{ fontSize: '18px', marginTop: '12px' }}>
              平均 {averageReaction} ms · {stars} 星
            </div>
          )}
        </motion.button>

        {lastReaction !== null && phase !== 'finished' && (
          <div
            style={{
              textAlign: 'center',
              color: '#00695C',
              fontWeight: 800,
              fontSize: '18px',
              marginBottom: '16px',
            }}
          >
            上一次反应：{lastReaction} ms
          </div>
        )}

        {phase === 'finished' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={handleBack}>
              返回工坊
            </Button>
            <Button onClick={() => resetGame()}>再玩一次</Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
