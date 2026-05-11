import { registerGame } from '../registry';
import { lazy } from 'react';

export const GomokuGame = lazy(() => import('./Gomoku'));
export const MinesweeperGame = lazy(() => import('./Minesweeper'));
export const ChessGame = lazy(() => import('./Chess'));
export const XiangqiGame = lazy(() => import('./Xiangqi'));
export const GoGame = lazy(() => import('./Go'));
export const CardGames = lazy(() => import('./CardGames'));
export const MilitaryChessGame = lazy(() => import('./MilitaryChess'));
export const HalmaGame = lazy(() => import('./Halma'));

// Register Board & Card Games
registerGame({
  id: 'gomoku',
  name: '五子棋',
  icon: '⚪',
  description: '益智竞技，五子连珠！',
  path: '/games/board/gomoku',
  component: GomokuGame,
  category: 'other',
});

registerGame({
  id: 'minesweeper',
  name: '扫雷大冒险',
  icon: '🕵️‍♂️',
  description: '经典逻辑游戏，找出所有地雷。',
  path: '/games/board/minesweeper',
  component: MinesweeperGame,
  category: 'math',
});

registerGame({
  id: 'chess',
  name: '国际象棋',
  icon: '♟️',
  description: '智慧的交锋，经典的博弈。',
  path: '/games/board/chess',
  component: ChessGame,
  category: 'other',
});

registerGame({
  id: 'chinese-chess',
  name: '中国象棋',
  icon: '🏮',
  description: '楚河汉界，智勇对决！',
  path: '/games/board/xiangqi',
  component: XiangqiGame,
  category: 'other',
});

registerGame({
  id: 'go-game',
  name: '围棋入门',
  icon: '⚫',
  description: '黑白之间，方寸世界。',
  path: '/games/board/go',
  component: GoGame,
  category: 'other',
});

registerGame({
  id: 'military-chess',
  name: '军棋大战',
  icon: '🎖️',
  description: '排兵布阵，在博弈中学会规划与判断。',
  path: '/games/board/military-chess',
  component: MilitaryChessGame,
  category: 'other',
});

registerGame({
  id: 'halma',
  name: '跳棋',
  icon: '🏃',
  description: '跳跃吧，小棋子！',
  path: '/games/board/halma',
  component: HalmaGame,
  category: 'other',
});

registerGame({
  id: 'card-games',
  name: '趣味牌类',
  icon: '🃏',
  description: '包含多种适合小朋友的牌类游戏框架。',
  path: '/games/board/cards',
  component: CardGames,
  category: 'other',
});
