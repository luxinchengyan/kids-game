/**
 * 统一关卡系统 (Level System)
 * ===========================
 * 为所有游戏框架提供一致的「闯关模式」能力：
 *   - LevelConfig / KnowledgeScopeTag 接口定义
 *   - LevelSelectScreen 关卡选择界面
 *   - useLevelProgress hook（读写关卡进度）
 *
 * 使用方式（以 ExamSystem 为例）：
 *   <LevelSelectScreen
 *     gameId="pinyin-exam"
 *     levels={PINYIN_LEVELS}
 *     onSelectLevel={handleSelectLevel}
 *     onBack={handleBack}
 *     themeColor="#FF6B6B"
 *   />
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useLevelStore } from '../../stores/useLevelStore';

// ==========================
// 类型定义
// ==========================

/** 知识范围标签，用于描述本关卡覆盖哪些知识点 */
export interface KnowledgeScopeTag {
  /** 标签唯一 ID（如 'initial-b', 'number-10', 'color-red'） */
  id: string;
  /** 显示文字（如 'b/p/m/f', '10以内加减', '颜色单词'） */
  label: string;
  /** 可选 emoji */
  emoji?: string;
}

/** 单个关卡的完整配置 */
export interface LevelConfig {
  /** 关卡唯一 ID（同一游戏内唯一） */
  id: string;
  /** 关卡序号（从 1 开始，用于显示「第 N 关」） */
  order: number;
  /** 关卡名称（如 '声母初探'、'加法入门'） */
  name: string;
  /** 关卡副标题/描述（可选） */
  description?: string;
  /** 图标 emoji */
  icon?: string;
  /**
   * 难度等级
   * easy = 🌟 简单 | medium = ⭐ 中等 | hard = 🔥 困难 | expert = 💎 专家
   */
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  /** 本关涵盖的知识范围标签 */
  knowledgeScope: KnowledgeScopeTag[];
  /** 题目/回合数量 */
  itemCount: number;
  /** 时间限制（秒），0 = 不限时 */
  timeLimit: number;
  /** 及格所需最低星数（默认 1） */
  passingStars?: number;
  /**
   * 供具体游戏框架使用的扩展配置
   * ExamSystem: { category, questionPool }
   * WhackAMole:  { dataPool, moleCount, showTime, spawnInterval, gridSize }
   * MatchFramework: { pairCount }
   * PuzzleFramework: { rounds }
   */
  extra?: Record<string, unknown>;
}

// ==========================
// 辅助常量
// ==========================

const DIFFICULTY_META: Record<
  LevelConfig['difficulty'],
  { label: string; emoji: string; color: string; bgColor: string }
> = {
  easy:   { label: '简单', emoji: '🌟', color: '#2E7D32', bgColor: '#E8F5E9' },
  medium: { label: '中等', emoji: '⭐', color: '#E65100', bgColor: '#FFF3E0' },
  hard:   { label: '困难', emoji: '🔥', color: '#B71C1C', bgColor: '#FFEBEE' },
  expert: { label: '专家', emoji: '💎', color: '#4A148C', bgColor: '#F3E5F5' },
};

// ==========================
// useLevelProgress hook
// ==========================

export function useLevelProgress(gameId: string, levels: LevelConfig[]) {
  const getLevelRecord = useLevelStore((s) => s.getLevelRecord);
  const isLevelUnlocked = useLevelStore((s) => s.isLevelUnlocked);
  const recordLevelResult = useLevelStore((s) => s.recordLevelResult);

  const orderedIds = useMemo(() => levels.map((l) => l.id), [levels]);

  const getRecord = (levelId: string) => getLevelRecord(gameId, levelId);

  const checkUnlocked = (levelId: string) =>
    isLevelUnlocked(gameId, levelId, orderedIds);

  const submitResult = (levelId: string, stars: number, passed: boolean) =>
    recordLevelResult(gameId, levelId, stars, passed);

  return { getRecord, checkUnlocked, submitResult };
}

// ==========================
// StarDisplay 小组件
// ==========================

function StarDisplay({
  count,
  max = 3,
  size = 18,
}: {
  count: number;
  max?: number;
  size?: number;
}) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            opacity: i < count ? 1 : 0.25,
            filter: i < count ? 'none' : 'grayscale(1)',
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

// ==========================
// LevelCard 子组件
// ==========================

