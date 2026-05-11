# 激励系统（Reward System）

一个基于心理学原理的游戏化激励系统，让孩子在学习中获得持续的成就感和动力

## 核心理念

激励 = 即时反馈
成长 = 可见进步
坚持 = 稀有奖励
分享 = 社交认同

## 心理学支撑

### 1. 即时强化（Operant Conditioning）
- 每次正确交互提供即时、明确的正向反馈
- 音效、动效、星星/贴纸
- 强化行为并形成快速成就感

### 2. 自我决定理论（Self-Determination Theory）
- 自主选择关卡/角色（Autonomy）
- 即时且恰当的难度调整让孩子体验“我能做到”（Competence）
- 角色、虚拟宠物与家长摘要增加关系与社交反馈（Relatedness）

### 3. 流（Flow）与微目标分解
- 将学习拆成 30–120 秒的微任务
- 任务难度与反馈节奏匹配
- 保持注意力并促成短周期的沉浸体验

### 4. 可变奖惩与稀缺奖励（Variable Reward）
- 大量小奖励（恒定）+ 随机稀有奖励（激发期待）
- 避免单一奖励疲劳

### 5. 多感官沉浸（Multisensory）
- 视觉（鲜明色彩、动效）
- 听觉（角色语音、拟声）
- 触觉（短震动或触感反馈）
- 共同作用，增强记忆编码与趣味性

## 奖励类型

### 基础奖励
- ⭐ 星星：每答对一题获得 1-3 颗
- 🪙 金币：特殊成就奖励
- 🎫 门票：解锁新区域

### 中级奖励
- 🏆 奖杯：完成里程碑
- 📜 证书：完成学习目标
- 🎭 角色：解锁新互动角色

### 高级奖励
- 🐾 宠物：稀有宠物
- 🎒 装备：角色装扮
- 🏰 建筑/设施：解锁新场景

## 激励机制

### 即时激励
- 答对 → 攻击动画 + 音效
- 连对 → 连击奖励
- 升级 → 解锁新岛/新区域

### 连续学习奖励
- 连续1天 → 基础奖励
- 连续3天 → 宝箱
- 连续7天 → 稀有奖励
- 连续30天 → 终极奖励

### 成长体系
- 等级：基于经验值
- 经验值：每完成任务获得
- 成长条：可视化显示进度

## 数据结构

### 奖励记录

```json
{
  "stars": 150,
  "level": 5,
  "xp": 300,
  "streak_days": 7,
  "badges": [
    "first_week",
    "pinyin_master"
  ],
  "pets": [
    "dog"
  ],
  "unlocked_areas": [
    "pinyin_island",
    "math_town"
  ]
}
```

### 成就系统

```json
{
  "achievements": [
    {
      "id": "first_star",
      "name": "第一颗星",
      "description": "获得第一颗星星",
      "icon": "⭐",
      "unlocked": true
    },
    {
      "id": "streak_7",
      "name": "周冠军",
      "description": "连续学习7天",
      "icon": "🏆",
      "unlocked": false
    }
  ]
}
```

## 系统架构

```
Frontend (游戏)
    ↓
Reward Engine (激励逻辑)
    ↓
AI服务层 (个性化推荐)
    ↓
数据层 (用户进度)
```

## 家长端功能

### 学习报告

```json
{
  "learned": 30,
  "mastered": 20,
  "weak_points": ["b", "p"],
  "suggestion": "加强b/p区分",
  "rewards": {
    "total_stars": 150,
    "current_streak": 7,
    "achievements_unlocked": 5
  }
}
```

### 分享功能
- 分享成就到社交媒体
- 生成学习报告图片
- 家长评语功能

## MVP开发优先级

第一阶段（必须完成）
✅ 基础星星奖励系统
✅ 简单成长条
✅ 每日连续奖励
✅ 基本成就系统

第二阶段
宠物系统
装备系统
社交分享

第三阶段
家长报告
AI个性化推荐
高级成就

## 与系统架构集成

### 数据模型
- 使用 `0-DATABASE.md` 中的 `rewards` 集合
- 使用 `0-DATABASE.md` 中的 `achievements` 集合
- 关联 `learning_progress` 数据

### API 端点
- GET /api/rewards/:childId - 获取激励数据
- POST /api/rewards/stars - 添加星星
- POST /api/rewards/unlock-achievement - 解锁成就
- GET /api/achievements - 获取所有成就列表

### 前端文件结构
```
features/reward/
├── components/
│   ├── StarToast.tsx
│   ├── RewardAnimation.tsx
│   ├── ProgressBar.tsx
│   ├── AchievementWall.tsx
│   └── Badge.tsx
├── data/
│   └── achievements.ts
└── hooks/
    └── useReward.ts
```

---

## 成功关键

即时反馈 + 可见成长 + 稀缺奖励 + 社交分享

---

**文档维护记录**：
- v2.0 (2026-04-19)：添加架构集成说明，与 0-DATABASE.md/0-AUTH.md 对齐
- v1.0 (初始版本)：基础框架
