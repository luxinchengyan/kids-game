# 通用考试系统使用文档

## 📋 概述

通用考试系统是一个可复用的考试框架，支持拼音、数学、英语、故事等不同主题的考试。每个主题都可以轻松集成考试功能，作为该主题游戏的一部分。

## 🏗️ 架构设计

### 核心组件

```
src/games/common/ExamSystem.tsx          # 通用考试系统框架
src/games/{theme}/{Theme}Exam.tsx        # 各主题的具体考试实现
```

### 文件结构

```
src/games/
├── common/
│   ├── ExamSystem.tsx                   # 通用考试系统框架
│   └── WhackAMole.tsx                   # 通用打地鼠框架
├── pinyin/
│   ├── PinyinExam.tsx                   # 拼音考试
│   └── index.ts                         # 注册拼音考试
├── math/
│   ├── MathExam.tsx                     # 数学考试
│   └── index.ts                         # 注册数学考试
├── english/
│   ├── EnglishExam.tsx                  # 英语考试
│   └── index.ts                         # 注册英语考试
└── stories/
    ├── StoriesExam.tsx                  # 故事考试
    └── index.ts                         # 注册故事考试
```

## 🚀 快速开始

### 三步为你的主题添加考试

#### 步骤 1：创建题库和考试配置（~100行）

```typescript
// src/games/my-subject/MySubjectExam.tsx
import { ExamSystem, ExamConfig, Question } from '../common/ExamSystem';
import { defaultSpeakText } from '../common/WhackAMole';

// 1. 定义题库
const myQuestions: Question[] = [
  {
    id: 'question-1',
    type: 'choice',  // 选择题
    question: '题目内容',
    hint: '提示信息（可选）',
    correctAnswer: 'option-a',
    emoji: '🎯',
    options: [
      { id: 'option-a', content: '选项A', emoji: '✅' },
      { id: 'option-b', content: '选项B', emoji: '❌' },
      { id: 'option-c', content: '选项C', emoji: '❌' },
      { id: 'option-d', content: '选项D', emoji: '❌' },
    ],
    explanation: '答案解析',
  },
  // ... 更多题目
];

// 2. 配置考试
export const mySubjectExamConfig: ExamConfig = {
  examId: 'my-subject-exam',
  examName: '我的主题测试',
  examIcon: '📝',
  themeColor: '#FF9800',
  themeGradient: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
  backPath: '/games/my-subject',
  
  getQuestionPool: (category?: string) => {
    if (!category || category === 'all') {
      return [...myQuestions];
    }
    return myQuestions.filter(q => q.id.includes(category));
  },
  
  speakText: (text) => {
    defaultSpeakText(text, 'zh-CN');
  },
};

// 3. 导出考试组件
export default function MySubjectExam() {
  return (
    <ExamSystem
      gameId="my-subject-exam"
      exam={mySubjectExamConfig}
    />
  );
}
```

#### 步骤 2：注册考试（~15行）

```typescript
// src/games/my-subject/index.ts
import { registerGame } from '../registry';
import { lazy } from 'react';

const MySubjectExam = lazy(() => import('./MySubjectExam'));

registerGame({
  id: 'my-subject-exam',
  name: '我的主题测试',
  icon: '📝',
  description: '测试你的学习成果',
  path: '/games/my-subject/exam',
  component: MySubjectExam,
  category: 'my-subject',
  themeId: 'my-subject',
  minAge: 4,
  maxAge: 8,
});
```

#### 步骤 3：完成！🎉

考试会自动出现在主题中心的游戏中，用户可以直接点击进入考试。

## 📝 题库设计

### 题目类型

#### 1. 选择题（choice）

```typescript
{
  id: 'choice-1',
  type: 'choice',
  question: '下面哪个是"苹果"的英语？',
  hint: 'A开头的水果',
  correctAnswer: 'apple',
  emoji: '🍎',
  options: [
    { id: 'apple', content: 'Apple', emoji: '🍎' },
    { id: 'banana', content: 'Banana', emoji: '🍌' },
    { id: 'orange', content: 'Orange', emoji: '🍊' },
    { id: 'grape', content: 'Grape', emoji: '🍇' },
  ],
  explanation: 'Apple = 苹果',
}
```

#### 2. 判断题（judge）

