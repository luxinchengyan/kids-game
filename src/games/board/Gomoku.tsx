import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type CellValue = string | null; // Player ID or null
type BoardState = CellValue[][];
type Move = { row: number; col: number };

const GOMOKU_LEVELS: LevelConfig[] = [
  {
    id: 'gomoku-1',
    order: 1,
    name: '五子入门',
    icon: '🌱',
    difficulty: 'easy',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'spatial-observation', label: '空间观察' }],
    extra: { boardSize: 8, aiAggression: 0.2 }
  },
  {
    id: 'gomoku-2',
    order: 2,
    name: '进阶挑战',
    icon: '🌿',
    difficulty: 'medium',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'strategy-planning', label: '策略规划' }],
    extra: { boardSize: 10, aiAggression: 0.5 }
  },
  {
    id: 'gomoku-3',
    order: 3,
    name: '大师对决',
    icon: '🌳',
    difficulty: 'hard',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'game-theory', label: '博弈思维' }],
    extra: { boardSize: 12, aiAggression: 0.8 }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'human', name: '小朋友', color: '#2196F3', icon: '👦' },
  { id: 'ai', name: '智多星', color: '#F44336', icon: '🤖', isAI: true },
];

export default function GomokuGame() {
  const navigate = useNavigate();

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const size = (level?.extra?.boardSize as number) || 10;
    return Array(size).fill(null).map(() => Array(size).fill(null));
  };

  const onMove = (board: BoardState, move: Move, player: BoardGamePlayer): BoardState => {
    const nextBoard = board.map(row => [...row]);
    nextBoard[move.row][move.col] = player.id;
    return nextBoard;
  };

  const checkGameOver = (board: BoardState, lastMove?: Move) => {
    if (!lastMove) return { over: false };

    const size = board.length;
    const playerId = board[lastMove.row][lastMove.col];
    if (!playerId) return { over: false };

    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (const [dr, dc] of directions) {
      let count = 1;
      for (let i = 1; i < 5; i++) {
        const r = lastMove.row + dr * i;
        const c = lastMove.col + dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === playerId) {
          count++;
        } else break;
      }
      for (let i = 1; i < 5; i++) {
        const r = lastMove.row - dr * i;
        const c = lastMove.col - dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === playerId) {
          count++;
        } else break;
      }

      if (count >= 5) {
        return { 
          over: true, 
          winner: playerId, 
          reason: count === 5 ? '五子连珠！' : '大获全胜！',
          stars: playerId === 'human' ? 3 : 1
        };
      }
    }

    if (board.every(row => row.every(cell => cell !== null))) {
      return { over: true, reason: '棋逢对手，平局！', winner: undefined, stars: 2 };
    }

    return { over: false };
  };

  const getAIMove = (board: BoardState): Move => {
    const size = board.length;
    const availableMoves: Move[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!board[r][c]) availableMoves.push({ row: r, col: c });
      }
    }
    
    // Simple AI: check if can win or block
    for (const move of availableMoves) {
       // Check win
       const winBoard = onMove(board, move, { id: 'ai' } as any);
       if (checkGameOver(winBoard, move).over) return move;
       // Check block
       const blockBoard = onMove(board, move, { id: 'human' } as any);
       if (checkGameOver(blockBoard, move).over) return move;
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const renderCell = (row: number, col: number, value: CellValue, onMove: (move: Move) => void) => {
    return (
      <button
        onClick={() => !value && onMove({ row, col })}
        style={{
          width: '36px',
          height: '36px',
          background: '#FFE0B2',
          border: '1px solid #D7CCC8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: value ? 'default' : 'pointer',
          padding: 0
        }}
      >
        {value && (
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: value === 'human' ? '#212121' : '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            border: value === 'ai' ? '1px solid #E0E0E0' : 'none'
          }} />
        )}
      </button>
    );
  };

  return (
    <BoardGameFramework
      gameId="gomoku"
      title="五子棋"
      icon="⚪"
      subtitle="益智竞技，五子连珠！"
      themeColor="#795548"
      gradient="linear-gradient(135deg, #A1887F, #D7CCC8)"
      boardSize={{ rows: 10, cols: 10 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      getAIMove={getAIMove}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={GOMOKU_LEVELS}
    />
  );
}
