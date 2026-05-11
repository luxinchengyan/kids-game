import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework, BoardGamePlayer } from '../common/BoardGameFramework';
import { LevelConfig } from '../common/LevelSystem';

type Piece = { type: string; player: string; name: string };
type BoardState = (Piece | null)[][];
type Move = { fromR: number; fromC: number; toR: number; toC: number };

const XIANGQI_LEVELS: LevelConfig[] = [
  {
    id: 'xiangqi-1',
    order: 1,
    name: '小兵过河',
    icon: '💂',
    difficulty: 'easy',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'basic-moves', label: '基础走法' }],
    extra: { mode: 'pawn-only' }
  },
  {
    id: 'xiangqi-2',
    order: 2,
    name: '楚河汉界',
    icon: '🌊',
    difficulty: 'medium',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'piece-coordination', label: '子力协同' }],
    extra: { mode: 'standard' }
  },
  {
    id: 'xiangqi-3',
    order: 3,
    name: '决战巅峰',
    icon: '👑',
    difficulty: 'hard',
    itemCount: 1,
    timeLimit: 0,
    knowledgeScope: [{ id: 'grand-strategy', label: '大局观' }],
    extra: { mode: 'standard', aiLevel: 'hard' }
  }
];

const players: BoardGamePlayer[] = [
  { id: 'red', name: '红方', color: '#F44336', icon: '🔴' },
  { id: 'black', name: '黑方', color: '#212121', icon: '⚫', isAI: true },
];

const PIECES_MAP: Record<string, Record<string, string>> = {
  red: { king: '帅', advisor: '仕', elephant: '相', horse: '马', rook: '车', cannon: '炮', pawn: '兵' },
  black: { king: '将', advisor: '士', elephant: '象', horse: '馬', rook: '車', cannon: '砲', pawn: '卒' },
};

export default function XiangqiGame() {
  const navigate = useNavigate();

  const getInitialBoard = (level?: LevelConfig): BoardState => {
    const board: BoardState = Array(10).fill(null).map(() => Array(9).fill(null));
    const mode = level?.extra?.mode || 'standard';

    const setPiece = (r: number, c: number, type: string, player: string) => {
      board[r][c] = { type, player, name: PIECES_MAP[player][type] };
    };

    if (mode === 'pawn-only') {
       setPiece(9, 4, 'king', 'red');
       setPiece(0, 4, 'king', 'black');
       [0, 2, 4, 6, 8].forEach(c => {
         setPiece(6, c, 'pawn', 'red');
         setPiece(3, c, 'pawn', 'black');
       });
       return board;
    }

    // Standard Setup
    ['red', 'black'].forEach((player) => {
      const baseR = player === 'red' ? 9 : 0;
      const r = (offset: number) => Math.abs(baseR - offset);
      
      setPiece(r(0), 4, 'king', player);
      setPiece(r(0), 3, 'advisor', player);
      setPiece(r(0), 5, 'advisor', player);
      setPiece(r(0), 2, 'elephant', player);
      setPiece(r(0), 6, 'elephant', player);
      setPiece(r(0), 1, 'horse', player);
      setPiece(r(0), 7, 'horse', player);
      setPiece(r(0), 0, 'rook', player);
      setPiece(r(0), 8, 'rook', player);
      setPiece(r(2), 1, 'cannon', player);
      setPiece(r(2), 7, 'cannon', player);
      [0, 2, 4, 6, 8].forEach(c => setPiece(r(3), c, 'pawn', player));
    });

    return board;
  };

  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);

  const onMove = (board: BoardState, move: Move, player: BoardGamePlayer): BoardState => {
    const nextBoard = board.map(row => [...row]);
    nextBoard[move.toR][move.toC] = nextBoard[move.fromR][move.fromC];
    nextBoard[move.fromR][move.fromC] = null;
    return nextBoard;
  };

  const checkGameOver = (board: BoardState, lastMove?: Move) => {
    // Check if King is missing
    let redKing = false;
    let blackKing = false;
    board.forEach(row => row.forEach(p => {
      if (p?.type === 'king') {
        if (p.player === 'red') redKing = true;
        if (p.player === 'black') blackKing = true;
      }
    }));

    if (!redKing) return { over: true, winner: 'black', reason: '黑方获胜！', stars: 1 };
    if (!blackKing) return { over: true, winner: 'red', reason: '红方获胜！', stars: 3 };

    return { over: false };
  };

  const getAIMove = (board: BoardState): Move => {
    const pieces: {r: number, c: number}[] = [];
    board.forEach((row, r) => row.forEach((p, c) => {
      if (p?.player === 'black') pieces.push({r, c});
    }));

    // Random move that captures red if possible
    for (const p of pieces) {
       // Check surroundings (simplified)
       for (let dr = -1; dr <= 1; dr++) {
         for (let dc = -1; dc <= 1; dc++) {
            const nr = p.r + dr;
            const nc = p.c + dc;
            if (nr >= 0 && nr < 10 && nc >= 0 && nc < 9 && board[nr][nc]?.player === 'red') {
               return { fromR: p.r, fromC: p.c, toR: nr, toC: nc };
            }
         }
       }
    }

    const p = pieces[Math.floor(Math.random() * pieces.length)];
    return { fromR: p.r, fromC: p.c, toR: Math.min(9, p.r + 1), toC: p.c };
  };

  const renderCell = (row: number, col: number, piece: Piece | null, handleMove: (move: Move) => void) => {
    const isSelected = selected?.r === row && selected?.c === col;
    const isRiver = row === 4 || row === 5;

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
      <div
        key={`${row}-${col}`}
        onClick={handleClick}
        style={{
          width: '40px',
          height: '40px',
          background: isRiver ? '#E1F5FE' : '#FFE0B2',
          border: '1px solid #D7CCC8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: '#A1887F', top: '50%' }} />
        <div style={{ position: 'absolute', height: '100%', width: '1px', background: '#A1887F', left: '50%' }} />
        
        {piece && (
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#F5DEB3',
            border: `2px solid ${piece.player === 'red' ? '#F44336' : '#212121'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 900,
            color: piece.player === 'red' ? '#F44336' : '#212121',
            zIndex: 1,
            boxShadow: isSelected ? '0 0 10px #FFEB3B' : '0 2px 4px rgba(0,0,0,0.2)',
            transform: isSelected ? 'scale(1.1)' : 'none',
            transition: 'all 0.2s'
          }}>
            {piece.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <BoardGameFramework
      gameId="xiangqi"
      title="中国象棋"
      icon="🏮"
      subtitle="楚河汉界，智勇对决！"
      themeColor="#F44336"
      gradient="linear-gradient(135deg, #EF9A9A, #FFEB3B)"
      boardSize={{ rows: 10, cols: 9 }}
      initialBoard={getInitialBoard}
      players={players}
      onMove={onMove}
      checkGameOver={checkGameOver}
      getAIMove={getAIMove}
      renderCell={renderCell}
      getCellData={(board, r, c) => board[r]?.[c]}
      onBack={() => navigate('/games/frameworks')}
      levels={XIANGQI_LEVELS}
    />
  );
}
