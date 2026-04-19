import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gameRegistry } from './games/registry';
import HomePage from './pages/HomePage';
import RewardToast from './components/RewardToast';

// Import all game registrations (side-effect imports)
import './games/pinyin';
import './games/math';
import './games/english';
import './games/stories';
import './games/poetry';
import './games/whackamole';
import './games/sports';

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

const pageShell: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '28px 24px',
  backgroundColor: 'var(--color-background)',
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={pageShell}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {gameRegistry.map((game) => (
            <Route
              key={game.id}
              path={game.path}
              element={
                <Suspense fallback={<LazyFallback />}>
                  <game.component />
                </Suspense>
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
