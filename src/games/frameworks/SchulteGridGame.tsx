import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { SchulteFramework, SchulteStage } from '../common/SchulteFramework';

const STAGES: SchulteStage[] = [
  {
    id: 'scan',
    title: '热身扫描',
    difficultyLabel: '入门',
    summary: '先用较小方格熟悉顺序搜索，找稳比找快更重要。',
    gridSize: 3,
    boards: 2,
    targetMs: 15000,
  },
  {
    id: 'track',
    title: '稳定追踪',
    difficultyLabel: '进阶',
    summary: '扩大搜索范围，开始要求速度和准确率同时稳定。',
    gridSize: 4,
    boards: 2,
    targetMs: 24000,
  },
  {
    id: 'sprint',
    title: '极速冲刺',
    difficultyLabel: '挑战',
    summary: '面对最高密度数字，训练快速扫描和抑制冲动。',
    gridSize: 5,
    boards: 2,
    targetMs: 36000,
  },
];

export default function SchulteGridGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('schulte-grid');

  const handleBack = useCallback(() => {
    navigate('/games/frameworks');
  }, [navigate]);

  return (
    <PageLayout maxWidth="940px">
      <GamePageHeader
        title="舒尔特方格"
        icon="🧠"
        subtitle="把专注训练从单局体验升级成 3 段连续冲刺营。"
        gradient="linear-gradient(135deg, #E91E63, #F06292, #FFB74D)"
        progressColor="#E91E63"
        onBack={handleBack}
        backLabel="← 返回设计工坊"
      />
      
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
      }}>
        <SchulteFramework
          gameId="schulte-grid"
          title="舒尔特方格"
          icon="🧠"
          subtitle="专注力冲刺营"
          gradient="linear-gradient(135deg, #E91E63, #F06292, #FFB74D)"
          progressColor="#E91E63"
          stages={STAGES}
          onComplete={handleGameComplete}
          onBack={handleBack}
        />
      </div>
    </PageLayout>
  );
}
