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
  sampleItems,
  speakText,
} from '../frameworks/frameworkHelpers';

interface DialogueChoice {
  text: string;
  correct: boolean;
  reply: string;
}

interface RoleplayRound {
  scene: string;
  prompt: string;
  choices: DialogueChoice[];
}

const ROLEPLAY_BANK: RoleplayRound[] = [
  {
    scene: '🛝 Playground',
    prompt: 'A friend says: "Hi! Can we play together?"',
    choices: [
      { text: 'Yes, let’s play!', correct: true, reply: 'Great! You sound friendly and confident.' },
      { text: 'Blue banana.', correct: false, reply: 'That sounds funny, but it does not answer the friend.' },
      { text: 'Good night.', correct: false, reply: 'Close in tone, but the scene is daytime playtime.' },
    ],
  },
  {
    scene: '🍎 Supermarket',
    prompt: 'The shopkeeper asks: "What do you want?"',
    choices: [
      { text: 'I want apples, please.', correct: true, reply: 'Wonderful! You asked clearly and politely.' },
      { text: 'I am a tiger.', correct: false, reply: 'A tiger is exciting, but not a shopping answer.' },
      { text: 'My pencil is green.', correct: false, reply: 'That is a sentence, but not what the shopkeeper asked.' },
    ],
  },
  {
    scene: '🏠 Home',
    prompt: 'Mom says: "Time to wash your hands."',
    choices: [
      { text: 'Okay, I will wash my hands.', correct: true, reply: 'Excellent! That shows understanding and action.' },
      { text: 'Three fish jump.', correct: false, reply: 'Nice words, but they do not fit the situation.' },
      { text: 'Where is the moon?', correct: false, reply: 'Interesting question, but it is not the right response now.' },
    ],
  },
  {
    scene: '🎂 Birthday party',
    prompt: 'Your friend gives you cake. What do you say?',
    choices: [
      { text: 'Thank you!', correct: true, reply: 'Perfect! That is kind and natural.' },
      { text: 'Open the window.', correct: false, reply: 'That would fit another moment, not a birthday treat.' },
      { text: 'I am a bus.', correct: false, reply: 'Funny, but not the polite answer here.' },
    ],
  },
  {
    scene: '📚 Classroom',
    prompt: 'Teacher asks: "Are you ready?"',
    choices: [
      { text: 'Yes, I am ready!', correct: true, reply: 'Great job! You answered with confidence.' },
      { text: 'The cat is sleepy.', correct: false, reply: 'That sentence is correct, but not for this question.' },
      { text: 'I like oranges.', correct: false, reply: 'A good sentence, just not the right response.' },
    ],
  },
];

const TOTAL_ROUNDS = 5;

export default function EnglishRoleplayGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('english-roleplay');
  const [sessionSeed, setSessionSeed] = useState(0);
  const rounds = useMemo(() => sampleItems(ROLEPLAY_BANK, TOTAL_ROUNDS), [sessionSeed]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<DialogueChoice | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentRound = rounds[roundIndex];

  useEffect(() => {
    track('game_start', { gameId: 'english-roleplay', rounds: TOTAL_ROUNDS });
  }, [sessionSeed]);

  useEffect(() => {
    if (currentRound && !completed) {
      speakText(currentRound.prompt, 'en-US');
    }
  }, [completed, currentRound]);

  const resetGame = useCallback(() => {
    setSessionSeed((value) => value + 1);
    setRoundIndex(0);
    setCorrectCount(0);
    setSelectedChoice(null);
    setCompleted(false);
  }, []);

  const handleBack = useCallback(() => {
    navigate('/games/english');
  }, [navigate]);

  const handleChoice = useCallback(
    (choice: DialogueChoice) => {
      if (selectedChoice || completed) {
        return;
      }

      setSelectedChoice(choice);
      const nextCorrect = correctCount + (choice.correct ? 1 : 0);
      if (choice.correct) {
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
          setSelectedChoice(null);
        }
      }, 820);
    },
    [completed, correctCount, handleGameComplete, roundIndex, rounds.length, selectedChoice]
  );

  const accuracy = roundIndex === 0 && !completed ? 0 : correctCount / (completed ? rounds.length : Math.max(roundIndex, 1));
  const stars = correctCount / rounds.length >= 0.95 ? 3 : correctCount / rounds.length >= 0.75 ? 2 : correctCount > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="860px">
      <GamePageHeader
        title="英语角色扮演"
        icon="🎭"
        subtitle="选出最自然的回答，让英语真的用起来。"
        gradient="linear-gradient(135deg, #4CAF50, #26A69A, #81C784)"
        progressColor="#4CAF50"
        onBack={handleBack}
        backLabel="← 返回英语游乐园"
        currentTask={Math.min(roundIndex + 1, rounds.length)}
        totalTasks={rounds.length}
      />

      <FrameworkPanel borderColor="#A5D6A7" background="linear-gradient(135deg, #FFFFFF, #F1F8E9)">
        <FrameworkStatGrid
          accent="#2E7D32"
          surface="#FFFFFF"
          items={[
            { label: '场景', value: currentRound?.scene.split(' ')[0] ?? '--', note: currentRound?.scene.split(' ')[1] ?? '' },
            { label: '进度', value: `${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}` },
            { label: '答对', value: `${correctCount}` },
            { label: '表现', value: completed ? `${stars} 星` : `${Math.round(accuracy * 100)}%` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji="🗣️"
            title="对话完成"
            summary={`你完成了 ${rounds.length} 个情景对话，答对 ${correctCount} 题，获得 ${stars} 颗星。`}
            accent="#2E7D32"
            background="linear-gradient(135deg, #E8F5E9, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回乐园
              </Button>
              <Button onClick={resetGame}>再演一轮</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '20px',
                border: '2px solid #C8E6C9',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '18px', color: '#2E7D32', fontWeight: 800, marginBottom: '10px' }}>
                {currentRound?.scene}
              </div>
              <div style={{ fontSize: '28px', color: '#1B5E20', fontWeight: 900, lineHeight: 1.5, marginBottom: '14px' }}>
                {currentRound?.prompt}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Button variant="secondary" onClick={() => speakText(currentRound?.prompt ?? '', 'en-US')}>
                  再听一遍
                </Button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '20px' }}>
              {currentRound?.choices.map((choice) => {
                const isSelected = selectedChoice?.text === choice.text;
                const tone = !selectedChoice
                  ? '#C8E6C9'
                  : choice.correct
                    ? '#66BB6A'
                    : isSelected
                      ? '#EF5350'
                      : '#E0E0E0';

                return (
                  <button
                    key={choice.text}
                    type="button"
                    onClick={() => handleChoice(choice)}
                    disabled={!!selectedChoice}
                    style={{
                      minHeight: '88px',
                      borderRadius: '20px',
                      border: `3px solid ${tone}`,
                      background: '#FFFFFF',
                      color: '#1B5E20',
                      fontWeight: 800,
                      fontSize: '22px',
                      cursor: selectedChoice ? 'default' : 'pointer',
                      textAlign: 'left',
                      padding: '18px 20px',
                    }}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>

            {selectedChoice && (
              <div
                style={{
                  borderRadius: '20px',
                  padding: '18px',
                  background: selectedChoice.correct ? '#E8F5E9' : '#FFF3E0',
                  color: '#33691E',
                  fontWeight: 700,
                  lineHeight: 1.7,
                }}
              >
                {selectedChoice.reply}
              </div>
            )}
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
