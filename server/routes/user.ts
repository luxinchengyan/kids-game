/**
 * 用户/孩子资料路由
 */
import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

router.get('/children', async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDatabase();
    const children = await db.findChildrenByParent(req.parentId!);
    res.json({ children });
  } catch (err) {
    console.error('[user/children GET]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.post('/children', async (req: AuthRequest, res: Response) => {
  const { nickname, age, gender, avatarId } = req.body as {
    nickname?: string; age?: number; gender?: string; avatarId?: string;
  };
  if (!nickname?.trim()) {
    return res.status(400).json({ code: 'INVALID_NICKNAME', message: '请输入宝贝昵称' });
  }
  if (!age || age < 1 || age > 18) {
    return res.status(400).json({ code: 'INVALID_AGE', message: '年龄范围 1-18' });
  }
  if (!gender || !['boy', 'girl'].includes(gender)) {
    return res.status(400).json({ code: 'INVALID_GENDER', message: '性别参数错误' });
  }

  try {
    const db = await getDatabase();
    const existing = await db.findChildrenByParent(req.parentId!);
    if (existing.length >= 5) {
      return res.status(400).json({ code: 'TOO_MANY_CHILDREN', message: '最多支持5个孩子档案' });
    }
    const child = await db.createChild({
      parentId: req.parentId!,
      nickname: nickname.trim(),
      age,
      gender: gender as 'boy' | 'girl',
      avatarId: avatarId || (gender === 'boy' ? 'rocket_boy' : 'star_girl'),
    });
    await db.upsertProgress(child.id, { parentId: req.parentId!, subjectsJson: '{}' });
    await db.upsertRewards(child.id, {});
    res.status(201).json({ child });
  } catch (err) {
    console.error('[user/children POST]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '创建失败' });
  }
});

router.put('/children/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { nickname, age, gender, avatarId, petId } = req.body as {
    nickname?: string; age?: number; gender?: string; avatarId?: string; petId?: string;
  };
  try {
    const db = await getDatabase();
    const child = await db.findChildById(id);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    const updated = await db.updateChild(id, {
      ...(nickname ? { nickname: nickname.trim() } : {}),
      ...(age ? { age } : {}),
      ...(gender ? { gender: gender as 'boy' | 'girl' } : {}),
      ...(avatarId ? { avatarId } : {}),
      ...(petId !== undefined ? { petId } : {}),
    });
    res.json({ child: updated });
  } catch (err) {
    console.error('[user/children PUT]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '更新失败' });
  }
});

router.delete('/children/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDatabase();
    const child = await db.findChildById(id);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    await db.deleteChild(id);
    res.json({ success: true });
  } catch (err) {
    console.error('[user/children DELETE]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '删除失败' });
  }
});

router.put('/settings', async (req: AuthRequest, res: Response) => {
  const { dailyTimeLimit, soundEnabled, musicEnabled, notificationsEnabled } = req.body as {
    dailyTimeLimit?: number; soundEnabled?: boolean; musicEnabled?: boolean; notificationsEnabled?: boolean;
  };
  try {
    const db = await getDatabase();
    const updated = await db.updateParent(req.parentId!, {
      ...(dailyTimeLimit !== undefined ? { dailyTimeLimit } : {}),
      ...(soundEnabled !== undefined ? { soundEnabled } : {}),
      ...(musicEnabled !== undefined ? { musicEnabled } : {}),
      ...(notificationsEnabled !== undefined ? { notificationsEnabled } : {}),
    });
    const safe = { ...updated } as any;
    delete safe.passwordHash;
    res.json({ parent: safe });
  } catch (err) {
    console.error('[user/settings PUT]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '保存失败' });
  }
});

export default router;
