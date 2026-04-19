# 英语游乐园（English Amusement Park）

一个基于认知科学 + 游戏化机制 + 自适应学习的英语学习游戏

## 核心理念

英语 = 游戏
单词 = 探险
对话 = 互动
错误 = 进步资源
进阶 = 解锁新游乐设施

## 目标用户

- 儿童（3-8岁）
    - 注意力短（3-10分钟）
    - 强视觉、互动驱动
- 家长
    - 关注学习效果
    - 愿意为“有效学习”付费

## 英语知识体系设计（必须标准化）

### 内容结构

```json
{
  "categories": {
    "places": ["park", "house", "school", "street"],
    "objects": ["door", "table", "chair", "stairs"],
    "family": ["mom", "dad", "brother", "sister"],
    "animals": ["cat", "dog", "bird", "fish"],
    "numbers": ["one", "two", "three", "four", "five"],
    "colors": ["red", "blue", "green", "yellow", "pink"]
  }
}
```

### 知识点模型（Knowledge Unit）

```json
{
  "id": "word_cat",
  "type": "word",
  "content": "cat",
  "audio": "cat.mp3",
  "example": "猫咪",
  "emoji": "🐱",
  "category": "animals",
  "difficulty": 1,
  "next_review": 0,
  "error_count": 0,
  "accuracy": 0.0
}
```

## 核心玩法设计（游戏即学习）

### 世界观
玩家进入“英语游乐园”
通过学习单词 → 玩游乐设施 → 收集角色 → 解锁新区域

### 核心循环（最重要）

学习 → 游戏挑战 → 测试 → 复习 → 强化 → 升级

### 游戏机制（核心玩法）

**游戏1：单词配对（主玩法）**

玩法：
显示图片
需要找到对应的英语单词
玩家点击正确选项

数据结构：

```json
{
  "question": "🐱 = ?",
  "options": ["cat", "dog", "bird"],
  "answer": "cat",
  "category": "animals"
}
```

**游戏2：场景探索（进阶）**

玩法：
进入不同场景（公园、房子、学校）
探索并学习场景中的单词

**游戏3：简单对话（核心训练）**

显示简单对话
填空完成对话

**游戏4：字母学习（可选后期）**

学习英文字母

## 复习系统（核心差异化）

复习时间点：

第一次学习后：
10分钟 → 1天 → 3天 → 7天

复习算法（伪代码）

```bash
def schedule_review(item):
    if item.accuracy > 0.9:
        interval = item.interval * 2
    else:
        interval = 1

    item.next_review = now + interval
```

优先级机制

优先级 = 错误次数 + 时间间隔 + 低正确率

## 自适应学习系统（AI核心）

输入数据

```json
{
  "accuracy": 0.7,
  "response_time": 2.3,
  "error_type": "confuse_cat_dog"
}
```

输出

{
  "next_difficulty": 2,
  "review_needed": true,
  "focus": "cat 和 dog 的区分"
}

难度调节规则

正确率 > 85% → 升级
正确率 < 60% → 降级

## 奖励与激励系统（孩子上瘾关键）

### 奖励类型

⭐ 星星（基础货币）
🎪 游乐设施门票
🎭 英语角色
🏆 奖杯

### 激励机制

答对 → 动画 + 音效
连对 → 连击奖励
升级 → 解锁新区域

### 连续学习奖励

连续3天 → 新游乐设施
连续7天 → 稀有角色

## 家长端系统（商业关键）

### 学习报告

```json
{
  "words_learned": 30,
  "categories_mastered": 3,
  "weak_points": ["cat", "dog"],
  "suggestion": "加强动物类单词练习"
}
```

### 功能

学习进度
错误分析
学习建议

## MVP开发优先级（非常重要）

第一阶段（必须完成）
✅ 单词配对游戏（核心玩法）
✅ 基础单词库
✅ 答题系统
✅ 简单复习机制

第二阶段
自适应系统
奖励系统
用户系统

第三阶段
家长端
AI分析
多游戏模式

## 与系统架构集成

### 数据模型
- 使用 `0-DATABASE.md` 中的 `content_english` 集合
- 学习进度存入 `learning_progress.subjects.english`
- 激励数据存入 `rewards`

### API 端点
- GET /api/content/english - 获取英语内容
- POST /api/learning/english/answer - 提交答案
- GET /api/learning/english/review - 获取复习任务

### 前端文件结构
```
features/english/
├── EnglishPark.tsx
├── components/
│   ├── WordMatchTask.tsx
│   ├── SceneExplore.tsx
│   └── DialogueTask.tsx
├── data/
│   └── words.ts
└── hooks/
    └── useEnglish.ts
```

---

## 成功关键（直说）

英语 + 游戏 + 复习系统 + 自适应

---

**文档维护记录**：
- v2.0 (2026-04-19)：添加架构集成说明，与 0-DATABASE.md/0-AUTH.md 对齐
- v1.0 (初始版本)：基础框架
