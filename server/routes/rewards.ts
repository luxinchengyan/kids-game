/**
 * 奖励路由
 */
import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';
import type { DBRewards } from '../db/types';

const router = Router();
router.use(requireAuth);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function parseRewardsUpdate(body: Record<string, unknown>): { data?: Partial<DBRewards>; error?: string } {
  const data: Partial<DBRewards> = {};

  const numericFields: Array<keyof Pick<DBRewards, 'stars' | 'coins' | 'level' | 'xp' | 'xpToNextLevel' | 'streakDays'>> = [
    'stars',
    'coins',
    'level',
    'xp',
    'xpToNextLevel',
    'streakDays',
  ];

  for (const field of numericFields) {
    const value = body[field];
    if (value === undefined) continue;
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      return { error: `${field} 必须是大于等于 0 的数字` };
    }
    data[field] = value;
  }

  if (body.lastCheckInDate !== undefined) {
    if (typeof body.lastCheckInDate !== 'string') {
      return { error: 'lastCheckInDate 必须是字符串' };
    }
    data.lastCheckInDate = body.lastCheckInDate;
  }

  if (body.currentPetId !== undefined) {
    if (body.currentPetId !== null && typeof body.currentPetId !== 'string') {
      return { error: 'currentPetId 必须是字符串或 null' };
    }
    data.currentPetId = body.currentPetId ?? undefined;
  }

  const listFields: Array<[keyof Pick<DBRewards, 'collectedStickersJson' | 'collectedBadgesJson' | 'unlockedCharactersJson' | 'unlockedPetsJson' | 'unlockedAreasJson'>, unknown]> = [
    ['collectedStickersJson', body.collectedStickers ?? body.collectedStickersJson],
    ['collectedBadgesJson', body.collectedBadges ?? body.collectedBadgesJson],
    ['unlockedCharactersJson', body.unlockedCharacters ?? body.unlockedCharactersJson],
    ['unlockedPetsJson', body.unlockedPets ?? body.unlockedPetsJson],
    ['unlockedAreasJson', body.unlockedAreas ?? body.unlockedAreasJson],
  ];

  for (const [field, value] of listFields) {
    if (value === undefined) continue;
    if (typeof value === 'string') {
      data[field] = value;
      continue;
    }
    if (!isStringArray(value)) {
      return { error: `${field} 必须是字符串数组或 JSON 字符串` };
    }
    data[field] = JSON.stringify(value);
  }

  const petsValue = body.pets ?? body.petsJson;
  if (petsValue !== undefined) {
    if (typeof petsValue === 'string') {
      data.petsJson = petsValue;
    } else if (Array.isArray(petsValue)) {
      data.petsJson = JSON.stringify(petsValue);
    } else {
      return { error: 'pets 必须是数组或 JSON 字符串' };
    }
  }

  return { data };
}

router.get('/:childId', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  try {
    const db = await getDatabase();
    const child = await db.findChildById(childId);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    const rewards = await db.getRewardsByChild(childId);
    res.json({ rewards });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.put('/:childId', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  const parsed = parseRewardsUpdate(req.body as Record<string, unknown>);
  if (parsed.error) {
    return res.status(400).json({ code: 'INVALID_REWARDS', message: parsed.error });
  }
  try {
    const db = await getDatabase();
    const child = await db.findChildById(childId);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    const rewards = await db.upsertRewards(childId, parsed.data ?? {});
    res.json({ rewards });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '保存失败' });
  }
});

router.get('/:childId/achievements', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  try {
    const db = await getDatabase();
    const child = await db.findChildById(childId);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    const achievements = await db.getUserAchievements(childId);
    res.json({ achievements });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.post('/:childId/achievements', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  const { achievementId, progress } = req.body as { achievementId?: string; progress?: number };
  if (!achievementId) {
    return res.status(400).json({ code: 'MISSING_PARAMS', message: '缺少成就ID' });
  }
  try {
    const db = await getDatabase();
    const child = await db.findChildById(childId);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    await db.upsertUserAchievement(childId, achievementId, progress ?? 1);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '保存失败' });
  }
});

export default router;
