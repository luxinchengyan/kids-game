# Tasks

## 已完成
- 初始化项目骨架与 MVP 实现（播放 'b' 发音、选择题、计分） — 完成
- 将得分持久化到本地存储（localStorage） — 完成
- 支持真实录音回退到 TTS（若 audio 文件存在则播放，否则使用 speechSynthesis） — 完成
- 增加题库并随机抽题及选项 — 完成
- 添加简单奖励动画（Framer Motion）在答对时显示星星 — 完成

## 当前优先级待实现（依据 ai/PRD.md 与 ai/PLAN.md）
说明：按最小可交付增量（MVP -> M2 -> M3）排序，条目包含依赖和验收标准。

P0 (MVP 必需，M1 里程碑)
1. scaffold-app
   - 输出：src/main.jsx、src/App.jsx、全局样式、README 中的运行说明（最小）。
   - 依赖：无
   - 验收：能在本地启动并访问首页（vite dev）。
2. store-setup
   - 输出：src/store/gameStore.js（Zustand），含当前回合、得分、奖励队列与家长摘要缓存。
   - 依赖：scaffold-app
   - 验收：组件可读写全局状态，得分跨页面保持。
3. microtask-templates（点击听音、拖拽配对、选择题）
   - 输出：src/components/{MicroTask,MatchTask,ChoiceTask} 与 Storybook stories
   - 依赖：store-setup, scaffold-app
   - 验收：三种模板在 Storybook 可交互演示，能产生奖励事件。
4. reward-system（基础）
   - 输出：src/components/RewardToast.jsx，集成 Framer Motion + store
   - 依赖：microtask-templates, store-setup
   - 验收：答对时展示星星动画并更新成长条。

P1 (M2 目标)
5. audio-system（播放抽象与字幕）
   - 输出：src/lib/audio.js，public/audio 占位目录
   - 依赖：microtask-templates
   - 验收：支持文件播放优先，回退 TTS，播放 latency ≤200ms（感知层面）。
6. dragdrop-engine（容错拖拽）
   - 输出：src/lib/dragdrop.js，MatchTask 集成（自动吸附、可撤销）
   - 依赖：microtask-templates
   - 验收：拖拽易用、误差容忍、操作撤销可用。
7. parent-summary（15s 汇报）
   - 输出：src/components/ParentSummary.jsx 与 summary generator
   - 依赖：store-setup, reward-system
   - 验收：每次练习结束生成简短摘要，可复制导出。
8. accessibility（WCAG 基本）
   - 输出：色彩对比/键盘导航/字幕支持，Storybook 可访问性检查
   - 依赖：microtask-templates, audio-system
   - 验收：基本可访问测试通过（对比、放大、语音提示）。

P2 (M3 与长期迭代)
9. e2e-and-ci（Playwright + GitHub Actions）
   - 输出：tests/e2e/*，.github/workflows/* 完整化
   - 依赖：scaffold-app, storybook
   - 验收：CI 能跑通至少 3 个关键路径场景。
10. content-and-i18n（题库与多语言）
   - 输出：src/data/*、i18n 支持
   - 依赖：microtask-templates, audio-system
   - 验收：题库可扩展，支持中/英两套文本资源。
11. 可视化奖励增强（Canvas/SVG）
   - 输出：更丰富的奖励表现、角色/宠物系统
   - 依赖：reward-system
   - 验收：奖励系统支持稀有/随机奖励并持久化。

## 里程碑（简要）
- M1（1–2 周）：完成 P0（scaffold, store, microtasks, 基础 reward）
- M2：完成 P1（audio, dragdrop, parent-summary, accessibility）
- M3：完成 P2（CI/e2e, i18n, 可视化奖励）

## 交付与验收（团队对齐）
- Storybook：每个组件至少一个 story
- E2E：Playwright 覆盖关键交互（3 场景）
- 家长摘要：本地可导出并展示

---

如需，将这些条目拆成 GitHub issues（含标签：P0/P1/P2、里程碑、验收条目）并分配到 sprint。