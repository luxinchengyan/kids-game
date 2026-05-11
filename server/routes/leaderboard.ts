import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { getGlobalLeaderboard } from '../services/leaderboard';

const router = Router();
router.use(requireAuth);

router.get('/', async (req: AuthRequest, res: Response) => {
  const { childId, limit } = req.query as { childId?: string; limit?: string };
  const parsedLimit = Number(limit);
  const topLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 20;

  try {
    const db = await getDatabase();

    if (childId) {
      const child = await db.findChildById(childId);
      if (!child || child.parentId !== req.parentId) {
        return res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
      }
    }

    const leaderboard = await getGlobalLeaderboard(db, {
      currentParentId: req.parentId,
      currentChildId: childId,
      limit: topLimit,
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('[leaderboard GET]', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: '排行榜加载失败' });
  }
});

export default router;
