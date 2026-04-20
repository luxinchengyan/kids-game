/**
 * 数据库工厂 — 根据 DB_DRIVER 环境变量选择适配器
 * DB_DRIVER=sqlite  (默认，本地开发)
 * DB_DRIVER=mongodb (生产环境)
 */
import type { IDatabase } from './types';

let instance: IDatabase | null = null;

export async function getDatabase(): Promise<IDatabase> {
  if (instance) return instance;

  const driver = process.env.DB_DRIVER || 'sqlite';

  if (driver === 'mongodb') {
    const { MongoDBAdapter } = await import('./mongodb.adapter');
    instance = new MongoDBAdapter(process.env.MONGODB_URI, process.env.MONGODB_DB);
  } else {
    const { SQLiteAdapter } = await import('./sqlite.adapter');
    instance = new SQLiteAdapter(process.env.SQLITE_PATH);
  }

  await instance.connect();
  console.log(`[DB] Connected using ${driver} adapter`);
  return instance;
}

export async function closeDatabase(): Promise<void> {
  if (instance) {
    await instance.disconnect();
    instance = null;
  }
}
