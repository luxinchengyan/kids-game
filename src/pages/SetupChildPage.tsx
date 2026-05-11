import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useUserStore } from '../stores/useUserStore';
import { toStoreChild } from '../lib/sessionMappers';

const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  bg: '#FFF9F0',
  text: '#2D3748',
  muted: '#718096',
  white: '#FFFFFF',
};

const AVATARS = {
  girl: ['star_girl', 'flower_girl', 'rainbow_girl', 'moon_girl'],
  boy: ['rocket_boy', 'dino_boy', 'ninja_boy', 'dragon_boy'],
};

const AVATAR_EMOJIS: Record<string, string> = {
  star_girl: '⭐', flower_girl: '🌸', rainbow_girl: '🌈', moon_girl: '🌙',
  rocket_boy: '🚀', dino_boy: '🦕', ninja_boy: '🥷', dragon_boy: '🐉',
};

export default function SetupChildPage() {
  const navigate = useNavigate();
  const { setCurrentChild, setChildren, children, parent, setParent } = useUserStore();

  const [nickname, setNickname] = useState('');
  const [birthYearMonth, setBirthYearMonth] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl'>('girl');
  const [avatarId, setAvatarId] = useState('star_girl');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return fallback;
  };

  const handleGenderChange = (g: 'boy' | 'girl') => {
    setGender(g);
    setAvatarId(g === 'girl' ? 'star_girl' : 'rocket_boy');
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) { setError('请给宝贝起个昵称 😊'); return; }
    if (nickname.trim().length > 10) { setError('昵称最多10个字'); return; }
    if (!birthYearMonth) { setError('请选择出生年月'); return; }

    setLoading(true);
    setError('');

    try {
      const res = await api.post<{ child: import('../services/authService').Child }>('/api/user/children', {
        nickname: nickname.trim(), birthYearMonth, gender, avatarId, avatarUrl: avatarUrl || undefined,
      });
      const nextChild = toStoreChild(res.child);
      const newChildren = [...children, nextChild];
      setChildren(newChildren);
      if (parent) {
        setParent({
          ...parent,
          children: newChildren.map((item) => item._id || '').filter(Boolean),
        });
      }
      setCurrentChild(nextChild);
      navigate('/', { replace: true });
    } catch (error: unknown) {
      setError(getErrorMessage(error, '创建失败，请重试'));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('请上传图片格式的头像');
      return;
    }

    if (file.size > 600 * 1024) {
      setError('头像图片请控制在 600KB 以内');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(typeof reader.result === 'string' ? reader.result : '');
      setError('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, #FFF9F0 0%, #FFE4E4 50%, #E4F4FF 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: 480, background: COLORS.white, borderRadius: 28, padding: '40px 32px', boxShadow: '0 12px 50px rgba(0,0,0,0.12)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>👶</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>创建宝贝档案</h1>
          <p style={{ color: COLORS.muted, margin: '8px 0 0', fontSize: 14 }}>让我认识你的小天才吧！</p>
        </div>

        {/* 昵称 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>宝贝昵称 *</label>
          <input
            type="text"
            maxLength={10}
            value={nickname}
            onChange={e => { setNickname(e.target.value); setError(''); }}
            placeholder="给宝贝起个可爱的名字"
            autoFocus
            style={{
              width: '100%', border: `2px solid ${nickname ? COLORS.primary : '#E2E8F0'}`,
              borderRadius: 12, padding: '14px 16px', fontSize: 16, outline: 'none',
              boxSizing: 'border-box', transition: 'border-color 0.2s',
            }}
          />
        </div>

        {/* 性别 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 10, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>性别</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['girl', 'boy'] as const).map(g => (
              <motion.button
                key={g}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGenderChange(g)}
                style={{
                  flex: 1, padding: '14px', borderRadius: 12, border: `2px solid ${gender === g ? COLORS.primary : '#E2E8F0'}`,
                  background: gender === g ? '#FFF5F5' : COLORS.white, cursor: 'pointer', fontWeight: 600,
                  fontSize: 15, transition: 'all 0.2s',
                  color: gender === g ? COLORS.primary : COLORS.muted,
                }}
              >
                {g === 'girl' ? '👧 女宝' : '👦 男宝'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 出生年月 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 10, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>出生年月 *</label>
          <input
            type="month"
            value={birthYearMonth}
            onChange={e => { setBirthYearMonth(e.target.value); setError(''); }}
            max={new Date().toISOString().slice(0, 7)}
            style={{
              width: '100%',
              border: `2px solid ${birthYearMonth ? COLORS.primary : '#E2E8F0'}`,
              borderRadius: 12,
              padding: '14px 16px',
              fontSize: 16,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: COLORS.muted, fontSize: 12, margin: '8px 0 0' }}>系统会结合出生年月和后续学习表现动态判断学习年龄与难度。</p>
        </div>

        {/* 头像选择 */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', marginBottom: 10, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>选择头像</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#F7FAFC',
                border: `3px solid ${COLORS.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
              }}
            >
              {avatarUrl ? <img src={avatarUrl} alt="自定义头像预览" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : AVATAR_EMOJIS[avatarId]}
            </div>
            <label
              style={{
                flex: 1,
                border: '1px dashed #CBD5E0',
                borderRadius: 12,
                padding: '12px 14px',
                color: COLORS.muted,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              上传头像（可选）
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {AVATARS[gender].map(av => (
              <motion.button
                key={av}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setAvatarId(av);
                  if (!avatarUrl) return;
                  setAvatarUrl('');
                }}
                style={{
                  width: 64, height: 64, borderRadius: '50%', border: `3px solid ${avatarId === av ? COLORS.primary : '#E2E8F0'}`,
                  background: avatarId === av ? '#FFF5F5' : '#F7FAFC',
                  cursor: 'pointer', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', boxShadow: avatarId === av ? '0 4px 12px rgba(255,107,107,0.3)' : 'none',
                }}
              >
                {AVATAR_EMOJIS[av]}
              </motion.button>
            ))}
          </div>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#E53E3E', fontSize: 13, margin: '0 0 16px', textAlign: 'center' }}>
            {error}
          </motion.p>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading || !nickname.trim() || !birthYearMonth}
          style={{
            width: '100%', padding: '18px', borderRadius: 14,
            background: nickname.trim() && birthYearMonth ? `linear-gradient(135deg, ${COLORS.primary}, #FF8E53)` : '#CBD5E0',
            color: COLORS.white, border: 'none',
            cursor: nickname.trim() && birthYearMonth ? 'pointer' : 'not-allowed',
            fontSize: 17, fontWeight: 800,
            boxShadow: nickname.trim() && birthYearMonth ? '0 4px 20px rgba(255,107,107,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {loading ? '创建中...' : `开始 ${nickname.trim() || '宝贝'} 的学习之旅 🚀`}
        </motion.button>

        {children.length > 0 && (
          <button onClick={() => navigate('/')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: COLORS.muted, cursor: 'pointer', fontSize: 14, padding: 8 }}>
            跳过，稍后再设置
          </button>
        )}
      </motion.div>
    </div>
  );
}
