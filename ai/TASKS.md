# Tasks
# 产品名称：童梦乐园 · 智趣成长
# 版本：v2.0

---

## 任务分类与优先级

| 优先级 | 说明 | 处理方式 |
|-------|-----|---------|
| P0 | 阻塞性，必须完成 | 最高优先级，立即处理 |
| P1 | 重要，高价值 | 高优先级，尽快处理 |
| P2 | 一般，优化项 | 中优先级，有空处理 |
| P3 | 低优先级，未来 | 低优先级，排入未来 |

---

## Phase 0：基础设施（P0 - 必须先完成）

### 0.1 项目初始化
- **描述**：使用 Vite + React + TypeScript 初始化项目，配置基础工具链
- **输出**：
  - `/frontend/package.json`（包含所有基础依赖）
  - `/frontend/vite.config.ts`
  - `/frontend/tsconfig.json`（strict: true）
  - `/frontend/.eslintrc.cjs`
  - `/frontend/.prettierrc`
  - `/frontend/src/main.tsx`
  - `/frontend/src/App.tsx`
- **验收标准**：`npm run dev` 能正常启动，看到 Hello World
- **依赖**：无

### 0.2 设计系统落地
- **描述**：将 DESIGN.md 中的设计令牌实现为 CSS 变量，创建基础组件库
- **输出**：
  - `/frontend/src/styles/tokens.css`（设计令牌：颜色、字体、间距、圆角等）
  - `/frontend/src/styles/global.css`（全局样式、重置）
  - `/frontend/src/components/Button/Button.tsx`（主按钮、次按钮、图标按钮）
  - `/frontend/src/components/Card/Card.tsx`
  - `/frontend/src/components/Modal/Modal.tsx`
- **验收标准**：
  - 所有 DESIGN.md 中的设计令牌都已实现
  - 基础组件在 Storybook 中可演示
- **依赖**：0.1

### 0.3 路由架构
- **描述**：配置 React Router v6，搭建页面骨架
- **输出**：
  - `/frontend/src/router/index.tsx`
  - 页面占位组件：
    - `/frontend/src/features/home/Home.tsx`
    - `/frontend/src/features/pinyin/PinyinIsland.tsx`
    - `/frontend/src/features/math/MathTown.tsx`
    - `/frontend/src/features/english/EnglishPark.tsx`
    - `/frontend/src/features/stories/StoryKingdom.tsx`
    - `/frontend/src/features/parent/ParentCenter.tsx`
- **验收标准**：
  - 路由配置完整
  - 各页面可通过路由访问
- **依赖**：0.1

### 0.4 状态管理初始化
- **描述**：初始化 Zustand stores，定义状态结构
- **输出**：
  - `/frontend/src/stores/useUserStore.ts`（用户状态）
  - `/frontend/src/stores/useGameStore.ts`（游戏状态）
  - `/frontend/src/stores/useRewardStore.ts`（激励状态）
  - `/frontend/src/stores/useUIStore.ts`（UI 状态）
- **验收标准**：
  - Stores 结构定义完整
  - 基本的 get/set 方法可用
- **依赖**：0.1

### 0.5 用户认证预留（0-AUTH.md 落地）
- **描述**：创建 Auth Service 接口，前端 mock 实现
- **输出**：
  - `/frontend/src/types/auth.ts`（认证相关类型定义）
  - `/frontend/src/services/auth.ts`（AuthService 接口 + mock 实现）
  - `/frontend/src/features/auth/Login.tsx`（占位）
  - `/frontend/src/features/auth/Register.tsx`（占位）
- **验收标准**：
  - 接口定义完整
  - mock 实现可正常工作
- **依赖**：0.1, 0.4

### 0.6 数据持久化预留（0-DATABASE.md 落地）
- **描述**：创建 Database Service 接口，localStorage 实现
- **输出**：
  - `/frontend/src/types/database.ts`（数据模型类型定义）
  - `/frontend/src/services/db.ts`（DatabaseService 接口 + localStorage 实现）
  - `/frontend/src/lib/storage.ts`（localStorage 封装）
- **验收标准**：
  - 接口定义完整
  - localStorage 实现可正常读写
- **依赖**：0.1, 0.4

---

## Phase 1：核心 MVP（P0 - 必须完成）

### 1.1 首页大厅
- **描述**：实现首页，包含角色选择、每日签到、学习岛入口
- **输出**：
  - `/frontend/src/features/home/Home.tsx`
  - `/frontend/src/features/home/components/CharacterSelect.tsx`
  - `/frontend/src/features/home/components/DailyCheckIn.tsx`
  - `/frontend/src/features/home/components/LearningIslandCard.tsx`
