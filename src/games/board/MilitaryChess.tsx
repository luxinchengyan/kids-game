import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardGameFramework } from '../common/BoardGameFramework';

export default function MilitaryChessGame() {
  const navigate = useNavigate();
  return (
    <BoardGameFramework
      gameId="military-chess"
      title="军棋"
      icon="🎖️"
      subtitle="排兵布阵，保家卫国！"
      themeColor="#4CAF50"
      gradient="linear-gradient(135deg, #C8E6C9, #81C784)"
      boardSize={{ rows: 12, cols: 5 }}
      initialBoard={[]}
      players={[{ id: 'p1', name: '红军', color: '#F44336', icon: '🚩' }]}
      onMove={(b) => b}
      checkGameOver={() => ({ over: false })}
      renderCell={() => <div style={{ width: '60px', height: '40px', border: '1px solid #CCC', background: '#E8F5E9' }} />}
      getCellData={() => null}
      onBack={() => navigate('/games/frameworks')}
    />
  );
}
