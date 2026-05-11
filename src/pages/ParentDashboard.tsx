import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { getEffectiveChildAge } from '../lib/learnerProfile';
import {
  buildGrowthInsights,
  buildLearningSystemSnapshot,
} from '../data/homeLearningJourney';
import { getLearningContentSummary } from '../data/learningContent';
import api from '../services/api';
import { ChildSwitcher } from '../components/ChildSwitcher';
import { GrowthLeaderboardSharePanel } from '../components/ParentZone/GrowthLeaderboardSharePanel';
import { getRankBadge, type GrowthLeaderboardEntry } from '../lib/socialGrowth';
import { config } from '../config';
import { buildJourneyThemeSummaries } from '../lib/journeyProgress';
import { APP_SHELL_MAX_WIDTH, PageLayout } from '../components/PageLayout';
import { BrandPill, SectionHeading, SurfaceCard } from '../components/BrandPrimitives';
import { Button } from '../components/Button/Button';

// Sub-components (extracted from old HomePage or newly designed)
function StatCard({ title, value, unit, color }: { title: string; value: string | number; unit?: string; color: string }) {
  return (
    <SurfaceCard
      borderColor={`${color}33`}
      shadow="0 12px 28px rgba(62, 39, 35, 0.06)"
      style={{ padding: '22px 24px' }}
    >
      <div style={{ fontSize: '13px', fontWeight: 900, color: '#8D6E63', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
         <div style={{ fontSize: '32px', fontWeight: 900, color: color }}>{value}</div>
        {unit && <div style={{ fontSize: '14px', fontWeight: 700, color: '#8D6E63' }}>{unit}</div>}
      </div>
    </SurfaceCard>
  );
}

interface SubjectSummary {
  key: string;
  level?: number;
  accuracy?: number;
  reviewQueue?: unknown[];
  tasksCompleted?: number;
}

interface ProgressPayload {
  streakDays?: number;
  subjectsJson?: string;
}

interface RewardsPayload {
  stars?: number;
  level?: number;
  streakDays?: number;
}

interface DashboardRemoteStats {
  stars: number;
  level: number;
  streakDays: number;
  dueReviewCount: number;
  weakPoints: string[];
}

interface LeaderboardApiEntry {
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

interface LeaderboardApiResponse {
  totalParticipants: number;
  entries: LeaderboardApiEntry[];
  currentEntry?: LeaderboardApiEntry;
}

const SUBJECT_LABELS: Record<string, string> = {
  pinyin: '拼音',
  math: '数学',
  english: '英语',
  stories: '故事',
};

function parseSubjectSummaries(subjectsJson?: string): SubjectSummary[] {
  if (!subjectsJson) {
    return [];
  }

  try {
    const parsed = JSON.parse(subjectsJson) as Record<string, Omit<SubjectSummary, 'key'>>;
    return Object.entries(parsed).map(([key, value]) => ({
      key,
      ...value,
    }));
  } catch {
    return [];
  }
}

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { currentChild } = useUserStore((s) => ({
    currentChild: s.currentChild,
  }));
  const [remoteStats, setRemoteStats] = useState<DashboardRemoteStats>({
    stars: 0,
    level: 1,
    streakDays: 0,
    dueReviewCount: 0,
    weakPoints: [],
  });
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState('');
  const [leaderboard, setLeaderboard] = useState<GrowthLeaderboardEntry[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);

  const childAge = getEffectiveChildAge(currentChild);

  useEffect(() => {
    if (!currentChild?._id) return;

    setLoading(true);
    setSyncError('');
    Promise.all([
      api.get<{ rewards: RewardsPayload | null }>(`/api/rewards/${currentChild._id}`),
      api.get<{ progress: ProgressPayload | null }>(`/api/progress/${currentChild._id}`),
      api.get<LeaderboardApiResponse>(`/api/leaderboard?childId=${currentChild._id}&limit=20`),
    ])
      .then(([rewardsRes, progressRes, leaderboardRes]) => {
        const rewards = rewardsRes.rewards ?? {};
        const progress = progressRes.progress ?? {};
        const subjects = parseSubjectSummaries(progress.subjectsJson);
        const dueReviewCount = subjects.reduce((count, subject) => {
          const queue = Array.isArray(subject.reviewQueue) ? subject.reviewQueue.length : 0;
          return count + queue;
        }, 0);
        const weakPoints = subjects
          .filter((subject) => Number(subject.accuracy || 0) > 0 && Number(subject.accuracy || 0) < 0.7)
          .slice(0, 3)
          .map((subject) => `${subject.level ? `Lv.${subject.level}` : ''} ${SUBJECT_LABELS[subject.key] || subject.key}`.trim());

        setRemoteStats({
          stars: rewards.stars || 0,
          level: rewards.level || 1,
          streakDays: rewards.streakDays || progress.streakDays || 0,
          dueReviewCount,
          weakPoints,
        });

        const mergedEntries = [...leaderboardRes.entries];
        if (
          leaderboardRes.currentEntry &&
          !mergedEntries.some((entry) => entry.childId === leaderboardRes.currentEntry?.childId)
        ) {
          mergedEntries.push(leaderboardRes.currentEntry);
        }

        setLeaderboard(
          mergedEntries
            .sort((left, right) => left.rank - right.rank)
            .map((entry) => ({
              ...entry,
              weakPoints: entry.childId === currentChild._id ? weakPoints : [],
              badge: getRankBadge(entry.rank),
            }))
        );
        setTotalParticipants(leaderboardRes.totalParticipants);
      })
      .catch(() => {
        setSyncError('暂时无法同步云端学习数据，当前先展示本地分析结果。');
        setRemoteStats({ stars: 0, level: 1, streakDays: 0, dueReviewCount: 0, weakPoints: [] });
        setLeaderboard([]);
        setTotalParticipants(0);
      })
      .finally(() => setLoading(false));
  }, [currentChild?._id]);
  
  const themeSummaries = buildJourneyThemeSummaries();

  const coverageSummary = useMemo(() => getLearningContentSummary(), []);

  const systemSnapshot = useMemo(() => buildLearningSystemSnapshot({
    childName: currentChild?.nickname || '小朋友',
    age: childAge,
    themes: themeSummaries,
    weakPointLabels: remoteStats.weakPoints,
    dueReviewCount: remoteStats.dueReviewCount,
    coverage: coverageSummary,
  }), [currentChild?.nickname, childAge, themeSummaries, remoteStats.weakPoints, remoteStats.dueReviewCount, coverageSummary]);

  const growthInsights = useMemo(() => buildGrowthInsights({
    childName: currentChild?.nickname || '小朋友',
    age: childAge,
    streakDays: remoteStats.streakDays,
    themes: themeSummaries,
    selectedThemeId: themeSummaries[0]?.id,
  }), [currentChild?.nickname, childAge, remoteStats.streakDays, themeSummaries]);

  return (
    <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
      <SurfaceCard
        borderColor="rgba(33, 150, 243, 0.18)"
        background="linear-gradient(135deg, rgba(255,243,224,0.98), rgba(227,242,253,0.94))"
        style={{ padding: '28px 30px', marginBottom: '28px' }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <SectionHeading
              eyebrow="Parent space"
              title="家长控制中心"
              description={`实时掌握 ${currentChild?.nickname} 的学习进度与成长轨迹。这里保留更清晰的分析阅读体验，但继续沿用神舟号的品牌语气。`}
              accent="#1976D2"
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
              <BrandPill background="#FFF8E1" color="#E65100">连续学习 {remoteStats.streakDays} 天</BrandPill>
              <BrandPill background="#E3F2FD" color="#1565C0">待复习 {remoteStats.dueReviewCount} 项</BrandPill>
              <BrandPill background="#E8F5E9" color="#2E7D32">分析对象 {currentChild?.nickname || '小朋友'}</BrandPill>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <ChildSwitcher />
            <Button variant="secondary" onClick={() => navigate('/')}>
              返回神舟号
            </Button>
          </div>
        </header>
      </SurfaceCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <StatCard title="累计星星" value={remoteStats.stars} color="#FFD600" />
          <StatCard title="成长等级" value={remoteStats.level} unit="Lv" color="#2979FF" />
          <StatCard title="连续学习" value={remoteStats.streakDays} unit="天" color="#FF5252" />
          <StatCard title="待复习" value={remoteStats.dueReviewCount} unit="项" color="#00E676" />
      </div>
      {loading && <p style={{ color: '#5C6BC0', fontWeight: 700, marginTop: -12, marginBottom: 24 }}>正在同步当前宝贝数据...</p>}
      {syncError && <p style={{ color: '#EF6C00', fontWeight: 700, marginTop: -12, marginBottom: 24 }}>{syncError}</p>}

      {config.features.shareProgress && (
        <GrowthLeaderboardSharePanel
          entries={leaderboard}
          currentChildId={currentChild?._id}
          totalParticipants={totalParticipants}
        />
      )}

      <section style={{ marginBottom: '32px' }}>
        <SurfaceCard style={{ padding: '32px' }}>
          <SectionHeading
            eyebrow="Insights"
            title="成长分析与专业建议"
            description="把近期习惯、优势和待加强点收敛到一眼能读懂的家庭分析视图。"
            accent="#1976D2"
            style={{ marginBottom: '24px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <SurfaceCard
                  borderColor="rgba(33, 150, 243, 0.18)"
                  background="linear-gradient(135deg, rgba(227,242,253,0.96), rgba(255,255,255,0.96))"
                  style={{ padding: '20px', marginBottom: '20px' }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#283593', marginBottom: '12px' }}>本周表现概要</h3>
                  <p style={{ color: '#3F51B5', lineHeight: 1.7, fontWeight: 600 }}>{growthInsights.recordSummary}</p>
                </SurfaceCard>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <SurfaceCard borderColor="rgba(76, 175, 80, 0.22)" style={{ padding: '16px' }}>
                    <div style={{ color: '#2E7D32', fontWeight: 900, fontSize: '14px', marginBottom: '8px' }}>优势观察</div>
                    <div style={{ color: '#4CAF50', fontWeight: 600 }}>{growthInsights.advantageNote}</div>
                  </SurfaceCard>
                  <SurfaceCard borderColor="rgba(255, 152, 0, 0.22)" style={{ padding: '16px' }}>
                    <div style={{ color: '#EF6C00', fontWeight: 900, fontSize: '14px', marginBottom: '8px' }}>待加强点</div>
                    <div style={{ color: '#FFA000', fontWeight: 600 }}>{growthInsights.watchoutNote}</div>
                  </SurfaceCard>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1A237E', marginBottom: '16px' }}>下一步学习重点</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {growthInsights.focusSuggestions.map((s, i) => (
                    <SurfaceCard key={i} borderColor="rgba(33, 150, 243, 0.1)" background="rgba(248,251,255,0.96)" style={{ padding: '16px', color: '#616161', fontWeight: 700 }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#3F51B5' }}>#{i+1}</span> {s}
                      </div>
                    </SurfaceCard>
                  ))}
                </div>
              </div>
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionHeading
          eyebrow="System view"
          title="系统运行状态"
          description="从覆盖、承接、复习和迁移四个角度，看当前学习系统是不是在稳定运转。"
          accent="#1976D2"
          style={{ marginBottom: '20px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {systemSnapshot.systemCards.map(card => (
              <SurfaceCard key={card.id} borderColor="rgba(33, 150, 243, 0.12)" style={{ padding: '24px' }}>
                <div style={{ color: '#7986CB', fontWeight: 900, fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>{card.title}</div>
                <div style={{ color: '#424242', fontWeight: 700, marginBottom: '8px' }}>问题：{card.problem}</div>
                <div style={{ color: '#1A237E', fontWeight: 800 }}>方案：{card.fix}</div>
              </SurfaceCard>
            ))}
        </div>
      </section>
    </PageLayout>
  );
}
