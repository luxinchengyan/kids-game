/**
 * JWT 服务 — Access Token (7d) + Refresh Token (30d)
 */
import jwt from 'jsonwebtoken';
import { serverConfig } from '../config';

export interface AccessTokenPayload {
  parentId: string;
  phone?: string;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, serverConfig.jwt.accessSecret, {
    expiresIn: serverConfig.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function signRefreshToken(parentId: string): string {
  return jwt.sign({ parentId }, serverConfig.jwt.refreshSecret, {
    expiresIn: serverConfig.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, serverConfig.jwt.accessSecret) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): { parentId: string } {
  return jwt.verify(token, serverConfig.jwt.refreshSecret) as { parentId: string };
}
