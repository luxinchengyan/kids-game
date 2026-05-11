# 游戏架构可视化
# 童梦飞船 · 智趣成长

---

## 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        童梦飞船  Homepage                        │
│                     四个学习岛入口卡片                            │
└────────────┬──────────────┬──────────────┬──────────────┬───────┘
             │              │              │              │
             ↓              ↓              ↓              ↓
┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  拼音冒险岛    │ │   数字小镇     │ │  英语游乐园    │ │   故事王国     │
│  /games/pinyin │ │ /games/math    │ │/games/english  │ │/games/stories  │
└────────┬───────┘ └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
         │                  │                   │                  │
    ┌────┴────┐        ┌────┴────┐         ┌────┴────┐        ┌────┴────┐
    │游戏列表 │        │游戏列表 │         │游戏列表 │        │游戏列表 │
    └────┬────┘        └────┬────┘         └────┬────┘        └────┬────┘
         │                  │                   │                  │
         ↓                  ↓                   ↓                  ↓
┌────────────────┐ ┌────────────────┐  ┌────────────────┐ ┌────────────────┐
│拼音打地鼠      │ │数学打地鼠      │  │英语打地鼠      │ │汉字打地鼠      │
│(通用框架)      │ │(通用框架)      │  │(通用框架)      │ │(通用框架)      │
└────────┬───────┘ └───────┬────────┘  └───────┬────────┘ └───────┬────────┘
         │                  │                   │                  │
         └──────────────────┴───────────────────┴──────────────────┘
                            │
                    ┌───────┴────────┐
                    │  WhackAMole    │
                    │ 通用游戏框架   │
                    │ (732行代码)    │
                    └───────┬────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
         ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
         │主题配置  │  │难度配置  │  │样式配置  │
         │(themes) │  │(diff)   │  │(style)  │
         └─────────┘  └─────────┘  └─────────┘
```

---

## 通用框架工作流程

```
┌──────────────────────────────────────────────────────────────┐
│                    WhackAMole 游戏框架                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌──────────────────────────────────────────────────────────────┐
│  1. 开始界面 (Start Screen)                                   │
│     - 显示游戏名称和图标                                      │
│     - 选择难度 (入门/进阶/挑战)                               │
│     - 应用主题颜色和渐变                                      │
└──────────────────────────┬───────────────────────────────────┘
                           │ 用户选择难度
                           ↓
┌──────────────────────────────────────────────────────────────┐
│  2. 游戏界面 (Game Screen)                                    │
│     ┌─────────────────────────────────────────────┐          │
│     │ HUD: 分数 | 回合 | 连击 | 退出按钮           │          │
│     └─────────────────────────────────────────────┘          │
│     ┌─────────────────────────────────────────────┐          │
│     │ 目标提示区                                    │          │
│     │ "找出 b，菠萝 🍍"                            │          │
│     │ (语音播放)                                    │          │
│     └─────────────────────────────────────────────┘          │
│     ┌─────────────────────────────────────────────┐          │
│     │ 地鼠网格 (3x3 或 4x4)                        │          │
│     │  ○ ○ ○                                      │          │
│     │  ○ 🐭 ○  ← 地鼠随机出现                     │          │
│     │  ○ ○ ○                                      │          │
│     └─────────────────────────────────────────────┘          │
│     ┌─────────────────────────────────────────────┐          │
│     │ 反馈动画 (正确✅ / 错误❌ / 跑掉💨)          │          │
│     └─────────────────────────────────────────────┘          │
└──────────────────────────┬───────────────────────────────────┘
                           │ 完成所有回合
                           ↓
┌──────────────────────────────────────────────────────────────┐
│  3. 结果界面 (Results Screen)                                 │
│     ┌─────────────────────────────────────────────┐          │
│     │  🎉 游戏结束！                               │          │
│     │  ⭐⭐☆ (根据正确率)                          │          │
│     ├─────────────────────────────────────────────┤          │
│     │  总分: 120    正确率: 85%                   │          │
│     │  正确: 8/10   最大连击: 5🔥                 │          │
│     └─────────────────────────────────────────────┘          │
│     [🔄 再玩一次]  [← 返回]                                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 主题注入机制

