# 通用游戏框架设计文档
# 童梦飞船 · 智趣成长
# 版本：v1.0

---

## 概述

本文档描述了通用游戏框架的设计理念、架构和使用方法。通过抽象游戏的核心逻辑，实现**一次开发，多主题复用**的目标。

---

## 设计理念

### 核心思想

**游戏框架 = 通用逻辑 + 主题配置**

```
通用打地鼠框架
    ├── 游戏状态管理（分数、回合、连击等）
    ├── 游戏流程控制（开始、进行中、结束）
    ├── UI 渲染逻辑（地鼠网格、HUD、反馈等）
    └── 统计分析（追踪、完成率等）
         ↓ 注入 ↓
主题配置
    ├── 数据池（拼音/数学/英语/汉字）
    ├── 视觉风格（颜色、图标、渐变）
    ├── 语音提示（发音、语言）
    └── 难度设置（回合数、显示时间等）
```

### 优势

1. **代码复用率高**：核心逻辑只需开发一次
2. **扩展性强**：新增主题只需添加配置
3. **维护成本低**：bug 修复一次，所有主题受益
4. **一致的用户体验**：统一的交互模式
5. **快速迭代**：新主题可以在几小时内完成

---

## 架构设计

### 文件结构

```
src/games/
├── common/                      # 通用游戏框架
│   ├── WhackAMole.tsx           # 打地鼠通用框架
│   ├── MemoryCard.tsx           # 记忆翻牌通用框架（待实现）
│   ├── LinkGame.tsx             # 连连看通用框架（待实现）
│   └── MatchGame.tsx            # 配对游戏通用框架（待实现）
│
├── whackamole/                  # 打地鼠游戏主题
│   ├── themes.tsx               # 所有主题配置
│   ├── PinyinWhackAMoleGeneric.tsx
│   ├── MathWhackAMole.tsx
│   ├── EnglishWhackAMole.tsx
│   ├── ChineseWhackAMole.tsx
│   └── index.ts                 # 游戏注册
│
├── pinyin/                      # 拼音主题游戏
│   ├── PinyinGame.tsx
│   ├── PinyinWhackAMole.tsx     # 原版（可逐步迁移）
│   └── index.ts
│
├── math/                        # 数学主题游戏
├── english/                     # 英语主题游戏
└── stories/                     # 故事主题游戏
```

### 核心接口设计

#### 1. MoleItem - 地鼠数据项

```typescript
export interface MoleItem {
  id: string;              // 唯一标识
  content: string;         // 显示内容
  example?: string;        // 示例说明
  emoji?: string;          // 图标表情
  imageUrl?: string;       // 图片URL
  confusionSet?: string[]; // 干扰项集合
  metadata?: Record<string, any>; // 自定义数据
}
```

#### 2. GameThemeConfig - 游戏主题配置

```typescript
export interface GameThemeConfig {
  themeId: string;                        // 主题ID
  gameName: string;                       // 游戏名称
  gameIcon: string;                       // 游戏图标
  themeColor: string;                     // 主题颜色
  themeGradient: string;                  // 主题渐变色
  backPath: string;                       // 返回路径
  
  // 数据池获取
  getDataPool: (poolType?: string) => MoleItem[];
  
  // 答案校验
  checkAnswer: (selected: MoleItem, target: MoleItem) => boolean;
  
  // 语音合成
  speakText: (text: string, item?: MoleItem) => void;
  
  // 提示文本生成
  generatePrompt: (target: MoleItem) => string;
  
  // 自定义渲染（可选）
  renderMoleContent?: (item: MoleItem) => React.ReactNode;
}
```

#### 3. DifficultyConfig - 难度配置

```typescript
export interface DifficultyConfig {
  moleCount: number;        // 同时出现的地鼠数量
  showTime: number;         // 地鼠显示时间（毫秒）
  spawnInterval: number;    // 生成间隔（毫秒）
  roundCount: number;       // 回合数
  dataPool?: string;        // 数据池配置
  gridSize?: number;        // 网格大小（3x3, 4x4等）
}
```

