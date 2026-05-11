import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type CellValue = string | null; // 'black' | 'white' | null
type BoardState = CellValue[][];
type Move = { row: number; col: number };

const GO_LEVELS: LevelConfig[] = [
  {
    id: 'go-1',
    order: 1,
    name: '围棋启蒙',
    icon: '👶',
    difficulty: 'easy',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'stone-placement', label: '落子入门' }],
    extra: { size: 5 }
  },
  {
    id: 'go-2',
    order: 2,
    name: '方寸之间',
    icon: '🍱',
    difficulty: 'medium',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'territory-concept', label: '地盘意识' }],
    extra: { size: 9 }
  },
  {
    id: 'go-3',
    order: 3,
    name: '纵横捭阖',
    icon: '🌌',
    difficulty: 'hard',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'life-and-death', label: '死活要点' }],
    extra: { size: 13 }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'black', name: '小朋友', color: '#212121', icon: '⚫' },
  { id: 'white', name: '智多星', color: '#FFFFFF', icon: '⚪', isAI: true },
];

export default function GoGame() {
  const navigate = useNavigate();

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const size = (level?.extra?.size as number) || 9;
    return Array(size).fill(null).map(() => Array(size).fill(null));
  };

  const getLiberties = (board: BoardState, r: number, c: number, color: string, visited: Set<string> = new Set()) => {
    const size = board.length;
    const key = `${r}-${c}`;
    if (visited.has(key)) return 0;
    visited.add(key);

    let liberties = 0;
    const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (const [dr, dc] of neighbors) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        if (board[nr][nc] === null) {
          liberties++;
        } else if (board[nr][nc] === color) {
          liberties += getLiberties(board, nr, nc, color, visited);
        }
      }
    }
    return liberties;
  };

  const captureStones = (board: BoardState, r: number, c: number, color: string) => {
    const size = board.length;
    const key = `${r}-${c}`;
    const queue = [[r, c]];
    const cluster = new Set([key]);
    
    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dr, dc] of neighbors) {
        const nr = currR + dr;
        const nc = currC + dc;
        const nKey = `${nr}-${nc}`;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] === color && !cluster.has(nKey)) {
          cluster.add(nKey);
          queue.push([nr, nc]);
        }
      }
    }

    cluster.forEach(k => {
      const [cr, cc] = k.split('-').map(Number);
      board[cr][cc] = null;
    });
  };

  const onMove = (board: BoardState, move: Move, player: BoardGamePlayer): BoardState => {
    const size = board.length;
    const nextBoard = board.map(row => [...row]);
    nextBoard[move.row][move.col] = player.id;

    // Capture logic
    const opponentId = player.id === 'black' ? 'white' : 'black';
    const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dr, dc] of neighbors) {
       const nr = move.row + dr;
       const nc = move.col + dc;
       if (nr >= 0 && nr < size && nc >= 0 && nc < size && nextBoard[nr][nc] === opponentId) {
          if (getLiberties(nextBoard, nr, nc, opponentId) === 0) {
             captureStones(nextBoard, nr, nc, opponentId);
          }
       }
    }

    return nextBoard;
  };

  const checkGameOver = (board: BoardState) => {
    // Simplified: end if board is mostly full or someone resigns (not implemented)
    const emptyCount = board.flat().filter(c => c === null).length;
    if (emptyCount < board.length * board.length * 0.1) {
       return { over: true, reason: '棋局结束，计算领地。', stars: 3 };
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
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const renderCell = (row: number, col: number, value: CellValue, onMove: (move: Move) => void) => {
    return (
      <div
        key={`${row}-${col}`}
        onClick={() => !value && onMove({ row, col })}
        style={{
          width: '40px',
          height: '40px',
          background: '#DCBB88',
          border: '1px solid #A1887F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: value ? 'default' : 'pointer',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: '#3E2723', top: '50%' }} />
        <div style={{ position: 'absolute', height: '100%', width: '1px', background: '#3E2723', left: '50%' }} />
        {value && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: value === 'black' ? '#212121' : '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            zIndex: 1
          }} />
        )}
      </div>
    );
  };

  return (
    <BoardGameFramework
      gameId="go-game"
      title="围棋入门"
      icon="⚫"
      subtitle="黑白之间，方寸世界。"
      themeColor="#607D8B"
      gradient="linear-gradient(135deg, #CFD8DC, #B0BEC5)"
      boardSize={{ rows: 9, cols: 9 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      getAIMove={getAIMove}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={GO_LEVELS}
    />
  );
}
