# 童梦飞船 · 智趣成长 (Kids Game)

> 面向 3-6 岁家庭的互动学习应用 - 拼音、数学、英语与传统文化启蒙

[![CI Pipeline](https://github.com/luxincheng/kids-game/actions/workflows/ci.yml/badge.svg)](https://github.com/luxincheng/kids-game/actions/workflows/ci.yml)
[![Docker Build](https://github.com/luxincheng/kids-game/actions/workflows/docker.yml/badge.svg)](https://github.com/luxincheng/kids-game/actions/workflows/docker.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📖 项目简介

童梦飞船是一款专为学龄前儿童设计的互动学习应用,通过游戏化学习帮助孩子掌握:

- **汉语拼音** - 声母、韵母、整体认读音节
- **数学启蒙** - 数字认知、简单运算、逻辑思维
- **英语启蒙** - 基础词汇、日常用语
- **传统文化** - 神话故事、古诗词、成语故事

### 核心特性

- ✅ **个性化学习** - 基于艾宾浩斯遗忘曲线的智能复习系统
- ✅ **游戏化激励** - 星星奖励、成就系统、连续打卡
- ✅ **家长监控** - 学习报告、进度追踪、数据导出
- ✅ **离线支持** - 核心功能无需网络
- ✅ **安全合规** - 无第三方 IP、隐私保护、家长控制

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### Docker 部署

```bash
# 构建并运行
docker-compose up -d

# 访问 http://localhost:8080
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览生产构建
npm run preview
```

## 📦 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **状态管理**: Zustand
- **动画**: Framer Motion
- **测试**: Vitest (单元) + Playwright (E2E)
- **组件文档**: Storybook
- **容器化**: Docker + Nginx
- **CI/CD**: GitHub Actions

## 🧪 测试

```bash
# 运行单元测试
npm run test

# 查看测试覆盖率
npm run test:coverage

# 运行 E2E 测试
npm run test:e2e

# 启动测试 UI
npm run test:ui
```

## 🛠️ 开发工具

```bash
# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix

# 格式化代码
npm run format

# 启动 Storybook
npm run storybook

# 性能审计
npm run lhci:autorun
```

## 📁 项目结构

```
kids-game/
├── src/
│   ├── components/       # React 组件
│   │   ├── Button/       # 通用 UI 组件
│   │   ├── Card/
│   │   ├── ChoiceTask.jsx    # 选择题任务
│   │   ├── MatchTask.jsx     # 配对任务
│   │   ├── PinyinBattle.jsx  # 拼音任务
│   │   └── ...
│   ├── data/             # 学习内容与配置
│   │   ├── learningContent.js  # 题库与任务生成
│   │   └── rewards.js          # 奖励与成就系统
│   ├── lib/              # 工具库
│   │   ├── analytics.ts  # 埋点系统
│   │   ├── audio.ts      # 音频管理
│   │   └── storage.ts    # 本地存储
│   ├── stores/           # Zustand 状态管理
│   │   ├── useGameStore.ts   # 游戏状态
│   │   ├── useUserStore.ts   # 用户状态
│   │   └── useRewardStore.ts # 奖励状态
│   ├── styles/           # 样式与主题
│   ├── config.ts         # 环境配置
│   └── App.tsx           # 主应用组件
├── tests/
│   └── e2e/              # Playwright E2E 测试
├── .github/workflows/    # CI/CD 配置
├── Dockerfile            # Docker 构建
├── docker-compose.yaml   # Docker Compose
└── nginx.conf            # Nginx 配置
```

## 🌍 环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `MONGODB_URI` | MongoDB 连接字符串（可选） | - |
| `VITE_ANALYTICS_ENDPOINT` | 分析端点 URL | - |
| `VITE_AUDIO_CDN_URL` | 音频资源 CDN | `/audio/` |
| `VITE_SENTRY_DSN` | Sentry 错误追踪 DSN | - |
| `VITE_ENABLE_OFFLINE_MODE` | 启用离线模式 | `true` |
| `VITE_ENABLE_PARENTAL_GATE` | 启用家长控制 | `true` |

## 📊 质量指标

- **单元测试覆盖率**: ≥80% (业务逻辑)
- **E2E 测试覆盖**: 核心用户路径
- **Lighthouse 分数**: 性能 ≥90, 无障碍 ≥95
- **TypeScript 严格模式**: ✅
- **ESLint + Prettier**: ✅

## 🚢 部署

### Docker Hub

```bash
docker pull luxinchengyan/kids-game:latest
docker run -p 8080:80 luxinchengyan/kids-game
```

### GitHub Container Registry

```bash
docker pull ghcr.io/luxincheng/kids-game:latest
docker run -p 8080:80 ghcr.io/luxincheng/kids-game
```

## 📝 开发规范

- **提交信息**: 使用 [Conventional Commits](https://www.conventionalcommits.org/)
- **代码风格**: 遵循 ESLint + Prettier 配置
- **组件开发**: 为每个组件编写 Storybook story
- **测试**: 新功能必须包含单元测试

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

[MIT License](LICENSE)

## 📧 联系方式

- 项目仓库: https://github.com/luxincheng/kids-game
- 问题反馈: https://github.com/luxincheng/kids-game/issues

---

**让孩子在快乐中学习，在学习中成长！** 🌈
