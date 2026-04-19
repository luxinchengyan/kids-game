import React, { useState, useEffect, useRef } from 'react';
import './styles/tokens.css';
import './styles/global.css';
import './styles.css';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { useUserStore } from './stores/useUserStore';
import { useRewardStore } from './stores/useRewardStore';
import { useGameStore } from './stores/useGameStore';
import { createMission } from './data/learningContent';
import ChoiceTask from './components/ChoiceTask';
import PinyinBattle from './components/PinyinBattle';
import MatchTask from './components/MatchTask';
import MicroTask from './components/MicroTask';
import StoryList from './components/StoryList';
import StoryReader from './components/StoryReader';
import { LearnProgressShare } from './components/LearnProgressShare';
import { ParentZoneCard } from './components/ParentZoneCard';
import { track } from './lib/analytics';

type View = 'home' | 'pinyin' | 'math' | 'english' | 'stories' | 'story-list' | 'story-reader' | 'task';

const App: React.FC = () => {
  const { currentChild } = useUserStore();
  const { rewards, addStars, checkIn } = useRewardStore();
  const { currentIsland, setCurrentIsland } = useGameStore();
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentTasks, setCurrentTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const taskStartedAt = useRef<number>(Date.now());

  useEffect(() => {
    track('app_view', { view: currentView });
  }, [currentView]);

  useEffect(() => {
    if (currentIsland !== 'home' && currentIsland !== 'parent' && currentIsland !== 'stories') {
      const profile = {
        language: 'zh',
        focus: currentIsland === 'pinyin' ? 'pinyin' : currentIsland === 'math' ? 'math' : currentIsland === 'english' ? 'english' : 'mixed',
        companion: 'astro',
      };
      const knowledgeState = {};
      const mission = createMission(profile, knowledgeState);
      setCurrentTasks(mission);
      setCurrentTaskIndex(0);
      setCurrentView('task');
      track('island_mission_start', { island: currentIsland, taskCount: mission.length });
    }
  }, [currentIsland]);

  useEffect(() => {
    if (currentView !== 'task' || currentTasks.length === 0) return;
    taskStartedAt.current = Date.now();
    const t = currentTasks[currentTaskIndex];
    track('task_view', {
      index: currentTaskIndex,
      taskType: t?.type ?? 'unknown',
      taskId: t?.id ?? '',
    });
  }, [currentView, currentTaskIndex, currentTasks]);

  const handleModuleClick = (module: View) => {
    track('module_click', { module });
    if (module === 'stories') {
      setCurrentView('story-list');
    } else {
      setCurrentIsland(module as any);
    }
  };

  const handleSelectStory = (story: any) => {
    track('story_select', { storyId: story?.id ?? '' });
    setSelectedStory(story);
    setCurrentView('story-reader');
  };

  const handleStoryComplete = (result: any) => {
    track('story_complete', { success: !!result.success, stars: result.stars ?? 0 });
    if (result.success) {
      addStars(result.stars);
    }
    setCurrentView('story-list');
    setSelectedStory(null);
  };

  const handleTaskComplete = (result: any) => {
    const durationMs = Date.now() - taskStartedAt.current;
    const task = currentTasks[currentTaskIndex];
    track('task_complete', {
      success: !!result.success,
      duration_ms: durationMs,
      taskIndex: currentTaskIndex,
      taskType: task?.type ?? 'unknown',
      taskId: task?.id ?? '',
      island: currentIsland,
    });
    if (result.success) {
      addStars(result.stars);
    }
    if (currentTaskIndex < currentTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      track('island_mission_finish', { island: currentIsland, taskCount: currentTasks.length });
      setCurrentView('home');
      setCurrentIsland('home');
    }
  };

  const handleBack = () => {
    setCurrentView('home');
    setCurrentIsland('home');
    setSelectedStory(null);
  };

  const handleBackToList = () => {
    setCurrentView('story-list');
    setSelectedStory(null);
  };

  const renderTask = () => {
    if (currentTasks.length === 0) return null;
    const task = currentTasks[currentTaskIndex];

    switch (task.type) {
      case 'choice':
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
      case 'battle':
        return <PinyinBattle task={task} onComplete={handleTaskComplete} />;
      case 'match':
        return <MatchTask task={task} onComplete={handleTaskComplete} />;
      case 'micro':
        return <MicroTask task={task} onComplete={handleTaskComplete} />;
      default:
        return <ChoiceTask task={task} onComplete={handleTaskComplete} />;
    }
  };

  if (currentView === 'story-list') {
    return (
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 24px',
        backgroundColor: 'var(--color-background)',
      }}>
        <StoryList 
          onSelectStory={handleSelectStory} 
          onBack={handleBack}
        />
      </div>
    );
  }

  if (currentView === 'story-reader' && selectedStory) {
    return (
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 24px',
        backgroundColor: 'var(--color-background)',
      }}>
        <StoryReader 
          story={selectedStory}
          onComplete={handleStoryComplete}
          onBack={handleBackToList}
        />
      </div>
    );
  }

  if (currentView === 'task') {
    return (
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '28px 24px',
        backgroundColor: 'var(--color-background)',
      }}>
        <div style={{ width: '100%', maxWidth: '700px', marginBottom: '20px' }}>
          <Button variant="secondary" onClick={handleBack}>
            ← 返回首页
          </Button>
          <div style={{ marginTop: '12px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            📚 任务 {currentTaskIndex + 1} / {currentTasks.length}
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: '700px' }}>
          {renderTask()}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      backgroundColor: 'var(--color-background)',
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ 
          background: 'linear-gradient(135deg, var(--color-primary-1), var(--color-primary-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '12px',
        }}>
          🌈 童梦乐园 · 智趣成长
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-md)' }}>
          让学习变得有趣又简单
        </p>
      </header>

      <main style={{ width: '100%', maxWidth: '640px' }}>
        <Card style={{ marginBottom: '28px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: '20px' }}>
              👋 你好，{currentChild?.nickname || '小朋友'}！
            </p>
            <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary-1)', lineHeight: 1 }}>
                  ⭐ {rewards.stars}
                </div>
                <div style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', marginTop: '8px', fontWeight: 600 }}>
                  星星
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary-2)', lineHeight: 1 }}>
                  Lv.{rewards.level}
                </div>
                <div style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', marginTop: '8px', fontWeight: 600 }}>
                  等级
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary-3)', lineHeight: 1 }}>
                  🔥 {rewards.streakDays}
                </div>
                <div style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', marginTop: '8px', fontWeight: 600 }}>
                  连续天数
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button onClick={() => addStars(1)} size="large">
            +1 ⭐
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              track('check_in');
              checkIn();
            }}
            size="large"
          >
            每日签到
          </Button>
        </div>

        <LearnProgressShare
          childNickname={currentChild?.nickname ?? '小朋友'}
          stars={rewards.stars}
          level={rewards.level}
          streakDays={rewards.streakDays}
        />

        <ParentZoneCard />

        <div style={{ 
          marginTop: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}>
          {[
            { label: '拼音冒险岛', icon: '📖', module: 'pinyin' as View },
            { label: '数字小镇', icon: '🔢', module: 'math' as View },
            { label: '英语游乐园', icon: '🌍', module: 'english' as View },
            { label: '故事王国', icon: '📚', module: 'stories' as View },
          ].map((item, index) => (
            <Card 
              key={index} 
              elevated 
              onClick={() => handleModuleClick(item.module)}
              style={{ 
                width: '160px', 
                height: '160px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <span style={{ fontSize: '64px', marginBottom: '12px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, textAlign: 'center' }}>{item.label}</span>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