```
┌────────────────────────────────────────────────────────────┐
│              通用 WhackAMole 组件                           │
│                                                            │
│  <WhackAMole                                               │
│    gameId="pinyin-whack-a-mole"                            │
│    theme={pinyinTheme}          ← 注入主题配置              │
│    difficultySettings={{...}}   ← 注入难度配置              │
│  />                                                        │
└────────────────────────────────────────────────────────────┘
         │                    │                    │
         ↓                    ↓                    ↓
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  pinyinTheme     │ │  difficultySet   │ │  customStyles    │
│                  │ │                  │ │                  │
│  themeId:拼音    │ │  easy: {...}     │ │  backgroundColor │
│  gameName:拼音   │ │  medium: {...}   │ │  moleColor       │
│  gameIcon:🔨    │ │  hard: {...}     │ │  targetColor     │
│  themeColor:#FF9│ │                  │ │                  │
│  dataPool: [...] │ │                  │ │                  │
│  speakText: fn   │ │                  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

---

## 数据流

```
用户操作 → 状态更新 → UI 渲染
   │           │          │
   ↓           ↓          ↓
点击地鼠 → 更新分数 → HUD 刷新
   │           │          │
   ↓           ↓          ↓
判断对错 → 更新连击 → 反馈动画
   │           │          │
   ↓           ↓          ↓
回合结束 → 下一回合 → 新地鼠出现
   │           │          │
   ↓           ↓          ↓
所有回合完 → 计算星级 → 结果界面
   │           │          │
   ↓           ↓          ↓
保存进度 → 更新 store → 返回首页
```

---

## 文件依赖关系

```
App.tsx
  │
  ├─→ games/pinyin/index.ts
  │     ├─→ PinyinThemeHub.tsx
  │     ├─→ PinyinWhackAMole.tsx (原版)
  │     └─→ whackamole/PinyinWhackAMoleGeneric.tsx
  │           ├─→ common/WhackAMole.tsx (通用框架)
  │           └─→ whackamole/themes.tsx (pinyinTheme)
  │
  ├─→ games/math/index.ts
  │     ├─→ MathThemeHub.tsx
  │     ├─→ MathGame.tsx
  │     ├─→ SudokuGame.tsx
  │     └─→ whackamole/MathWhackAMole.tsx
  │           ├─→ common/WhackAMole.tsx
  │           └─→ whackamole/themes.tsx (mathTheme)
  │
  ├─→ games/english/index.ts
  │     ├─→ EnglishGame.tsx
  │     └─→ whackamole/EnglishWhackAMole.tsx
  │           ├─→ common/WhackAMole.tsx
  │           └─→ whackamole/themes.tsx (englishTheme)
  │
  └─→ games/stories/index.ts
        ├─→ StoriesGame.tsx
        └─→ whackamole/ChineseWhackAMole.tsx
              ├─→ common/WhackAMole.tsx
              └─→ whackamole/themes.tsx (chineseTheme)