function LevelCard({
  level,
  gameId,
  isUnlocked,
  themeColor,
  onSelect,
}: {
  level: LevelConfig;
  gameId: string;
  isUnlocked: boolean;
  themeColor: string;
  onSelect: (level: LevelConfig) => void;
}) {
  const record = useLevelStore((s) => s.getLevelRecord(gameId, level.id));
  const diff = DIFFICULTY_META[level.difficulty];
  const isCompleted = record.completed;

  return (
    <motion.button
      whileHover={isUnlocked ? { scale: 1.03, y: -3 } : {}}
      whileTap={isUnlocked ? { scale: 0.97 } : {}}
      onClick={() => isUnlocked && onSelect(level)}
      style={{
        position: 'relative',
        background: isUnlocked
          ? isCompleted
            ? `linear-gradient(145deg, ${diff.bgColor}, #FFFFFF)`
            : '#FFFFFF'
          : '#F5F5F5',
        border: isCompleted
          ? `3px solid ${themeColor}`
          : isUnlocked
          ? '2px solid #E0E0E0'
          : '2px dashed #BDBDBD',
        borderRadius: '20px',
        padding: '20px 16px',
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        textAlign: 'center',
        boxShadow: isCompleted
          ? `0 6px 20px ${themeColor}33`
          : isUnlocked
          ? '0 4px 12px rgba(0,0,0,0.07)'
          : 'none',
        transition: 'all 0.2s',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        opacity: isUnlocked ? 1 : 0.55,
      }}
    >
      {/* 关卡序号 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '14px',
          fontSize: '12px',
          fontWeight: 800,
          color: isCompleted ? themeColor : '#9E9E9E',
        }}
      >
        第 {level.order} 关
      </div>

      {/* 锁定图标 */}
      {!isUnlocked && (
        <div style={{ fontSize: '32px', marginBottom: '4px' }}>🔒</div>
      )}

      {/* 关卡图标 */}
      {isUnlocked && (
        <div style={{ fontSize: '40px' }}>{level.icon ?? diff.emoji}</div>
      )}

      {/* 关卡名 */}
      <div
        style={{
          fontSize: '16px',
          fontWeight: 900,
          color: isUnlocked ? '#3E2723' : '#9E9E9E',
          lineHeight: 1.3,
        }}
      >
        {level.name}
      </div>

      {/* 难度标签 */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: diff.bgColor,
          color: diff.color,
          borderRadius: '20px',
          padding: '3px 10px',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        {diff.emoji} {diff.label}
      </div>

      {/* 题目数 + 时限 */}
      <div style={{ fontSize: '12px', color: '#757575', marginTop: '2px' }}>
        {level.itemCount} 题
        {level.timeLimit > 0 && ` · ${Math.floor(level.timeLimit / 60)}分钟`}
      </div>

      {/* 星星（已完成时） */}
      {isCompleted && (
        <div style={{ marginTop: '4px' }}>
          <StarDisplay count={record.bestStars} />
        </div>
      )}

      {/* 知识范围标签（最多显示3个） */}
      {isUnlocked && level.knowledgeScope.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            justifyContent: 'center',
            marginTop: '4px',
          }}
        >
          {level.knowledgeScope.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              style={{
                background: '#F5F5F5',
                color: '#616161',
                borderRadius: '8px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              {tag.emoji ? `${tag.emoji} ` : ''}{tag.label}
            </span>
          ))}
          {level.knowledgeScope.length > 3 && (
            <span
              style={{
                background: '#F5F5F5',
                color: '#9E9E9E',
                borderRadius: '8px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              +{level.knowledgeScope.length - 3}
            </span>
          )}
        </div>
      )}
    </motion.button>
  );
}

// ==========================
// LevelSelectScreen 组件
// ==========================

export interface LevelSelectScreenProps {
  /** 游戏 ID（用于读写关卡进度） */
  gameId: string;
  /** 关卡配置列表（有序） */
  levels: LevelConfig[];
  /** 选中某关卡后的回调 */
  onSelectLevel: (level: LevelConfig) => void;
  /** 返回按钮回调 */
  onBack: () => void;
  /** 主题色 */
  themeColor: string;
  /** 顶部标题 */
  title?: string;
  /** 顶部副标题 */
  subtitle?: string;
  /** 顶部图标 emoji */
  icon?: string;
  /** 背景渐变 */
  gradient?: string;
}

