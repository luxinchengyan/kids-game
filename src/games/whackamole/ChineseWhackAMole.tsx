/**
 * 汉字打地鼠游戏
 * 使用通用打地鼠框架 + 汉字主题配置
 */

import { WhackAMole } from '../common/WhackAMole';
import { chineseTheme } from '../whackamole/themes';

export default function ChineseWhackAMole() {
  return (
    <WhackAMole
      gameId="chinese-whack-a-mole"
      theme={chineseTheme}
      difficultySettings={{
        easy: {
          moleCount: 3,
          showTime: 3000,
          spawnInterval: 1500,
          roundCount: 8,
          dataPool: 'numbers', // 只使用数字汉字
        },
        medium: {
          moleCount: 4,
          showTime: 2000,
          spawnInterval: 1200,
          roundCount: 10,
          dataPool: 'basic', // 基础汉字
        },
        hard: {
          moleCount: 5,
          showTime: 1200,
          spawnInterval: 900,
          roundCount: 12,
          dataPool: 'mixed', // 混合汉字
        },
      }}
    />
  );
}