```

---

## 主题配置结构

```typescript
GameThemeConfig {
  ┌─ 基础信息
  │  ├─ themeId: 'pinyin' | 'math' | 'english' | 'chinese'
  │  ├─ gameName: '拼音打地鼠' | '数学打地鼠' | ...
  │  ├─ gameIcon: '🔨' | '🔢' | '🌍' | '📝'
  │  ├─ themeColor: '#FF9800' | '#2196F3' | ...
  │  └─ themeGradient: 'linear-gradient(...)'
  │
  ├─ 数据相关
  │  ├─ getDataPool(poolType) → MoleItem[]
  │  │    └─ 返回: [{ id, content, example, emoji, ... }]
  │  │
  │  └─ checkAnswer(selected, target) → boolean
  │       └─ 判断: selected.id === target.id
  │
  ├─ 交互相关
  │  ├─ speakText(text, item) → void
  │  │    └─ TTS: window.speechSynthesis
  │  │
  │  └─ generatePrompt(target) → string
  │       └─ 生成: "找出 b，菠萝"
  │
  └─ 渲染相关 (可选)
     └─ renderMoleContent(item) → JSX
          └─ 自定义地鼠显示
}
```

---

## 难度配置结构

```typescript
DifficultyConfig {
  easy: {
    moleCount: 3,          // 3只地鼠同时出现
    showTime: 3000,        // 显示3秒
    spawnInterval: 1500,   // 生成间隔1.5秒
    roundCount: 8,         // 8个回合
    dataPool: 'initials',  // 使用声母数据
    gridSize: 3            // 3x3网格
  },
  
  medium: {
    moleCount: 4,          // 4只地鼠
    showTime: 2000,        // 显示2秒
    spawnInterval: 1200,   // 生成间隔1.2秒
    roundCount: 10,        // 10个回合
    dataPool: 'mixed',     // 混合数据
    gridSize: 3            // 3x3网格
  },
  
  hard: {
    moleCount: 5,          // 5只地鼠
    showTime: 1200,        // 显示1.2秒
    spawnInterval: 900,    // 生成间隔0.9秒
    roundCount: 12,        // 12个回合
    dataPool: 'all',       // 全部数据
    gridSize: 4            // 4x4网格
  }
}
```

---

## 游戏状态机

```
        ┌─────────┐
        │  Start  │ ← 初始状态
        └────┬────┘
             │
      选择难度
             │
             ↓
        ┌─────────────┐
        │  Playing    │ ← 游戏进行中
        └─────┬───────┘
              │
         回合变化
              │
    ┌─────────┼─────────┐
    │         │         │
    ↓         ↓         ↓
 生成    用户点击    时间到
 地鼠      地鼠      地鼠消失
    │         │         │
    │    ┌────┴────┐    │
    │    │         │    │
    ↓    ↓         ↓    ↓
  正确  错误     错过
  +分数 -分数    连击归零
    │    │         │
    └────┴─────────┘
         │
    所有回合完成
         │
         ↓
    ┌─────────┐
    │ Results │ ← 显示结果
    └────┬────┘
         │
    再玩一次/返回
         │
         ↓
    ┌─────────┐
    │  Start  │ ← 回到初始
    └─────────┘
```

---

## 组件层次结构

```
WhackAMole (通用框架)
│
├─ Start Screen (开始界面)
│  ├─ Game Title (游戏标题)
│  ├─ Difficulty Selector (难度选择)
│  │  ├─ Easy Button (入门)
│  │  ├─ Medium Button (进阶)
│  │  └─ Hard Button (挑战)
│  └─ Back Button (返回按钮)
│
├─ Game Screen (游戏界面)
│  ├─ HUD (头部信息栏)
│  │  ├─ Score (分数)
│  │  ├─ Round (回合)
│  │  ├─ Combo (连击)
│  │  └─ Exit Button (退出)
│  │
│  ├─ Target Prompt (目标提示)
│  │  ├─ Target Content (目标内容)
│  │  ├─ Target Emoji (目标图标)
│  │  └─ Target Example (目标示例)
│  │
│  ├─ Mole Grid (地鼠网格)
│  │  ├─ Mole Hole (地鼠洞穴) × 9 或 16
│  │  │  └─ Mole (地鼠) [出现时]
│  │  │     ├─ Emoji (图标)
│  │  │     └─ Content (内容)
│  │  │
│  │  └─ Empty Hole (空地鼠洞) [无地鼠时]
│  │
│  └─ Feedback Overlay (反馈覆盖层)
│     └─ Message (反馈消息)
│
└─ Results Screen (结果界面)
   ├─ Celebration Animation (庆祝动画)
   ├─ Stars Display (星级显示)
   ├─ Statistics Grid (统计网格)
   │  ├─ Total Score (总分)
   │  ├─ Accuracy (正确率)
   │  ├─ Correct/Total (正确/总数)
   │  └─ Max Combo (最大连击)
   │
   └─ Action Buttons (操作按钮)
      ├─ Replay Button (再玩一次)
      └─ Back Button (返回)
```

---

## 颜色主题系统

```
拼音主题 (橙色系)
├─ themeColor: #FF9800
├─ themeGradient: #FFF8E1 → #FFECB3
└─ 应用场景: HUD, 按钮, 目标提示区

数学主题 (蓝色系)
├─ themeColor: #2196F3
├─ themeGradient: #E3F2FD → #BBDEFB
└─ 应用场景: HUD, 按钮, 目标提示区

英语主题 (绿色系)
├─ themeColor: #4CAF50
├─ themeGradient: #E8F5E9 → #C8E6C9
└─ 应用场景: HUD, 按钮, 目标提示区

汉字主题 (紫色系)
├─ themeColor: #9C27B0
├─ themeGradient: #F3E5F5 → #E1BEE7
└─ 应用场景: HUD, 按钮, 目标提示区
```

---

**创建日期**: 2026-04-19  
**文档版本**: v1.0
