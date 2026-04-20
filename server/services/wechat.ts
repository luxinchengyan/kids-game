/**
 * 微信 OAuth 服务 — 微信公众号/小程序网页授权
 * 流程: code -> access_token -> user_info (openid, unionid, nickname, avatar)
 */
import { serverConfig } from '../config';

export interface WechatUserInfo {
  openId: string;
  unionId?: string;
  nickname: string;
  avatarUrl: string;
  sex?: number;
  city?: string;
  province?: string;
  country?: string;
}

/** 获取微信授权跳转 URL（前端拉起授权） */
export function getWechatAuthUrl(state: string = 'login'): string {
  const { appId, redirectUri } = serverConfig.wechat;
  const params = new URLSearchParams({
    appid: appId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state,
  });
  return `https://open.weixin.qq.com/connect/oauth2/authorize?\${params.toString()}#wechat_redirect`;
}

/** 用 code 换取 access_token 和 openid */
async function getAccessToken(code: string): Promise<{ accessToken: string; openId: string; refreshToken: string }> {
  const { appId, appSecret } = serverConfig.wechat;
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=\${appId}&secret=\${appSecret}&code=\${code}&grant_type=authorization_code`;
  const res = await fetch(url);
  const data = await res.json() as Record<string, unknown>;
  if (data.errcode) throw new Error(`WeChat token error: \${data.errmsg}`);
  return {
    accessToken: data.access_token as string,
    openId: data.openid as string,
    refreshToken: data.refresh_token as string,
  };
}

/** 用 access_token + openid 获取用户信息 */
async function getUserInfo(accessToken: string, openId: string): Promise<WechatUserInfo> {
  const url = `https://api.weixin.qq.com/sns/userinfo?access_token=\${accessToken}&openid=\${openId}&lang=zh_CN`;
  const res = await fetch(url);
  const data = await res.json() as Record<string, unknown>;
  if (data.errcode) throw new Error(`WeChat userinfo error: \${data.errmsg}`);
  return {
    openId: data.openid as string,
    unionId: (data.unionid as string) ?? undefined,
    nickname: (data.nickname as string) || '微信用户',
    avatarUrl: (data.headimgurl as string) || '',
    sex: data.sex as number,
    city: data.city as string,
    province: data.province as string,
    country: data.country as string,
  };
}

/** 完整换取用户信息（code → token → info） */
export async function getWechatUserByCode(code: string): Promise<WechatUserInfo> {
  const { accessToken, openId } = await getAccessToken(code);
  return getUserInfo(accessToken, openId);
}
