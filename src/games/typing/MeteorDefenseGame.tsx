import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { typingMeteorWave } from './typingData';
import { TypingCallout, TypingKeyboard, TypingStatCard } from './typingShared';
import { calculateTypingStars, displayTypingKey, formatPercent, normalizeTypingKey } from './typingUtils';

interface Meteor {
  id: number;
  key: string;
  lane: number;
  progress: number;
}

interface MeteorGameState {
  meteors: Meteor[];
  spawned: number;
  hits: number;
  errors: number;
  leaks: number;
  completed: boolean;
}

const laneCount = 6;

const initialState: MeteorGameState = {
  meteors: [],
  spawned: 0,
  hits: 0,
  errors: 0,
  leaks: 0,
  completed: false,
};

export default function MeteorDefenseGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('meteor-defense');
  const [state, setState] = useState<MeteorGameState>(initialState);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const accuracy =
    state.hits + state.errors + state.leaks === 0
      ? 1
      : state.hits / (state.hits + state.errors + state.leaks);
  const completionRate = state.hits / typingMeteorWave.length;

  const urgentKey = useMemo(() => {
    if (state.meteors.length === 0) {
      return undefined;
    }

    return [...state.meteors].sort((a, b) => b.progress - a.progress)[0].key;
  }, [state.meteors]);

  const completeGame = useCallback(
    (nextState: MeteorGameState) => {
      const nextAccuracy =
        nextState.hits + nextState.errors + nextState.leaks === 0
          ? 1
          : nextState.hits / (nextState.hits + nextState.errors + nextState.leaks);
      const nextCompletion = nextState.hits / typingMeteorWave.length;
      const stars = calculateTypingStars(nextAccuracy, nextCompletion);

      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: typingMeteorWave.length,
        accuracy: nextAccuracy,
        xp: 30,
      });
    },
    [handleGameComplete]
  );

  useEffect(() => {
    track('game_start', { gameId: 'meteor-defense', meteorCount: typingMeteorWave.length });
  }, []);

  useEffect(() => {
    if (!errorKey) {
      return undefined;
    }

    const timer = window.setTimeout(() => setErrorKey(null), 180);
    return () => window.clearTimeout(timer);
  }, [errorKey]);

  useEffect(() => {
    if (state.completed) {
      return undefined;
    }

    const spawnTimer = window.setInterval(() => {
      setState((previous) => {
        if (previous.completed || previous.spawned >= typingMeteorWave.length) {
          return previous;
        }

        const nextMeteor: Meteor = {
          id: previous.spawned + 1,
          key: typingMeteorWave[previous.spawned],
          lane: previous.spawned % laneCount,
          progress: 0,
        };

        return {
          ...previous,
          spawned: previous.spawned + 1,
          meteors: [...previous.meteors, nextMeteor],
        };
      });
    }, 1000);

    const fallTimer = window.setInterval(() => {
      let snapshot: MeteorGameState | null = null;

      setState((previous) => {
        if (previous.completed) {
          return previous;
        }

        let leaked = 0;
        const nextMeteors = previous.meteors.flatMap((meteor) => {
          const nextProgress = meteor.progress + 8;
          if (nextProgress >= 100) {
            leaked += 1;
            return [];
          }
          return [{ ...meteor, progress: nextProgress }];
        });

        const nextState = {
          ...previous,
          leaks: previous.leaks + leaked,
          meteors: nextMeteors,
        };

        if (nextState.spawned >= typingMeteorWave.length && nextState.meteors.length === 0) {
          snapshot = { ...nextState, completed: true };
          return snapshot;
        }

        return nextState;
      });

      if (snapshot) {
        completeGame(snapshot);
      }
    }, 130);

    return () => {
      window.clearInterval(spawnTimer);
      window.clearInterval(fallTimer);
    };
  }, [completeGame, state.completed]);

  useEffect(() => {
    if (state.completed) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      const key = normalizeTypingKey(event.key);
      if (!key) {
        return;
      }

      let snapshot: MeteorGameState | null = null;
      let matched = false;

      setState((previous) => {
        if (previous.completed) {
          return previous;
        }

        const matchedMeteor = [...previous.meteors]
          .filter((meteor) => meteor.key === key)
          .sort((a, b) => b.progress - a.progress)[0];

        if (!matchedMeteor) {
          return { ...previous, errors: previous.errors + 1 };
        }

        matched = true;
        const nextState = {
          ...previous,
          hits: previous.hits + 1,
          meteors: previous.meteors.filter((meteor) => meteor.id !== matchedMeteor.id),
        };

        if (nextState.spawned >= typingMeteorWave.length && nextState.meteors.length === 0) {
          snapshot = { ...nextState, completed: true };
          return snapshot;
        }

        return nextState;
      });

      if (!matched) {
        setErrorKey(key);
      }

      if (snapshot) {
        completeGame(snapshot);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [completeGame, state.completed]);

  const handleBack = useCallback(() => {
    navigate('/games/ai-typing');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setState(initialState);
    setErrorKey(null);
    track('game_restart', { gameId: 'meteor-defense' });
  }, []);

  return (
    <PageLayout maxWidth="980px">
      <GamePageHeader
        title="字母陨石防线"
        icon="☄️"
        subtitle="字母陨石正掉向基地，按下对应按键，帮 AI 盾牌把它们一一拦住。"
        gradient="linear-gradient(135deg, #5E35B1, #1E88E5, #26C6DA)"
        progressColor="#1E88E5"
        onBack={handleBack}
        backLabel="← 返回 AI 打字训练营"
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TypingStatCard label="已拦截" value={`${state.hits}/${typingMeteorWave.length}`} note="救下越多越好" />
          <TypingStatCard label="准确率" value={formatPercent(accuracy)} note={`漏掉 ${state.leaks} 个`} />
          <TypingStatCard label="当前重点" value={urgentKey ? displayTypingKey(urgentKey) : '--'} note="优先打最靠下的陨石" />
          <TypingStatCard label="误按" value={`${state.errors}`} note="看清后再敲更稳" />
        </div>

        <TypingCallout
          title="玩法说明"
          detail="屏幕上的圆球越靠下越危险。优先按离基地最近的字母，孩子能同时练到观察、反应和键位定位。"
        />

        <section
          style={{
            position: 'relative',
            minHeight: '360px',
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0B1026 0%, #1A237E 50%, #283593 100%)',
            border: '2px solid rgba(124, 77, 255, 0.22)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22), transparent 20%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.18), transparent 18%), radial-gradient(circle at 60% 10%, rgba(255,255,255,0.18), transparent 12%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: '18px',
              display: 'grid',
              gridTemplateColumns: `repeat(${laneCount}, minmax(0, 1fr))`,
              gap: '12px',
            }}
          >
            {Array.from({ length: laneCount }).map((_, lane) => (
              <div
                key={lane}
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {state.meteors
                  .filter((meteor) => meteor.lane === lane)
                  .map((meteor) => (
                    <div
                      key={meteor.id}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: `${meteor.progress}%`,
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: meteor.key === urgentKey ? '#FFD54F' : '#80DEEA',
                        color: '#1A237E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 900,
                        boxShadow: '0 12px 24px rgba(0,0,0,0.22)',
                      }}
                    >
                      {meteor.key}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              left: '18px',
              right: '18px',
              bottom: '18px',
              borderRadius: '20px',
              padding: '16px 18px',
              background: 'linear-gradient(135deg, rgba(38,198,218,0.85), rgba(124,77,255,0.88))',
              color: '#FFFFFF',
              fontWeight: 800,
            }}
          >
            AI 基地护盾 {formatPercent(completionRate)} · 优先守住越靠下的字母
          </div>
        </section>

        <TypingKeyboard activeKeys={urgentKey ? [urgentKey] : []} errorKey={errorKey} />

        {state.completed ? (
          <TypingCallout
            title="防线守住了"
            detail={`共拦截 ${state.hits} 枚字母陨石，准确率 ${formatPercent(accuracy)}。这是最像经典打字闯关的一关，练反应特别有效。`}
            tone="success"
          />
        ) : null}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleBack}>
            返回训练营
          </Button>
          <Button onClick={handleRestart}>再守一轮</Button>
        </div>
      </div>
    </PageLayout>
  );
}
