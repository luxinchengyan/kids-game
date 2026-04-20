# 数据库设计（MongoDB Data Models）
# 产品名称:童梦神舟 · 智趣成长
# 版本：v1.0

---

## 1. 设计原则

**文档型数据库设计，灵活 Schema，按业务领域分集合。**

- 集合命名：清晰易懂，查询优化优先；缓存热点数据，遵循 COPPA/GDPR 数据最小化。

---

## 2. 数据库架构

```
kids-game (Database)
├── parents          # 家长用户（0-AUTH.md）
├── children         # 孩子用户（0-AUTH.md）
├── sessions         # 会话（0-AUTH.md）
├── learning_progress # 学习进度（核心！）
├── rewards          # 激励数据
├── achievements      # 激励数据
├── content_pinyin      # 拼音内容库
├── content_math      # 数学内容库
├── content_english   # 英语内容库
├── content_stories   # 故事内容库
└── audit_logs      # 审计日志
```

---

## 3. 核心数据模型

### 3.1 parents（家长用户）
详见 0-AUTH.md，这里补充索引策略：email/phone 唯一索引

### 3.2 children（孩子用户）
详见 0-AUTH.md，这里补充索引策略：parentId 索引

---

### 3.3 learning_progress（学习进度 - 核心集合）
```typescript
import { ObjectId } from 'mongodb';

interface LearningProgress {
  _id: ObjectId;
  childId: ObjectId;        // 索引
  parentId: ObjectId;
  
  // 总体统计
  totalLearningMinutes: number;
  totalTasksCompleted: number;
  totalCorrect: number;
  totalWrong: number;
  overallAccuracy: number;
  
  // 今日数据
  today: {
    date: Date;
    learningMinutes: number;
    tasksCompleted: number;
    correct: number;
    wrong: number;
  };
  
  // 各学科进度
  subjects: {
    pinyin: SubjectProgress;
    math: SubjectProgress;
    english: SubjectProgress;
    stories: SubjectProgress;
  };
  
  // 每日 streak
  streakDays: number;
  lastActiveDate: Date;
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
}

interface SubjectProgress {
  started: boolean;
  level: number;
  totalMinutes: number;
  tasksCompleted: number;
  correct: number;
  wrong: number;
  accuracy: number;
  
  // 知识点掌握度
  knowledgeUnits: KnowledgeUnitProgress[];
  
  // 复习队列
  reviewQueue: ReviewItem[];
  
  unlockedAreas: string[];
}

interface KnowledgeUnitProgress {
  id: string;              // 知识点 ID
  type: 'pinyin' | 'math' | 'english' | 'story';
  content: string;
  
  // 学习数据
  learnedAt?: Date;
  reviewCount: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  
  // 艾宾浩斯遗忘曲线
  nextReviewAt?: Date;
  interval: number;           // 复习间隔（天）
  easinessFactor: number;    // 难度系数
  
  // AI 自适应
  difficulty: number;          // 当前难度
  masteryLevel: number;      // 掌握度 (0-1)
}

interface ReviewItem {
  knowledgeUnitId: string;
  priority: number;
  scheduledAt: Date;
}
```

**索引策略**：
- `{ childId: 1 }`
- `{ parentId: 1 }`
- `{ "subjects.pinyin.knowledgeUnits.nextReviewAt: 1 }`（复习查询

---

### 3.4 rewards（激励数据）
```typescript
interface Rewards {
  _id: ObjectId;
  childId: ObjectId;
  parentId: ObjectId;
  
  // 基础货币
  stars: number;
  coins: number;
  
  // 等级与经验
  level: number;
  xp: number;
  xpToNextLevel: number;
  
  // 连续签到
  streakDays: number;
  lastCheckInDate?: Date;
  
  // 收集物
  collectedStickers: string[];
  collectedBadges: string[];
  unlockedCharacters: string[];
  unlockedPets: string[];
  unlockedAreas: string[];
  
  // 宠物
  currentPetId?: string;
  pets: Pet[];
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
}

interface Pet {
  id: string;
  name: string;
  level: number;
  xp: number;
  happiness: number;       // 开心度 (0-100)
  hunger: number;         // 饥饿度 (0-100)
  lastFedAt?: Date;
  lastPlayedAt?: Date;
}
```

**索引策略**：
- `{ childId: 1 }`（唯一）
- `{ parentId: 1 }`

---

### 3.5 achievements（成就系统）
```typescript
interface Achievement {
  _id: ObjectId;
  id: string;              // 成就唯一标识，如 'first_star', 'streak_7'
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'learning' | 'streak' | 'reward' | 'special';
  
  // 解锁条件
  condition: {
    type: 'task_count' | 'streak_days' | 'accuracy' | 'custom';
    value: number;
    subject?: string;
  };
  
  // 奖励
  reward: {
    stars?: number;
    coins?: number;
    badge?: string;
    character?: string;
  };
  
  // 元数据
  createdAt: Date;
}

interface UserAchievement {
  _id: ObjectId;
  childId: ObjectId;
  achievementId: string;
  unlockedAt: Date;
  progress: number;          // 进度 (0-1)
}
```

