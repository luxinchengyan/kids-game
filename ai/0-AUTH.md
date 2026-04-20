# 用户认证系统设计（Auth System）
# 产品名称:童梦神舟 · 智趣成长
# 版本：v1.0

---

## 1. 核心理念

**家长是管理者，孩子是使用者；安全第一，隐私至上。**

- 家长端：完整的注册/登录/设置/管理权限
- 孩子端：无复杂登录，由家长切换，专注学习体验
- 安全：COPPA/GDPR 合规，数据最小化，端侧优先

---

## 2. 用户角色模型

### 2.1 家长用户（Parent Account）
- **账号类型**：主账号，拥有完整权限
- **认证方式**：邮箱/手机号 + 密码
- **权限范围**：
  - 注册/登录
  - 管理孩子用户
  - 查看学习报告
  - 修改设置
  - 数据导出/删除

### 2.2 孩子用户（Child Profile）
- **账号类型**：子账号，依附于家长账号
- **认证方式**：无需独立登录，由家长切换
- **权限范围**：
  - 学习游戏
  - 收集奖励
  - 查看自己的成就
  - 无数据修改权限

### 2.3 关系模型
```
Parent (1) ─── has many ───> Child (N)
```

---

## 3. 核心流程设计

### 3.1 家长注册流程
```
启动 App
  ↓
欢迎页
  ↓
"我是家长" 按钮
  ↓
注册页面
  ├─ 输入邮箱/手机号
  ├─ 设置密码（8-20位，含字母数字）
  ├─ 确认密码
  ├─ 勾选服务条款 & 隐私政策
  └─ 点击"注册"
  ↓
验证邮箱/手机（可选，推荐）
  ↓
创建第一个孩子档案
  ├─ 昵称（必填）
  ├─ 年龄（3-6岁，滑块选择）
  ├─ 性别（男孩/女孩/保密）
  ├─ 选择虚拟角色
  └─ 点击"完成"
  ↓
进入孩子学习首页
```

### 3.2 家长登录流程
```
启动 App
  ↓
欢迎页
  ↓
"我是家长" 按钮
  ↓
登录页面
  ├─ 输入邮箱/手机号
  ├─ 输入密码
  ├─ 勾选"记住我"（可选）
  └─ 点击"登录"
  ↓
选择孩子档案（如果有多个）
  ↓
进入孩子学习首页
```

### 3.3 孩子用户切换流程
```
孩子学习首页
  ↓
"家长中心" 按钮（需简单验证，如数学题 2+3=?）
  ↓
家长中心
  ↓
"切换孩子" 按钮
  ↓
孩子列表
  ↓
选择要切换的孩子
  ↓
进入新孩子的学习首页
```

### 3.4 忘记密码流程
```
登录页面
  ↓
"忘记密码" 链接
  ↓
输入注册邮箱/手机号
  ↓
发送重置链接/验证码
  ↓
点击链接/输入验证码
  ↓
设置新密码
  ↓
使用新密码登录
```

---

## 4. 数据模型设计

### 4.1 Parent（家长用户）
```typescript
interface Parent {
  _id: ObjectId;
  email?: string;          // 邮箱（唯一，可选）
  phone?: string;          // 手机号（唯一，可选）
  passwordHash: string;    // bcrypt 哈希
  salt: string;            // 密码 salt
  
  // 验证状态
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // 设置
  settings: {
    dailyTimeLimit: number;      // 每日时长限制（分钟）
    soundEnabled: boolean;
    musicEnabled: boolean;
    notificationsEnabled: boolean;
  };
  
  // 关联
  children: ObjectId[];    // 孩子用户 ID 列表
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
```

