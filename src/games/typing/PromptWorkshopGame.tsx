import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { typingPromptMissions } from './typingData';
import { TypingCallout, TypingKeyboard, TypingStatCard } from './typingShared';
import {
  calculateTypingStars,
  displayPromptText,
  formatPercent,
  normalizeTypingKey,
} from './typingUtils';

export default function PromptWorkshopGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('prompt-workshop');
  const [missionIndex, setMissionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentMission = typingPromptMissions[missionIndex];
  const currentPrompt = currentMission.prompt;
  const activeSymbol = currentPrompt[charIndex] === ' ' ? 'SPACE' : currentPrompt[charIndex];
  const accuracy = hits + errors === 0 ? 1 : hits / (hits + errors);
  const totalCharacters = useMemo(
    () => typingPromptMissions.reduce((sum, mission) => sum + mission.prompt.length, 0),
    []
  );

  useEffect(() => {
    track('game_start', { gameId: 'prompt-workshop', promptCount: typingPromptMissions.length });
  }, []);

  useEffect(() => {
    if (!errorKey) {
      return undefined;
    }

    const timer = window.setTimeout(() => setErrorKey(null), 200);
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

      if (key === activeSymbol) {
        const nextHits = hits + 1;
        setHits(nextHits);

        if (charIndex + 1 >= currentPrompt.length) {
          if (missionIndex + 1 >= typingPromptMissions.length) {
            const nextAccuracy = nextHits / (nextHits + errors);
            const stars = calculateTypingStars(nextAccuracy);
            setCompleted(true);
            handleGameComplete({
              success: true,
              stars,
              tasksCompleted: typingPromptMissions.length,
              accuracy: nextAccuracy,
              xp: 32,
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
      setErrorKey(key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSymbol, charIndex, completed, currentPrompt.length, errors, handleGameComplete, hits, missionIndex]);

  const handleBack = useCallback(() => {
    navigate('/games/ai-typing');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setMissionIndex(0);
    setCharIndex(0);
    setHits(0);
    setErrors(0);
    setErrorKey(null);
    setCompleted(false);
    track('game_restart', { gameId: 'prompt-workshop' });
  }, []);

  const typedText = currentPrompt.slice(0, charIndex);
  const remainingText = currentPrompt.slice(charIndex);

  return (
    <PageLayout maxWidth="980px">
      <GamePageHeader
        title="AI 指令工坊"
        icon="💬"
        subtitle="像给 AI 下小任务一样输入短句，练字母路线，也练空格和整句节奏。"
        gradient="linear-gradient(135deg, #8E24AA, #7C4DFF, #29B6F6)"
        progressColor="#8E24AA"
        onBack={handleBack}
        backLabel="← 返回 AI 打字训练营"
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TypingStatCard label="任务" value={`${missionIndex + 1}/${typingPromptMissions.length}`} note={currentMission.title} />
          <TypingStatCard label="当前键" value={activeSymbol === 'SPACE' ? 'Space' : activeSymbol} note="包括空格键" />
          <TypingStatCard label="准确率" value={formatPercent(accuracy)} note={`已输入 ${hits}/${totalCharacters}`} />
          <TypingStatCard label="失误" value={`${errors}`} note="慢一点也没关系" />
        </div>

        <TypingCallout title="教练提醒" detail={currentMission.coachLine} />

        <section
          style={{
            borderRadius: '28px',
            padding: '24px',
            background: 'linear-gradient(135deg, #F3E5F5, #EDE7F6, #E1F5FE)',
            border: '2px solid #D1C4E9',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#6A1B9A', marginBottom: '10px' }}>
            当前口令：{currentMission.title}
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#4527A0',
              marginBottom: '16px',
              lineHeight: 1.8,
            }}
          >
            {displayPromptText(currentPrompt)}
          </div>
          <div
            style={{
              borderRadius: '24px',
              background: '#FFFFFF',
              padding: '22px',
              minHeight: '120px',
              border: '2px dashed #B39DDB',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#7E57C2', marginBottom: '10px' }}>
              输入进度
            </div>
            <div style={{ fontSize: '32px', lineHeight: 1.8, fontWeight: 900, wordBreak: 'break-word' }}>
              <span style={{ color: '#43A047' }}>{displayPromptText(typedText)}</span>
              <span style={{ color: '#7C4DFF', background: '#FFF8E1', borderRadius: '8px' }}>
                {remainingText.length > 0 ? displayPromptText(remainingText[0]) : ''}
              </span>
              <span style={{ color: '#9FA8DA' }}>{displayPromptText(remainingText.slice(1))}</span>
            </div>
          </div>
        </section>

        <TypingKeyboard activeKeys={[activeSymbol]} errorKey={errorKey} />

        {completed ? (
          <TypingCallout
            title="指令发送成功"
            detail={`你已经完成 ${typingPromptMissions.length} 条 AI 小指令，准确率 ${formatPercent(accuracy)}。孩子会在这关第一次感受到“我真的能打完整句话”。`}
            tone="success"
          />
        ) : null}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleBack}>
            返回训练营
          </Button>
          <Button onClick={handleRestart}>重发指令</Button>
        </div>
      </div>
    </PageLayout>
  );
}
