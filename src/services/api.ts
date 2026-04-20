/**
 * HTTP API 客户端
 * 自动附加 Authorization header，自动处理 token 刷新
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export class ApiError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  return localStorage.getItem('kids_game_access_token');
}

function setTokens(accessToken: string, refreshToken?: string): void {
  localStorage.setItem('kids_game_access_token', accessToken);
  if (refreshToken) localStorage.setItem('kids_game_refresh_token', refreshToken);
}

function clearTokens(): void {
  localStorage.removeItem('kids_game_access_token');
  localStorage.removeItem('kids_game_refresh_token');
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('kids_game_refresh_token');
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) { clearTokens(); return null; }
    const data = await res.json() as { accessToken: string };
    setTokens(data.accessToken);
    return data.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();
    if (newToken) return request<T>(path, options, false);
    throw new ApiError('UNAUTHORIZED', '请先登录', 401);
  }

  const data = await res.json() as T & { code?: string; message?: string };
  if (!res.ok) {
    throw new ApiError(data.code || 'API_ERROR', data.message || '请求失败', res.status);
  }
  return data;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  setTokens,
  clearTokens,
  getToken,
};

export default api;
