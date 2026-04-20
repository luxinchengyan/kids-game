/**
 * 前端认证服务 — 封装所有认证相关 API 调用
 */
import api, { ApiError } from './api';

export interface Parent {
  id: string;
  phone?: string;
  wechatOpenId?: string;
  wechatNickname?: string;
  wechatAvatarUrl?: string;
  dailyTimeLimit: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  createdAt: string;
}

export interface Child {
  id: string;
  parentId: string;
  nickname: string;
  age: number;
  gender: 'boy' | 'girl';
  avatarId: string;
  petId?: string;
  createdAt: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  parent: Parent;
  children: Child[];
  isNewUser: boolean;
}

export const authService = {
  /** 发送手机验证码 */
  async sendOtp(phone: string): Promise<{ success: boolean; debugCode?: string }> {
    return api.post('/api/auth/send-otp', { phone });
  },

  /** 验证码登录/注册 */
  async verifyOtp(phone: string, code: string, deviceInfo?: string): Promise<AuthResult> {
    const result = await api.post<AuthResult>('/api/auth/verify-otp', { phone, code, deviceInfo });
    api.setTokens(result.accessToken, result.refreshToken);
    return result;
  },

  /** 获取微信授权 URL */
  async getWechatAuthUrl(state?: string): Promise<string> {
    const data = await api.get<{ url: string }>(`/api/auth/wechat${state ? `?state=${state}` : ''}`);
    return data.url;
  },

  /** 微信授权回调处理（前端从 URL 参数提取 token） */
  handleWechatCallback(searchParams: URLSearchParams): { isNewUser: boolean } {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isNewUser = searchParams.get('isNewUser') === 'true';
    if (accessToken && refreshToken) {
      api.setTokens(accessToken, refreshToken);
    }
    return { isNewUser };
  },

  /** 获取当前登录用户 */
  async getMe(): Promise<{ parent: Parent; children: Child[] }> {
    return api.get('/api/auth/me');
  },

  /** 登出 */
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('kids_game_refresh_token');
    try {
      await api.post('/api/auth/logout', { refreshToken });
    } catch {
      // 即使服务器报错也清除本地 token
    }
    api.clearTokens();
  },

  /** 检查是否已登录（有 token 且未过期） */
  isLoggedIn(): boolean {
    return !!api.getToken();
  },
};

export default authService;
