/**
 * Express 服务入口
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { getDatabase, closeDatabase } from './db/factory';
import { serverConfig } from './config';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import progressRouter from './routes/progress';
import rewardsRouter from './routes/rewards';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: serverConfig.server.corsOrigins,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Global rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 'TOO_MANY_REQUESTS', message: '请求过于频繁，请稍后重试' },
}));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', driver: serverConfig.db.driver }));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/progress', progressRouter);
app.use('/api/rewards', rewardsRouter);

// 404
app.use((_req, res) => res.status(404).json({ code: 'NOT_FOUND', message: '接口不存在' }));

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server error]', err);
  res.status(500).json({ code: 'INTERNAL_ERROR', message: '服务内部错误' });
});

async function start() {
  await getDatabase();  // 初始化数据库连接
  const { port, host } = serverConfig.server;
  app.listen(port, host, () => {
    console.log(`[server] Listening on http://${host}:${port} (${serverConfig.db.driver})`);
  });
}

process.on('SIGTERM', async () => { await closeDatabase(); process.exit(0); });
process.on('SIGINT', async () => { await closeDatabase(); process.exit(0); });

start().catch(err => { console.error('[server] Failed to start:', err); process.exit(1); });

export default app;
