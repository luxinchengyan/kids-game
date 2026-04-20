/**
 * 微信登录回调页 — 处理 URL 中的 token 参数
 */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';
import { useUserStore } from '../stores/useUserStore';

export default function WeChatCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthenticated } = useUserStore();

  useEffect(() => {
    const { isNewUser } = authService.handleWechatCallback(searchParams);
    setAuthenticated(true);
    // 刷新用户信息
    authService.getMe().then(({ parent, children }) => {
      // Store sync handled in useUserStore
      if (isNewUser || children.length === 0) {
        navigate('/setup-child', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }).catch(() => navigate('/login', { replace: true }));
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF9F0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <p style={{ color: '#718096', fontSize: 16 }}>微信登录中，请稍候...</p>
      </div>
    </div>
  );
}
