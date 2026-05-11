import React, { LazyExoticComponent } from 'react';

const IdiomFillInGame: React.FC = () => {
  return <div>成语填字 (Idiom Fill-in) Game (Coming Soon!)</div>;
};

export const IdiomFillInComponent: LazyExoticComponent<React.ComponentType> = React.lazy(
  () => import('./index')
) as LazyExoticComponent<React.ComponentType>;

export default IdiomFillInGame;
