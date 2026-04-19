# 数字小镇（Math Town）

一个基于认知科学 + 游戏化机制 + 自适应学习的数学学习游戏

## 核心理念

数字 = 游戏
数数 = 探索
计算 = 升级
错误 = 进步资源
进阶 = 解锁新建筑

## 目标用户

- 儿童（3-8岁）
    - 注意力短（3-10分钟）
    - 强视觉、互动驱动
- 家长
    - 关注学习效果
    - 愿意为“有效学习”付费

## 数字知识体系设计（必须标准化）

### 内容结构

```json
{
  "numbers": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  "shapes": ["circle", "square", "triangle", "star", "heart"],
  "operations": ["+", "-"],
  "comparisons": [">", "<", "="]
}
```

### 知识点模型（Knowledge Unit）

```json
{
  "id": "number_1",
  "type": "number",
  "content": "1",
  "audio": "1.mp3",
  "example": "一个太阳",
  "emoji": "☀️",
  "difficulty": 1,
  "next_review": 0,
  "error_count": 0,
  "accuracy": 0.0
}
```

## 核心玩法设计（游戏即学习）

### 世界观
玩家进入“数字小镇”
通过学习数字 → 建造建筑 → 收集居民 → 解锁新区域

### 核心循环（最重要）

学习 → 游戏挑战 → 测试 → 复习 → 强化 → 升级

### 游戏机制（核心玩法）

**游戏1：数数盖楼（主玩法）**

玩法：
屏幕出现建筑框架
需要数出星星数量来填充建筑
玩家点击正确数字完成建造

数据结构：

```json
{
  "question": "⭐ ⭐ ⭐ = ?",
  "options": ["2", "3", "4"],
  "answer": "3",
  "building": "超市",
  "emoji": "🏪"
}
```

**游戏2：数字配对（进阶）**

玩法：
显示：数字 + 图案
玩家拖动数字到对应图案

**游戏3：简单加法（核心训练）**

显示：2 + 1 = ?
选择正确答案

**游戏4：形状识别（可选后期）**

辨认不同形状

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
  "error_type": "confuse_3_5"
}
```

输出

{
  "next_difficulty": 2,
  "review_needed": true,
  "focus": "数字 3 和 5 的区分"
}

难度调节规则

正确率 > 85% → 升级
正确率 < 60% → 降级

## 奖励与激励系统（孩子上瘾关键）

### 奖励类型

⭐ 星星（基础货币）
🏪 建筑
👨‍👩‍👧‍👦 居民
🏆 奖杯

### 激励机制

答对 → 建造动画 + 音效
连对 → 连击奖励
升级 → 解锁新区域

### 连续学习奖励

连续3天 → 新建筑蓝图
连续7天 → 稀有建筑

## 家长端系统（商业关键）

### 学习报告

```json
{
  "learned": 10,
  "mastered": 8,
  "weak_points": ["3", "7"],
  "suggestion": "加强数字 3 和 7 的练习"
}
```

### 功能

学习进度
错误分析
学习建议

## MVP开发优先级（非常重要）

第一阶段（必须完成）
✅ 数字数数游戏（核心玩法）
✅ 基础数字库
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
- 使用 `0-DATABASE.md` 中的 `content_math` 集合
- 学习进度存入 `learning_progress.subjects.math`
- 激励数据存入 `rewards`

### API 端点
- GET /api/content/math - 获取数学内容
- POST /api/learning/math/answer - 提交答案
- GET /api/learning/math/review - 获取复习任务

### 前端文件结构
```
features/math/
├── MathTown.tsx
├── components/
│   ├── NumberRecognition.tsx
│   ├── CountingTask.tsx
│   ├── CompareTask.tsx
│   └── OperationTask.tsx
├── data/
│   └── numbers.ts
└── hooks/
    └── useMath.ts
```

---

## 成功关键（直说）

数字 + 游戏 + 复习系统 + 自适应

---

**文档维护记录**：
- v2.0 (2026-04-19)：添加架构集成说明，与 0-DATABASE.md/0-AUTH.md 对齐
- v1.0 (初始版本)：基础框架
