import React, { LazyExoticComponent } from 'react';

const SokobanGame: React.FC = () => {
  return <div>Sokoban Game (Coming Soon!)</div>;
};

export const SokobanComponent: LazyExoticComponent<React.ComponentType> = React.lazy(
  () => import('./index')
) as LazyExoticComponent<React.ComponentType>;

export default SokobanGame;
