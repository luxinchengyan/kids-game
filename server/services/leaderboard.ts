import type { DBChild, IDatabase } from '../db/types';

export interface LeaderboardEntry {
  childId: string;
  nickname: string;
  avatarId: string;
  age: number;
  stars: number;
  level: number;
  streakDays: number;
  dueReviewCount: number;
  accuracy: number;
  tasksCompleted: number;
  growthScore: number;
  rank: number;
}

interface RankedChild {
  child: DBChild;
  stars: number;
  level: number;
  streakDays: number;
  dueReviewCount: number;
  accuracy: number;
  tasksCompleted: number;
  growthScore: number;
}

function maskNickname(nickname: string): string {
  if (nickname.length <= 1) {
    return `${nickname}*`;
  }

  return `${nickname.slice(0, 1)}${'*'.repeat(Math.max(1, nickname.length - 1))}`;
}

function calculateGrowthScore(entry: Omit<RankedChild, 'child' | 'growthScore'>): number {
  return Math.round(
    entry.stars * 12 +
      entry.level * 120 +
      entry.streakDays * 25 +
      entry.accuracy * 260 +
      entry.tasksCompleted * 4 -
      entry.dueReviewCount * 3
  );
}

function getDueReviewCount(subjectsJson?: string): number {
  if (!subjectsJson) {
    return 0;
  }

  try {
    const parsed = JSON.parse(subjectsJson) as Record<string, { reviewQueue?: unknown[] }>;
    return Object.values(parsed).reduce((count, subject) => {
      return count + (Array.isArray(subject.reviewQueue) ? subject.reviewQueue.length : 0);
    }, 0);
  } catch {
    return 0;
  }
}

function serializeEntry(entry: RankedChild, rank: number, currentParentId?: string): LeaderboardEntry {
  const isCurrentFamily = currentParentId !== undefined && entry.child.parentId === currentParentId;

  return {
    childId: entry.child.id,
    nickname: isCurrentFamily ? entry.child.nickname : maskNickname(entry.child.nickname),
    avatarId: entry.child.avatarId,
    age: entry.child.age,
    stars: entry.stars,
    level: entry.level,
    streakDays: entry.streakDays,
    dueReviewCount: entry.dueReviewCount,
    accuracy: entry.accuracy,
    tasksCompleted: entry.tasksCompleted,
    growthScore: entry.growthScore,
    rank,
  };
}

export async function getGlobalLeaderboard(
  db: IDatabase,
  options: {
    currentParentId?: string;
    currentChildId?: string;
    limit?: number;
  } = {}
): Promise<{
  totalParticipants: number;
  entries: LeaderboardEntry[];
  currentEntry?: LeaderboardEntry;
}> {
  const { currentParentId, currentChildId, limit = 20 } = options;
  const children = await db.listChildren();

  const ranked = (
    await Promise.all(
      children.map(async (child) => {
        const [progress, rewards] = await Promise.all([
          db.getProgressByChild(child.id),
          db.getRewardsByChild(child.id),
        ]);

        const stars = rewards?.stars ?? 0;
        const level = rewards?.level ?? 1;
        const streakDays = Math.max(rewards?.streakDays ?? 0, progress?.streakDays ?? 0);
        const dueReviewCount = getDueReviewCount(progress?.subjectsJson);
        const accuracy = progress?.overallAccuracy ?? 0;
        const tasksCompleted = progress?.totalTasksCompleted ?? 0;

        return {
          child,
          stars,
          level,
          streakDays,
          dueReviewCount,
          accuracy,
          tasksCompleted,
          growthScore: calculateGrowthScore({
            stars,
            level,
            streakDays,
            dueReviewCount,
            accuracy,
            tasksCompleted,
          }),
        } satisfies RankedChild;
      })
    )
  ).sort((left, right) => {
    const scoreGap = right.growthScore - left.growthScore;
    if (scoreGap !== 0) {
      return scoreGap;
    }

    const streakGap = right.streakDays - left.streakDays;
    if (streakGap !== 0) {
      return streakGap;
    }

    return right.accuracy - left.accuracy;
  });

  const entries = ranked.slice(0, limit).map((entry, index) => serializeEntry(entry, index + 1, currentParentId));
  const currentIndex = currentChildId ? ranked.findIndex((entry) => entry.child.id === currentChildId) : -1;

  return {
    totalParticipants: ranked.length,
    entries,
    currentEntry:
      currentIndex >= 0 ? serializeEntry(ranked[currentIndex], currentIndex + 1, currentParentId) : undefined,
  };
}
