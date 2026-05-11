import { useMemo, useState } from 'react';
import { track } from '../../lib/analytics';
import {
  buildMomentsShareText,
  downloadMomentsPoster,
  getShareAudienceSize,
  type GrowthLeaderboardEntry,
} from '../../lib/socialGrowth';

interface GrowthLeaderboardSharePanelProps {
  entries: GrowthLeaderboardEntry[];
  currentChildId?: string;
  totalParticipants: number;
}

export function GrowthLeaderboardSharePanel({
  entries,
  currentChildId,
  totalParticipants,
}: GrowthLeaderboardSharePanelProps) {
  const [shareStatus, setShareStatus] = useState('');

  const currentEntry = useMemo(
    () => entries.find((entry) => entry.childId === currentChildId) ?? entries[0] ?? null,
    [currentChildId, entries]
  );
  const audienceSize = useMemo(
    () => getShareAudienceSize(totalParticipants, currentEntry?.rank),
    [currentEntry?.rank, totalParticipants]
  );

  if (!currentEntry) {
    return null;
  }

  const shareText = buildMomentsShareText(currentEntry, audienceSize);

  const copyShareText = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareText);
      return;
    }

    const input = document.createElement('textarea');
    input.value = shareText;
    input.setAttribute('readonly', 'true');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(input);

    if (!copied) {
      throw new Error('copy_failed');
    }
  };

  const handleCopy = async () => {
    try {
      await copyShareText();
      setShareStatus('分享文案已复制，可以直接粘贴到朋友圈。');
      track('share_copy', { childId: currentEntry.childId, rank: currentEntry.rank });
    } catch {
      setShareStatus('当前浏览器不支持自动复制，请手动长按复制。');
    }
  };

  const handleShare = async () => {
    track('share_attempt', { childId: currentEntry.childId, rank: currentEntry.rank });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentEntry.nickname} 的成长战报`,
          text: shareText,
        });
        setShareStatus('已调用系统分享，请选择微信后转发到朋友圈。');
        track('share_success', { childId: currentEntry.childId, rank: currentEntry.rank });
        return;
      } catch {
        // Fall back to copy flow below.
      }
    }

    await handleCopy();
  };

  const handleDownload = () => {
    downloadMomentsPoster(currentEntry, audienceSize);
    setShareStatus('海报已下载，可直接发送给微信或朋友圈。');
    track('share_poster_download', { childId: currentEntry.childId, rank: currentEntry.rank });
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '32px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#6A1B9A', marginBottom: '8px' }}>🏆 全站成长排行榜</h2>
            <p style={{ color: '#7E57C2', fontWeight: 600, margin: 0 }}>
              用成长值展示持续打卡、任务完成和正确率，让所有孩子都能在同一榜单里良性竞争。
            </p>
          </div>
          <div
            style={{
              minWidth: '220px',
              background: 'linear-gradient(135deg, #FFF3E0, #F3E5F5)',
              borderRadius: '24px',
              padding: '20px 24px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#8E24AA', marginBottom: '8px' }}>当前冲榜宝贝</div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#4A148C' }}>
              {currentEntry.badge} 第 {currentEntry.rank} 名
            </div>
            <div style={{ color: '#6A1B9A', fontWeight: 700, marginTop: '6px' }}>
              成长值 {currentEntry.growthScore} · Lv.{currentEntry.level} · 共 {audienceSize} 位用户
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
          {entries.map((entry) => (
            <div
              key={entry.childId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                padding: '16px 18px',
                borderRadius: '20px',
                background: entry.childId === currentEntry.childId ? '#F3E5F5' : '#F8F9FA',
                border: entry.childId === currentEntry.childId ? '2px solid #CE93D8' : '1px solid #ECEFF1',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#6A1B9A' }}>
                    {entry.badge} #{entry.rank}
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#3E2723' }}>{entry.nickname}</div>
                    <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700 }}>
                      {entry.age} 岁 · {entry.tasksCompleted} 个任务
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#6A1B9A', fontWeight: 800 }}>
                  {entry.childId === currentEntry.childId ? '当前宝贝' : '全站冲榜中'}
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(104px, 1fr))',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 800 }}>成长值</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#8E24AA' }}>{entry.growthScore}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 800 }}>星星</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#FB8C00' }}>⭐ {entry.stars}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 800 }}>等级</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#1E88E5' }}>Lv.{entry.level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 800 }}>正确率</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#43A047' }}>{Math.round(entry.accuracy * 100)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #E3F2FD, #FFF8E1)',
            borderRadius: '24px',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '520px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1565C0', marginBottom: '10px' }}>📣 朋友圈分享战报</h3>
              <p style={{ color: '#546E7A', lineHeight: 1.7, fontWeight: 600, margin: 0 }}>
                一键生成适合朋友圈的成长文案和海报，把孩子的努力晒出来，邀请亲友一起良性竞争、共同打卡。
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => void handleShare()}
                style={{
                  padding: '14px 20px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#43A047',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                分享到朋友圈
              </button>
              <button
                onClick={() => void handleCopy()}
                style={{
                  padding: '14px 20px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#1E88E5',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                复制文案
              </button>
              <button
                onClick={handleDownload}
                style={{
                  padding: '14px 20px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#8E24AA',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                下载海报
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: '18px',
              padding: '16px',
              borderRadius: '16px',
              background: '#FFFFFF',
              color: '#455A64',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            {shareText}
          </div>

          <p style={{ margin: '12px 0 0', color: '#EF6C00', fontWeight: 700 }}>
            {shareStatus || '推荐顺序：先点“下载海报”保存图片，再分享到微信朋友圈。'}
          </p>
        </div>
      </div>
    </section>
  );
}
