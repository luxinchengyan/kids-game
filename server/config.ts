/**
 * 服务端配置 — 从环境变量读取，提供类型安全的默认值
 */
export const serverConfig = {
  env: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',

  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:4173').split(','),
  },

  db: {
    driver: (process.env.DB_DRIVER || 'sqlite') as 'sqlite' | 'mongodb',
    sqlitePath: process.env.SQLITE_PATH,
    mongodbUri: process.env.MONGODB_URI,
    mongodbDb: process.env.MONGODB_DB || 'kids_game',
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-in-prod',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-prod',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  sms: {
    // 开发环境: 固定验证码 mock
    // 生产环境: 接入阿里云/腾讯云短信
    provider: (process.env.SMS_PROVIDER || 'mock') as 'mock' | 'aliyun' | 'tencent',
    aliyunAccessKeyId: process.env.ALIYUN_SMS_KEY_ID,
    aliyunAccessKeySecret: process.env.ALIYUN_SMS_KEY_SECRET,
    aliyunSignName: process.env.ALIYUN_SMS_SIGN_NAME || '童梦神舟',
    aliyunTemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
    tencentSecretId: process.env.TENCENT_SMS_SECRET_ID,
    tencentSecretKey: process.env.TENCENT_SMS_SECRET_KEY,
    tencentAppId: process.env.TENCENT_SMS_APP_ID,
    tencentSignName: process.env.TENCENT_SMS_SIGN_NAME || '童梦神舟',
    tencentTemplateId: process.env.TENCENT_SMS_TEMPLATE_ID,
    otpExpireMinutes: parseInt(process.env.OTP_EXPIRE_MINUTES || '5', 10),
    mockCode: process.env.SMS_MOCK_CODE || '123456',  // 仅开发环境
  },

  wechat: {
    appId: process.env.WECHAT_APP_ID || '',
    appSecret: process.env.WECHAT_APP_SECRET || '',
    // 微信网页授权回调地址
    redirectUri: process.env.WECHAT_REDIRECT_URI || 'http://localhost:3001/api/auth/wechat/callback',
  },

  rateLimit: {
    otpPerPhone: parseInt(process.env.RATE_OTP_PER_PHONE || '5', 10),   // 每手机号每小时
    loginAttempts: parseInt(process.env.RATE_LOGIN_ATTEMPTS || '10', 10),
  },
};

export type ServerConfig = typeof serverConfig;
