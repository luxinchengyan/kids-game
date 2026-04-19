# Technical Design & Implementation Notes

## 数据库

kids_game_user

219YVZeckATiGfL2

mongodb+srv://kids_game_user:219YVZeckATiGfL2@cluster0.qmlo1j8.mongodb.net/?appName=Cluster0

面向 3–6 岁儿童的互动学习产品技术说明，目标：快速迭代 MVP、保证触控流畅与低延迟音画同步、易于扩展题库与多语言内容。

## 技术栈（建议）
- 前端：React + TypeScript + Vite（快速热重载、轻量构建）
- 状态管理：Zustand（轻量、可序列化）
- 动画：Framer Motion（UI/奖励动效）；Canvas/SVG 用于复杂可视化奖励
- 测试：Playwright（E2E）、Jest + React Testing Library（单元/组件）
- 打包/CI：GitHub Actions + npm scripts；推荐 Lighthouse CI 用于性能回归

## 项目结构（推荐）
- src/
  - components/ (微任务组件、通用 UI)
  - game/ (微任务模板、游戏循环、规则)
  - store/ (Zustand 游戏状态、持久化层)
  - lib/ (audio, dragdrop, analytics)
  - data/ (题库、i18n 文本、音频索引)
  - pages/ (App、练习页面、家长视图)
  - assets/ (svg、sprite、audio 占位)

## 核心子系统说明
- audio (src/lib/audio.ts)
  - 接口：play(id), preload(ids), stop(), onFinish(callback)
  - 优先策略：local audio file → cached → Web Speech API（回退）
  - 要点：并行播放节流（避免重叠）、可选字幕同步

- drag & drop (src/lib/dragdrop.ts)
  - 要点：容错触发区域、自动吸附、一步撤销接口
  - 实现：轻量库或自实现（Pointer events + hit test）以保证低延迟

- reward system
  - 事件驱动（答题成功/失败 -> reward queue -> 展示层）
  - 支持即时奖励与稀有/随机奖励，状态持久化到 store

- parent summary
  - 生成器：基于每回合记录（正确率、反应时、建议）生成 15s 文本/JSON 摘要

## 性能与设备目标
- 目标：交互反馈延迟 < 200ms；关键动效保持 60fps（首选简短、分层动效）
- 资源策略：按需懒加载题库与音频，首屏仅加载必要素材；音频使用短片段（≤3s）并做合适压缩

## 可测试性与 CI
- Storybook：所有组件至少一个 story，启用 a11y addon
- Playwright：覆盖关键路径（点击听音、拖拽配对、奖励展示、家长摘要导出）
- CI：在 PR 中运行 lint、unit tests、storybook build、playwright tests，主分支启用 Lighthouse 性能审计

## 可扩展性与运维
- 内容模型：题库与音频以 JSON 索引驱动（支持按年龄/主题过滤），便于后端/编辑平台导入
- 后端（可选）：为大量用户提供云存储、分析与多端同步，采用简单 REST 或 serverless 函数
- 数据与隐私：仅收集必要的非敏感数据（匿名练习统计）；家长可选择开启上传/备份

## 工程实践建议
- 模块化、可测试的小组件优先；微任务模板独立且无副作用
- 配置 Feature Flags 以便在生产中逐步打开新奖励或难度调整
- 提供本地 mock 数据与离线模式（题库 + 基础音频）以支持低网络环境

---

短句总结：优先保证“低延迟音画同步 + 简单可复用微任务组件 + 可扩展题库与家长汇报”，以实现面向幼儿的沉浸式学习体验。