```typescript
{
  id: 'judge-1',
  type: 'judge',
  question: '"Cat"是"狗"的意思，对吗？',
  hint: '想想猫咪怎么叫',
  correctAnswer: 'false',
  emoji: '🐱',
  options: [
    { id: 'true', content: '对 ✓', emoji: '✅' },
    { id: 'false', content: '错 ✗', emoji: '❌' },
  ],
  explanation: '错误！Cat = 猫，Dog = 狗',
}
```

### 题目字段说明

| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| `id` | string | ✅ | 题目唯一标识 |
| `type` | 'choice' \| 'judge' | ✅ | 题目类型 |
| `question` | string | ✅ | 题目内容 |
| `hint` | string | ❌ | 提示信息 |
| `correctAnswer` | string | ✅ | 正确答案的option id |
| `options` | ChoiceOption[] | ✅ | 选项列表 |
| `emoji` | string | ❌ | 题目表情图标 |
| `imageUrl` | string | ❌ | 题目图片URL |
| `explanation` | string | ❌ | 答案解析 |
| `metadata` | object | ❌ | 自定义数据 |

### 题库分类建议

按照知识点或难度对题目进行分类，方便按需抽题：

```typescript
const questions = [
  // 声母题目
  { id: 'shengmu-1', ... },
  { id: 'shengmu-2', ... },
  
  // 韵母题目
  { id: 'yunmu-1', ... },
  { id: 'yunmu-2', ... },
  
  // 综合题目
  { id: 'mixed-1', ... },
];

// 按需抽题
getQuestionPool: (category?: string) => {
  if (category === 'shengmu') {
    return questions.filter(q => q.id.startsWith('shengmu'));
  }
  return questions;
}
```

## ⚙️ 考试配置

### ExamConfig 字段说明

| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| `examId` | string | ✅ | 考试唯一标识 |
| `examName` | string | ✅ | 考试名称 |
| `examIcon` | string | ✅ | 考试图标（emoji） |
| `themeColor` | string | ✅ | 主题颜色 |
| `themeGradient` | string | ✅ | 主题渐变色背景 |
| `backPath` | string | ✅ | 返回路径 |
| `getQuestionPool` | function | ✅ | 获取题库的函数 |
| `speakText` | function | ❌ | 语音播报函数 |
| `renderQuestionContent` | function | ❌ | 自定义题目渲染 |

### 难度配置

系统提供三个默认难度级别：

```typescript
export const DEFAULT_EXAM_DIFFICULTY = {
  easy: {
    questionCount: 10,        // 10道题
    timeLimit: 0,             // 不限时
    passingRate: 0.6,         // 60%及格
  },
  medium: {
    questionCount: 15,        // 15道题
    timeLimit: 300,           // 5分钟
    passingRate: 0.7,         // 70%及格
  },
  hard: {
    questionCount: 20,        // 20道题
    timeLimit: 600,           // 10分钟
    passingRate: 0.8,         // 80%及格
  },
};
```

### 自定义难度配置

可以覆盖默认难度配置：

```typescript
<ExamSystem
  gameId="my-exam"
  exam={myExamConfig}
  difficultySettings={{
    easy: {
      questionCount: 8,
      timeLimit: 0,
      passingRate: 0.5,
      category: 'basic',  // 只出基础题
    },
    medium: {
      questionCount: 12,
      timeLimit: 240,
      passingRate: 0.7,
      category: 'all',
    },
    hard: {
      questionCount: 20,
      timeLimit: 480,
      passingRate: 0.85,
      category: 'advanced',  // 只出高级题
    },
  }}
/>
```

## 🎮 考试流程

### 1. 开始界面

- 显示考试名称和图标
- 选择难度（简单/中等/困难）
- 显示每个难度的题目数量和时间限制

### 2. 答题界面

- 显示进度条（当前题号/总题数）
- 显示倒计时（如果有限时）
- 显示题目内容和选项
- 选择答案后点击"提交答案"
- 即时反馈（正确/错误）
- 1.5秒后自动进入下一题

### 3. 结果界面

- 显示考试结果（通过/未通过）
- 显示星星评分（1-3星）
- 显示统计数据：
  - 正确率
  - 正确/总题数
  - 总用时
- 提供三个操作：
  - 重新考试
  - 查看回顾
  - 返回主页

### 4. 回顾界面

- 逐题展示所有题目
- 标记正确答案和用户答案
- 显示每道题的解析
- 显示每道题的答题用时

## 📊 评分系统

### 星星评分标准

