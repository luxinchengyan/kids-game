import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { PuzzleFramework, PuzzleRound } from '../common/PuzzleFramework';

const PUZZLE_BANK: PuzzleRound[] = [
  { id: 'ma', content: '小马 (m-a)', emoji: '🐴', pieces: ['m', 'a'], solution: ['m', 'a'] },
  { id: 'gua', content: '西瓜 (g-ua)', emoji: '🍉', pieces: ['g', 'ua'], solution: ['g', 'ua'] },
  { id: 'xue', content: '雪花 (x-ue)', emoji: '❄️', pieces: ['x', 'ue'], solution: ['x', 'ue'] },
  { id: 'shui', content: '喝水 (sh-ui)', emoji: '💧', pieces: ['sh', 'ui'], solution: ['sh', 'ui'] },
  { id: 'qiao', content: '小桥 (q-iao)', emoji: '🌉', pieces: ['q', 'iao'], solution: ['q', 'iao'] },
];

export default function PinyinPuzzleGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-puzzle');

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  return (
    <PageLayout maxWidth="800px">
      <GamePageHeader
        title="拼音拼图"
        icon="🧩"
        subtitle="把声母和韵母拼在一起，组成完整的音节！"
        gradient="linear-gradient(135deg, #FF9800, #FFB74D, #F57C00)"
        progressColor="#FF9800"
        onBack={handleBack}
        backLabel="← 返回拼音岛"
      />
      
      <div style={{
        background: '#FFF8E1',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
      }}>
        <PuzzleFramework
          gameId="pinyin-puzzle"
          title="拼音拼图"
          icon="🧩"
          subtitle="拼读大挑战"
          gradient="linear-gradient(135deg, #FF9800, #FFB74D, #F57C00)"
          progressColor="#FF9800"
          rounds={PUZZLE_BANK}
          onComplete={handleGameComplete}
          onBack={handleBack}
        />
      </div>
    </PageLayout>
  );
}
