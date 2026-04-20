import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../services/authService';
import { useUserStore } from '../stores/useUserStore';
import { config } from '../config';

type LoginStep = 'phone' | 'otp';

const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  bg: '#FFF9F0',
  text: '#2D3748',
  muted: '#718096',
  white: '#FFFFFF',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setParent, setChildren, setCurrentChild, setAuthenticated } = useUserStore();

  const [step, setStep] = useState<LoginStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [debugCode, setDebugCode] = useState('');

  const startCountdown = useCallback(() => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  }, []);

  const handleSendOtp = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的手机号码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await authService.sendOtp(phone);
      if (res.debugCode) setDebugCode(res.debugCode);
      setStep('otp');
      startCountdown();
    } catch (err: any) {
      setError(err.message || '发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('请输入6位验证码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await authService.verifyOtp(phone, otp);
      // 同步到全局状态
      setParent({
        phone: result.parent.phone,
        settings: {
          dailyTimeLimit: result.parent.dailyTimeLimit,
          soundEnabled: result.parent.soundEnabled,
          musicEnabled: result.parent.musicEnabled,
          notificationsEnabled: result.parent.notificationsEnabled,
        },
        children: result.children.map(c => c.id),
        _id: result.parent.id,
      });
      setChildren(result.children.map(c => ({
        _id: c.id,
        parentId: c.parentId,
        nickname: c.nickname,
        age: c.age,
        gender: c.gender,
        avatarId: c.avatarId,
      })));
      if (result.children.length > 0) {
        const first = result.children[0];
        setCurrentChild({ _id: first.id, parentId: first.parentId, nickname: first.nickname, age: first.age, gender: first.gender, avatarId: first.avatarId });
      }
      setAuthenticated(true);

      if (result.isNewUser || result.children.length === 0) {
        navigate('/setup-child', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || '验证失败，请检查验证码');
    } finally {
      setLoading(false);
    }
  };

  const handleTrialLogin = () => {
    setParent({
      phone: '13800000000',
      settings: { dailyTimeLimit: 60, soundEnabled: true, musicEnabled: true, notificationsEnabled: true },
      children: ['trial-child-1'],
      _id: 'trial-parent-1',
    });
    setChildren([{ _id: 'trial-child-1', parentId: 'trial-parent-1', nickname: '试用小朋友', age: 5, gender: 'girl', avatarId: 'star_girl' }]);
    setCurrentChild({ _id: 'trial-child-1', parentId: 'trial-parent-1', nickname: '试用小朋友', age: 5, gender: 'girl', avatarId: 'star_girl' });
    setAuthenticated(true);
    navigate('/', { replace: true });
  };

  const handleWechatLogin = async () => {
    try {
      const url = await authService.getWechatAuthUrl();
      window.location.href = url;
    } catch {
      setError('微信登录暂时不可用，请使用手机号登录');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 420, background: COLORS.white, borderRadius: 24, padding: '40px 32px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚀</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, margin: 0 }}>童梦神舟</h1>
          <p style={{ color: COLORS.muted, margin: '8px 0 0', fontSize: 14 }}>智趣成长，陪伴每一天</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>手机号码</label>
              <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${phone ? COLORS.primary : '#E2E8F0'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <span style={{ padding: '14px 16px', background: '#F7FAFC', color: COLORS.muted, fontSize: 14, borderRight: '1px solid #E2E8F0' }}>+86</span>
                <input
                  type="tel"
                  maxLength={11}
                  value={phone}
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                  placeholder="请输入手机号码"
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 16px', fontSize: 16, background: 'transparent' }}
                  autoFocus
                />
              </div>

              {error && <p style={{ color: '#E53E3E', fontSize: 13, margin: '8px 0 0' }}>{error}</p>}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSendOtp}
                disabled={loading || phone.length !== 11}
                style={{
                  width: '100%', marginTop: 20, padding: '16px', borderRadius: 12,
                  background: phone.length === 11 ? COLORS.primary : '#CBD5E0',
                  color: COLORS.white, border: 'none', cursor: phone.length === 11 ? 'pointer' : 'not-allowed',
                  fontSize: 16, fontWeight: 700, transition: 'background 0.2s',
                }}
              >
                {loading ? '发送中...' : '获取验证码'}
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
                <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
                <span style={{ padding: '0 12px', color: COLORS.muted, fontSize: 13 }}>或</span>
                <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleWechatLogin}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, background: '#07C160',
                  color: COLORS.white, border: 'none', cursor: 'pointer',
                  fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>💬</span> 微信一键登录
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <button onClick={() => { setStep('phone'); setOtp(''); setError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.muted, fontSize: 13, padding: 0 }}>← 返回</button>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 14, margin: '0 0 20px' }}>验证码已发送至 <strong style={{ color: COLORS.text }}>+86 {phone}</strong></p>
              {debugCode && (
                <div style={{ background: '#FFF3CD', border: '1px solid #FFD700', borderRadius: 8, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: '#856404' }}>
                  🔧 开发模式验证码: <strong>{debugCode}</strong>
                </div>
              )}

              <label style={{ display: 'block', marginBottom: 8, color: COLORS.text, fontWeight: 600, fontSize: 14 }}>输入验证码</label>
              <input
                type="number"
                maxLength={6}
                value={otp}
                onChange={e => { setOtp(e.target.value.slice(0, 6)); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                placeholder="6 位数字验证码"
                style={{
                  width: '100%', border: `2px solid ${otp ? COLORS.secondary : '#E2E8F0'}`,
                  borderRadius: 12, padding: '14px 16px', fontSize: 24, fontWeight: 700,
                  textAlign: 'center', outline: 'none', letterSpacing: 8, boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                autoFocus
              />

              {error && <p style={{ color: '#E53E3E', fontSize: 13, margin: '8px 0 0' }}>{error}</p>}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                style={{
                  width: '100%', marginTop: 20, padding: '16px', borderRadius: 12,
                  background: otp.length === 6 ? COLORS.secondary : '#CBD5E0',
                  color: COLORS.white, border: 'none', cursor: otp.length === 6 ? 'pointer' : 'not-allowed',
                  fontSize: 16, fontWeight: 700, transition: 'background 0.2s',
                }}
              >
                {loading ? '验证中...' : '登录 / 注册'}
              </motion.button>

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                {countdown > 0 ? (
                  <span style={{ color: COLORS.muted, fontSize: 13 }}>{countdown}秒后可重新发送</span>
                ) : (
                  <button onClick={handleSendOtp} disabled={loading} style={{ background: 'none', border: 'none', color: COLORS.primary, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>重新发送验证码</button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {config.features.trialMode && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleTrialLogin}
            style={{
              width: '100%', marginTop: 16, padding: '12px', borderRadius: 12,
              background: '#FFF3CD', color: '#856404', border: '1px dashed #FFD700',
              cursor: 'pointer', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            🔧 本地试用（跳过登录）
          </motion.button>
        )}

        <p style={{ textAlign: 'center', color: COLORS.muted, fontSize: 12, marginTop: 28, lineHeight: 1.6 }}>
          登录即表示您同意<span style={{ color: COLORS.primary }}>用户协议</span>和<span style={{ color: COLORS.primary }}>隐私政策</span>
        </p>
      </motion.div>
    </div>
  );
}
