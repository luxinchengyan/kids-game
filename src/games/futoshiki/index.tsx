import React, { LazyExoticComponent } from 'react';

const FutoshikiGame: React.FC = () => {
  return <div>Futoshiki Game (Coming Soon!)</div>;
};

export const FutoshikiComponent: LazyExoticComponent<React.ComponentType> = React.lazy(
  () => import('./index')
) as LazyExoticComponent<React.ComponentType>;

export default FutoshikiGame;