---

## 使用指南

### 基础用法：创建新主题

#### 步骤 1：定义主题配置

```typescript
import type { GameThemeConfig, MoleItem } from '../common/WhackAMole';
import { defaultSpeakText } from '../common/WhackAMole';

// 1. 准备数据
const myData = {
  category1: [
    { id: '1', content: '内容1', example: '示例1', emoji: '😀' },
    { id: '2', content: '内容2', example: '示例2', emoji: '😃' },
  ],
  category2: [
    // ...
  ],
};

// 2. 创建主题配置
export const myTheme: GameThemeConfig = {
  themeId: 'my-subject',
  gameName: '我的主题打地鼠',
  gameIcon: '🎯',
  themeColor: '#FF5722',
  themeGradient: 'linear-gradient(135deg, #FFCCBC, #FFAB91)',
  backPath: '/games/my-subject',
  
  getDataPool: (poolType?: string) => {
    if (!poolType || poolType === 'category1') {
      return [...myData.category1];
    }
    if (poolType === 'category2') {
      return [...myData.category2];
    }
    return [...myData.category1, ...myData.category2];
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    defaultSpeakText(text, 'zh-CN');
  },
  
  generatePrompt: (target) => `找出 ${target.content}，${target.example}`,
};
```

#### 步骤 2：创建游戏组件

```typescript
import { WhackAMole } from '../common/WhackAMole';
import { myTheme } from '../whackamole/themes';

export default function MySubjectWhackAMole() {
  return (
    <WhackAMole
      gameId="my-subject-whack-a-mole"
      theme={myTheme}
      difficultySettings={{
        easy: {
          moleCount: 3,
          showTime: 3000,
          roundCount: 8,
          dataPool: 'category1',
        },
        medium: {
          moleCount: 4,
          showTime: 2000,
          roundCount: 10,
          dataPool: 'mixed',
        },
        hard: {
          moleCount: 5,
          showTime: 1200,
          roundCount: 12,
          dataPool: 'category2',
        },
      }}
    />
  );
}
```

#### 步骤 3：注册游戏

```typescript
import { registerGame } from '../registry';
import { lazy } from 'react';

const MySubjectWhackAMole = lazy(() => import('./MySubjectWhackAMole'));

registerGame({
  id: 'my-subject-whack-a-mole',
  name: '我的主题打地鼠',
  icon: '🎯',
  description: '敲击正确地鼠学习新知识',
  path: '/games/my-subject/whack-a-mole',
  component: MySubjectWhackAMole,
  category: 'my-subject',
  themeId: 'my-subject',
  minAge: 4,
  maxAge: 8,
});
```

### 高级用法：自定义渲染

如果需要特殊的地鼠显示效果，可以使用 `renderMoleContent`：

```typescript
export const advancedTheme: GameThemeConfig = {
  // ... 其他配置
  
  renderMoleContent: (item) => (
    <div style={{ textAlign: 'center' }}>
      {/* 显示图片 */}
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.content}
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
      )}
      
      {/* 显示内容 */}
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 900,
        color: '#FFFFFF',
        background: 'rgba(0,0,0,0.6)',
        padding: '4px 12px',
        borderRadius: '12px',
        marginTop: '8px'
      }}>
        {item.content}
      </div>
      
      {/* 显示图标 */}
      {item.emoji && (
        <div style={{ fontSize: '32px', marginTop: '4px' }}>
          {item.emoji}
        </div>
      )}
    </div>
  ),
};
```

### 进阶用法：自定义答案校验

对于更复杂的游戏逻辑，可以自定义 `checkAnswer`：

```typescript
// 数学题：找出正确答案
export const mathAdvancedTheme: GameThemeConfig = {
  // ... 其他配置
  
  checkAnswer: (selected, target) => {
    // target 是题目，selected 是选项
    // 例如：题目 "1+1=?"，选项 "2" 是正确的
    return selected.metadata?.answer === target.content;
  },
  
  generatePrompt: (target) => `找出正确答案：${target.content}`,
};
```

