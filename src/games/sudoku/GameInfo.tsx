import React from 'react';

interface GameInfoProps {
  timer: number;
  errors: number;
  resetGame: () => void;
  checkSolution: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ timer, errors, resetGame, checkSolution }) => {
  return (
    <div className="game-info">
      <div className="timer">Time: {timer}s</div>
      <div className="errors">Errors: {errors}</div>
      <button onClick={resetGame}>Reset</button>
      <button onClick={checkSolution}>Check</button>
    </div>
  );
};

export default GameInfo;
