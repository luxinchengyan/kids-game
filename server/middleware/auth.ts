/**
 * JWT 认证中间件
 */
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwt';

export interface AuthRequest extends Request {
  parentId?: string;
  parentPhone?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  // 本地开发模式下，如果没有 Token，允许使用 Mock 身份
  if (!authHeader?.startsWith('Bearer ') && process.env.NODE_ENV === 'development') {
    console.log('[Auth] Development mode: Bypassing auth with mock parentId');
    req.parentId = 'trial-parent-1';
    req.parentPhone = '13800000000';
    next();
    return;
  }

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ code: 'UNAUTHORIZED', message: '请先登录' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.parentId = payload.parentId;
    req.parentPhone = payload.phone;
    next();
  } catch {
    res.status(401).json({ code: 'TOKEN_EXPIRED', message: '登录已过期，请重新登录' });
  }
}
