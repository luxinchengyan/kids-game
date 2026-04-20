# AI Development Rules
# 产品名称:童梦神舟 · 智趣成长
# 版本：v2.0

---

## 0. 核心使命宣言

**我们不是在写代码，我们是在为孩子们建造一个充满魔法的学习乐园。**

每一行代码都可能影响一个孩子的学习兴趣、自信心和未来。请保持敬畏之心，永远把孩子的最佳利益放在第一位。

---

## 1. 开发原则（铁律）

### 1.1 产品原则（不可违背）
1. **儿童优先**：所有技术决策都要让位于儿童体验
2. **安全第一**：儿童数据安全是生命线，零容忍违规
3. **快乐学习**：代码要服务于"玩中学"的目标，而非相反
4. **家长伙伴**：尊重家长的知情权和控制权
5. **科学严谨**：基于学习科学，不追求花哨的伪创新

### 1.2 技术原则
1. **渐进式迭代**：不重写整个项目，在现有结构上修改
2. **小步快跑**：每次只完成一个小任务，可验证、可回滚
3. **可运行优先**：所有代码提交时必须可运行
4. **简洁为王**：代码如诗，清晰易读，避免过度设计
5. **性能为王**：首屏 < 2s，交互 < 200ms，动画 60fps

---

## 2. 技术栈规范

### 2.1 核心技术栈（固定）
- **框架**：React 18+ + TypeScript 5+
- **组件范式**：函数组件 + Hooks（禁止 Class 组件）
- **状态管理**：轻量级方案（Zustand/Jotai，优先 Zustand）
- **路由**：React Router v6+
- **样式**：CSS-in-JS（Styled Components 或 Emotion）+ Tailwind CSS
- **构建工具**：Vite（优先）或 Webpack 5

### 2.2 依赖管理规则
- **禁止**：随意引入新依赖
- **评估标准**：
  1. 真的需要吗？能否用现有代码实现？
  2. 维护活跃吗？最近更新时间？
  3. 包体大小？是否 Tree-shakable？
  4. 安全性？有无已知漏洞？
- **审批流程**：引入新依赖必须在 PR 中说明理由并获得批准

### 2.3 推荐依赖库（白名单）
- **日期处理**：date-fns（轻量）
- **工具函数**：lodash-es（按需引入）
- **动画**：framer-motion（React）、lottie-web（复杂动画）
- **表单**：react-hook-form（轻量高性能）
- **测试**：vitest + testing-library
- **类型检查**：TypeScript（strict 模式）
- **代码规范**：ESLint + Prettier

---

## 3. 代码规范

### 3.1 TypeScript 规范
- **严格模式**：必须开启 `strict: true`
- **类型定义**：
  - 禁止使用 `any`（除非万不得已，且必须注释说明）
  - 优先使用 `interface` 定义对象类型
  - 使用 `type` 定义联合类型、工具类型
  - 组件 Props 使用 `interface` 并以 `Props` 结尾
- **类型导出**：共享类型放在 `types/` 目录

### 3.2 React 组件规范
- **命名**：PascalCase，文件名与组件名一致
- **结构顺序**：
  ```tsx
  // 1. Imports
  import React from 'react';
  
  // 2. Types
  interface MyComponentProps {
    title: string;
    onClose?: () => void;
  }
  
  // 3. Component
  export const MyComponent: React.FC<MyComponentProps> = ({ 
    title, 
    onClose 
  }) => {
    // 4. Hooks
    const [count, setCount] = useState(0);
    
    // 5. Event handlers
    const handleClick = () => {
      setCount(c => c + 1);
    };
    
    // 6. Render
    return (
      <div onClick={handleClick}>
        {title}
      </div>
    );
  };
  
  // 7. Exports (if needed)
  export default MyComponent;
  ```
- **Hooks 规则**：
  - 只能在组件顶层调用
  - 自定义 Hook 以 `use` 开头
- **Props 默认值**：使用解构赋值默认值，或 `defaultProps`