**索引策略**：
- `achievements`: `{ id: 1 }`（唯一）
- `user_achievements`: `{ childId: 1, achievementId: 1 }`（唯一复合索引

---

### 3.6 content_pinyin（拼音内容库）
```typescript
interface PinyinContent {
  _id: ObjectId;
  id: string;
  type: 'initial' | 'final' | 'syllable';
  
  // 内容
  content: string;            // 如 'b', 'a', 'ba'
  display: string;            // 带声调（如 'bā'
  audioUrl?: string;
  
  // 精灵角色
  sprite?: {
    name: string;           // 如 '波波怪
    emoji?: string;
    description?: string;
  };
  
  // 难度与分级
  difficulty: number;          // 1-5
  minAge: number;
  maxAge: number;
  
  // 关联
  relatedInitials?: string[];
  relatedFinals?: string[];
  similarItems?: string[];    // 易混淆项
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 3.7 content_math（数学内容库）
```typescript
interface MathContent {
  _id: ObjectId;
  id: string;
  type: 'number' | 'shape' | 'operation' | 'comparison';
  
  content: string;
  display: string;
  emoji?: string;
  example?: string;
  audioUrl?: string;
  
  difficulty: number;
  minAge: number;
  maxAge: number;
  
  similarItems?: string[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 3.8 content_english（英语内容库）
```typescript
interface EnglishContent {
  _id: ObjectId;
  id: string;
  type: 'word' | 'phrase' | 'dialogue';
  category: 'places' | 'objects' | 'family' | 'animals' | 'numbers' | 'colors';
  
  content: string;
  display: string;
  chineseMeaning: string;
  emoji?: string;
  imageUrl?: string;
  audioUrl?: string;
  
  difficulty: number;
  minAge: number;
  maxAge: number;
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 3.9 content_stories（故事内容库）
```typescript
interface StoryContent {
  _id: ObjectId;
  id: string;
  type: 'myth' | 'poem' | 'idiom' | 'history';
  
  title: string;
  titlePinyin?: string;
  
  // 内容
  pages: StoryPage[];
  
  // 问答
  questions: StoryQuestion[];
  
  // 分级
  difficulty: number;
  minAge: number;
  maxAge: number;
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
}

interface StoryPage {
  pageNumber: number;
  text: string;
  textPinyin?: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface StoryQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}
```

---

### 3.10 audit_logs（审计日志 - 安全合规）
```typescript
interface AuditLog {
  _id: ObjectId;
  timestamp: Date;
  eventType: 'login' | 'logout' | 'data_export' | 'data_delete' | 'settings_change';
  parentId?: ObjectId;
  childId?: ObjectId;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}
```

---

## 4. MongoDB 配置

### 4.1 连接配置
```typescript
// backend/src/config/database.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kids-game';

export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI);
};
```

### 4.2 Mongoose Schemas
见 `backend/src/schemas/`
---

## 5. API 服务层

### 5.1 DatabaseService 接口
```typescript
// src/services/db.ts
export interface DatabaseService {
  // Learning Progress
  getLearningProgress(childId: string): Promise<LearningProgress>;
  updateLearningProgress(childId: string, data: Partial<LearningProgress>): Promise<void>;
  recordTaskComplete(childId: string, subject: string, knowledgeUnitId: string, correct: boolean): Promise<void>;
  
  // Rewards
  getRewards(childId: string): Promise<Rewards>;
  updateRewards(childId: string, data: Partial<Rewards>): Promise<void>;
  addStars(childId: string, amount: number): Promise<void>;
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(childId: string): Promise<UserAchievement[]>;
  unlockAchievement(childId: string, achievementId: string): Promise<void>;
  
  // Content
  getPinyinContent(ids?: string[]): Promise<PinyinContent[]>;
  getMathContent(ids?: string[]): Promise<MathContent[]>;
  getEnglishContent(category?: string): Promise<EnglishContent[]>;
  getStoryContent(ids?: string[]): Promise<StoryContent[]>;
}
```

### 5.2 MVP localStorage 实现
```typescript
// src/services/db.ts (MVP - localStorage 版本)
export class LocalDatabaseService implements DatabaseService {
  // 使用 localStorage 模拟
  // 预留接口，Phase 3 无缝切换到 MongoDB
}
```

---

## 6. 数据迁移脚本（localStorage → MongoDB）
```typescript
// 迁移 localStorage → MongoDB
// Phase 3 实现
```

---

## 7. 缓存策略（Redis）
热点数据缓存：
- 内容库（content_*）
- 学习进度缓存（5分钟 TTL）
- Session 缓存

---

## 8. 备份与恢复
- 每日自动备份
- 保留 30 天历史备份
- 加密备份存储

---

**文档维护记录**：
- v1.0 (2026-04-19)：初始版本，完整数据模型设计，预留 MVP localStorage 接口

