import { lazy } from 'react';
import { registerGame } from '../registry';

const SubjectThemeHub = lazy(() => import('../subjects/SubjectThemeHub'));
const WorldMapExplorer = lazy(() => import('./WorldMapExplorer'));
const ChinaMapExplorer = lazy(() => import('./ChinaMapExplorer'));

// ── 地理观察站（主题 Hub）────────────────────────────────────
registerGame({
  id: 'geography-hub',
  name: '地理观察站',
  icon: '🗺️',
  description: '把方向、天气、地形、城市与国家这些大世界概念，拆成孩子看得见、摸得着的观察任务。',
  path: '/games/geography',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 12,
  learningPath: {
    routeOrder: 9,
    levelLabel: '探索 · 地理观察',
    ageRange: '4-12岁',
    skillFocus: ['空间感', '方向感', '地图意识', '环境观察'],
    assessmentScope: ['四季和天气', '山川河流', '中国省份印象', '世界地标'],
    learningGoal: '把"我家附近"慢慢扩展成"城市-中国-世界"的空间认知。',
    pedagogyTip: '参考综合常识中的地理脉络，重构为儿童可理解的世界认知路线。',
    mapZone: '地理山川',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 世界地图探索（地理 Hub 子游戏）──────────────────────────
registerGame({
  id: 'world-map-hub',
  name: '世界地图探索',
  icon: '🌍',
  description: '探索各大洲国家的文化、货币、特产、历史，在互动世界地图上开启地理闯关！',
  path: '/games/world-map',
  component: WorldMapExplorer,
  category: 'other',
  isThemeHub: false,
  themeId: 'geography',
  minAge: 4,
  maxAge: 12,
  learningPath: {
    routeOrder: 1,
    levelLabel: '地理探索 · 世界地图',
    ageRange: '4-12岁',
    skillFocus: ['地理认知', '文化常识', '国家识别', '世界观'],
    assessmentScope: ['国家名称', '首都城市', '大洲分布', '文化习俗'],
    learningGoal: '通过互动地图探索世界各地的文化与地理，建立全球视野。',
    pedagogyTip: '结合闯关模式，让孩子在游戏中记忆国家位置和文化知识。',
    mapZone: '地理山川',
    milestoneType: 'lesson',
    estimatedDuration: '自由探索',
  },
});

// ── 中国地图探索（地理 Hub 子游戏）──────────────────────────
registerGame({
  id: 'china-map-hub',
  name: '中国地图探索',
  icon: '🇨🇳',
  description: '探索中国34个省级行政区，了解各省简称、特产、景区、经济发展和历史文化！',
  path: '/games/china-map',
  component: ChinaMapExplorer,
  category: 'other',
  isThemeHub: false,
  themeId: 'geography',
  minAge: 4,
  maxAge: 12,
  learningPath: {
    routeOrder: 2,
    levelLabel: '地理探索 · 中国地图',
    ageRange: '4-12岁',
    skillFocus: ['省份识别', '地理位置', '特产常识', '经济认知'],
    assessmentScope: ['省份名称', '省会城市', '省份简称', '特色文化'],
    learningGoal: '认识中国各省份地理位置、简称及地方文化特色。',
    pedagogyTip: '瓦片地图直观展示地理位置关系，配合闯关测验强化记忆。',
    mapZone: '地理山川',
    milestoneType: 'lesson',
    estimatedDuration: '自由探索',
  },
});
