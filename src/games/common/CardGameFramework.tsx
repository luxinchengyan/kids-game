import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { FrameworkStatGrid, CompletionPanel } from '../frameworks/frameworkHelpers';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';

export interface Card {
  id: string;
  suit: string;
  value: string;
  rank: number;
  icon: string;
  color: string;
}

export interface CardGameFrameworkProps {
  gameId: string;
  title: string;
  icon: string;
  subtitle: string;
  themeColor: string;
  gradient: string;
  
  onBack: () => void;
}

export function CardGameFramework({
  gameId,
  title,
  icon,
  subtitle,
  themeColor,
  gradient,
  onBack,
}: CardGameFrameworkProps) {
  return (
    <PageLayout maxWidth="1000px">
      <GamePageHeader
        title={title}
        icon={icon}
        subtitle={subtitle}
        gradient={gradient}
        onBack={onBack}
      />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: `3px solid ${themeColor}22`,
        marginTop: '20px',
        padding: '40px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🃏</div>
        <h2 style={{ color: themeColor }}>牌类游戏框架建设中</h2>
        <p style={{ color: '#6D4C41', textAlign: 'center', maxWidth: '500px' }}>
          我们正在根据“数据 + 主题”逻辑构建通用的牌类游戏框架，后续将支持接龙、21点、以及各种趣味益智牌类玩法。
        </p>
        <Button onClick={onBack}>返回工坊</Button>
      </div>
    </PageLayout>
  );
}
