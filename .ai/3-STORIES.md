# 古代小故事（Ancient Stories）

一个基于认知科学 + 游戏化机制 + 自适应学习的传统文化学习游戏

## 核心理念

故事 = 探险
学习 = 阅读
背诵 = 收集
错误 = 进步资源
进阶 = 解锁新篇章

## 目标用户

- 儿童（3-8岁）
    - 注意力短（3-10分钟）
    - 强视觉、互动驱动
- 家长
    - 关注学习效果
    - 愿意为“有效学习”付费

## 内容知识体系设计（必须标准化）

### 内容结构

```json
{
  "age_groups": {
    "3-4": ["神话故事", "简单古诗"],
    "4-5": ["神话故事", "古诗", "简单成语"],
    "5-6": ["神话故事", "古诗", "成语", "孙子兵法入门"],
    "6-8": ["神话故事", "古诗", "成语", "孙子兵法", "阴阳五行"]
  },
  "stories": [
    "盘古开天地",
    "女娲补天",
    "精卫填海",
    "夸父逐日",
    "嫦娥奔月"
  ],
  "poems": [
    "咏鹅",
    "静夜思",
    "春晓",
    "悯农"
  ],
  "idioms": [
    "井底之蛙",
    "守株待兔",
    "拔苗助长",
    "亡羊补牢"
  ]
}
```

### 知识点模型（Knowledge Unit）

```json
{
  "id": "story_pangu",
  "type": "story",
  "content": "盘古开天地",
  "audio": "pangu.mp3",
  "difficulty": 1,
  "min_age": 3,
  "characters": ["盘古", "天地"],
  "summary": "盘古用斧头劈开了混沌的世界",
  "next_review": 0,
  "error_count": 0,
  "accuracy": 0.0
}
```

## 核心玩法设计（游戏即学习）

### 世界观
玩家进入“古代书院”
通过听故事 → 学古诗 → 背成语 → 解锁新朝代

### 核心循环（最重要）

听故事 → 回答问题 → 收集宝物 → 复习 → 强化 → 解锁新篇章

### 游戏机制（核心玩法）

**游戏1：听故事（主玩法）**

玩法：
播放故事音频
屏幕显示画面和字幕
小朋友跟读
回答简单问题

数据结构：

```json
{
  "story_id": "pangu",
  "title": "盘古开天地",
  "pages": [
    {
      "image": "pangu_1.jpg",
      "text": "很久很久以前，天地还是一片混沌",
      "audio": "pangu_1.mp3"
    }
  ],
  "questions": [
    {
      "question": "谁开了天地？",
      "options": ["女娲", "盘古", "夸父"],
      "answer": "盘古"
    }
  ]
}
```

**游戏2：学古诗（进阶）**

玩法：
显示古诗
播放朗读
小朋友跟读
填空游戏

**游戏3：成语接龙（核心训练）**

显示成语
选择正确的下一个成语

**游戏4：传统文化知识问答（可选后期）**

关于古代文化的问答

## 根据年龄调整难度

- 3-4岁：神话故事、简单古诗（2句）
- 4-5岁：神话故事、古诗（4句）、简单成语
- 5-6岁：古诗（8句）、成语、孙子兵法入门
- 6-8岁：古诗、成语、孙子兵法、阴阳五行基础

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
  "error_type": "forget_story_detail"
}
```

输出

{
  "next_difficulty": 2,
  "review_needed": true,
  "focus": "故事细节记忆"
}

难度调节规则

正确率 > 85% → 升级
正确率 < 60% → 降级

## 奖励与激励系统（孩子上瘾关键）

### 奖励类型

⭐ 星星（基础货币）
📜 书签
🎭 古代角色
🏆 成就奖杯

### 激励机制

答对 → 动画 + 音效
连对 → 连击奖励
升级 → 解锁新朝代

### 连续学习奖励

连续3天 → 新故事
连续7天 → 稀有古诗

## 家长端系统（商业关键）

### 学习报告

```json
{
  "stories_learned": 5,
  "poems_mastered": 3,
  "weak_points": ["盘古开天地"],
  "suggestion": "多复习故事细节"
}
```

### 功能

学习进度
错误分析
学习建议

## MVP开发优先级（非常重要）

第一阶段（必须完成）
✅ 故事听读游戏（核心玩法）
✅ 基础故事库
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
- 使用 `0-DATABASE.md` 中的 `content_stories` 集合
- 学习进度存入 `learning_progress.subjects.stories`
- 激励数据存入 `rewards`

### API 端点
- GET /api/content/stories - 获取故事内容
- POST /api/learning/stories/answer - 提交答案
- GET /api/learning/stories/review - 获取复习任务

### 前端文件结构
```
features/stories/
├── StoryKingdom.tsx
├── components/
│   ├── StoryReader.tsx
│   ├── StoryQuiz.tsx
│   └── PoemLearn.tsx
├── data/
│   └── stories.ts
└── hooks/
    └── useStories.ts
```

---

## 成功关键（直说）

故事 + 游戏 + 复习系统 + 自适应

---

**文档维护记录**：
- v2.0 (2026-04-19)：添加架构集成说明，与 0-DATABASE.md/0-AUTH.md 对齐
- v1.0 (初始版本)：基础框架