### 4.2 Child（孩子用户）
```typescript
interface Child {
  _id: ObjectId;
  parentId: ObjectId;       // 所属家长 ID
  
  // 基本信息
  nickname: string;
  age: number;              // 3-6
  gender: 'boy' | 'girl' | 'other';
  
  // 虚拟角色
  avatarId: string;         // 角色 ID（elsa/archie/peppa/doraemon/mickey）
  petId?: string;           // 宠物 ID（可选）
  
  // 学习进度（详见 0-DATABASE.md）
  learningProgress: LearningProgress;
  
  // 激励数据（详见 0-DATABASE.md）
  rewards: Rewards;
  
  // 元数据
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 Session（会话）
```typescript
interface Session {
  _id: ObjectId;
  parentId: ObjectId;
  currentChildId?: ObjectId;  // 当前选中的孩子
  
  // JWT
  accessToken: string;
  refreshToken: string;
  
  // 元数据
  userAgent: string;
  ip: string;
  createdAt: Date;
  expiresAt: Date;
}
```

---

## 5. API 设计（RESTful）

### 5.1 认证端点

#### POST /api/auth/register
家长注册
```typescript
// Request
{
  email?: string;
  phone?: string;
  password: string;
  child: {
    nickname: string;
    age: number;
    gender: 'boy' | 'girl' | 'other';
    avatarId: string;
  }
}

// Response (201)
{
  success: true;
  data: {
    parent: Parent;
    child: Child;
    session: {
      accessToken: string;
      refreshToken: string;
    }
  }
}
```

#### POST /api/auth/login
家长登录
```typescript
// Request
{
  email?: string;
  phone?: string;
  password: string;
  rememberMe?: boolean;
}

// Response (200)
{
  success: true;
  data: {
    parent: Parent;
    children: Child[];
    session: {
      accessToken: string;
      refreshToken: string;
    }
  }
}
```

#### POST /api/auth/logout
登出
```typescript
// Request (Header: Authorization: Bearer <token>)
{}

// Response (200)
{
  success: true;
  message: "Logged out successfully"
}
```

#### POST /api/auth/refresh-token
刷新 Access Token
```typescript
// Request
{
  refreshToken: string;
}

// Response (200)
{
  success: true;
  data: {
    accessToken: string;
    refreshToken: string;
  }
}
```

#### POST /api/auth/forgot-password
忘记密码
```typescript
// Request
{
  email?: string;
  phone?: string;
}

// Response (200)
{
  success: true;
  message: "Reset link/code sent"
}
```

#### POST /api/auth/reset-password
重置密码
```typescript
// Request
{
  token: string;
  newPassword: string;
}

// Response (200)
{
  success: true;
  message: "Password reset successfully"
}
```

### 5.2 孩子用户管理端点

#### GET /api/parent/children
获取孩子列表
```typescript
// Response (200)
{
  success: true;
  data: Child[];
}
```

#### POST /api/parent/children
创建孩子用户
```typescript
// Request
{
  nickname: string;
  age: number;
  gender: 'boy' | 'girl' | 'other';
  avatarId: string;
}

// Response (201)
{
  success: true;
  data: Child;
}
```

#### PUT /api/parent/children/:id
更新孩子信息
```typescript
// Request
{
  nickname?: string;
  age?: number;
  avatarId?: string;
}

// Response (200)
{
  success: true;
  data: Child;
}
```

#### DELETE /api/parent/children/:id
删除孩子用户
```typescript
// Response (200)
{
  success: true;
  message: "Child deleted"
}
```

#### POST /api/parent/switch-child/:id
切换当前孩子
```typescript
// Response (200)
{
  success: true;
  data: Child;
}
```

### 5.3 家长设置端点

#### GET /api/parent/settings
获取设置
```typescript
// Response (200)
{
  success: true;
  data: ParentSettings;
}
```

#### PUT /api/parent/settings
更新设置
```typescript
// Request
{
  dailyTimeLimit?: number;
  soundEnabled?: boolean;
  musicEnabled?: boolean;
  notificationsEnabled?: boolean;
}