| 星星数 | 正确率要求 | 说明 |
|-------|----------|------|
| ⭐ | >= 及格线 | 通过考试 |
| ⭐⭐ | >= 70% | 良好 |
| ⭐⭐⭐ | >= 90% | 优秀 |

### 奖励系统

考试完成后会自动：

1. **发放星星**：根据评分发放1-3颗星
2. **发放经验值**：每题10XP
3. **记录进度**：保存到本地存储
4. **分析追踪**：记录到分析系统

## 🎨 自定义样式

### 主题配色

每个考试可以自定义主题色：

```typescript
const examConfig: ExamConfig = {
  themeColor: '#FF9800',  // 主色调
  themeGradient: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',  // 背景渐变
  // ...
};
```

### 自定义题目渲染

可以使用 `renderQuestionContent` 自定义题目显示：

```typescript
const examConfig: ExamConfig = {
  renderQuestionContent: (question) => (
    <div>
      <img src={question.imageUrl} alt="题目图片" />
      <h2>{question.question}</h2>
    </div>
  ),
  // ...
};
```

## 🔊 语音支持

### 配置语音播报

```typescript
const examConfig: ExamConfig = {
  speakText: (text) => {
    // 使用默认语音
    defaultSpeakText(text, 'zh-CN');
    
    // 或自定义语音
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  },
};
```

### 英语考试语音

```typescript
speakText: (text) => {
  const hasEnglish = /[A-Z][a-z]+/.test(text);
  const lang = hasEnglish ? 'en-US' : 'zh-CN';
  defaultSpeakText(text, lang);
}
```

## 📈 数据分析

### 自动追踪的事件

1. **exam_start**：考试开始
   - gameId, examId, difficulty, questionCount

2. **exam_answer**：答题记录
   - gameId, questionId, correct, responseTime

3. **exam_complete**：考试完成
   - gameId, examId, difficulty, accuracy, stars, passed, totalTime

### 查看分析数据

通过 `track()` 函数记录的数据可以在分析系统中查看，帮助了解：

- 各难度级别的参与人数
- 各题目的正确率
- 平均答题时间
- 通过率分布

## 💡 最佳实践

### 题库设计

1. **题目数量充足**：建议每个主题至少20-30道题
2. **难度分级**：按知识点或难度给题目分类
3. **选项设计**：干扰项要有迷惑性但不误导
4. **解析详细**：每道题都要有清晰的解析

### 考试配置

1. **难度递进**：简单→中等→困难的题目数量和时限要合理
2. **及格线设置**：简单60%，中等70%，困难80%
3. **时间控制**：单题平均30-60秒
4. **年龄适配**：根据目标年龄段调整难度

### 用户体验

1. **即时反馈**：答题后立即显示对错
2. **鼓励为主**：即使答错也要给予鼓励
3. **允许重试**：提供重新考试的功能
4. **回顾功能**：考后查看答案解析

## 🔧 扩展功能

### 未来可以添加的功能

1. **填空题**：支持用户输入答案
2. **连线题**：拖拽连线配对
3. **排序题**：拖动排序
4. **听力题**：播放音频后答题
5. **错题本**：自动收集错题
6. **间隔重复**：基于遗忘曲线的复习
7. **排行榜**：考试成绩排名
8. **成就系统**：考试相关成就

## 📚 完整示例

查看以下文件获取完整示例：

- [拼音考试](file:///home/luxincheng/github/kids-game/src/games/pinyin/PinyinExam.tsx)
- [数学考试](file:///home/luxincheng/github/kids-game/src/games/math/MathExam.tsx)
- [英语考试](file:///home/luxincheng/github/kids-game/src/games/english/EnglishExam.tsx)
- [故事考试](file:///home/luxincheng/github/kids-game/src/games/stories/StoriesExam.tsx)

## 🎯 总结

通用考试系统提供了一套完整的考试解决方案：

✅ **易于集成**：3步即可为新主题添加考试  
✅ **高度可配置**：难度、时间、评分都可自定义  
✅ **多种题型**：支持选择题、判断题等  
✅ **即时反馈**：答题后立即显示结果  
✅ **语音支持**：自动播报题目和反馈  
✅ **数据分析**：完整的考试数据追踪  
✅ **儿童友好**：大按钮、表情图标、鼓励反馈  

每个主题都可以将考试作为游戏的一部分，帮助孩子检测学习成果！