---

## 已实现主题

### 1. 拼音主题 (Pinyin)

```typescript
pinyinTheme = {
  themeId: 'pinyin',
  gameName: '拼音打地鼠',
  gameIcon: '🔨',
  themeColor: '#FF9800',
  dataPools: ['initials', 'finals', 'syllables', 'mixed', 'all']
}
```

**难度配置**：
- 入门：声母（b, p, m, f...）
- 进阶：声母 + 韵母
- 挑战：全部拼音

### 2. 数学主题 (Math)

```typescript
mathTheme = {
  themeId: 'math',
  gameName: '数学打地鼠',
  gameIcon: '🔢',
  themeColor: '#2196F3',
  dataPools: ['numbers', 'additions', 'shapes', 'mixed']
}
```

**难度配置**：
- 入门：数字认知（1-10）
- 进阶：数字 + 形状
- 挑战：加法算式

### 3. 英语主题 (English)

```typescript
englishTheme = {
  themeId: 'english',
  gameName: '英语打地鼠',
  gameIcon: '🌍',
  themeColor: '#4CAF50',
  dataPools: ['animals', 'colors', 'fruits', 'numbers', 'mixed']
}
```

**难度配置**：
- 入门：动物词汇（Cat, Dog...）
- 进阶：动物 + 水果
- 挑战：颜色词汇

### 4. 汉字主题 (Chinese)

```typescript
chineseTheme = {
  themeId: 'chinese',
  gameName: '汉字打地鼠',
  gameIcon: '📝',
  themeColor: '#9C27B0',
  dataPools: ['basic', 'numbers', 'nature', 'mixed']
}
```

**难度配置**：
- 入门：数字汉字（一、二、三...）
- 进阶：基础汉字（人、口、日...）
- 挑战：自然汉字（天、地、花...）

---

## 扩展其他游戏类型

打地鼠框架成功后，可以用相同模式开发其他游戏：

### 记忆翻牌游戏框架

```typescript
// src/games/common/MemoryCard.tsx
export interface MemoryCardTheme {
  themeId: string;
  gameName: string;
  // 卡片数据
  getCardPairs: (difficulty: string) => CardPair[];
  // 翻转动画
  flipAnimation: 'simple' | '3d' | 'bounce';
  // ...
}

export function MemoryCard({ theme, ...props }) {
  // 通用记忆翻牌逻辑
}
```

**可套用主题**：
- 拼音记忆翻牌
- 单词记忆翻牌
- 汉字记忆翻牌
- 数学公式记忆翻牌

### 连连看游戏框架

```typescript
// src/games/common/LinkGame.tsx
export interface LinkGameTheme {
  themeId: string;
  gameName: string;
  // 配对规则
  getMatchPairs: (difficulty: string) => MatchPair[];
  // 连线样式
  lineStyle: 'straight' | 'curve' | 'glow';
  // ...
}

export function LinkGame({ theme, ...props }) {
  // 通用连连看逻辑
}
```

**可套用主题**：
- 拼音连连看（声母+韵母）
- 单词连连看（图片+单词）
- 数学连连看（算式+答案）
- 汉字连连看（汉字+拼音）

---

## 最佳实践

### 1. 数据组织

```typescript
// ✅ 推荐：按类别组织数据
const data = {
  category1: [...],
  category2: [...],
  category3: [...],
};

// ❌ 不推荐：混在一起
const data = [...]; // 所有数据混在一起
```

### 2. 难度递进

```typescript
// ✅ 推荐：清晰的难度递进
difficultySettings = {
  easy: { dataPool: 'basic' },      // 基础
  medium: { dataPool: 'mixed' },    // 混合
  hard: { dataPool: 'advanced' },   // 高级
};

// ❌ 不推荐：难度跳跃太大
difficultySettings = {
  easy: { dataPool: 'basic' },
  hard: { dataPool: 'expert' },     // 缺少过渡
};
```

### 3. 语音提示

