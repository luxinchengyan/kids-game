import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useUserStore } from '../stores/useUserStore';

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
  star_girl: '⭐', flower_girl: '🌸', rainbow_girl: '��', moon_girl: '🌙',
  rocket_boy: '🚀', dino_boy: '🦕', ninja_boy: '🥷', dragon_boy: '🐉',
};

export default function SetupChildPage() {
  const navigate = useNavigate();
  const { setCurrentChild, setChildren, children, parent } = useUserStore();

  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(5);
  const [gender, setGender] = useState<'boy' | 'girl'>('girl');
  const [avatarId, setAvatarId] = useState('star_girl');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenderChange = (g: 'boy' | 'girl') => {
    setGender(g);
    setAvatarId(g === 'girl' ? 'star_girl' : 'rocket_boy');
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) { setError('请给宝贝起个昵称 😊'); return; }
    if (nickname.trim().length > 10) { setError('昵称最多10个字'); return; }

    setLoading(true);
    setError('');

    try {
      const res = await api.post<{ child: any }>('/api/user/children', {
        nickname: nickname.trim(), age, gender, avatarId,
      });
      const child = res.child;

      const newChildren = [...children, {
        _id: child.id, parentId: child.parentId,
        nickname: child.nickname, age: child.age,
        gender: child.gender, avatarId: child.avatarId,
      }];
      setChildren(newChildren);
      setCurrentChild({
        _id: child.id, parentId: child.parentId,
        nickname: child.nickname, age: child.age,
        gender: child.gender, avatarId: child.avatarId,
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || '创建失败，请重试');
    } finally {
      setLoading(false);
    }
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

        {/* 年龄 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 10, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>年龄: <span style={{ color: COLORS.primary, fontSize: 18 }}>{age}</span> 岁</label>
          <input
            type="range" min={1} max={12} value={age}
            onChange={e => setAge(Number(e.target.value))}
            style={{ width: '100%', accentColor: COLORS.primary }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.muted, fontSize: 12, marginTop: 4 }}>
            <span>1岁</span><span>6岁</span><span>12岁</span>
          </div>
        </div>

        {/* 头像选择 */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', marginBottom: 10, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>选择头像</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {AVATARS[gender].map(av => (
              <motion.button
                key={av}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAvatarId(av)}
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
          disabled={loading || !nickname.trim()}
          style={{
            width: '100%', padding: '18px', borderRadius: 14,
            background: nickname.trim() ? `linear-gradient(135deg, ${COLORS.primary}, #FF8E53)` : '#CBD5E0',
            color: COLORS.white, border: 'none',
            cursor: nickname.trim() ? 'pointer' : 'not-allowed',
            fontSize: 17, fontWeight: 800,
            boxShadow: nickname.trim() ? '0 4px 20px rgba(255,107,107,0.4)' : 'none',
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