- **验收标准**：
  - 角色选择可用
  - 每日签到功能完整
  - 4 个学习岛入口可点击
  - 符合 DESIGN.md 规范
- **依赖**：0.x

### 1.2 拼音冒险岛 MVP（1-PINYIN.md 落地）
- **描述**：实现拼音冒险岛基础功能：声母精灵展示、点击听音、基础跟读
- **输出**：
  - `/frontend/src/features/pinyin/PinyinIsland.tsx`
  - `/frontend/src/features/pinyin/components/InitialSprite.tsx`（声母精灵）
  - `/frontend/src/features/pinyin/components/ClickListenTask.tsx`（点击听音）
  - `/frontend/src/features/pinyin/data/initials.ts`（声母数据）
- **验收标准**：
  - 23 个声母精灵展示完整
  - 点击精灵可播放发音
  - 基础跟读交互可用
  - 符合 DESIGN.md 规范
- **依赖**：0.x, 1.5（音频系统）

### 1.3 数字小镇 MVP（2-MATH.md 落地）
- **描述**：实现数字小镇基础功能：1-10 数字认知、数数量、比大小
- **输出**：
  - `/frontend/src/features/math/MathTown.tsx`
  - `/frontend/src/features/math/components/NumberRecognition.tsx`
  - `/frontend/src/features/math/components/CountingTask.tsx`
  - `/frontend/src/features/math/components/CompareTask.tsx`
  - `/frontend/src/features/math/data/numbers.ts`（数字数据）
- **验收标准**：
  - 1-10 数字认知完整
  - 数数量游戏可用
  - 比大小游戏可用
  - 符合 DESIGN.md 规范
- **依赖**：0.x, 1.5（音频系统）

### 1.4 基础激励系统（5-REWARD.md 落地）
- **描述**：实现基础激励功能：星星收集、简单动画反馈
- **输出**：
  - `/frontend/src/features/reward/components/StarToast.tsx`
  - `/frontend/src/features/reward/components/RewardAnimation.tsx`
  - `/frontend/src/features/reward/components/ProgressBar.tsx`
  - 与 useRewardStore 集成
- **验收标准**：
  - 答对时显示星星动画
  - 成长条正确更新
  - 符合 DESIGN.md 动效规范
- **依赖**：0.x, 1.2-1.3

### 1.5 音频系统
- **描述**：实现音频播放抽象，支持音频文件优先，回退到 TTS
- **输出**：
  - `/frontend/src/lib/audio.ts`
  - `/frontend/public/audio/`（占位目录）
  - `/frontend/src/hooks/useAudio.ts`
- **验收标准**：
  - 音频文件存在时播放文件
  - 音频文件不存在时使用 Web Speech API TTS
  - 播放延迟 < 200ms
- **依赖**：0.x

### 1.6 家长中心基础版
- **描述**：实现家长中心基础功能：学习记录、简单统计
- **输出**：
  - `/frontend/src/features/parent/ParentCenter.tsx`
  - `/frontend/src/features/parent/components/LearningRecord.tsx`
  - `/frontend/src/features/parent/components/SimpleStats.tsx`
- **验收标准**：
  - 学习记录显示正确
  - 简单统计（时长、完成数）正确
  - 符合 DESIGN.md 规范
- **依赖**：0.x, 1.4（激励系统）

---

## Phase 2：功能完善（P1 - 高优先级）

### 2.1 英语游乐园 MVP（4-ENGLISH.md 落地）
- **描述**：实现英语游乐园基础功能：单词配对、基础词库
- **输出**：
  - `/frontend/src/features/english/EnglishPark.tsx`
  - `/frontend/src/features/english/components/WordMatchTask.tsx`
  - `/frontend/src/features/english/data/words.ts`（单词数据）
- **验收标准**：
  - 基础词库完整（动物、颜色、数字等）
  - 单词配对游戏可用
  - 符合 DESIGN.md 规范
- **依赖**：Phase 1, 1.5（音频系统）

### 2.2 故事王国 MVP（3-STORIES.md 落地）
- **描述**：实现故事王国基础功能：故事听读、简单问答
- **输出**：
  - `/frontend/src/features/stories/StoryKingdom.tsx`
  - `/frontend/src/features/stories/components/StoryReader.tsx`
  - `/frontend/src/features/stories/components/StoryQuiz.tsx`
  - `/frontend/src/features/stories/data/stories.ts`（故事数据）
