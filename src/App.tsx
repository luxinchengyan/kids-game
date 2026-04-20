import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { gameRegistry } from './games/registry';
import HomePage from './pages/HomePage';
import RewardToast from './components/RewardToast';
import LoginPage from './pages/LoginPage';
import SetupChildPage from './pages/SetupChildPage';
import WeChatCallbackPage from './pages/WeChatCallbackPage';
import authService from './services/authService';
import { useUserStore } from './stores/useUserStore';
import { config } from './config';

// Auth guard — 未登录时重定向到登录页；本地试用模式下直接放行
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserStore();
  const location = useLocation();
  if (config.features.trialMode) return <>{children}</>;
  if (!isAuthenticated && !authService.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

// Import all game registrations (side-effect imports)
import './games/pinyin';
import './games/math';
import './games/english';
import './games/stories';
import './games/poetry';
import './games/whackamole';
import './games/sports';
import './games/frameworks';
import './games/geography';
import './games/subjects';
import './games/history';
import './games/typing';

function LazyFallback() {
  return (
    <div
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-text-secondary)',
        fontWeight: 600,
      }}
    >
      加载中…
    </div>
  );
}

// 最小化 shell：各页面自行管理布局、背景、padding
const pageShell: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'var(--color-background)',
};

const App: React.FC = () => {
  const { setAuthenticated, setParent, setChildren, setCurrentChild } = useUserStore();
  const [authChecked, setAuthChecked] = useState(false);

  // 启动时检查 token 并恢复会话
  useEffect(() => {
    if (authService.isLoggedIn()) {
      authService.getMe()
        .then(({ parent, children }) => {
          setParent({
            _id: parent.id,
            phone: parent.phone,
            settings: {
              dailyTimeLimit: parent.dailyTimeLimit,
              soundEnabled: parent.soundEnabled,
              musicEnabled: parent.musicEnabled,
              notificationsEnabled: parent.notificationsEnabled,
            },
            children: children.map(c => c.id),
          });
          const mapped = children.map(c => ({ _id: c.id, parentId: c.parentId, nickname: c.nickname, age: c.age, gender: c.gender, avatarId: c.avatarId }));
          setChildren(mapped);
          if (mapped.length > 0) setCurrentChild(mapped[0]);
          setAuthenticated(true);
        })
        .catch(() => {
          // token 过期或无效，清除本地状态
          setAuthenticated(false);
        })
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF9F0', fontSize: 32 }}>🚀</div>;
  }

  return (
    <BrowserRouter>
      <div style={pageShell}>
        <Routes>
          {/* 公开路由 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<WeChatCallbackPage />} />

          {/* 需要认证的路由 */}
          <Route path="/setup-child" element={
            <RequireAuth><SetupChildPage /></RequireAuth>
          } />
          <Route path="/" element={
            <RequireAuth><HomePage /></RequireAuth>
          } />
          {gameRegistry.map((game) => (
            <Route
              key={game.id}
              path={game.path}
              element={
                <RequireAuth>
                  <Suspense fallback={<LazyFallback />}>
                    <game.component />
                  </Suspense>
                </RequireAuth>
              }
            />
          ))}
        </Routes>
        <RewardToast />
      </div>
    </BrowserRouter>
  );
};

export default App;