### 3.3 样式规范
- **设计系统优先**：必须使用 DESIGN.md v3.0 中定义的设计令牌
- **CSS 自定义属性**：使用 `var(--token-name)` 而非硬编码值
- **示例**：
  ```tsx
  // ✅ 正确：使用设计令牌
  const Button = styled.button`
    min-height: var(--touch-large);
    border-radius: var(--radius-lg);
    background: var(--gradient-pinyin);
    box-shadow: var(--shadow-lg);
    /* 遵循 DESIGN.md v3.0 的触控目标规范 */
  `;
  
  // ❌ 错误：硬编码值
  const Button = styled.button`
    min-height: 88px;
    border-radius: 24px;
    background: linear-gradient(135deg, #FF9800, #FFB74D);
  `;
  ```
- **响应式**：移动优先，使用 `min-width` 媒体查询
- **动画**：优先 CSS transform/opacity，使用 framer-motion 实现复杂交互

### 3.4 动画最佳实践
**参考**: DESIGN.md v3.0 Section 7 - Animation System

#### 性能优化
- 只使用 `transform` 和 `opacity` 属性（GPU 加速）
- 限制并发动画数量 ≤ 3
- 复杂动画使用 `will-change: transform`
- 避免触发布局重排的属性（width, height, top, left）

#### 无障碍支持
```tsx
import { useReducedMotion } from 'framer-motion';

const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
>
  Content
</motion.div>
```

#### 常用动画模式
- **按钮交互**: `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.95 }}`
- **页面入场**: `initial={{ y: -30, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`
- **模态框**: `initial={{ scale: 0.8 }}` → `animate={{ scale: 1 }}` (ease-out-back)
- **奖励庆祝**: ease-out-elastic, 弹簧动画

### 3.5 文件结构规范
```
src/
├── components/          # 通用组件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Card/
├── features/           # 功能模块（按业务领域）
│   ├── home/          # 首页
│   ├── pinyin/        # 拼音冒险岛
│   ├── math/          # 数字小镇
│   ├── english/       # 英语游乐园
│   └── parent/        # 家长中心
├── hooks/             # 自定义 Hooks
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
├── assets/            # 静态资源
│   ├── images/
│   ├── sounds/
│   └── animations/
├── styles/            # 全局样式、设计令牌
├── App.tsx
└── main.tsx
```

### 3.5 代码注释规范
- **何时注释**：
  - 复杂业务逻辑（为什么这么做，而不是怎么做）
  - 非显而易见的决策
  - 公共 API 的使用说明
- **何时不注释**：
  - 代码本身已清晰表达意图
  - 显而易见的事情
- **注释风格**：JSDoc 格式

---

## 4. AI 协作规范（核心！）

### 4.1 AI 助手角色定位
- **你是**：经验丰富的全栈开发工程师 + 儿童产品专家
- **你不是**：只会写代码的机器，要有产品思维和同理心
- **你的目标**：帮助团队高质量、高效率地完成产品开发

### 4.2 AI 工作流程

#### 第一步：理解与分析
1. **阅读上下文**：先看 PRD.md、DESIGN.md、RULES.md
2. **了解现状**：查看现有代码结构、技术选型
3. **明确目标**：确认用户需求，澄清模糊点
4. **制定计划**：用 TodoWrite 工具规划步骤

#### 第二步：执行与交付
1. **小步迭代**：一次只做一件事，完成后验证
2. **可运行代码**：每一步提交的代码都必须能运行
3. **完整输出**：每次输出必须包含：
   - 修改的文件列表
   - 每个文件的完整代码（不是 diff）
   - 清晰的修改说明
4. **质量检查**：
   - TypeScript 类型检查通过
   - ESLint 无错误
   - 符合设计规范
   - 性能达标

#### 第三步：验证与反馈
1. **运行测试**：如果有测试，确保通过
2. **手动验证**：在浏览器/设备上测试功能
3. **用户视角**：想象自己是 3-6 岁孩子，体验是否友好
4. **总结输出**：清晰说明完成了什么、效果如何

### 4.3 AI 输出格式规范

**每次输出必须包含以下三部分：**

```
## 修改总结

简要说明这次做了什么改动。

## 修改文件列表

- `/path/to/file1.tsx`
- `/path/to/file2.ts`

## 完整代码

### /path/to/file1.tsx
[完整的文件内容]

### /path/to/file2.ts
[完整的文件内容]
```

**注意**：
- 必须提供完整文件内容，不是 diff
- 文件路径必须是绝对路径
- 修改说明要清晰、具体

### 4.4 AI 协作禁忌
- ❌ 不要一次性修改太多文件
- ❌ 不要提交无法运行的代码
- ❌ 不要偏离 PRD 和 DESIGN 规范
- ❌ 不要过度工程化，保持简单
- ❌ 不要忽视儿童体验和安全

---

## 5. 质量标准与测试

### 5.1 代码质量门禁
- [ ] TypeScript 编译无错误（`strict: true`）
- [ ] ESLint 无错误（警告可协商）
- [ ] Prettier 格式化通过
- [ ] 无 `any` 类型（或有充分理由）
- [ ] 符合本规范的所有规则

### 5.2 性能标准
- [ ] 首屏加载时间 ≤ 2s（3G 网络）
- [ ] 交互响应时间 ≤ 200ms
- [ ] 动画帧率 ≥ 55 FPS（稳定 60 FPS）
- [ ] 包体大小 ≤ 100 MB（初始加载）
- [ ] 内存占用 ≤ 200 MB（峰值）

### 5.3 测试策略
- **单元测试**：核心业务逻辑、工具函数必须测试
- **组件测试**：关键 UI 组件使用 Testing Library
- **E2E 测试**：核心用户流程（如学习流程）
- **性能测试**：Lighthouse 评分 ≥ 90
- **可访问性测试**：WCAG AA 标准

### 5.4 儿童产品特殊质量检查
- [ ] 触控目标尺寸 ≥ 64x64 dp（关键按钮 ≥ 88x88 dp）
- [ ] 文字与背景对比度 ≥ 4.5:1
- [ ] 无惩罚性错误反馈
- [ ] 所有交互有即时反馈（< 200ms）
- [ ] 文案长度 ≤ 6 个字（儿童端）
- [ ] 无闪烁、无快速移动可能引发癫痫的内容
- [ ] 色彩组合符合色盲友好原则

---

## 6. 版本控制与 PR 流程

### 6.1 Git 分支策略
- `main`：生产环境，稳定可发布
- `develop`：开发环境，集成测试
- `feature/*`：功能分支，从 develop 切出
- `fix/*`：修复分支，从 develop 或 main 切出

### 6.2 Commit Message 规范
使用 Conventional Commits 格式：
```
<type>(<scope>): <subject>

<description>
```

Type 类型：
- `feat`：新功能
- `fix`：修复 bug
- `refactor`：重构
- `style`：代码格式
- `docs`：文档
- `test`：测试
- `chore`：构建/工具

示例：
```
feat(pinyin): add initial consonant精灵互动

- 实现23个声母精灵的点击发音
- 添加基础跟读识别功能
- 遵循DESIGN.md中的触控目标规范
```

### 6.3 PR 流程
1. 创建分支 → 开发 → 提交
2. 自检查（质量门禁、测试）
3. 创建 PR，填写模板：
   - 做了什么
   - 为什么这么做
   - 如何验证
   - 截图/录屏（UI 改动）
4. 代码审查 → 修改 → 批准
5. 合并到 develop

---

## 7. 安全与隐私（儿童产品重中之重）

### 7.1 数据最小化原则
- 只收集必要的数据
- 能在端侧处理就在端侧处理
- 不上传无关数据
- 定期清理不再需要的数据

### 7.2 儿童隐私保护
- **COPPA 合规**：遵守美国儿童在线隐私保护法
- **GDPR 合规**：遵守欧盟通用数据保护条例
- **明示同意**：家长必须明确同意才能收集数据
- **数据删除**：家长可随时请求删除所有数据
- **无广告**：禁止任何形式的定向广告
- **无第三方追踪**：禁止使用分析工具追踪儿童行为

### 7.3 内容安全
- **内容审核**：所有 AI 生成内容必须经过人工审核
- **分级制度**：严格按年龄分级内容
- **过滤机制**：敏感词过滤、内容安全检查
- **举报渠道**：家长可随时举报不当内容

### 7.4 代码安全
- **依赖安全**：定期扫描依赖漏洞（npm audit、Snyk）
- **输入验证**：所有用户输入必须验证和净化
- **XSS 防护**：React 默认防 XSS，但仍需注意
- **CSRF 防护**：使用 SameSite cookies、CSRF tokens
- **HTTPS 强制**：所有通信必须使用 HTTPS

---

## 8. 性能优化指南

### 8.1 React 性能优化
- 使用 `React.memo` 避免不必要重渲染
- 使用 `useMemo` 和 `useCallback` 缓存计算和回调
- 列表使用虚拟滚动（`react-window`）
- 代码分割（`React.lazy` + `Suspense`）
- 避免在 render 中创建新对象/数组/函数

### 8.2 加载性能优化
- **图片优化**：WebP 格式、适当尺寸、懒加载
- **字体优化**：字体子集化、`font-display: swap`
- **代码分割**：按路由/功能分割
- **预加载**：关键资源预加载
- **缓存策略**：Service Worker、HTTP 缓存

### 8.3 运行时性能优化
- 避免长任务（> 50ms）
- 使用 Web Worker 处理复杂计算
- 防抖/节流（lodash-es）
- RAF 动画（requestAnimationFrame）
- 避免强制同步布局（`offsetHeight` 等读取后立即写入）

---

## 9. 可访问性（A11y）规范

### 9.1 WCAG AA 标准必须达标
- 语义化 HTML
- 键盘可访问（所有功能可用 Tab 导航）
- 焦点可见
- 图片有 alt 文本
- 表单有 label
- 颜色对比度 ≥ 4.5:1
- ARIA 标签（必要时）

### 9.2 儿童产品特殊可访问性
- 简单语言，短句子
- 图标 + 文字双重标识
- 大触控目标
- 高对比度
- 可调整文字大小（1.2x-1.5x）
- 声音可替换为震动
- 无时间限制的任务（或可延长）

---

## 10. 文档与知识管理

### 10.1 必须维护的文档
- [ ] PRD.md（产品需求）
- [ ] DESIGN.md（设计规范）
- [ ] RULES.md（本文件）
- [ ] ARCHITECTURE.md（架构设计，如需要）
- [ ] API.md（API 文档，如需要）
- [ ] CHANGELOG.md（变更日志）

### 10.2 文档更新原则
- 每次重大变更同步更新相关文档
- 文档与代码同步提交
- 使用清晰、简洁的语言
- 图文并茂（如需要）

---

## 11. 团队协作与沟通

### 11.1 问题处理流程
1. 发现问题 → 描述清楚（复现步骤、预期/实际结果）
2. 分析原因 → 定位根本原因
3. 制定方案 → 评估多个方案，选择最优
4. 实施方案 → 小步迭代，可回滚
5. 验证效果 → 测试通过，问题解决
6. 总结沉淀 → 更新文档，分享经验

### 11.2 决策原则
- 儿童体验优先
- 数据驱动（如果有数据）
- 共识决策（重要问题）
- 谁执行谁负责

---

## 12. 持续学习与改进

### 12.1 保持好奇心
- 关注儿童教育最新研究
- 学习优秀的儿童产品
- 了解前沿技术趋势
- 定期进行用户研究

### 12.2 复盘与改进
- 每个里程碑后复盘
- 分析成功与失败
- 持续优化流程
- 分享最佳实践

---

## 附录 A：快速检查清单

每次提交前，请对照检查：

### 代码质量
- [ ] TypeScript 编译通过
- [ ] ESLint 无错误
- [ ] Prettier 格式化
- [ ] 无 `any` 类型
- [ ] 符合代码规范

### 功能实现
- [ ] 实现了需求的功能
- [ ] 代码可运行
- [ ] 手动测试通过
- [ ] 边界情况处理

### 设计规范
- [ ] 符合 DESIGN.md 设计规范
- [ ] 触控目标尺寸足够
- [ ] 色彩对比度达标
- [ ] 文案简洁儿童友好

### 性能
- [ ] 没有明显的性能问题
- [ ] 动画流畅
- [ ] 加载速度可接受

### 安全
- [ ] 没有明显的安全问题
- [ ] 输入有验证
- [ ] XSS/CSRF 防护

### 可访问性
- [ ] 语义化 HTML
- [ ] 键盘可访问
- [ ] 图片有 alt
- [ ] 表单有 label

---

**记住：我们在为孩子们创造产品。每一个细节都很重要。**

---

**文档维护记录**：
- v2.0 (2026-04-19)：全面升级，增加 AI 协作规范、安全隐私、质量标准、性能优化等
- v1.0 (初始版本)：基础框架

