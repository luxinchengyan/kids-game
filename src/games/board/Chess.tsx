import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type Piece = { type: string; player: string; icon: string };
type BoardState = (Piece | null)[][];
type Move = { fromR: number; fromC: number; toR: number; toC: number };

const CHESS_LEVELS: LevelConfig[] = [
  {
    id: 'chess-1',
    order: 1,
    name: '士兵前进',
    icon: '♟️',
    difficulty: 'easy',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'pawn-king', label: '兵与王' }],
    extra: { mode: 'pawn-king' }
  },
  {
    id: 'chess-2',
    order: 2,
    name: '国际战弈',
    icon: '🏰',
    difficulty: 'medium',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'standard-chess', label: '标准对局' }],
    extra: { mode: 'standard' }
  },
  {
    id: 'chess-3',
    order: 3,
    name: '大师之路',
    icon: '🏆',
    difficulty: 'hard',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'advanced-tactics', label: '战术博弈' }],
    extra: { mode: 'standard', aiLevel: 'hard' }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'white', name: '白方', color: '#FFFFFF', icon: '⚪' },
  { id: 'black', name: '黑方', color: '#212121', icon: '⚫', isAI: true },
];

const INITIAL_PIECES: Record<string, string> = {
  'white-pawn': '♙', 'white-rook': '♖', 'white-knight': '♘', 'white-bishop': '♗', 'white-queen': '♕', 'white-king': '♔',
  'black-pawn': '♟', 'black-rook': '♜', 'black-knight': '♞', 'black-bishop': '♝', 'black-queen': '♛', 'black-king': '♚',
};

export default function ChessGame() {
  const navigate = useNavigate();

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
    const mode = level?.extra?.mode || 'standard';

    const setPiece = (row: number, col: number, player: string, type: string) => {
      board[row][col] = { type, player, icon: INITIAL_PIECES[`${player}-${type}`] };
    };

    if (mode === 'pawn-king') {
       setPiece(7, 4, 'white', 'king');
       setPiece(0, 4, 'black', 'king');
       for(let i=0; i<8; i++) {
         setPiece(6, i, 'white', 'pawn');
         setPiece(1, i, 'black', 'pawn');
       }
       return board;
    }

    const setupRow = (row: number, player: string, isPawn: boolean) => {
      const pieces = isPawn ? Array(8).fill('pawn') : ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
      pieces.forEach((type, col) => {
        setPiece(row, col, player, type);
      });
    };

    setupRow(0, 'black', false);
    setupRow(1, 'black', true);
    setupRow(6, 'white', true);
    setupRow(7, 'white', false);

    return board;
  };

  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);

  const onMove = (board: BoardState, move: Move): BoardState => {
    const nextBoard = board.map(row => [...row]);
    nextBoard[move.toR][move.toC] = nextBoard[move.fromR][move.fromC];
    nextBoard[move.fromR][move.fromC] = null;
    return nextBoard;
  };

  const checkGameOver = (board: BoardState) => {
    let whiteKing = false;
    let blackKing = false;
    board.forEach(row => row.forEach(p => {
      if (p?.type === 'king') {
        if (p.player === 'white') whiteKing = true;
        if (p.player === 'black') blackKing = true;
      }
    }));

    if (!whiteKing) return { over: true, winner: 'black', reason: '黑方获胜！', stars: 1 };
    if (!blackKing) return { over: true, winner: 'white', reason: '白方获胜！', stars: 3 };

    return { over: false };
  };

  const getAIMove = (board: BoardState): Move => {
    const pieces: {r: number, c: number}[] = [];
    board.forEach((row, r) => row.forEach((p, c) => {
      if (p?.player === 'black') pieces.push({r, c});
    }));

    for (const p of pieces) {
       for (let dr = -1; dr <= 1; dr++) {
         for (let dc = -1; dc <= 1; dc++) {
            const nr = p.r + dr;
            const nc = p.c + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && board[nr][nc]?.player === 'white') {
               return { fromR: p.r, fromC: p.c, toR: nr, toC: nc };
            }
         }
       }
    }

    const p = pieces[Math.floor(Math.random() * pieces.length)];
    return { fromR: p.r, fromC: p.c, toR: Math.min(7, p.r + 1), toC: p.c };
  };

  const renderCell = (row: number, col: number, piece: Piece | null, handleMove: (move: Move) => void) => {
    const isDark = (row + col) % 2 === 1;
    const isSelected = selected?.r === row && selected?.c === col;

    const handleClick = () => {
      if (selected) {
        if (selected.r === row && selected.c === col) {
          setSelected(null);
        } else {
          handleMove({ fromR: selected.r, fromC: selected.c, toR: row, toC: col });
          setSelected(null);
        }
      } else if (piece) {
        setSelected({ r, c: col });
      }
    };

    return (
      <button
        key={`${row}-${col}`}
        onClick={handleClick}
        style={{
          width: '44px',
          height: '44px',
          background: isSelected ? '#FFF176' : isDark ? '#BCAAA4' : '#EFEBE9',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {piece?.icon}
      </button>
    );
  };

  return (
    <BoardGameFramework
      gameId="chess"
      title="国际象棋"
      icon="♟️"
      subtitle="智慧的交锋，经典的博弈。"
      themeColor="#607D8B"
      gradient="linear-gradient(135deg, #CFD8DC, #B0BEC5)"
      boardSize={{ rows: 8, cols: 8 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      getAIMove={getAIMove}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={CHESS_LEVELS}
    />
  );
}
