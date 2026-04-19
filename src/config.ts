/**
 * Environment-aware configuration
 * All VITE_ prefixed env vars are exposed to the client per Vite conventions
 */

export const config = {
  // Environment
  env: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // Analytics
  analytics: {
    endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || null,
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED !== 'false',
  },

  // Audio
  audio: {
    cdnUrl: import.meta.env.VITE_AUDIO_CDN_URL || '/audio/',
    enableTTSFallback: true,
  },

  // Error Tracking
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN || null,
    enabled: import.meta.env.VITE_SENTRY_ENABLED === 'true',
    sampleRate: parseFloat(import.meta.env.VITE_SENTRY_SAMPLE_RATE || '0.1'),
  },

  // Feature Flags
  features: {
    offlineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE !== 'false',
    parentalGate: import.meta.env.VITE_ENABLE_PARENTAL_GATE !== 'false',
    shareProgress: import.meta.env.VITE_ENABLE_SHARE_PROGRESS !== 'false',
  },

  // App Info
  app: {
    name: '童梦飞船 · 智趣成长',
    version: '0.1.0',
  },
} as const;

// Validate required configuration on startup
export function validateConfig(): void {
  const warnings: string[] = [];

  if (!config.analytics.endpoint && config.analytics.enabled) {
    warnings.push('Analytics endpoint not configured but analytics is enabled');
  }

  if (config.sentry.enabled && !config.sentry.dsn) {
    warnings.push('Sentry enabled but DSN not configured');
  }

  if (warnings.length > 0 && config.isDev) {
    console.warn('[config] Configuration warnings:', warnings);
  }
}
