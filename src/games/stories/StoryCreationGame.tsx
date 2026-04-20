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
} from '../frameworks/frameworkHelpers';

interface StoryOption {
  label: string;
  emoji: string;
}

const characters: StoryOption[] = [
  { label: '勇敢的小兔', emoji: '🐰' },
  { label: '会思考的小熊', emoji: '🐻' },
  { label: '爱分享的小鹿', emoji: '🦌' },
];

const places: StoryOption[] = [
  { label: '彩虹森林', emoji: '🌈' },
  { label: '星星湖边', emoji: '🌟' },
  { label: '云朵小镇', emoji: '☁️' },
];

const events: StoryOption[] = [
  { label: '寻找走丢的风筝', emoji: '🪁' },
  { label: '帮助朋友过小桥', emoji: '🌉' },
  { label: '给花园送去清水', emoji: '💧' },
];

const endings: StoryOption[] = [
  { label: '大家一起欢呼', emoji: '🎉' },
  { label: '学会了新的办法', emoji: '💡' },
  { label: '把快乐分享出去', emoji: '💌' },
];

const CREATION_GOAL = 2;

function buildStory(
  character: StoryOption | null,
  place: StoryOption | null,
  event: StoryOption | null,
  ending: StoryOption | null
) {
  if (!character || !place || !event || !ending) {
    return [];
  }

  return [
    `${character.emoji}${character.label} 今天来到了 ${place.emoji}${place.label}。`,
    `在那里，TA 遇到了一个任务：${event.emoji}${event.label}。`,
    `最后，TA 和伙伴们一起努力，${ending.emoji}${ending.label}。`,
  ];
}

export default function StoryCreationGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('story-creation');
  const [selectedCharacter, setSelectedCharacter] = useState<StoryOption | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<StoryOption | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<StoryOption | null>(null);
  const [selectedEnding, setSelectedEnding] = useState<StoryOption | null>(null);
  const [createdStories, setCreatedStories] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const previewLines = useMemo(
    () => buildStory(selectedCharacter, selectedPlace, selectedEvent, selectedEnding),
    [selectedCharacter, selectedEnding, selectedEvent, selectedPlace]
  );

  useEffect(() => {
    track('game_start', { gameId: 'story-creation', targetStories: CREATION_GOAL });
  }, []);

  const resetSelections = useCallback(() => {
    setSelectedCharacter(null);
    setSelectedPlace(null);
    setSelectedEvent(null);
    setSelectedEnding(null);
  }, []);

  const resetGame = useCallback(() => {
    setCreatedStories([]);
    setCompleted(false);
    resetSelections();
    track('game_start', { gameId: 'story-creation', targetStories: CREATION_GOAL });
  }, [resetSelections]);

  const handleBack = useCallback(() => {
    navigate('/games/stories');
  }, [navigate]);

  const handleCreate = useCallback(() => {
    if (previewLines.length === 0 || completed) {
      return;
    }

    const nextStory = previewLines.join('\n');
    if (createdStories.includes(nextStory)) {
      return;
    }

    const nextStories = [...createdStories, nextStory];
    setCreatedStories(nextStories);
    resetSelections();

    if (nextStories.length >= CREATION_GOAL) {
      const uniqueIdeas = new Set(
        nextStories.flatMap((story) => story.split('\n').map((sentence) => sentence.replace(/[。！]/g, '')))
      ).size;
      const stars = uniqueIdeas >= 6 ? 3 : uniqueIdeas >= 4 ? 2 : 1;
      setCompleted(true);
      handleGameComplete({
        success: true,
        stars,
        tasksCompleted: nextStories.length,
        accuracy: 1,
        xp: 24,
      });
    }
  }, [completed, createdStories, handleGameComplete, previewLines, resetSelections]);

  return (
    <PageLayout maxWidth="960px">
      <GamePageHeader
        title="故事创作工坊"
        icon="🪄"
        subtitle="选角色、选地点、选任务，拼出自己的小故事。"
        gradient="linear-gradient(135deg, #AB47BC, #FFB74D, #8E24AA)"
        progressColor="#AB47BC"
        onBack={handleBack}
        backLabel="← 返回故事王国"
      />

      <FrameworkPanel borderColor="#CE93D8" background="linear-gradient(135deg, #FFFFFF, #FCE4EC)">
        <FrameworkStatGrid
          accent="#8E24AA"
          surface="#FFFFFF"
          items={[
            { label: '已创作', value: `${createdStories.length}/${CREATION_GOAL}` },
            { label: '角色', value: selectedCharacter?.emoji ?? '❔', note: selectedCharacter?.label ?? '待选择' },
            { label: '地点', value: selectedPlace?.emoji ?? '❔', note: selectedPlace?.label ?? '待选择' },
            { label: '事件', value: selectedEvent?.emoji ?? '❔', note: selectedEvent?.label ?? '待选择' },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji="📖"
            title="小作家完成创作"
            summary={`你已经完成 ${createdStories.length} 个原创故事卡片，故事工坊点亮啦。`}
            accent="#8E24AA"
            background="linear-gradient(135deg, #F3E5F5, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回王国
              </Button>
              <Button onClick={resetGame}>再写两篇</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              {[
                { title: '主角', options: characters, selected: selectedCharacter, setter: setSelectedCharacter },
                { title: '地点', options: places, selected: selectedPlace, setter: setSelectedPlace },
                { title: '任务', options: events, selected: selectedEvent, setter: setSelectedEvent },
                { title: '结局', options: endings, selected: selectedEnding, setter: setSelectedEnding },
              ].map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '18px',
                    border: '2px solid #E1BEE7',
                  }}
                >
                  <h3 style={{ margin: '0 0 12px 0', color: '#8E24AA', fontSize: '22px' }}>{section.title}</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {section.options.map((option) => {
                      const isSelected = section.selected?.label === option.label;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => section.setter(option)}
                          style={{
                            minHeight: '68px',
                            borderRadius: '18px',
                            border: isSelected ? '3px solid #AB47BC' : '2px solid #F3E5F5',
                            background: isSelected ? 'linear-gradient(135deg, #F3E5F5, #FFF8E1)' : '#FFFFFF',
                            color: '#6A1B9A',
                            fontWeight: 800,
                            fontSize: '18px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ fontSize: '28px' }}>{option.emoji}</span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '22px',
                padding: '20px',
                border: '2px solid #F8BBD0',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', color: '#8E24AA', fontSize: '24px' }}>故事预览</h3>
              {previewLines.length > 0 ? (
                <div style={{ color: '#5D4037', fontWeight: 700, lineHeight: 1.9 }}>
                  {previewLines.map((line) => (
                    <p key={line} style={{ margin: '0 0 8px 0' }}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <div style={{ color: '#8D6E63', fontWeight: 700 }}>
                  先从四个栏位里选好内容，故事就会自动长出来。
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Button variant="secondary" onClick={resetSelections}>
                清空灵感
              </Button>
              <Button onClick={handleCreate} disabled={previewLines.length === 0}>
                生成故事卡
              </Button>
            </div>

            {createdStories.length > 0 && (
              <div style={{ display: 'grid', gap: '14px' }}>
                {createdStories.map((story) => (
                  <div
                    key={story}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '18px',
                      border: '2px solid #F8BBD0',
                      color: '#5D4037',
                      fontWeight: 700,
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {story}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
