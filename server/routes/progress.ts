/**
 * 学习进度 + 学习计划路由
 */
import { Router, Response } from 'express';
import { getDatabase } from '../db/factory';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

async function assertChildOwner(db: any, childId: string, parentId: string, res: Response): Promise<boolean> {
  const child = await db.findChildById(childId);
  if (!child || child.parentId !== parentId) {
    res.status(404).json({ code: 'NOT_FOUND', message: '孩子档案不存在' });
    return false;
  }
  return true;
}

router.get('/:childId', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;
    const progress = await db.getProgressByChild(childId);
    res.json({ progress });
  } catch (err) {
    console.error('[progress GET]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.put('/:childId', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;
    const progress = await db.upsertProgress(childId, { ...req.body, parentId: req.parentId });
    res.json({ progress });
  } catch (err) {
    console.error('[progress PUT]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '保存失败' });
  }
});

router.post('/:childId/task', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  const { subject, correct, minutesSpent } = req.body as {
    subject?: string; correct?: boolean; minutesSpent?: number;
  };
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;

    let prog = await db.getProgressByChild(childId);
    if (!prog) {
      prog = await db.upsertProgress(childId, { parentId: req.parentId!, subjectsJson: '{}' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isSameDay = prog.todayDate === todayStr;

    const subjectsMap: Record<string, any> = JSON.parse(prog.subjectsJson || '{}');
    if (subject) {
      const s = subjectsMap[subject] || {
        started: false, level: 1, totalMinutes: 0, tasksCompleted: 0,
        correct: 0, wrong: 0, accuracy: 0, knowledgeUnits: [], reviewQueue: [], unlockedAreas: [],
      };
      s.started = true;
      s.tasksCompleted += 1;
      if (correct) s.correct += 1; else s.wrong += 1;
      s.accuracy = s.tasksCompleted > 0 ? s.correct / s.tasksCompleted : 0;
      if (minutesSpent) s.totalMinutes += minutesSpent;
      subjectsMap[subject] = s;
    }

    const totalCorrect = prog.totalCorrect + (correct ? 1 : 0);
    const totalWrong = prog.totalWrong + (correct ? 0 : 1);
    const totalTasks = prog.totalTasksCompleted + 1;

    const updated = await db.upsertProgress(childId, {
      totalTasksCompleted: totalTasks,
      totalCorrect,
      totalWrong,
      overallAccuracy: totalTasks > 0 ? totalCorrect / totalTasks : 0,
      totalLearningMinutes: prog.totalLearningMinutes + (minutesSpent || 0),
      lastActiveDate: new Date().toISOString(),
      todayDate: todayStr,
      todayTasksCompleted: (isSameDay ? prog.todayTasksCompleted : 0) + 1,
      todayCorrect: (isSameDay ? prog.todayCorrect : 0) + (correct ? 1 : 0),
      todayWrong: (isSameDay ? prog.todayWrong : 0) + (correct ? 0 : 1),
      todayLearningMinutes: (isSameDay ? prog.todayLearningMinutes : 0) + (minutesSpent || 0),
      subjectsJson: JSON.stringify(subjectsMap),
    });

    res.json({ progress: updated });
  } catch (err) {
    console.error('[progress/task POST]', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '记录失败' });
  }
});

// Study Plans
router.get('/:childId/plans', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;
    const plans = await db.getStudyPlansByChild(childId);
    res.json({ plans });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '服务异常' });
  }
});

router.post('/:childId/plans', async (req: AuthRequest, res: Response) => {
  const { childId } = req.params;
  const { title, subject, targetMinutesPerDay, startDate, endDate } = req.body as {
    title?: string; subject?: string; targetMinutesPerDay?: number; startDate?: string; endDate?: string;
  };
  if (!title?.trim() || !subject || !startDate) {
    return res.status(400).json({ code: 'MISSING_PARAMS', message: '参数不完整' });
  }
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;
    const plan = await db.createStudyPlan({
      childId, parentId: req.parentId!,
      title: title.trim(), subject,
      targetMinutesPerDay: targetMinutesPerDay || 15,
      startDate, endDate, active: true,
    });
    res.status(201).json({ plan });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '创建失败' });
  }
});

router.put('/:childId/plans/:planId', async (req: AuthRequest, res: Response) => {
  const { childId, planId } = req.params;
  try {
    const db = await getDatabase();
    if (!await assertChildOwner(db, childId, req.parentId!, res)) return;
    const plan = await db.updateStudyPlan(planId, req.body);
    res.json({ plan });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '更新失败' });
  }
});

router.delete('/:childId/plans/:planId', async (req: AuthRequest, res: Response) => {
  const { planId } = req.params;
  try {
    const db = await getDatabase();
    await db.deleteStudyPlan(planId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ code: 'SERVER_ERROR', message: '删除失败' });
  }
});

export default router;
