/**
 * 拼音打地鼠游戏
 * 使用通用打地鼠框架 + 拼音主题配置
 */

import { WhackAMole } from '../common/WhackAMole';
import { pinyinTheme } from '../whackamole/themes';

export default function PinyinWhackAMoleGeneric() {
  return (
    <WhackAMole
      gameId="pinyin-whack-a-mole-generic"
      theme={pinyinTheme}
      difficultySettings={{
        easy: {
          moleCount: 3,
          showTime: 3000,
          spawnInterval: 1500,
          roundCount: 8,
          dataPool: 'initials', // 只使用声母
        },
        medium: {
          moleCount: 4,
          showTime: 2000,
          spawnInterval: 1200,
          roundCount: 10,
          dataPool: 'mixed', // 声母+韵母
        },
        hard: {
          moleCount: 5,
          showTime: 1200,
          spawnInterval: 900,
          roundCount: 12,
          dataPool: 'all', // 全部拼音
        },
      }}
    />
  );
}
