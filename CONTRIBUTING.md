# 贡献指南

感谢你对童梦神舟项目的关注!我们欢迎所有形式的贡献。

## 🎯 如何贡献

### 报告 Bug

1. 在 [Issues](https://github.com/luxincheng/kids-game/issues) 中搜索是否已存在相同问题
2. 如果没有，点击 [New Issue](https://github.com/luxincheng/kids-game/issues/new) 创建新问题
3. 选择 "Bug Report" 模板并填写：
   - 清晰的标题
   - 复现步骤
   - 预期行为与实际行为
   - 截图（如适用）
   - 环境信息（浏览器、操作系统等）

### 提出新功能

1. 先在 Issues 中创建 "Feature Request"
2. 描述功能的使用场景和价值
3. 等待核心团队讨论和反馈
4. 获得批准后再开始实现

### 提交代码

#### 1. Fork 仓库

点击 GitHub 页面右上角的 "Fork" 按钮

#### 2. 克隆到本地

```bash
git clone https://github.com/你的用户名/kids-game.git
cd kids-game
```

#### 3. 创建分支

```bash
git checkout -b feature/你的功能名
# 或
git checkout -b fix/修复的问题
```

分支命名规范：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `refactor/xxx` - 代码重构

#### 4. 安装依赖

```bash
npm install
```

#### 5. 开发

```bash
# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint
```

#### 6. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
git commit -m "feat: 添加拼音测试功能"
git commit -m "fix: 修复奖励计算错误"
git commit -m "docs: 更新 README"
git commit -m "test: 添加成就系统单元测试"
```

提交类型：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

#### 7. 推送到 GitHub

```bash
git push origin feature/你的功能名
```

#### 8. 创建 Pull Request

1. 访问你的 Fork 仓库
2. 点击 "Compare & pull request"
3. 填写 PR 描述：
   - 这个 PR 做了什么改动
   - 为什么需要这些改动
   - 如何测试这些改动
   - 相关的 Issue 编号

## 📋 代码规范

### TypeScript

- 优先使用 TypeScript，避免 `any` 类型
- 为所有导出函数和组件添加类型注解
- 使用接口定义数据结构

### React 组件

- 使用函数式组件
- 使用 TypeScript 定义 Props 类型
- 为组件编写 Storybook story
- 保持组件小型化、单一职责

```tsx
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
```

### 样式

- 优先使用 CSS 变量（设计令牌）
- 避免硬编码颜色值
- 确保触控目标 ≥ 64px

### 测试

- 为所有纯函数编写单元测试
- 为核心用户路径编写 E2E 测试
- 测试覆盖率目标：≥80%

```typescript
// 示例：单元测试
describe('calculateStarsEarned', () => {
  it('returns 3 stars for perfect accuracy', () => {
    expect(calculateStarsEarned({ success: true, accuracy: 1 })).toBe(3);
  });
});
```

## 🔍 代码审查流程

1. PR 创建后会自动触发 CI 检查
2. 至少需要一位核心成员审查通过
3. 所有 CI 检查必须通过
4. 解决所有评论和建议
5. 合并到主分支

## 🚀 发布流程

1. 更新 `CHANGELOG.md`
2. 创建版本标签：`git tag v0.2.0`
3. 推送标签：`git push origin v0.2.0`
4. GitHub Actions 会自动构建并发布 Docker 镜像

## 💡 提示

- 开始开发前先阅读相关文档
- 保持 PR 小型化、聚焦单一功能
- 及时更新文档
- 友好互助，尊重他人

## ❓ 需要帮助？

- 查看 [README.md](README.md)
- 查看现有 Issues 和 Discussions
- 在 Issue 中提问

感谢你的贡献！🎉
