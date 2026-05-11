import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardGameFramework } from '../common/CardGameFramework';

export default function CardGames() {
  const navigate = useNavigate();

  return (
    <CardGameFramework
      gameId="card-games"
      title="趣味牌类"
      icon="🃏"
      subtitle="智力博弈，牌中世界。"
      themeColor="#9C27B0"
      gradient="linear-gradient(135deg, #E1BEE7, #CE93D8)"
      onBack={() => navigate('/games/frameworks')}
    />
  );
}
