import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
};

type BoardState = CellState[][];
type Move = { row: number; col: number; action: 'reveal' | 'flag' };

const MINESWEEPER_LEVELS: LevelConfig[] = [
  {
    id: 'mines-1',
    order: 1,
    name: '小小排雷手',
    icon: '🕵️',
    difficulty: 'easy',
    itemCount: 5,
    timeLimit: 0,
    knowledgeScope: [{ id: 'logical-deduction', label: '逻辑推理' }],
    extra: { size: 6, mines: 5 }
  },
  {
    id: 'mines-2',
    order: 2,
    name: '地雷大侦探',
    icon: '🔍',
    difficulty: 'medium',
    itemCount: 10,
    timeLimit: 0,
    knowledgeScope: [{ id: 'pattern-recognition', label: '模式识别' }],
    extra: { size: 8, mines: 10 }
  },
  {
    id: 'mines-3',
    order: 3,
    name: '扫雷大师',
    icon: '💣',
    difficulty: 'hard',
    itemCount: 20,
    timeLimit: 0,
    knowledgeScope: [{ id: 'strategic-thinking', label: '缜密思考' }],
    extra: { size: 10, mines: 20 }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'player', name: '小朋友', color: '#4CAF50', icon: '🕵️‍♂️' },
];

export default function MinesweeperGame() {
  const navigate = useNavigate();

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const size = (level?.extra?.size as number) || 8;
    const mineCount = (level?.extra?.mines as number) || 10;

    const board: BoardState = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborCount: 0
      }))
    );

    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (!board[r][c].isMine) {
        board[r][c].isMine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[r][c].neighborCount = count;
      }
    }
    return board;
  };

  const revealCell = (board: BoardState, r: number, c: number) => {
    const size = board.length;
    if (r < 0 || r >= size || c < 0 || c >= size || board[r][c].isRevealed || board[r][c].isFlagged) return;
    
    board[r][c].isRevealed = true;
    
    if (board[r][c].neighborCount === 0 && !board[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCell(board, r + dr, c + dc);
        }
      }
    }
  };

  const onMove = (board: BoardState, move: Move): BoardState => {
    const nextBoard = board.map(row => row.map(cell => ({ ...cell })));
    if (move.action === 'reveal') {
      revealCell(nextBoard, move.row, move.col);
    } else {
      nextBoard[move.row][move.col].isFlagged = !nextBoard[move.row][move.col].isFlagged;
    }
    return nextBoard;
  };

  const checkGameOver = (board: BoardState, lastMove?: Move) => {
    if (!lastMove) return { over: false };

    if (lastMove.action === 'reveal' && board[lastMove.row][lastMove.col].isMine) {
      return { over: true, winner: undefined, reason: '踩到地雷了！下次小心点哦。', stars: 1 };
    }

    const allSafeRevealed = board.every(row => 
      row.every(cell => cell.isMine || cell.isRevealed)
    );

    if (allSafeRevealed) {
      return { over: true, winner: 'player', reason: '恭喜你！成功排除了所有地雷。', stars: 3 };
    }

    return { over: false };
  };

  const renderCell = (row: number, col: number, cell: CellState, onMove: (move: Move) => void) => {
    const getContent = () => {
      if (cell.isFlagged) return '🚩';
      if (!cell.isRevealed) return '';
      if (cell.isMine) return '💣';
      return cell.neighborCount > 0 ? cell.neighborCount : '';
    };

    return (
      <button
        key={`${row}-${col}`}
        onClick={() => onMove({ row, col, action: 'reveal' })}
        onContextMenu={(e) => {
          e.preventDefault();
          onMove({ row, col, action: 'flag' });
        }}
        style={{
          width: '36px',
          height: '36px',
          background: cell.isRevealed ? '#EEEEEE' : '#BDBDBD',
          border: '2px solid #9E9E9E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          fontSize: '18px',
          fontWeight: 900,
          color: cell.neighborCount === 1 ? 'blue' : cell.neighborCount === 2 ? 'green' : cell.neighborCount === 3 ? 'red' : 'purple'
        }}
      >
        {getContent()}
      </button>
    );
  };

  return (
    <BoardGameFramework
      gameId="minesweeper"
      title="扫雷大冒险"
      icon="🕵️‍♂️"
      subtitle="开动脑筋，找出所有地雷！"
      themeColor="#4CAF50"
      gradient="linear-gradient(135deg, #A5D6A7, #E8F5E9)"
      boardSize={{ rows: 10, cols: 10 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={MINESWEEPER_LEVELS}
    />
  );
}
