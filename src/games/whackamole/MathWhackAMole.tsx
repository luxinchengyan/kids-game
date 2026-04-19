/**
 * 数学打地鼠游戏
 * 使用通用打地鼠框架 + 数学主题配置
 */

import { WhackAMole } from '../common/WhackAMole';
import { mathTheme } from '../whackamole/themes';

export default function MathWhackAMole() {
  return (
    <WhackAMole
      gameId="math-whack-a-mole"
      theme={mathTheme}
      difficultySettings={{
        easy: {
          moleCount: 3,
          showTime: 3000,
          spawnInterval: 1500,
          roundCount: 8,
          dataPool: 'numbers', // 只使用数字
        },
        medium: {
          moleCount: 4,
          showTime: 2000,
          spawnInterval: 1200,
          roundCount: 10,
          dataPool: 'mixed', // 数字+形状
        },
        hard: {
          moleCount: 5,
          showTime: 1200,
          spawnInterval: 900,
          roundCount: 12,
          dataPool: 'additions', // 加法算式
        },
      }}
    />
  );
}
