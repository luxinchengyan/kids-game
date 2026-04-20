import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { rhythmMissions } from './typingData';
import { TypingCallout, TypingKeyboard, TypingStatCard } from './typingShared';
import { calculateTypingStars, formatPercent, normalizeTypingKey } from './typingUtils';

export default function RhythmAssemblyGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('rhythm-assembly');
  const [missionIndex, setMissionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [paceNote, setPaceNote] = useState('先跟着节奏灯，一次敲一个键。');
  const [lastPressedAt, setLastPressedAt] = useState<number | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentMission = rhythmMissions[missionIndex];
  const activeKey = currentMission.pattern[charIndex];
  const accuracy = hits + errors === 0 ? 1 : hits / (hits + errors);
  const totalCharacters = useMemo(
    () => rhythmMissions.reduce((sum, mission) => sum + mission.pattern.length, 0),
    []
  );

  useEffect(() => {
    track('game_start', { gameId: 'rhythm-assembly', segmentCount: rhythmMissions.length });
  }, []);

  useEffect(() => {
    if (!errorKey) {
      return undefined;
    }

    const timer = window.setTimeout(() => setErrorKey(null), 180);
    return () => window.clearTimeout(timer);
  }, [errorKey]);

  useEffect(() => {
    if (completed) {
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

      if (key === activeKey) {
        const now = Date.now();
        const gap = lastPressedAt ? now - lastPressedAt : currentMission.targetGap;
        const onBeat = gap >= currentMission.targetGap - 220 && gap <= currentMission.targetGap + 320;
        const nextCombo = onBeat ? combo + 1 : 1;
        const nextHits = hits + 1;

        setHits(nextHits);
        setCombo(nextCombo);
        setBestCombo((value) => Math.max(value, nextCombo));
        setLastPressedAt(now);
        setPaceNote(onBeat ? '节奏很稳，继续保持！' : gap < currentMission.targetGap ? '有点快，像心跳一样均匀会更好。' : '稍微再快一点，别让节奏掉下来。');

        if (charIndex + 1 >= currentMission.pattern.length) {
          if (missionIndex + 1 >= rhythmMissions.length) {
            const nextAccuracy = nextHits / (nextHits + errors);
            const completionRate = nextHits / totalCharacters;
            const stars = calculateTypingStars(nextAccuracy, completionRate);
            setCompleted(true);
            handleGameComplete({
              success: true,
              stars,
              tasksCompleted: rhythmMissions.length,
              accuracy: nextAccuracy,
              xp: 34,
            });
            return;
          }

          setMissionIndex((value) => value + 1);
          setCharIndex(0);
          return;
        }

        setCharIndex((value) => value + 1);
        return;
      }

      setErrors((value) => value + 1);
      setCombo(0);
      setPaceNote('先看准发光按键，再继续装配。');
      setErrorKey(key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    activeKey,
    charIndex,
    combo,
    completed,
    currentMission.pattern.length,
    currentMission.targetGap,
    errors,
    handleGameComplete,
    hits,
    lastPressedAt,
    missionIndex,
    totalCharacters,
  ]);

  const handleBack = useCallback(() => {
    navigate('/games/ai-typing');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setMissionIndex(0);
    setCharIndex(0);
    setCombo(0);
    setBestCombo(0);
    setHits(0);
    setErrors(0);
    setPaceNote('先跟着节奏灯，一次敲一个键。');
    setLastPressedAt(null);
    setErrorKey(null);
    setCompleted(false);
    track('game_restart', { gameId: 'rhythm-assembly' });
  }, []);

  return (
    <PageLayout maxWidth="980px">
      <GamePageHeader
        title="节奏装配舱"
        icon="🎵"
        subtitle="跟着节奏灯一键一键装配 AI 芯片，把常用键位打得又稳又顺。"
        gradient="linear-gradient(135deg, #FF7043, #FFCA28, #7C4DFF)"
        progressColor="#FF7043"
        onBack={handleBack}
        backLabel="← 返回 AI 打字训练营"
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TypingStatCard label="节拍段" value={`${missionIndex + 1}/${rhythmMissions.length}`} note={currentMission.title} />
          <TypingStatCard label="当前键" value={activeKey} note={currentMission.focus} />
          <TypingStatCard label="连击" value={`${combo}`} note={`最佳 ${bestCombo}`} />
          <TypingStatCard label="准确率" value={formatPercent(accuracy)} note={`已完成 ${hits}/${totalCharacters}`} />
        </div>

        <section
          style={{
            borderRadius: '28px',
            padding: '24px',
            background: 'linear-gradient(135deg, #FFF3E0, #FFF8E1, #F3E5F5)',
            border: '2px solid #FFCC80',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#EF6C00', marginBottom: '10px' }}>
            当前乐段：{currentMission.title}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#4A148C', marginBottom: '10px' }}>
            {currentMission.focus}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {currentMission.pattern.split('').map((letter, index) => {
              const isDone = index < charIndex;
              const isCurrent = index === charIndex;

              return (
                <div
                  key={`${currentMission.id}-${letter}-${index}`}
                  style={{
                    minWidth: '64px',
                    textAlign: 'center',
                    borderRadius: '18px',
                    padding: '16px 14px',
                    background: isCurrent
                      ? 'linear-gradient(135deg, #7C4DFF, #29B6F6)'
                      : isDone
                        ? 'linear-gradient(135deg, #C5E1A5, #FFF59D)'
                        : '#FFFFFF',
                    color: isCurrent ? '#FFFFFF' : '#4A148C',
                    fontSize: '28px',
                    fontWeight: 900,
                    border: '2px solid rgba(124,77,255,0.2)',
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                style={{
                  height: '14px',
                  borderRadius: '999px',
                  background: index <= combo % 5 ? '#7C4DFF' : '#E1BEE7',
                }}
              />
            ))}
          </div>
        </section>

        <TypingCallout title="节奏提示" detail={paceNote} tone={combo >= 3 ? 'success' : 'warning'} />

        <TypingKeyboard activeKeys={[activeKey]} errorKey={errorKey} />

        {completed ? (
          <TypingCallout
            title="装配完成"
            detail={`你完成了 ${rhythmMissions.length} 段节奏训练，最高连击 ${bestCombo}。这关特别适合把“知道键在哪”练成“能顺手连起来”。`}
            tone="success"
          />
        ) : null}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleBack}>
            返回训练营
          </Button>
          <Button onClick={handleRestart}>重新装配</Button>
        </div>
      </div>
    </PageLayout>
  );
}
