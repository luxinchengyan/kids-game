# 拼音冒险岛（Pinyin Adventure Island）

一个基于认知科学 + 游戏化机制 + 自适应学习的拼音学习游戏

## 核心理念

学习 = 游戏
复习 = 升级
错误 = 进步资源
进阶 = 下一步学习内容

## 目标用户

- 儿童（3-8岁）
    - 注意力短（3-10分钟）
    - 强视觉、互动驱动
- 家长
    - 关注学习效果
    - 愿意为“有效学习”付费

## 核心系统架构


Frontend (Web)
├── 游戏界面（Canvas/WebGL）
├── 学习交互UI
├── 音频播放系统

Backend
├── 用户系统
├── 学习引擎（核心）
├── 复习调度系统
├── 数据分析

AI Layer
├── 难度调整模型
├── 错误分析模型

## 拼音知识体系设计（必须标准化）

### 内容结构

```json
{
  "initials": ["b","p","m","f","d","t","n","l","g","k","h"],
  "finals": ["a","o","e","i","u","ü","ai","ei","ao","ou"],
  "syllables": ["ba","bo","ma","mi"]
}
```

### 知识点模型（Knowledge Unit）

```josn
{
  "id": "pinyin_b",
  "type": "initial",
  "content": "b",
  "audio": "b.mp3",
  "difficulty": 1,
  "next_review": 0,
  "error_count": 0,
  "accuracy": 0.0
}
```

## 核心玩法设计（游戏即学习）

### 世界观
玩家进入“拼音冒险岛”
通过学习拼音 → 解锁岛屿 → 打败怪物 → 收集奖励

### 核心循环（最重要）

学习 → 游戏挑战 → 测试 → 复习 → 强化 → 升级

### 游戏机制（核心玩法）

**游戏1：拼音打怪（主玩法）**

玩法：
播放声音：/b/
屏幕出现多个字母：b / d / p
玩家点击正确选项攻击怪物

数据结构：

```json
{
  "question": "audio_b.mp3",
  "options": ["b","d","p"],
  "answer": "b"
}
```

**游戏2：拼音拼读（进阶）**

玩法：
显示：b + a
播放：/ba/
玩家拖动组合

**游戏3：听音识别（核心训练）**

播放拼音
选择正确拼写

**游戏4：书写模拟（可选后期）**

手势描写拼音

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
  "error_type": "confusion_b_p"
}
```

输出

{
  "next_difficulty": 2,
  "review_needed": true,
  "focus": "b vs p"
}

难度调节规则

正确率 > 85% → 升级
正确率 < 60% → 降级

## 奖励与激励系统（孩子上瘾关键）

### 奖励类型

⭐ 星星（基础货币）
🪙 金币
🐾 宠物
🎒 装备

### 激励机制

答对 → 攻击动画 + 音效
连对 → 连击奖励
升级 → 解锁新岛

### 连续学习奖励

连续3天 → 宝箱
连续7天 → 稀有奖励

## 家长端系统（商业关键）

### 学习报告


```json
{
  "learned": 30,
  "mastered": 20,
  "weak_points": ["b","p"],
  "suggestion": "加强b/p区分"
```

### 功能

学习进度
错误分析
学习建议

### 前端技术方案（AI生成友好）

推荐技术栈
Frontend:
- React / Next.js
- TailwindCSS
- Phaser.js（游戏引擎）

Backend:
- Node.js (NestJS)
- MongoDB

AI:
- Python (FastAPI)

## 核心API设计

### 获取题目

GET /api/question

```json
{
  "question_id": 1,
  "type": "audio_choice",
  "audio": "b.mp3",
  "options": ["b","d","p"],
  "answer": "b"
}
```

### 提交答案

POST /api/answer

```json
{
  "question_id": 1,
  "user_answer": "b",
  "response_time": 1.5
}
```

### 获取复习任务

GET /api/review

## MVP开发优先级（非常重要）

第一阶段（必须完成）
✅ 拼音打怪游戏（核心玩法）
✅ 基础拼音库
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
- 使用 `0-DATABASE.md` 中的 `content_pinyin` 集合
- 学习进度存入 `learning_progress.subjects.pinyin`
- 激励数据存入 `rewards`

### API 端点
- GET /api/content/pinyin - 获取拼音内容
- POST /api/learning/pinyin/answer - 提交答案
- GET /api/learning/pinyin/review - 获取复习任务

### 前端文件结构
```
features/pinyin/
├── PinyinIsland.tsx
├── components/
│   ├── InitialSprite.tsx
│   ├── ClickListenTask.tsx
│   ├── DragCombineTask.tsx
│   └── ChooseTask.tsx
├── data/
│   └── initials.ts
└── hooks/
    └── usePinyin.ts
```

---

## 成功关键（直说）

拼音 + 游戏 + 复习系统 + 自适应

---

**文档维护记录**：
- v2.0 (2026-04-19)：添加架构集成说明，与 0-DATABASE.md/0-AUTH.md 对齐
- v1.0 (初始版本)：基础框架

