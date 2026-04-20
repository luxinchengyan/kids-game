/**
 * 奖励路由
 */
import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

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
  try {
    const db = await getDatabase();
    const child = await db.findChildById(childId);
    if (!child || child.parentId !== req.parentId) {
      return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    }
    const rewards = await db.upsertRewards(childId, req.body);
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
    await db.upsertUserAchievement(childId, achievementId, progress ?? 1);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '保存失败' });
  }
});

export default router;
