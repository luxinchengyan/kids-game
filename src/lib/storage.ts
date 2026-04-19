// LocalStorage 封装
// MVP 阶段使用，Phase 3 切换到 MongoDB

export const Storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue ?? null;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue ?? null;
    }
  },

  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn('Failed to save to localStorage');
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.warn('Failed to remove from localStorage');
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      console.warn('Failed to clear localStorage');
    }
  }
};

export default Storage;
