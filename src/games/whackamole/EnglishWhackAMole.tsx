/**
 * 英语打地鼠游戏
 * 使用通用打地鼠框架 + 英语主题配置
 */

import { WhackAMole } from '../common/WhackAMole';
import { englishTheme } from '../whackamole/themes';

export default function EnglishWhackAMole() {
  return (
    <WhackAMole
      gameId="english-whack-a-mole"
      theme={englishTheme}
      difficultySettings={{
        easy: {
          moleCount: 3,
          showTime: 3000,
          spawnInterval: 1500,
          roundCount: 8,
          dataPool: 'animals', // 只使用动物词汇
        },
        medium: {
          moleCount: 4,
          showTime: 2000,
          spawnInterval: 1200,
          roundCount: 10,
          dataPool: 'mixed', // 动物+水果
        },
        hard: {
          moleCount: 5,
          showTime: 1200,
          spawnInterval: 900,
          roundCount: 12,
          dataPool: 'colors', // 颜色词汇
        },
      }}
    />
  );
}
