# kids-game

面向 3 到 6 岁儿童的互动学习应用，当前版本已经从 demo 升级为一个更完整的商业化 MVP：包含家长设置、角色陪伴、三类微任务、成长奖励、记忆曲线复习提示，以及家长练习摘要导出。

## 运行

```bash
npm install
npm run dev
```

常用脚本：

```bash
npm run build
npm run test:e2e
```

## 当前产品能力

- 家长 onboarding：年龄段、性别、偏好学科、语言、陪伴角色
- 每日 3 个微任务的学习闭环：点击听音、拖拽配对、选择题
- 即时奖励：星星/贴纸提示、等级和成长进度
- 家长摘要：正确率、时长、建议、复制与 JSON 下载
- 内容层：按学科和语言生成任务，支持 mixed 模式

## 结构

- `src/App.jsx`: 主流程和页面编排
- `src/store/gameStore.js`: 全局状态、持久化和练习统计
- `src/data/learningContent.js`: 课程内容与角色配置
- `src/components/*`: 微任务、奖励和家长摘要组件
