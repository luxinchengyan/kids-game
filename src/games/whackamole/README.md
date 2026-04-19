# 打地鼠游戏系列 - 使用通用框架

## 概述

本目录包含了使用**通用打地鼠游戏框架**实现的多个主题游戏。通过抽象游戏核心逻辑，实现了代码的高度复用。

## 文件结构

```
src/games/whackamole/
├── themes.tsx                      # 主题配置文件
├── PinyinWhackAMoleGeneric.tsx     # 拼音打地鼠
├── MathWhackAMole.tsx              # 数学打地鼠
├── EnglishWhackAMole.tsx           # 英语打地鼠
├── ChineseWhackAMole.tsx           # 汉字打地鼠
└── index.ts                        # 游戏注册
```

## 可用游戏

### 1. 拼音打地鼠 🔨

**路由**: `/games/pinyin/whack-a-mole-generic`

**学习内容**:
- 声母：b, p, m, f, d, t, n, l...
- 韵母：a, o, e, i, u, ai, ei...
- 整体认读音节：zhi, chi, shi, ri, zi...

**难度设置**:
- 🌱 **入门**：声母练习（3只地鼠，3秒显示时间）
- 🌟 **进阶**：声母+韵母混合（4只地鼠，2秒显示时间）
- 🔥 **挑战**：全部拼音（5只地鼠，1.2秒显示时间）

### 2. 数学打地鼠 🔢

**路由**: `/games/math/whack-a-mole`

**学习内容**:
- 数字认知：1-10
- 形状识别：圆形、正方形、三角形...
- 简单加法：1+1=2, 2+1=3...

**难度设置**:
- 🌱 **入门**：数字认知（3只地鼠）
- 🌟 **进阶**：数字+形状混合（4只地鼠）
- 🔥 **挑战**：加法算式（5只地鼠）

### 3. 英语打地鼠 🌍

**路由**: `/games/english/whack-a-mole`

**学习内容**:
- 动物词汇：Cat, Dog, Bird, Fish...
- 颜色词汇：Red, Blue, Green, Yellow...
- 水果词汇：Apple, Banana, Orange...
- 数字词汇：One, Two, Three...

**难度设置**:
- 🌱 **入门**：动物词汇（3只地鼠，英语发音）
- 🌟 **进阶**：动物+水果混合（4只地鼠）
- 🔥 **挑战**：颜色词汇（5只地鼠）

### 4. 汉字打地鼠 📝

**路由**: `/games/stories/whack-a-mole`

**学习内容**:
- 数字汉字：一、二、三、四...
- 基础汉字：人、口、日、月、水、火...
- 自然汉字：天、地、花、树、云、雨...

**难度设置**:
- 🌱 **入门**：数字汉字（3只地鼠）
- 🌟 **进阶**：基础汉字（4只地鼠）
- 🔥 **挑战**：混合汉字（5只地鼠，自定义渲染）

## 如何使用通用框架

### 创建新主题游戏（3步完成）

#### 步骤 1：在 `themes.tsx` 中添加主题配置

```typescript
export const myNewTheme: GameThemeConfig = {
  themeId: 'my-subject',
  gameName: '我的新主题',
  gameIcon: '🎯',
  themeColor: '#FF5722',
  themeGradient: 'linear-gradient(135deg, #FFCCBC, #FFAB91)',
  backPath: '/games/my-subject',
  
  getDataPool: (poolType?: string) => {
    // 返回数据池
    return [...myData];
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    defaultSpeakText(text, 'zh-CN');
  },
  
  generatePrompt: (target) => `找出 ${target.content}`,
};
```

#### 步骤 2：创建游戏组件

```typescript
// MyNewWhackAMole.tsx
import { WhackAMole } from '../common/WhackAMole';
import { myNewTheme } from '../whackamole/themes';

export default function MyNewWhackAMole() {
  return (
    <WhackAMole
      gameId="my-new-whack-a-mole"
      theme={myNewTheme}
      difficultySettings={{
        easy: { moleCount: 3, showTime: 3000, roundCount: 8, dataPool: 'basic' },
        medium: { moleCount: 4, showTime: 2000, roundCount: 10, dataPool: 'mixed' },
        hard: { moleCount: 5, showTime: 1200, roundCount: 12, dataPool: 'advanced' },
      }}
    />
  );
}
```

#### 步骤 3：在 `index.ts` 中注册游戏

```typescript
const MyNewWhackAMole = lazy(() => import('./MyNewWhackAMole'));

registerGame({
  id: 'my-new-whack-a-mole',
  name: '我的新主题打地鼠',
  icon: '🎯',
  description: '敲击正确地鼠学习新知识',
  path: '/games/my-subject/whack-a-mole',
  component: MyNewWhackAMole,
  category: 'my-subject',
  themeId: 'my-subject',
  minAge: 4,
  maxAge: 8,
});
```

**完成！** 🎉 新游戏已经可以使用了。

## 架构优势

### 代码对比

**传统方式**（每个主题独立开发）:
```
拼音打地鼠: 600 行代码
数学打地鼠: 600 行代码
英语打地鼠: 600 行代码
汉字打地鼠: 600 行代码
---------------------------
总计: 2400 行代码
```

**通用框架方式**:
```
通用框架: 730 行代码（一次性）
拼音配置: 50 行代码
数学配置: 50 行代码
英语配置: 50 行代码
汉字配置: 60 行代码
---------------------------
总计: 940 行代码（节省 61%）
```

### 维护成本

**传统方式**:
- Bug 修复：需要修改 4 个文件
- 功能增强：需要在 4 个文件中实现
- 新增主题：需要从头开发 600+ 行代码

**通用框架方式**:
- Bug 修复：只需修改 1 个文件（通用框架）
- 功能增强：只需在通用框架中实现一次
- 新增主题：只需 100 行配置代码

## 自定义选项

### 自定义地鼠渲染

```typescript
renderMoleContent: (item) => (
  <div style={{ textAlign: 'center' }}>
    <img src={item.imageUrl} alt={item.content} />
    <div>{item.content}</div>
  </div>
)
```

### 自定义答案校验

```typescript
// 数学题：找出正确答案
checkAnswer: (selected, target) => {
  return selected.metadata?.answer === target.content;
}
```

### 自定义语音

```typescript
// 英语主题：使用英语发音
speakText: (text, item) => {
  if (isEnglishWord(item)) {
    defaultSpeakText(item.content, 'en-US');
  } else {
    defaultSpeakText(text, 'zh-CN');
  }
}
```

## 扩展阅读

- [通用游戏框架设计文档](../../ai/GAME-FRAMEWORK.md)
- [游戏设计文档](../../ai/GAMES.md)
- [通用框架源码](../common/WhackAMole.tsx)

## 未来计划

- [ ] 添加更多主题（成语、古诗、科学常识...）
- [ ] 实现记忆翻牌通用框架
- [ ] 实现连连看通用框架
- [ ] 实现消消乐通用框架
- [ ] 添加 AI 自适应难度
- [ ] 添加语音识别功能

---

**开发日期**: 2026-04-19  
**框架版本**: v1.0  
**游戏数量**: 4 个主题
