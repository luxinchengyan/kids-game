import React, { LazyExoticComponent } from 'react';

const MinesweeperGame: React.FC = () => {
  return <div>Minesweeper Game (Coming Soon!)</div>;
};

export const MinesweeperComponent: LazyExoticComponent<React.ComponentType> = React.lazy(
  () => import('./index')
) as LazyExoticComponent<React.ComponentType>;

export default MinesweeperGame;
