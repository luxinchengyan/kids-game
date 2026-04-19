import type { LazyExoticComponent, ComponentType } from 'react';

export interface GameConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;                    // Route path
  component: LazyExoticComponent<ComponentType>;
  minAge?: number;
  maxAge?: number;
  category: 'pinyin' | 'math' | 'english' | 'stories' | 'poetry' | 'sports' | 'other';
  themeId?: string;                // Groups games into themes
  isThemeHub?: boolean;            // Marks theme hub entries
}

export const gameRegistry: GameConfig[] = [];

export function registerGame(config: GameConfig): void {
  gameRegistry.push(config);
}

export function getGameById(id: string): GameConfig | undefined {
  return gameRegistry.find(g => g.id === id);
}

export function getGamesByCategory(category: GameConfig['category']): GameConfig[] {
  return gameRegistry.filter(g => g.category === category);
}

export function getThemeHubs(): GameConfig[] {
  return gameRegistry.filter(g => g.isThemeHub);
}

export function getGamesByTheme(themeId: string): GameConfig[] {
  return gameRegistry.filter(g => g.themeId === themeId && !g.isThemeHub);
}
