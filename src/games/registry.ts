import type { LazyExoticComponent, ComponentType } from 'react';

// New imports for the game components
import { FutoshikiComponent } from './futoshiki';
import { SokobanComponent } from './sokoban';
import { IdiomFillInComponent } from './idiom_fill_in';

export interface LearningPathMeta {
  routeOrder: number;
  levelLabel: string;
  ageRange: string;
  skillFocus: string[];
  assessmentScope: string[];
  learningGoal: string;
  pedagogyTip: string;
  mapZone: string;
  milestoneType: 'hub' | 'lesson' | 'challenge' | 'checkpoint' | 'creative';
  estimatedDuration?: string;
}

export interface GameConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string; // Route path
  component: LazyExoticComponent<ComponentType>;
  minAge?: number;
  maxAge?: number;
  category: 'pinyin' | 'math' | 'english' | 'stories' | 'poetry' | 'sports' | 'other';
  themeId?: string; // Groups games into themes
  isThemeHub?: boolean; // Marks theme hub entries
  learningPath?: LearningPathMeta;
  /** Tags describing what knowledge this game covers — used for filtering and knowledge scope selection */
  knowledgeScope?: string[];
}

export const gameRegistry: GameConfig[] = [];

export function registerGame(config: GameConfig): void {
  const existingIndex = gameRegistry.findIndex((g) => g.id === config.id);
  if (existingIndex >= 0) {
    // Replace in-place to support HMR updates without accumulating duplicates
    gameRegistry[existingIndex] = config;
  } else {
    gameRegistry.push(config);
  }
}

// Adding the new game registrations
registerGame({
  id: 'futoshiki',
  name: 'Futoshiki',
  icon: '?', // Placeholder
  description: 'Logic puzzle where you must fill a grid with numbers respecting inequalities.',
  path: '/games/futoshiki',
  component: FutoshikiComponent,
  category: 'math',
});

registerGame({
  id: 'sokoban',
  name: 'Sokoban',
  icon: '?', // Placeholder
  description: 'Push the boxes to their destination spots in this spatial reasoning puzzle.',
  path: '/games/sokoban',
  component: SokobanComponent,
  category: 'other',
});

registerGame({
  id: 'idiom_fill_in',
  name: '成语填字', // Using Chinese name as in prompt
  description: 'Fill in the missing characters to form Chinese idioms.',
  path: '/games/idiom_fill_in',
  component: IdiomFillInComponent,
  category: 'english',
});

export function getGameById(id: string): GameConfig | undefined {
  return gameRegistry.find((g) => g.id === id);
}

export function getGameByPath(path: string): GameConfig | undefined {
  return gameRegistry.find((g) => g.path === path);
}

export function getGamesByCategory(category: GameConfig['category']): GameConfig[] {
  return gameRegistry.filter((g) => g.category === category);
}

function sortByRouteOrder(a: GameConfig, b: GameConfig) {
  const orderA = a.learningPath?.routeOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.learningPath?.routeOrder ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return a.name.localeCompare(b.name, 'zh-Hans-CN');
}

function getThemeCandidates(themeKey: string, themeHub?: GameConfig): string[] {
  const hubPathKey = themeHub?.path.replace('/games/', '');

  return [themeKey, themeKey.replace(/-hub$/, ''), `${themeKey}-hub`, themeHub?.id, hubPathKey].filter(
    (value): value is string => Boolean(value)
  );
}

export function getThemeHub(themeKey: string): GameConfig | undefined {
  const normalizedKey = themeKey.trim();
  const hubs = gameRegistry.filter((game) => game.isThemeHub);

  return hubs.find((hub) => {
    const hubAliases = new Set([
      hub.id,
      hub.id.replace(/-hub$/, ''),
      hub.path.replace('/games/', ''),
    ]);

    return hubAliases.has(normalizedKey);
  });
}

export function getThemeHubs(): GameConfig[] {
  return gameRegistry.filter((g) => g.isThemeHub).sort(sortByRouteOrder);
}

export function getGamesByTheme(themeId: string): GameConfig[] {
  const themeHub = getThemeHub(themeId);
  const candidates = new Set(getThemeCandidates(themeId, themeHub));

  return gameRegistry
    .filter((game) => !game.isThemeHub && game.themeId && candidates.has(game.themeId))
    .sort(sortByRouteOrder);
}

export function getAgeRangeLabel(game: GameConfig): string {
  if (game.learningPath?.ageRange) {
    return game.learningPath.ageRange;
  }

  if (game.minAge !== undefined && game.maxAge !== undefined) {
    return `${game.minAge}-${game.maxAge}岁`;
  }

  return '全年龄';
}

export function getLearningMap() {
  return getThemeHubs().map((hub) => ({
    hub,
    games: getGamesByTheme(hub.id),
  }));
}

export interface GameRouteContext {
  current: GameConfig;
  themeHub?: GameConfig;
  siblings: GameConfig[];
  previous?: GameConfig;
  next?: GameConfig;
  index: number;
  total: number;
}

export function getGameRouteContext(gameKey: string): GameRouteContext | undefined {
  const current = getGameById(gameKey) ?? getGameByPath(gameKey);
  if (!current) {
    return undefined;
  }

  if (current.isThemeHub) {
    const siblings = getGamesByTheme(current.id);
    return {
      current,
      themeHub: current,
      siblings,
      previous: undefined,
      next: siblings[0],
      index: 0,
      total: siblings.length,
    };
  }

  const themeHub = current.themeId ? getThemeHub(current.themeId) : undefined;
  const siblings = current.themeId ? getGamesByTheme(current.themeId) : [];
  const index = siblings.findIndex((game) => game.id === current.id);

  return {
    current,
    themeHub,
    siblings,
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 ? siblings[index + 1] : undefined,
    index,
    total: siblings.length,
  };
}

export function getRecommendedThemeHub(age: number): GameConfig | undefined {
  const hubs = getThemeHubs();
  if (hubs.length === 0) {
    return undefined;
  }

  const matched = hubs.find(
    (hub) =>
      hub.minAge !== undefined &&
      hub.maxAge !== undefined &&
      age >= hub.minAge &&
      age <= hub.maxAge
  );

  if (matched) {
    return matched;
  }

  return hubs.reduce((closest, hub) => {
    if (hub.minAge === undefined || hub.maxAge === undefined) {
      return closest;
    }

    const hubMidpoint = (hub.minAge + hub.maxAge) / 2;
    const closestMidpoint =
      closest.minAge !== undefined && closest.maxAge !== undefined
        ? (closest.minAge + closest.maxAge) / 2
        : Number.POSITIVE_INFINITY;

    return Math.abs(hubMidpoint - age) < Math.abs(closestMidpoint - age) ? hub : closest;
  }, hubs[0]);
}
