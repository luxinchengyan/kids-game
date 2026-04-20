/**
 * 地理山川卡片 - 首页组件
 * 包含世界地图和中国地图两个入口
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GLOBE_FRAMES = ['🌍', '🌎', '🌏'];

function GlobeAnimation() {
  const [frame, setFrame] = useState(0);
  return (
    <motion.div
      onClick={() => setFrame((f) => (f + 1) % GLOBE_FRAMES.length)}
      whileHover={{ scale: 1.2, rotate: 10 }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ fontSize: '48px', cursor: 'pointer', display: 'inline-block' }}
    >
      {GLOBE_FRAMES[frame]}
    </motion.div>
  );
}

export function GeographyCard() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, rgba(13,71,161,0.92), rgba(1,87,155,0.92), rgba(0,96,100,0.92))',
        borderRadius: '32px',
        padding: '28px',
        boxShadow: '0 18px 40px rgba(13,71,161,0.2)',
        marginBottom: 'var(--spacing-2xl)',
        border: '2px solid rgba(3,169,244,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '160px',
          height: '160px',
          background: 'radial-gradient(circle, rgba(0,188,212,0.1), transparent)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* 标题行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <GlobeAnimation />
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #B3E5FC, #E1F5FE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            地理山川 · 探索世界
          </h2>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: '14px',
              color: 'rgba(179,229,252,0.85)',
              fontWeight: 700,
            }}
          >
            发现世界的奇妙 · 了解祖国的壮阔
          </p>
        </div>
      </div>

      {/* 两个入口按钮 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* 世界地图入口 */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/games/world-map')}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '22px',
            padding: '20px 16px',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#FFF',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌍</div>
          <div style={{ fontSize: '17px', fontWeight: 900, marginBottom: '6px' }}>探索世界地图</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 700, lineHeight: 1.5 }}>
            国家 · 货币 · 文化<br />特产 · 历史 · 政治
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 800,
            }}
          >
            开始探索 →
          </div>
        </motion.button>

        {/* 中国地图入口 */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/games/china-map')}
          style={{
            background: 'linear-gradient(135deg, rgba(183,28,28,0.4), rgba(183,28,28,0.2))',
            border: '2px solid rgba(239,154,154,0.3)',
            borderRadius: '22px',
            padding: '20px 16px',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#FFF',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '10px' }}>🗺️</div>
          <div style={{ fontSize: '17px', fontWeight: 900, marginBottom: '6px' }}>探索中国地图</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 700, lineHeight: 1.5 }}>
            省份 · 简称 · 特产<br />景区 · 经济 · 文化
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(239,154,154,0.25)',
              borderRadius: '12px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 800,
            }}
          >
            开始探索 →
          </div>
        </motion.button>
      </div>

      {/* 知识标签展示 */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {[
          '🏔️ 地形地貌',
          '💰 货币经济',
          '🎭 风俗文化',
          '🍜 美食特产',
          '🏛️ 历史人文',
          '🌐 闯关测验',
        ].map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
