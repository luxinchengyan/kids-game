/**
 * 认证路由
 * POST /api/auth/send-otp     — 发送手机验证码
 * POST /api/auth/verify-otp   — 验证码登录/注册
 * POST /api/auth/refresh       — 刷新 access token
 * POST /api/auth/logout        — 登出
 * GET  /api/auth/wechat        — 获取微信授权 URL
 * GET  /api/auth/wechat/callback — 微信授权回调
 * GET  /api/auth/me            — 获取当前用户信息
 */
import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/factory';
import type { DBParent } from '../db/types';
import { sendOtp } from '../services/sms';
import { getWechatAuthUrl, getWechatUserByCode } from '../services/wechat';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/jwt';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { serverConfig } from '../config';

const router = Router();

// 手机号格式验证
function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * POST /api/auth/send-otp
 * Body: { phone: string }
 */
router.post('/send-otp', async (req: Request, res: Response) => {
  const { phone } = req.body as { phone?: string };
  if (!phone || !isValidPhone(phone)) {
    return res.status(400).json({ code: 'INVALID_PHONE', message: '手机号格式不正确' });
  }

  try {
    const db = await getDatabase();
    const code = await sendOtp(phone);
    const expiresAt = new Date(Date.now() + serverConfig.sms.otpExpireMinutes * 60 * 1000).toISOString();
    await db.upsertOtp(phone, code, expiresAt);

    const isDev = serverConfig.isDev;
    res.json({
      success: true,
      message: '验证码已发送',
      // 开发环境返回验证码方便调试
      ...(isDev && { debugCode: code }),
    });
  } catch (err) {
    console.error('[auth/send-otp]', err);
    res.status(500).json({ code: 'SMS_FAILED', message: '验证码发送失败，请稍后重试' });
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { phone: string, code: string, deviceInfo?: string }
 */
router.post('/verify-otp', async (req: Request, res: Response) => {
  const { phone, code, deviceInfo } = req.body as { phone?: string; code?: string; deviceInfo?: string };
  if (!phone || !code) {
    return res.status(400).json({ code: 'MISSING_PARAMS', message: '参数不完整' });
  }

  try {
    const db = await getDatabase();

    const otpRecord = await db.findValidOtp(phone, code);
    if (!otpRecord) {
      return res.status(401).json({ code: 'INVALID_OTP', message: '验证码错误或已过期' });
    }
    await db.markOtpUsed(otpRecord.id);

    let parent = await db.findParentByPhone(phone);
    if (!parent) {
      parent = await db.createParent({
        phone,
        dailyTimeLimit: 60,
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
      });
    }

    const accessToken = signAccessToken({ parentId: parent.id, phone: parent.phone });
    const refreshToken = signRefreshToken(parent.id);
    await db.createSession(parent.id, refreshToken, deviceInfo);

    const children = await db.findChildrenByParent(parent.id);

    res.json({
      success: true,
      accessToken,
      refreshToken,
      parent: sanitizeParent(parent),
      children,
      isNewUser: children.length === 0,
    });
  } catch (err) {
    console.error('[auth/verify-otp]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常，请稍后重试' });
  }
});

/**
 * POST /api/auth/refresh
 * Body: { refreshToken: string }
 */
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken) {
    return res.status(400).json({ code: 'MISSING_TOKEN', message: '缺少刷新令牌' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const db = await getDatabase();
    const session = await db.findSession(refreshToken);
    if (!session || new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ code: 'SESSION_EXPIRED', message: '会话已过期，请重新登录' });
    }

    const parent = await db.findParentById(payload.parentId);
    if (!parent) {
      return res.status(401).json({ code: 'USER_NOT_FOUND', message: '用户不存在' });
    }

    const newAccessToken = signAccessToken({ parentId: parent.id, phone: parent.phone });
    res.json({ success: true, accessToken: newAccessToken });
  } catch {
    res.status(401).json({ code: 'INVALID_TOKEN', message: '令牌无效，请重新登录' });
  }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', requireAuth, async (req: AuthRequest, res: Response) => {
  const { refreshToken } = req.body as { refreshToken?: string };
  try {
    const db = await getDatabase();
    if (refreshToken) {
      await db.deleteSession(refreshToken);
    } else if (req.parentId) {
      await db.deleteSessionsByParent(req.parentId);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[auth/logout]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '登出失败' });
  }
});

/**
 * GET /api/auth/wechat — 返回微信授权 URL
 */
router.get('/wechat', (req: Request, res: Response) => {
  const state = (req.query.state as string) || 'login';
  const url = getWechatAuthUrl(state);
  res.json({ url });
});

/**
 * GET /api/auth/wechat/callback — 微信授权回调
 */
router.get('/wechat/callback', async (req: Request, res: Response) => {
  const { code, state } = req.query as { code?: string; state?: string };
  if (!code) {
    return res.status(400).json({ code: 'MISSING_CODE', message: '缺少微信授权码' });
  }

  try {
    const wechatUser = await getWechatUserByCode(code);
    const db = await getDatabase();

    let parent = await db.findParentByWechat(wechatUser.openId);
    if (!parent) {
      parent = await db.createParent({
        wechatOpenId: wechatUser.openId,
        wechatUnionId: wechatUser.unionId,
        wechatNickname: wechatUser.nickname,
        wechatAvatarUrl: wechatUser.avatarUrl,
        dailyTimeLimit: 60,
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
      });
    } else {
      // 更新微信信息
      await db.updateParent(parent.id, {
        wechatNickname: wechatUser.nickname,
        wechatAvatarUrl: wechatUser.avatarUrl,
      });
      parent = (await db.findParentById(parent.id))!;
    }

    const accessToken = signAccessToken({ parentId: parent.id, phone: parent.phone });
    const refreshToken = signRefreshToken(parent.id);
    await db.createSession(parent.id, refreshToken, 'wechat');

    const children = await db.findChildrenByParent(parent.id);

    // 对于网页端，重定向到前端并带上 token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const redirectUrl = new URL('/auth/callback', frontendUrl);
    redirectUrl.searchParams.set('accessToken', accessToken);
    redirectUrl.searchParams.set('refreshToken', refreshToken);
    redirectUrl.searchParams.set('isNewUser', String(children.length === 0));
    if (state) redirectUrl.searchParams.set('state', state);

    res.redirect(redirectUrl.toString());
  } catch (err) {
    console.error('[auth/wechat/callback]', err);
    res.status(500).json({ code: 'WECHAT_ERROR', message: '微信登录失败' });
  }
});

/**
 * GET /api/auth/me — 获取当前用户（需要认证）
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDatabase();
    const parent = await db.findParentById(req.parentId!);
    if (!parent) return res.status(404).json({ code: 'NOT_FOUND', message: '用户不存在' });
    const children = await db.findChildrenByParent(parent.id);
    res.json({ parent: sanitizeParent(parent), children });
  } catch (err) {
    console.error('[auth/me]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

function sanitizeParent(p: DBParent) {
  const { passwordHash: _pw, ...rest } = p;
  return rest;
}

export default router;
