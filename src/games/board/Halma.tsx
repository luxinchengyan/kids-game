import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type CellValue = string | null; // Player ID
type BoardState = CellValue[][];
type Move = { fromR: number; fromC: number; toR: number; toC: number };

const HALMA_LEVELS: LevelConfig[] = [
  {
    id: 'halma-1',
    order: 1,
    name: '跳跃初尝试',
    icon: '🐰',
    difficulty: 'easy',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'basic-jumping', label: '基础跳跃' }],
    extra: { pieceCount: 2, size: 6 }
  },
  {
    id: 'halma-2',
    order: 2,
    name: '灵动小棋子',
    icon: '🦌',
    difficulty: 'medium',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'consecutive-jumps', label: '连续跳跃' }],
    extra: { pieceCount: 4, size: 8 }
  },
  {
    id: 'halma-3',
    order: 3,
    name: '跳棋大满贯',
    icon: '🐆',
    difficulty: 'hard',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'path-optimization', label: '路径优化' }],
    extra: { pieceCount: 6, size: 10 }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'p1', name: '小朋友', color: '#FF9800', icon: '👦' },
  { id: 'ai', name: '智多星', color: '#2196F3', icon: '🤖', isAI: true },
];

export default function HalmaGame() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<{ r: number, c: number } | null>(null);

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const size = (level?.extra?.size as number) || 8;
    const pieceCount = (level?.extra?.pieceCount as number) || 4;
    const board: BoardState = Array(size).fill(null).map(() => Array(size).fill(null));

    // Setup pieces in corners
    let count = 0;
    for (let r = 0; r < 3 && count < pieceCount; r++) {
      for (let c = 0; c < 3 && count < pieceCount; c++) {
        board[r][c] = 'ai';
        board[size - 1 - r][size - 1 - c] = 'p1';
        count++;
      }
    }
    return board;
  };

  const onMove = (board: BoardState, move: Move, player: BoardGamePlayer): BoardState => {
    const nextBoard = board.map(row => [...row]);
    nextBoard[move.toR][move.toC] = nextBoard[move.fromR][move.fromC];
    nextBoard[move.fromR][move.fromC] = null;
    return nextBoard;
  };

  const checkGameOver = (board: BoardState) => {
    const size = board.length;
    // Simple win: if player's pieces occupy AI's starting corner
    let p1InTarget = 0;
    let aiInTarget = 0;
    const targetCount = board.flat().filter(c => c === 'p1').length;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[size - 1 - r][size - 1 - c] === 'ai') aiInTarget++;
        if (board[r][c] === 'p1') p1InTarget++;
      }
    }

    if (p1InTarget >= targetCount) return { over: true, winner: 'p1', reason: '恭喜！你到达终点啦！', stars: 3 };
    if (aiInTarget >= targetCount) return { over: true, winner: 'ai', reason: '智多星先到一步哦。', stars: 1 };

    return { over: false };
  };

  const getAIMove = (board: BoardState): Move => {
    const size = board.length;
    const pieces: {r: number, c: number}[] = [];
    board.forEach((row, r) => row.forEach((p, c) => {
      if (p === 'ai') pieces.push({r, c});
    }));

    // AI strategy: try to move towards bottom-right (size-1, size-1)
    for (const p of pieces) {
       const neighbors = [[0,1], [1,0], [1,1], [0,2], [2,0], [2,2]];
       for (const [dr, dc] of neighbors) {
          const nr = p.r + dr;
          const nc = p.c + dc;
          if (nr < size && nc < size && !board[nr][nc]) {
             return { fromR: p.r, fromC: p.c, toR: nr, toC: nc };
          }
       }
    }
    return { fromR: pieces[0].r, fromC: pieces[0].c, toR: pieces[0].r, toC: pieces[0].c };
  };

  const renderCell = (row: number, col: number, value: CellValue, handleMove: (move: Move) => void) => {
    const isSelected = selected?.r === row && selected?.c === col;
    
    const handleClick = () => {
       if (selected) {
          if (selected.r === row && selected.c === col) {
             setSelected(null);
          } else {
             // Basic validity check: distance <= 2
             const dist = Math.max(Math.abs(selected.r - row), Math.abs(selected.c - col));
             if (dist <= 2 && !value) {
                handleMove({ fromR: selected.r, fromC: selected.c, toR: row, toC: col });
                setSelected(null);
             }
          }
       } else if (value === 'p1') {
          setSelected({ r: row, c: col });
       }
    };

    return (
      <button
        key={`${row}-${col}`}
        onClick={handleClick}
        style={{
          width: '40px',
          height: '40px',
          background: (row + col) % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
          border: '1px solid #E0E0E0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isSelected ? '0 0 8px #FF9800' : 'none',
          transform: isSelected ? 'scale(1.1)' : 'none',
          transition: 'all 0.2s',
          padding: 0
        }}
      >
        {value && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: value === 'p1' ? '#FF9800' : '#2196F3',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        )}
      </button>
    );
  };

  return (
    <BoardGameFramework
      gameId="halma"
      title="跳棋"
      icon="🏃"
      subtitle="跳跃吧，小棋子！"
      themeColor="#FF9800"
      gradient="linear-gradient(135deg, #FFE0B2, #FFB74D)"
      boardSize={{ rows: 10, cols: 10 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      getAIMove={getAIMove}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={HALMA_LEVELS}
    />
  );
}
