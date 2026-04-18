# 计划（基于 ai/PRD.md）

目标：构建面向 3–6 岁儿童的短时微任务学习游戏（拼音/数字/英语），MVP 包含：点击听音、配对/拖拽、微任务->奖励闭环、家长摘要。

总体策略
- 先交付可运行的最小产品（端到端的 3 个微任务模板 + 奖励系统 + 家长摘要），再逐步扩展内容与可访问性。
- 每个子任务保持可独立开发、测试和 CI 验证（组件 + Storybook + Playwright）。

子任务（按优先级）
1. scaffold-app
   - 描述：项目入口与基本路由，加载全局样式与组件容器（vite/react）。
   - 输出：src/main.jsx, src/App.jsx, 全局样式, README 更新
   - 依赖：无

2. store-setup
   - 描述：引入 Zustand，定义全局游戏状态（当前回合、得分、奖励队列、家长摘要缓存）。
   - 输出：src/store/gameStore.js
   - 依赖：scaffold-app

3. microtask-templates
   - 描述：实现三种微任务模板：点击听音（识别）、拖拽配对（配对）、多选选择题（选择）。
   - 输出：src/components/MicroTask、MatchTask、ChoiceTask；对应 Storybook stories
   - 依赖：store-setup, scaffold-app

4. audio-system
   - 描述：音频播放抽象（可插入替换音源、节流/反馈 200ms 要求、字幕支持）。
   - 输出：src/lib/audio.js, 占位音频资源目录 public/audio/
   - 依赖：microtask-templates

5. dragdrop-engine
   - 描述：基于原生 HTML5 或轻量库实现拖拽配对，提供可撤销、容错机制。
   - 输出：src/lib/dragdrop.js, MatchTask 集成
   - 依赖：microtask-templates

6. reward-system
   - 描述：即时奖励（星星/贴纸）表现层，简单动画（Framer Motion）与奖励汇总条目。
   - 输出：src/components/RewardToast.jsx, store 集成
   - 依赖：store-setup, microtask-templates

7. parent-summary
   - 描述：每次练习后生成 15s 家长摘要（正确率、完成度、建议），并可导出/复制。
   - 输出：src/components/ParentSummary.jsx, summary generator
   - 依赖：store-setup, reward-system

8. accessibility
   - 描述：保证色彩对比、可通过键盘/屏幕阅读器操作、字幕及语音提示。
   - 输出：WCAG 基本检查、Storybook 可访问性 addon
   - 依赖：microtask-templates, audio-system

9. e2e-and-ci
   - 描述：补充 Playwright 测试覆盖关键交互，添加 GitHub Actions（已部分添加），整合 Lighthouse CI。
   - 输出：tests/e2e/*, .github/workflows/*（完善）
   - 依赖：scaffold-app, storybook

10. content-and-i18n
   - 描述：内容数据模型（题库、音频索引）、多语言支持（中文/英文文本资源）。
   - 输出：src/data/*, i18n 工具
   - 依赖：microtask-templates, audio-system

里程碑
- M1（1-2 周）：完成 scaffold-app、store-setup、microtask-templates（至少点击听音、配对），基本 reward-system。
- M2：audio-system、dragdrop-engine、parent-summary、可访问性补强。
- M3：测试覆盖（Playwright）、Storybook 扩展、CI稳定性、性能审计（Lighthouse）。

交付物与验收标准
- Storybook 中每个组件都有至少一个 story
- Playwright 包含关键路径 E2E 测试（至少 3 个场景），在 CI 上可运行
- 家长摘要功能可在本地导出并展示

---
(计划已写入 ai/PLAN.md)
