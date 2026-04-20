import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { keyboardScoutMissions } from './typingData';
import { TypingCallout, TypingKeyboard, TypingStatCard } from './typingShared';
import { calculateTypingStars, displayTypingKey, formatPercent, normalizeTypingKey } from './typingUtils';

const totalTargets = keyboardScoutMissions.reduce((sum, mission) => sum + mission.keys.length, 0);

export default function KeyboardScoutGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('keyboard-scout');
  const [missionIndex, setMissionIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentMission = keyboardScoutMissions[missionIndex];
  const activeKey = currentMission.keys[targetIndex];
  const attempts = hits + misses;
  const accuracy = attempts === 0 ? 1 : hits / attempts;

  const masteredKeys = useMemo(
    () =>
      keyboardScoutMissions
        .slice(0, missionIndex)
        .flatMap((mission) => mission.keys)
        .concat(currentMission.keys.slice(0, targetIndex)),
    [currentMission.keys, missionIndex, targetIndex]
  );

  useEffect(() => {
    track('game_start', { gameId: 'keyboard-scout', missionCount: keyboardScoutMissions.length });
  }, []);

  useEffect(() => {
    if (completed) {
      return undefined;
    }

    const clearError = window.setTimeout(() => setErrorKey(null), errorKey ? 200 : 0);
    return () => window.clearTimeout(clearError);
  }, [completed, errorKey]);

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
        const nextHits = hits + 1;
        setHits(nextHits);

        if (targetIndex + 1 >= currentMission.keys.length) {
          if (missionIndex + 1 >= keyboardScoutMissions.length) {
            const nextAccuracy = nextHits / (nextHits + misses);
            const stars = calculateTypingStars(nextAccuracy);
            setCompleted(true);
            handleGameComplete({
              success: true,
              stars,
              tasksCompleted: keyboardScoutMissions.length,
              accuracy: nextAccuracy,
              xp: 26,
            });
            return;
          }

          setMissionIndex((value) => value + 1);
          setTargetIndex(0);
          return;
        }

        setTargetIndex((value) => value + 1);
        return;
      }

      setMisses((value) => value + 1);
      setErrorKey(key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeKey, completed, currentMission.keys.length, handleGameComplete, hits, missionIndex, misses, targetIndex]);

  const handleBack = useCallback(() => {
    navigate('/games/ai-typing');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setMissionIndex(0);
    setTargetIndex(0);
    setHits(0);
    setMisses(0);
    setErrorKey(null);
    setCompleted(false);
    track('game_restart', { gameId: 'keyboard-scout' });
  }, []);

  return (
    <PageLayout maxWidth="980px">
      <GamePageHeader
        title="AI 键位巡航"
        icon="🛰️"
        subtitle="盯住大屏提示，找到正确按键，让 AI 飞船顺利校准控制台。"
        gradient="linear-gradient(135deg, #7C4DFF, #5C6BC0, #26C6DA)"
        progressColor="#7C4DFF"
        onBack={handleBack}
        backLabel="← 返回 AI 打字训练营"
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TypingStatCard label="关卡" value={`${missionIndex + 1}/${keyboardScoutMissions.length}`} note={currentMission.title} />
          <TypingStatCard label="目标键" value={displayTypingKey(activeKey)} note={currentMission.focus} />
          <TypingStatCard label="准确率" value={formatPercent(accuracy)} note={`已完成 ${hits}/${totalTargets}`} />
          <TypingStatCard label="失误" value={`${misses}`} note="按错会闪红，马上纠正" />
        </div>

        <motion.section
          animate={{ scale: completed ? 1 : [1, 1.02, 1] }}
          transition={{ duration: 0.8, repeat: completed ? 0 : Infinity }}
          style={{
            borderRadius: '28px',
            padding: '24px',
            background: 'linear-gradient(135deg, #1A237E, #3949AB, #26C6DA)',
            color: '#FFFFFF',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 800, opacity: 0.86, marginBottom: '8px' }}>
            当前任务：{currentMission.title}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '10px' }}>{currentMission.coachLine}</div>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                minWidth: '180px',
                borderRadius: '24px',
                padding: '18px 22px',
                background: 'rgba(255,255,255,0.16)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>现在请按</div>
              <div style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1 }}>{displayTypingKey(activeKey)}</div>
            </div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>本轮序列</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {currentMission.keys.map((key, index) => {
                  const isDone = index < targetIndex;
                  const isCurrent = index === targetIndex;

                  return (
                    <span
                      key={`${currentMission.id}-${key}-${index}`}
                      style={{
                        minWidth: '52px',
                        textAlign: 'center',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        background: isCurrent
                          ? '#FFD54F'
                          : isDone
                            ? 'rgba(129, 199, 132, 0.9)'
                            : 'rgba(255,255,255,0.18)',
                        color: isCurrent ? '#1A237E' : '#FFFFFF',
                        fontWeight: 900,
                        fontSize: '22px',
                      }}
                    >
                      {displayTypingKey(key)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        <TypingCallout title="操作提示" detail="看屏幕上的大字母，再去键盘上找同一个键。按对会立刻进入下一个目标，按错会闪红提醒。" />

        <TypingKeyboard activeKeys={[activeKey]} masteredKeys={masteredKeys} errorKey={errorKey} />

        {completed ? (
          <TypingCallout
            title="巡航完成"
            detail={`你已经完成 ${keyboardScoutMissions.length} 轮键位训练，准确率 ${formatPercent(accuracy)}。现在手指已经开始记住主键位啦！`}
            tone="success"
          />
        ) : null}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleBack}>
            返回训练营
          </Button>
          <Button onClick={handleRestart}>重新校准</Button>
        </div>
      </div>
    </PageLayout>
  );
}
