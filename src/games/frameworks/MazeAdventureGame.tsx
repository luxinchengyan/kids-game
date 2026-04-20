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
} from './frameworkHelpers';

type Cell = '#' | '.' | 'S' | 'G' | '*';

interface MazeLevel {
  name: string;
  grid: Cell[][];
}

const levels: MazeLevel[] = [
  {
    name: '彩虹入口',
    grid: [
      ['S', '.', '*', '#', '.'],
      ['#', '.', '.', '#', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '#', '.', '.', '#'],
      ['.', '.', '.', '*', 'G'],
    ],
  },
  {
    name: '星光走廊',
    grid: [
      ['S', '.', '#', '.', '.', '*'],
      ['#', '.', '#', '.', '#', '.'],
      ['.', '.', '.', '.', '#', '.'],
      ['.', '#', '#', '.', '.', '.'],
      ['*', '.', '.', '#', '.', '#'],
      ['.', '.', '.', '.', '.', 'G'],
    ],
  },
  {
    name: '月亮花园',
    grid: [
      ['S', '.', '.', '#', '.', '.', '.'],
      ['#', '#', '.', '#', '.', '#', '.'],
      ['.', '*', '.', '.', '.', '#', '.'],
      ['.', '#', '#', '.', '#', '.', '.'],
      ['.', '.', '.', '.', '#', '.', '#'],
      ['#', '.', '#', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '#', 'G'],
    ],
  },
];

function findCell(grid: Cell[][], target: Cell) {
  for (let row = 0; row < grid.length; row += 1) {
    for (let column = 0; column < grid[row].length; column += 1) {
      if (grid[row][column] === target) {
        return { row, column };
      }
    }
  }
  return { row: 0, column: 0 };
}

export default function MazeAdventureGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('maze-adventure');
  const [levelIndex, setLevelIndex] = useState(0);
  const [position, setPosition] = useState(findCell(levels[0].grid, 'S'));
  const [collected, setCollected] = useState<string[]>([]);
  const [steps, setSteps] = useState(0);
  const [flashWall, setFlashWall] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentLevel = levels[levelIndex];
  const totalStars = useMemo(
    () => levels.reduce((sum, level) => sum + level.grid.flat().filter((cell) => cell === '*').length, 0),
    []
  );

  useEffect(() => {
    track('game_start', { gameId: 'maze-adventure', levels: levels.length });
  }, []);

  const resetLevel = useCallback((nextLevelIndex: number) => {
    setLevelIndex(nextLevelIndex);
    setPosition(findCell(levels[nextLevelIndex].grid, 'S'));
  }, []);

  const resetGame = useCallback(() => {
    setCollected([]);
    setSteps(0);
    setCompleted(false);
    resetLevel(0);
    track('game_start', { gameId: 'maze-adventure', levels: levels.length });
  }, [resetLevel]);

  const handleBack = useCallback(() => {
    navigate('/games/frameworks');
  }, [navigate]);

  const movePlayer = useCallback(
    (deltaRow: number, deltaColumn: number) => {
      if (completed) {
        return;
      }

      const nextRow = position.row + deltaRow;
      const nextColumn = position.column + deltaColumn;
      const cell = currentLevel.grid[nextRow]?.[nextColumn];

      if (!cell || cell === '#') {
        setFlashWall(true);
        window.setTimeout(() => setFlashWall(false), 220);
        return;
      }

      const nextKey = `${levelIndex}-${nextRow}-${nextColumn}`;
      setPosition({ row: nextRow, column: nextColumn });
      setSteps((value) => value + 1);

      if (cell === '*' && !collected.includes(nextKey)) {
        setCollected((value) => [...value, nextKey]);
      }

      if (cell === 'G') {
        if (levelIndex + 1 >= levels.length) {
          const collectionRate = collected.length + (cell === '*' && !collected.includes(nextKey) ? 1 : 0);
          const accuracy = collectionRate / totalStars;
          const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.6 ? 2 : 1;
          setCompleted(true);
          handleGameComplete({
            success: true,
            stars,
            tasksCompleted: levels.length,
            accuracy,
            xp: 28,
          });
        } else {
          resetLevel(levelIndex + 1);
        }
      }
    },
    [collected, completed, currentLevel.grid, handleGameComplete, levelIndex, levels.length, position.column, position.row, resetLevel, totalStars]
  );

  const currentCollected = collected.length;
  const stars = currentCollected / totalStars >= 0.9 ? 3 : currentCollected / totalStars >= 0.6 ? 2 : currentCollected > 0 ? 1 : 0;

  return (
    <PageLayout maxWidth="920px">
      <GamePageHeader
        title="迷宫探险"
        icon="🧭"
        subtitle="按规则走出迷宫，顺手收集知识星星。"
        gradient="linear-gradient(135deg, #EC407A, #AB47BC, #42A5F5)"
        progressColor="#EC407A"
        onBack={handleBack}
        backLabel="← 返回设计工坊"
      />

      <FrameworkPanel borderColor="#F48FB1" background="linear-gradient(135deg, #FFFFFF, #FCE4EC)">
        <FrameworkStatGrid
          accent="#C2185B"
          surface="#FFFFFF"
          items={[
            { label: '当前关', value: `${levelIndex + 1}/${levels.length}`, note: currentLevel.name },
            { label: '收集星星', value: `${currentCollected}/${totalStars}` },
            { label: '步数', value: `${steps}` },
            { label: '评级', value: completed ? `${stars} 星` : '--' },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji="🗺️"
            title="迷宫冲线成功"
            summary={`你完成了全部 ${levels.length} 张地图，共收集 ${currentCollected} 颗星星。`}
            accent="#C2185B"
            background="linear-gradient(135deg, #FCE4EC, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回工坊
              </Button>
              <Button onClick={resetGame}>重新探险</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                background: flashWall ? '#FFEBEE' : '#FFFFFF',
                borderRadius: '24px',
                padding: '18px',
                border: `2px solid ${flashWall ? '#EF5350' : '#F8BBD0'}`,
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentLevel.grid[0].length}, minmax(0, 1fr))`,
                  gap: '8px',
                }}
              >
                {currentLevel.grid.map((row, rowIndex) =>
                  row.map((cell, columnIndex) => {
                    const isPlayer = position.row === rowIndex && position.column === columnIndex;
                    const key = `${levelIndex}-${rowIndex}-${columnIndex}`;
                    const collectedStar = collected.includes(key);
                    return (
                      <div
                        key={key}
                        style={{
                          aspectRatio: '1 / 1',
                          borderRadius: '18px',
                          background:
                            cell === '#'
                              ? '#6D4C41'
                              : cell === 'G'
                                ? '#C5E1A5'
                                : cell === '*'
                                  ? '#FFF59D'
                                  : '#FCE4EC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: isPlayer ? '28px' : '24px',
                          fontWeight: 900,
                        }}
                      >
                        {isPlayer ? '🚀' : cell === 'G' ? '🏁' : cell === '*' ? (collectedStar ? '✓' : '⭐') : cell === '#' ? '' : ''}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '12px',
                maxWidth: '360px',
                margin: '0 auto',
              }}
            >
              <div />
              <Button onClick={() => movePlayer(-1, 0)}>上</Button>
              <div />
              <Button onClick={() => movePlayer(0, -1)}>左</Button>
              <Button variant="secondary" onClick={() => resetLevel(levelIndex)}>
                重置本关
              </Button>
              <Button onClick={() => movePlayer(0, 1)}>右</Button>
              <div />
              <Button onClick={() => movePlayer(1, 0)}>下</Button>
              <div />
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