// Response (200)
{
  success: true;
  data: ParentSettings;
}
```

---

## 6. 安全设计

### 6.1 认证安全
- **密码存储**：bcrypt.hash(password, saltRounds=12)
- **JWT**：
  - Access Token：有效期 15 分钟
  - Refresh Token：有效期 7 天
  - 使用 HS256 签名
  - 存储：HttpOnly, Secure, SameSite=Strict cookies
- **暴力破解防护**：登录失败 5 次锁定 15 分钟
- **验证码**：可选，敏感操作时启用

### 6.2 数据安全
- **加密传输**：HTTPS 强制
- **敏感数据**：不在日志中记录密码、token
- **数据最小化**：只收集必要信息
- **数据删除**：家长可随时请求删除所有数据（符合 GDPR "被遗忘权"）

### 6.3 COPPA/GDPR 合规
- **家长同意**：注册时必须明确获得家长同意
- **无广告**：不显示任何广告
- **无追踪**：不使用第三方追踪工具
- **数据导出**：家长可导出所有孩子数据
- **隐私政策**：清晰、简洁、儿童友好

---

## 7. 前端实现（预留接口）

### 7.1 Service 接口
```typescript
// src/services/auth.ts
export interface AuthService {
  register(data: RegisterData): Promise<AuthResponse>;
  login(data: LoginData): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<Tokens>;
  forgotPassword(emailOrPhone: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  getCurrentParent(): Promise<Parent>;
  getChildren(): Promise<Child[]>;
  createChild(data: CreateChildData): Promise<Child>;
  updateChild(id: string, data: UpdateChildData): Promise<Child>;
  deleteChild(id: string): Promise<void>;
  switchChild(id: string): Promise<Child>;
  getSettings(): Promise<ParentSettings>;
  updateSettings(data: UpdateSettingsData): Promise<ParentSettings>;
}
```

### 7.2 MVP Mock 实现
```typescript
// src/services/auth.ts (MVP - localStorage 版本)
export class LocalAuthService implements AuthService {
  // 使用 localStorage 模拟后端
  // 预留接口，Phase 3 无缝切换到真实后端
}
```

---

## 8. 前端页面设计

### 8.1 欢迎页
- 大标题:"童梦飞船 · 智趣成长"
- 可爱的角色插画
- 两个大按钮：
  - "我是家长"（主要按钮，大尺寸）
  - "游客体验"（次要按钮，可选）

### 8.2 注册页
- 简洁表单，大输入框
- 邮箱/手机号输入
- 密码输入（显示/隐藏切换）
- 确认密码输入
- 服务条款 & 隐私政策勾选框
- "注册"大按钮
- "已有账号？去登录"链接

### 8.3 登录页
- 邮箱/手机号输入
- 密码输入
- "记住我"开关
- "登录"大按钮
- "忘记密码？"链接
- "没有账号？去注册"链接

### 8.4 创建孩子档案页
- 昵称输入
- 年龄滑块（3-6岁，带可爱图标）
- 性别选择（大按钮，图标+文字）
- 角色选择（5个角色预览，大卡片）
- "完成"大按钮

### 8.5 家长中心 - 孩子管理
- 孩子列表（卡片展示）
- "添加孩子"按钮
- 每个孩子卡片包含：
  - 头像
  - 昵称
  - 年龄
  - "编辑"按钮
  - "删除"按钮
  - "切换到此孩子"按钮

---

## 9. 状态管理（Zustand）

```typescript
// src/stores/useAuthStore.ts
interface AuthState {
  parent: Parent | null;
  currentChild: Child | null;
  children: Child[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadChildren: () => Promise<void>;
  switchChild: (id: string) => Promise<void>;
  updateSettings: (data: UpdateSettingsData) => Promise<void>;
}
```

---

## 10. MVP 过渡策略

| 阶段 | 实现方式 | 说明 |
|-----|---------|-----|
| MVP | 单用户，localStorage | 无需登录，直接使用，数据本地存储 |
| Phase 3 | 完整 Auth 系统 | 家长注册/登录，多孩子，MongoDB 持久化 |

**关键**：定义清晰的 Service 接口，MVP 用 mock/localStorage 实现，Phase 3 无缝切换。

---

**文档维护记录**：
- v1.0 (2026-04-19)：初始版本，完整设计注册/登录系统，家长/孩子角色分离，预留 MVP 接口

