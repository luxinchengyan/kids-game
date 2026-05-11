import { getEffectiveChildAge } from './learnerProfile';
import type { Child } from '../types';

export interface GrowthSnapshot {
  child: Child;
  stars: number;
  level: number;
  streakDays: number;
  dueReviewCount: number;
  accuracy: number;
  tasksCompleted: number;
  weakPoints: string[];
}

export interface GrowthLeaderboardEntry {
  childId: string;
  nickname: string;
  avatarId?: string;
  age: number;
  stars: number;
  level: number;
  streakDays: number;
  dueReviewCount: number;
  accuracy: number;
  tasksCompleted: number;
  weakPoints: string[];
  growthScore: number;
  rank: number;
  badge: string;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function calculateGrowthScore(snapshot: GrowthSnapshot): number {
  return Math.round(
    snapshot.stars * 12 +
      snapshot.level * 120 +
      snapshot.streakDays * 25 +
      snapshot.accuracy * 260 +
      snapshot.tasksCompleted * 4 -
      snapshot.dueReviewCount * 3
  );
}

export function buildGrowthLeaderboard(snapshots: GrowthSnapshot[]): GrowthLeaderboardEntry[] {
  return [...snapshots]
    .sort((left, right) => {
      const scoreGap = calculateGrowthScore(right) - calculateGrowthScore(left);
      if (scoreGap !== 0) {
        return scoreGap;
      }

      const streakGap = right.streakDays - left.streakDays;
      if (streakGap !== 0) {
        return streakGap;
      }

      return right.accuracy - left.accuracy;
    })
    .map((snapshot, index) => ({
      childId: snapshot.child._id || `child-${index}`,
      nickname: snapshot.child.nickname,
      age: getEffectiveChildAge(snapshot.child),
      stars: snapshot.stars,
      level: snapshot.level,
      streakDays: snapshot.streakDays,
      dueReviewCount: snapshot.dueReviewCount,
      accuracy: snapshot.accuracy,
      tasksCompleted: snapshot.tasksCompleted,
      weakPoints: snapshot.weakPoints,
      growthScore: calculateGrowthScore(snapshot),
      rank: index + 1,
      badge: getRankBadge(index + 1),
    }));
}

export function getRankBadge(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '🏅';
}

export function getShareAudienceSize(total: number, rank?: number): number {
  return Math.max(total, rank ?? 0, 1);
}

export function buildMomentsShareText(entry: GrowthLeaderboardEntry, total: number): string {
  const audienceSize = getShareAudienceSize(total, entry.rank);
  const weakPointLine =
    entry.weakPoints.length > 0
      ? `接下来重点巩固：${entry.weakPoints.join('、')}。`
      : '这一周保持得很稳，继续坚持每日小任务。';

  return [
    `【童梦神舟成长战报】${entry.nickname} 在全站成长榜中获得第 ${entry.rank}/${audienceSize} 名 ${entry.badge}`,
    `成长值 ${entry.growthScore} · Lv.${entry.level} · ⭐ ${entry.stars} · 连续学习 ${entry.streakDays} 天`,
    `已完成 ${entry.tasksCompleted} 个任务，当前正确率 ${Math.round(entry.accuracy * 100)}%`,
    weakPointLine,
    '欢迎一起来打卡学习、良性竞争，在快乐中成长！',
  ].join('\n');
}

export function buildMomentsPosterSvg(entry: GrowthLeaderboardEntry, total: number): string {
  const audienceSize = getShareAudienceSize(total, entry.rank);
  const weakPointText = entry.weakPoints.length > 0 ? entry.weakPoints.join(' / ') : '继续保持稳定节奏';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF4D6"/>
      <stop offset="50%" stop-color="#FFE8F3"/>
      <stop offset="100%" stop-color="#E0F2FF"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1440" fill="url(#bg)" rx="48"/>
  <rect x="60" y="60" width="960" height="1320" rx="40" fill="#FFFFFF" opacity="0.95"/>
  <text x="540" y="170" text-anchor="middle" font-size="56" font-weight="700" fill="#6D4C41">童梦神舟 · 成长战报</text>
  <text x="540" y="255" text-anchor="middle" font-size="120">${entry.badge}</text>
  <text x="540" y="355" text-anchor="middle" font-size="72" font-weight="700" fill="#3E2723">${escapeXml(entry.nickname)}</text>
  <text x="540" y="425" text-anchor="middle" font-size="36" fill="#8D6E63">${entry.age} 岁 · 全站成长榜第 ${entry.rank}/${audienceSize} 名</text>

  <rect x="140" y="500" width="800" height="220" rx="28" fill="#FFF8E1" stroke="#FFB300" stroke-width="4"/>
  <text x="220" y="585" font-size="36" fill="#8D6E63">成长值</text>
  <text x="220" y="665" font-size="96" font-weight="700" fill="#FF8F00">${entry.growthScore}</text>
  <text x="650" y="585" font-size="36" fill="#8D6E63">正确率</text>
  <text x="650" y="665" font-size="96" font-weight="700" fill="#2196F3">${Math.round(entry.accuracy * 100)}%</text>

  <rect x="140" y="770" width="380" height="180" rx="24" fill="#F5F5F5"/>
  <rect x="560" y="770" width="380" height="180" rx="24" fill="#F5F5F5"/>
  <text x="190" y="840" font-size="32" fill="#8D6E63">星星</text>
  <text x="190" y="915" font-size="80" font-weight="700" fill="#FF9800">⭐ ${entry.stars}</text>
  <text x="610" y="840" font-size="32" fill="#8D6E63">连续学习</text>
  <text x="610" y="915" font-size="80" font-weight="700" fill="#E53935">${entry.streakDays} 天</text>

  <rect x="140" y="1000" width="800" height="180" rx="24" fill="#E8F5E9"/>
  <text x="180" y="1070" font-size="32" fill="#2E7D32">本周任务完成</text>
  <text x="180" y="1145" font-size="80" font-weight="700" fill="#2E7D32">${entry.tasksCompleted}</text>
  <text x="520" y="1070" font-size="32" fill="#2E7D32">下一步重点</text>
  <text x="520" y="1145" font-size="40" font-weight="700" fill="#1B5E20">${escapeXml(weakPointText)}</text>

  <text x="540" y="1280" text-anchor="middle" font-size="36" fill="#6D4C41">晒出成长战报，邀请好友一起良性竞争</text>
  <text x="540" y="1340" text-anchor="middle" font-size="28" fill="#9E9E9E">让孩子在快乐中学习，在学习中成长</text>
</svg>`.trim();
}

export function downloadMomentsPoster(entry: GrowthLeaderboardEntry, total: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  const svg = buildMomentsPosterSvg(entry, total);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${entry.nickname}-growth-poster.svg`;
  anchor.click();
  URL.revokeObjectURL(url);
}