```typescript
// ✅ 推荐：简洁明了的提示
generatePrompt: (target) => `找出 ${target.content}，${target.example}`

// ❌ 不推荐：过于复杂的提示
generatePrompt: (target) => `请你从下面的地鼠中找到${target.content}这个拼音，它的例子是${target.example}，请仔细寻找`
```

### 4. 主题颜色

```typescript
// ✅ 推荐：使用主题色系统
themeColor: '#FF9800',              // 主色
themeGradient: 'linear-gradient(...)', // 渐变

// ❌ 不推荐：硬编码颜色
backgroundColor: '#FFF8E1',         // 没有统一主题
```

---

## 性能优化

### 1. 懒加载

```typescript
// ✅ 推荐：使用 React.lazy
const MyGame = lazy(() => import('./MyGame'));

// 注册时
registerGame({
  component: MyGame,  // 懒加载
  // ...
});
```

### 2. 数据池缓存

```typescript
// ✅ 推荐：缓存数据池
const dataPoolCache = new Map();

getDataPool: (poolType) => {
  if (dataPoolCache.has(poolType)) {
    return dataPoolCache.get(poolType);
  }
  const pool = generatePool(poolType);
  dataPoolCache.set(poolType, pool);
  return pool;
}
```

### 3. 定时器清理

```typescript
// ✅ 推荐：组件卸载时清理
useEffect(() => {
  return () => {
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
  };
}, []);
```

---

## 测试策略

### 单元测试

```typescript
// 测试主题配置
describe('pinyinTheme', () => {
  it('should return correct data pool', () => {
    const pool = pinyinTheme.getDataPool('initials');
    expect(pool.length).toBeGreaterThan(0);
    expect(pool[0]).toHaveProperty('content');
  });
  
  it('should check answer correctly', () => {
    const target = { id: 'b', content: 'b' };
    const correct = { id: 'b', content: 'b' };
    const wrong = { id: 'p', content: 'p' };
    
    expect(pinyinTheme.checkAnswer(correct, target)).toBe(true);
    expect(pinyinTheme.checkAnswer(wrong, target)).toBe(false);
  });
});
```

### 集成测试

```typescript
// 测试游戏流程
describe('WhackAMole Game Flow', () => {
  it('should start game correctly', () => {
    render(<WhackAMole gameId="test" theme={testTheme} />);
    // 测试开始界面
  });
  
  it('should handle mole click', () => {
    // 测试地鼠点击
  });
  
  it('should end game after all rounds', () => {
    // 测试游戏结束
  });
});
```

---

## 未来扩展方向

### 1. 更多游戏框架

- [ ] 记忆翻牌（Memory Card）
- [ ] 连连看（Link Game）
- [ ] 消消乐（Match-3）
- [ ] 拼图（Puzzle）
- [ ] 接龙（Chain Game）
- [ ] 迷宫（Maze）

### 2. AI 增强功能

- [ ] 自适应难度调整
- [ ] 智能错题分析
- [ ] 个性化内容推荐
- [ ] 语音识别反馈

### 3. 社交功能

- [ ] 成绩排行榜
- [ ] 好友挑战
- [ ] 合作游戏模式

### 4. 数据分析

- [ ] 学习进度可视化
- [ ] 薄弱点分析
- [ ] 家长报告生成

---

## 总结

通用游戏框架的核心理念是：

> **将游戏的"形"（逻辑、流程、UI）与"神"（内容、主题、风格）分离**

通过这种方式，我们可以：
- 🚀 **快速开发**：新主题只需配置，无需重写逻辑
- 🎨 **灵活定制**：每个主题都有独特的视觉和交互
- 🔧 **易于维护**：核心逻辑统一，bug 修复一次生效
- 📈 **持续扩展**：新游戏类型可以用相同模式开发

这个框架为"童梦飞船"项目提供了强大的基础，让我们能够专注于内容质量，而不是重复开发游戏逻辑。

---

**文档维护记录**：
- v1.0 (2026-04-19)：初始版本，完成打地鼠通用框架设计
