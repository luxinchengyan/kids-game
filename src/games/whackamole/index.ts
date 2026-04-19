/**
 * 打地鼠游戏集合 - 导出
 * 注意：游戏注册已在各自主题目录中完成
 * - 拼音: src/games/pinyin/index.ts
 * - 数学: src/games/math/index.ts
 * - 英语: src/games/english/index.ts
 * - 汉字: src/games/stories/index.ts
 */

// 此文件保留用于导出通用组件和配置
export { WhackAMole } from '../common/WhackAMole';
export type { 
  WhackAMoleProps,
  GameThemeConfig,
  MoleItem,
  DifficultyConfig,
  DifficultyLevel,
  GamePhase
} from '../common/WhackAMole';
export { 
  whackAMoleThemes,
  pinyinTheme,
  mathTheme,
  englishTheme,
  chineseTheme 
} from './themes';
