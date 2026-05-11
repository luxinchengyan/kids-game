/**
 * 微信登录回调页 — 处理 URL 中的 token 参数
 */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';
import { useUserStore } from '../stores/useUserStore';
import { toStoreChild, toStoreParent } from '../lib/sessionMappers';

export default function WeChatCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthenticated, setParent, setChildren, setCurrentChild } = useUserStore();

  useEffect(() => {
    const { isNewUser } = authService.handleWechatCallback(searchParams);
    setAuthenticated(true);
    
    // 刷新用户信息并同步到 Store
    authService.getMe().then(({ parent, children }) => {
      setParent({
        ...toStoreParent(parent, children),
        wechatOpenId: parent.wechatOpenId,
        wechatNickname: parent.wechatNickname,
        wechatAvatarUrl: parent.wechatAvatarUrl,
      });

      const mappedChildren = children.map(toStoreChild);
      setChildren(mappedChildren);
      setCurrentChild(mappedChildren[0] ?? null);

      if (isNewUser || children.length === 0) {
        navigate('/setup-child', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }).catch((err) => {
      console.error('[wechat-callback] failed to get user info', err);
      navigate('/login', { replace: true });
    });
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