export function LevelSelectScreen({
  gameId,
  levels,
  onSelectLevel,
  onBack,
  themeColor,
  title = '选择关卡',
  subtitle,
  icon = '🗺️',
  gradient,
}: LevelSelectScreenProps) {
  const orderedIds = levels.map((l) => l.id);
  const isLevelUnlocked = useLevelStore((s) => s.isLevelUnlocked);

  // 统计整体进度
  const getLevelRecord = useLevelStore((s) => s.getLevelRecord);
  const completedCount = levels.filter(
    (l) => getLevelRecord(gameId, l.id).completed
  ).length;
  const totalStars = levels.reduce(
    (sum, l) => sum + getLevelRecord(gameId, l.id).bestStars,
    0
  );
  const maxStars = levels.length * 3;

  const bg = gradient ?? `linear-gradient(135deg, ${themeColor}22, #FAFAFA)`;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* 顶部标题区 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '24px',
            boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '56px', flexShrink: 0 }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 900,
                color: themeColor,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ margin: '4px 0 0', color: '#757575', fontSize: '15px' }}>
                {subtitle}
              </p>
            )}
          </div>
          {/* 整体进度 */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '4px' }}>
              总进度
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: themeColor }}>
              {completedCount}/{levels.length}
            </div>
            <StarDisplay count={totalStars} max={maxStars > 15 ? 5 : 3} size={14} />
          </div>
        </motion.div>

        {/* 关卡网格 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              gameId={gameId}
              isUnlocked={isLevelUnlocked(gameId, level.id, orderedIds)}
              themeColor={themeColor}
              onSelect={onSelectLevel}
            />
          ))}
        </div>

        {/* 返回按钮 */}
        <Button variant="secondary" onClick={onBack} size="large">
          ← 返回
        </Button>
      </div>
    </div>
  );
}

// ==========================
// LevelCompleteOverlay 组件
// 关卡完成时的弹出结算界面
// ==========================

export interface LevelCompleteOverlayProps {
  level: LevelConfig;
  stars: number;
  accuracy: number;
  timeSpent?: number;
  themeColor: string;
  onNextLevel?: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
  hasNextLevel?: boolean;
}

export function LevelCompleteOverlay({
  level,
  stars,
  accuracy,
  timeSpent,
  themeColor,
  onNextLevel,
  onRetry,
  onBackToMap,
  hasNextLevel = false,
}: LevelCompleteOverlayProps) {
  const passed = stars >= (level.passingStars ?? 1);
  const diff = DIFFICULTY_META[level.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'rgba(0,0,0,0.55)',
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          background: 'white',
          borderRadius: '28px',
          padding: '40px 36px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* 通关/失败图标 */}
        <div style={{ fontSize: '72px', marginBottom: '12px' }}>
          {passed ? '🎉' : '😅'}
        </div>

        {/* 标题 */}
        <h2
          style={{
            margin: '0 0 6px',
            fontSize: '26px',
            fontWeight: 900,
            color: passed ? themeColor : '#B71C1C',
          }}
        >
          {passed ? '关卡通过！' : '再试一次吧！'}
        </h2>

        {/* 关卡名 */}
        <p style={{ margin: '0 0 20px', color: '#757575', fontSize: '15px' }}>
          第 {level.order} 关 · {level.name}
        </p>

        {/* 星星 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {[1, 2, 3].map((s) => (
            <motion.span
              key={s}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + s * 0.12, type: 'spring', bounce: 0.5 }}
              style={{
                fontSize: '44px',
                opacity: s <= stars ? 1 : 0.2,
                filter: s <= stars ? 'none' : 'grayscale(1)',
              }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        {/* 统计数据 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              background: '#F5F5F5',
              borderRadius: '14px',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '12px', color: '#9E9E9E', marginBottom: '4px' }}>
              正确率
            </div>
            <div
              style={{ fontSize: '22px', fontWeight: 900, color: themeColor }}
            >
              {Math.round(accuracy * 100)}%
            </div>
          </div>
          {timeSpent !== undefined && (
            <div
              style={{
                background: '#F5F5F5',
                borderRadius: '14px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#9E9E9E', marginBottom: '4px' }}>
                用时
              </div>
              <div
                style={{ fontSize: '22px', fontWeight: 900, color: themeColor }}
              >
                {timeSpent < 60
                  ? `${timeSpent}秒`
                  : `${Math.floor(timeSpent / 60)}分${timeSpent % 60}秒`}
              </div>
            </div>
          )}
        </div>

        {/* 知识范围回顾 */}
        {level.knowledgeScope.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '8px' }}>
              本关知识点
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                justifyContent: 'center',
              }}
            >
              {level.knowledgeScope.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    background: diff.bgColor,
                    color: diff.color,
                    borderRadius: '10px',
                    padding: '4px 12px',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  {tag.emoji ? `${tag.emoji} ` : ''}
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          {passed && hasNextLevel && onNextLevel && (
            <Button onClick={onNextLevel} size="large" fullWidth>
              下一关 →
            </Button>
          )}
          <Button onClick={onRetry} variant="secondary" size="large" fullWidth>
            {passed ? '再挑战一次' : '重新挑战'}
          </Button>
          <Button onClick={onBackToMap} variant="secondary" size="large" fullWidth>
            返回关卡地图
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
