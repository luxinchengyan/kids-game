import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { getEffectiveChildAge } from '../lib/learnerProfile';
import {
  buildGrowthInsights,
  buildLearningSystemSnapshot,
} from '../data/homeLearningJourney';
import {
  getLearningMap,
  getGamesByTheme,
} from '../games/registry';
import { getLearningContentSummary } from '../data/learningContent';
import { loadGameProgress } from '../lib/gameHelpers';
import api from '../services/api';
import { ChildSwitcher } from '../components/ChildSwitcher';

// Sub-components (extracted from old HomePage or newly designed)
function StatCard({ title, value, unit, color }: { title: string; value: string | number; unit?: string; color: string }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', border: `1px solid ${color}20` }}>
      <div style={{ fontSize: '14px', fontWeight: 800, color: '#9E9E9E', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <div style={{ fontSize: '32px', fontWeight: 900, color: color }}>{value}</div>
        {unit && <div style={{ fontSize: '14px', fontWeight: 700, color: '#9E9E9E' }}>{unit}</div>}
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  const navigate = useNavigate();
  const currentChild = useUserStore((s) => s.currentChild);
  const [remoteStats, setRemoteStats] = useState({
    stars: 0,
    level: 1,
    streakDays: 0,
    dueReviewCount: 0,
    weakPoints: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const childAge = getEffectiveChildAge(currentChild);

  useEffect(() => {
    if (!currentChild?._id) return;

    setLoading(true);
    Promise.all([
      api.get<{ rewards: any }>(`/api/rewards/${currentChild._id}`),
      api.get<{ progress: any }>(`/api/progress/${currentChild._id}`),
    ])
      .then(([rewardsRes, progressRes]) => {
        const rewards = rewardsRes.rewards || {};
        const progress = progressRes.progress || {};
        const subjects = Object.values(JSON.parse(progress.subjectsJson || '{}')) as any[];
        const dueReviewCount = subjects.reduce((count, subject: any) => {
          const queue = Array.isArray(subject.reviewQueue) ? subject.reviewQueue.length : 0;
          return count + queue;
        }, 0);
        const weakPoints = subjects
          .filter((subject: any) => Number(subject.accuracy || 0) > 0 && Number(subject.accuracy || 0) < 0.7)
          .slice(0, 3)
          .map((subject: any) => `${subject.level ? `Lv.${subject.level}` : ''} ${subject.name || '学习模块'}`.trim());

        setRemoteStats({
          stars: rewards.stars || 0,
          level: rewards.level || 1,
          streakDays: rewards.streakDays || progress.streakDays || 0,
          dueReviewCount,
          weakPoints,
        });
      })
      .catch(() => {
        setRemoteStats({ stars: 0, level: 1, streakDays: 0, dueReviewCount: 0, weakPoints: [] });
      })
      .finally(() => setLoading(false));
  }, [currentChild?._id]);
  
  const learningMap = useMemo(() => getLearningMap(), []);
  const themeSummaries = useMemo(() => learningMap.map(({ hub }) => {
    const themeGames = getGamesByTheme(hub.id);
    const playedCount = themeGames.filter(g => loadGameProgress(g.id)?.completedSessions > 0).length;
    const totalStars = themeGames.reduce((sum, g) => sum + (loadGameProgress(g.id)?.bestStars ?? 0), 0);
    return {
      id: hub.id,
      name: hub.name,
      progress: { playedCount, totalGames: themeGames.length, totalStars }
    };
  }), [learningMap]);

  const coverageSummary = useMemo(() => getLearningContentSummary(), []);

  const systemSnapshot = useMemo(() => buildLearningSystemSnapshot({
    childName: currentChild?.nickname || '小朋友',
    age: childAge,
    themes: themeSummaries as any,
    weakPointLabels: remoteStats.weakPoints,
    dueReviewCount: remoteStats.dueReviewCount,
    coverage: coverageSummary,
  }), [currentChild?.nickname, childAge, themeSummaries, remoteStats.weakPoints, remoteStats.dueReviewCount, coverageSummary]);

  const growthInsights = useMemo(() => buildGrowthInsights({
    childName: currentChild?.nickname || '小朋友',
    age: childAge,
    streakDays: remoteStats.streakDays,
    themes: themeSummaries as any,
    selectedThemeId: themeSummaries[0]?.id,
  }), [currentChild?.nickname, childAge, remoteStats.streakDays, themeSummaries]);

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1A237E', marginBottom: '8px' }}>家长控制中心</h1>
            <p style={{ color: '#5C6BC0', fontWeight: 600 }}>实时掌握 {currentChild?.nickname} 的学习进度与成长轨迹</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ChildSwitcher />
            <button 
              onClick={() => navigate('/')}
              style={{ padding: '12px 24px', borderRadius: '14px', border: 'none', background: '#FFFFFF', color: '#1A237E', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            >
              返回神舟号
            </button>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard title="累计星星" value={remoteStats.stars} color="#FFD600" />
          <StatCard title="成长等级" value={remoteStats.level} unit="Lv" color="#2979FF" />
          <StatCard title="连续学习" value={remoteStats.streakDays} unit="天" color="#FF5252" />
          <StatCard title="待复习" value={remoteStats.dueReviewCount} unit="项" color="#00E676" />
        </div>
        {loading && <p style={{ color: '#5C6BC0', fontWeight: 700, marginTop: -24, marginBottom: 24 }}>正在同步当前宝贝数据...</p>}

        <section style={{ marginBottom: '40px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1A237E', marginBottom: '24px' }}>💡 成长分析与专业建议</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <div style={{ padding: '20px', background: '#E8EAF6', borderRadius: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#283593', marginBottom: '12px' }}>本周表现概要</h3>
                  <p style={{ color: '#3F51B5', lineHeight: 1.7, fontWeight: 600 }}>{growthInsights.recordSummary}</p>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ padding: '16px', border: '2px solid #C8E6C9', borderRadius: '16px' }}>
                    <div style={{ color: '#2E7D32', fontWeight: 900, fontSize: '14px', marginBottom: '8px' }}>优势观察</div>
                    <div style={{ color: '#4CAF50', fontWeight: 600 }}>{growthInsights.advantageNote}</div>
                  </div>
                  <div style={{ padding: '16px', border: '2px solid #FFECB3', borderRadius: '16px' }}>
                    <div style={{ color: '#EF6C00', fontWeight: 900, fontSize: '14px', marginBottom: '8px' }}>待加强点</div>
                    <div style={{ color: '#FFA000', fontWeight: 600 }}>{growthInsights.watchoutNote}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1A237E', marginBottom: '16px' }}>下一步学习重点</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {growthInsights.focusSuggestions.map((s, i) => (
                    <div key={i} style={{ padding: '16px', background: '#F5F5F5', borderRadius: '16px', color: '#616161', fontWeight: 700, display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#3F51B5' }}>#{i+1}</span> {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1A237E', marginBottom: '24px' }}>🛠️ 系统运行状态</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {systemSnapshot.systemCards.map(card => (
              <div key={card.id} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '24px', border: '1px solid #E0E0E0' }}>
                <div style={{ color: '#7986CB', fontWeight: 900, fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>{card.title}</div>
                <div style={{ color: '#424242', fontWeight: 700, marginBottom: '8px' }}>问题：{card.problem}</div>
                <div style={{ color: '#1A237E', fontWeight: 800 }}>方案：{card.fix}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