- **验收标准**：
  - 基础故事库完整（盘古开天地等）
  - 故事听读可用
  - 简单问答可用
  - 符合 DESIGN.md 规范
- **依赖**：Phase 1, 1.5（音频系统）

### 2.3 角色与宠物系统
- **描述**：实现虚拟伙伴和宠物养成系统
- **输出**：
  - `/frontend/src/features/characters/CharacterAvatar.tsx`
  - `/frontend/src/features/characters/Pet.tsx`
  - `/frontend/src/features/characters/data/characters.ts`（角色数据）
  - `/frontend/src/features/characters/data/pets.ts`（宠物数据）
  - 与 useUserStore 集成
- **验收标准**：
  - 5 个可选角色（艾莎、阿奇、佩奇、哆啦A梦、米奇）
  - 宠物养成（喂食、玩耍）可用
  - 符合 DESIGN.md 规范
- **依赖**：Phase 1

### 2.4 成就与徽章系统（5-REWARD.md 升级）
- **描述**：实现成就墙和徽章收集
- **输出**：
  - `/frontend/src/features/reward/components/AchievementWall.tsx`
  - `/frontend/src/features/reward/components/Badge.tsx`
  - `/frontend/src/features/reward/data/achievements.ts`（成就数据）
  - 与 useRewardStore 集成
- **验收标准**：
  - 成就墙展示完整
  - 徽章解锁逻辑正确
  - 符合 DESIGN.md 规范
- **依赖**：Phase 1, 2.1-2.3

### 2.5 拖拽引擎完善
- **描述**：完善拖拽配对功能，支持自动吸附、容错、撤销
- **输出**：
  - `/frontend/src/lib/dragdrop.ts`
  - `/frontend/src/hooks/useDragDrop.ts`
  - 各学习岛集成使用
- **验收标准**：
  - 拖拽流畅，60fps
  - 自动吸附正确
  - 容错范围 ±20dp
  - 可撤销一步操作
- **依赖**：Phase 1

### 2.6 微任务模板库
- **描述**：创建三种标准微任务模板：点击、拖拽、选择
- **输出**：
  - `/frontend/src/components/MicroTask/ClickTask.tsx`
  - `/frontend/src/components/MicroTask/DragDropTask.tsx`
  - `/frontend/src/components/MicroTask/ChoiceTask.tsx`
  - Storybook stories
- **验收标准**：
  - 三种模板都可用
  - 可配置性强
  - 符合 DESIGN.md 规范
- **依赖**：Phase 1, 2.5

---

## Phase 3：AI 赋能与后端（P1 - 高优先级）

### 3.1 用户认证系统（0-AUTH.md 完整落地）
- **描述**：实现完整的注册/登录系统（家长端）
- **输出**：
  - 后端：`/backend/src/modules/auth/`
  - 前端：`/frontend/src/features/auth/Login.tsx`、`Register.tsx`
  - JWT 认证集成
  - 孩子用户切换功能
- **验收标准**：
  - 家长注册/登录完整
  - 孩子用户切换可用
  - 安全（密码哈希、JWT）
- **依赖**：Phase 2, 3.2

### 3.2 MongoDB 数据持久化（0-DATABASE.md 完整落地）
- **描述**：实现完整的 MongoDB 数据持久化
- **输出**：
  - 后端：`/backend/src/schemas/`（Mongoose schemas）
  - 后端：`/backend/src/modules/`（各业务模块）
  - 前端：DatabaseService MongoDB 实现
  - 数据迁移脚本（localStorage → MongoDB）
- **验收标准**：
  - 所有数据模型完整（User、LearningProgress、Reward 等）
  - CRUD 操作正常
  - 数据迁移脚本可用
- **依赖**：Phase 2

### 3.3 后端 API 服务
- **描述**：实现 NestJS 后端 + RESTful API
- **输出**：
  - `/backend/src/main.ts`
  - `/backend/src/modules/`（用户、学习、内容、激励、家长模块）
  - `/backend/src/common/`（过滤器、拦截器、装饰器）
  - OpenAPI 文档
- **验收标准**：
  - 所有 API 端点完整
  - OpenAPI 文档自动生成
  - 错误处理完善
- **依赖**：3.1-3.2

### 3.4 AI 语音识别
- **描述**：实现跟读发音评估
- **输出**：
  - `/ai-services/speech/`
  - 语音识别 API
  - 发音准确度评分（完美/不错/再试一次）
  - 前端集成
