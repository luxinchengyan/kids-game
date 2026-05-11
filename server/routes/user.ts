/**
 * 用户/孩子资料路由
 */
import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { calculateAgeFromBirthYearMonth } from '../services/learnerProfile';
import { serializeChild, serializeChildren } from '../services/childSerializer';

const router = Router();
router.use(requireAuth);

function isValidBirthYearMonth(value?: string): value is string {
  return Boolean(value && /^\d{4}-(0[1-9]|1[0-2])$/.test(value));
}

router.get('/children', async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDatabase();
    const children = await db.findChildrenByParent(req.parentId!);
    res.json({ children: await serializeChildren(db, children) });
  } catch (err) {
    console.error('[user/children GET]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.post('/children', async (req: AuthRequest, res: Response) => {
  const { nickname, birthYearMonth, gender, avatarId, avatarUrl } = req.body as {
    nickname?: string; age?: number; birthYearMonth?: string; gender?: string; avatarId?: string; avatarUrl?: string;
  };
  if (!nickname?.trim()) {
    return res.status(400).json({ code: 'INVALID_NICKNAME', message: '请输入宝贝昵称' });
  }
  if (!isValidBirthYearMonth(birthYearMonth)) {
    return res.status(400).json({ code: 'INVALID_BIRTH_YEAR_MONTH', message: '请填写正确的出生年月' });
  }
  const age = calculateAgeFromBirthYearMonth(birthYearMonth);
  if (!age || age < 2 || age > 15) {
    return res.status(400).json({ code: 'INVALID_AGE', message: '年龄范围 2-15' });
  }
  if (!gender || !['boy', 'girl'].includes(gender)) {
    return res.status(400).json({ code: 'INVALID_GENDER', message: '性别参数错误' });
  }
  if (avatarUrl && avatarUrl.length > 900_000) {
    return res.status(400).json({ code: 'AVATAR_TOO_LARGE', message: '头像图片过大，请压缩后重试' });
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
      birthYearMonth,
      gender: gender as 'boy' | 'girl',
      avatarId: avatarId || (gender === 'boy' ? 'rocket_boy' : 'star_girl'),
      avatarUrl: avatarUrl || undefined,
    });
    await db.upsertProgress(child.id, { parentId: req.parentId!, subjectsJson: '{}' });
    await db.upsertRewards(child.id, {});
    res.status(201).json({ child: await serializeChild(db, child) });
  } catch (err) {
    console.error('[user/children POST]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '创建失败' });
  }
});

router.put('/children/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { nickname, age: rawAge, birthYearMonth, gender, avatarId, avatarUrl, petId } = req.body as {
    nickname?: string; age?: number; birthYearMonth?: string; gender?: string; avatarId?: string; avatarUrl?: string; petId?: string;
  };
  try {
    const db = await getDatabase();
    const child = await db.findChildById(id);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    if (birthYearMonth !== undefined && !isValidBirthYearMonth(birthYearMonth)) {
      return res.status(400).json({ code: 'INVALID_BIRTH_YEAR_MONTH', message: '请填写正确的出生年月' });
    }

    const age = birthYearMonth
      ? calculateAgeFromBirthYearMonth(birthYearMonth) ?? undefined
      : rawAge;

    if (age !== undefined && (age < 2 || age > 15)) {
      return res.status(400).json({ code: 'INVALID_AGE', message: '年龄范围 2-15' });
    }
    if (avatarUrl && avatarUrl.length > 900_000) {
      return res.status(400).json({ code: 'AVATAR_TOO_LARGE', message: '头像图片过大，请压缩后重试' });
    }

    const updated = await db.updateChild(id, {
      ...(nickname ? { nickname: nickname.trim() } : {}),
      ...(age !== undefined ? { age } : {}),
      ...(birthYearMonth !== undefined ? { birthYearMonth } : {}),
      ...(gender ? { gender: gender as 'boy' | 'girl' } : {}),
      ...(avatarId ? { avatarId } : {}),
      ...(avatarUrl !== undefined ? { avatarUrl: avatarUrl || undefined } : {}),
      ...(petId !== undefined ? { petId } : {}),
    });
    res.json({ child: updated ? await serializeChild(db, updated) : null });
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