- **验收标准**：
  - 语音识别准确度达标
  - 评分逻辑合理
  - 延迟可接受
- **依赖**：3.3

### 3.5 自适应学习引擎
- **描述**：实现基于遗忘曲线的复习调度
- **输出**：
  - `/ai-services/adaptive/`
  - 复习调度算法（艾宾浩斯）
  - 自适应难度调整
  - 前端集成
- **验收标准**：
  - 复习间隔正确（24h/3d/7d/14d/30d）
  - 难度调整逻辑正确
  - 学习效果可测量
- **依赖**：3.3

### 3.6 家长中心完整版
- **描述**：实现详细报告、数据可视化、家庭互动
- **输出**：
  - `/frontend/src/features/parent/components/DetailedReport.tsx`
  - `/frontend/src/features/parent/components/ProgressChart.tsx`
  - `/frontend/src/features/parent/components/FamilyActivities.tsx`
- **验收标准**：
  - 详细报告完整
  - 数据可视化清晰
  - 家庭互动建议可用
- **依赖**：3.3

---

## Phase 4：Polish & 发布（P2 - 中优先级）

### 4.1 性能优化
- **描述**：优化性能，Lighthouse ≥ 90
- **输出**：
  - 代码分割
  - 图片优化
  - 懒加载
  - 性能报告
- **验收标准**：
  - Lighthouse 评分 ≥ 90
  - 首屏加载 < 2s（3G）
  - 动画 60fps
- **依赖**：Phase 3

### 4.2 可访问性完善
- **描述**：完善可访问性，WCAG AA 达标
- **输出**：
  - 语义化 HTML 完善
  - 键盘导航完善
  - 颜色对比度检查
  - 可访问性测试报告
- **验收标准**：
  - WCAG AA 达标
  - 屏幕阅读器可用
  - 键盘全操作可用
- **依赖**：Phase 3

### 4.3 完整测试
- **描述**：单元测试 + E2E 测试 + 儿童可用性测试
- **输出**：
  - `/frontend/tests/unit/`（单元测试）
  - `/frontend/tests/e2e/`（E2E 测试）
  - 儿童可用性测试报告
- **验收标准**：
  - 单元测试覆盖 ≥ 80%
  - E2E 测试覆盖关键路径
  - 儿童可用性测试通过
- **依赖**：Phase 3

### 4.4 打包与部署
- **描述**：生产构建、CI/CD、部署
- **输出**：
  - GitHub Actions workflows
  - 生产构建配置
  - 部署文档
- **验收标准**：
  - CI/CD 正常工作
  - 生产构建成功
  - 线上版本可访问
- **依赖**：4.1-4.3

---

## 里程碑验收清单

### M0（基础设施完成）
- [ ] 0.1 项目初始化完成
- [ ] 0.2 设计系统落地完成
- [ ] 0.3 路由架构完成
- [ ] 0.4 状态管理初始化完成
- [ ] 0.5 Auth 预留完成
- [ ] 0.6 DB 预留完成

### M1（核心 MVP 完成）
- [ ] 1.1 首页大厅完成
- [ ] 1.2 拼音冒险岛 MVP 完成
- [ ] 1.3 数字小镇 MVP 完成
- [ ] 1.4 基础激励系统完成
- [ ] 1.5 音频系统完成
- [ ] 1.6 家长中心基础版完成

### M2（功能完善完成）
- [ ] 2.1 英语游乐园 MVP 完成
- [ ] 2.2 故事王国 MVP 完成
- [ ] 2.3 角色与宠物系统完成
- [ ] 2.4 成就与徽章系统完成
- [ ] 2.5 拖拽引擎完善完成
- [ ] 2.6 微任务模板库完成

### M3（后端与 AI 完成）
- [ ] 3.1 用户认证系统完成
- [ ] 3.2 MongoDB 数据持久化完成
- [ ] 3.3 后端 API 服务完成
- [ ] 3.4 AI 语音识别完成
- [ ] 3.5 自适应学习引擎完成
- [ ] 3.6 家长中心完整版完成

### M4（发布就绪）
- [ ] 4.1 性能优化完成
- [ ] 4.2 可访问性完善完成
- [ ] 4.3 完整测试完成
- [ ] 4.4 打包与部署完成

---

**文档维护记录**：
- v2.0 (2026-04-19)：全面重写，基于新 PRD，包含 4 个阶段、Auth/MongoDB、详细任务分解
- v1.0 (初始版本)：基础框架

