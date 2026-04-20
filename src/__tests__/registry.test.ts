import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadRegistry() {
  vi.resetModules();

  await import('../games/pinyin');
  await import('../games/math');
  await import('../games/english');
  await import('../games/stories');
  await import('../games/poetry');
  await import('../games/sports');
  await import('../games/frameworks');
  await import('../games/geography');
  await import('../games/subjects');
  await import('../games/history');
  await import('../games/typing');

  return import('../games/registry');
}

describe('learning path registry', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('resolves theme games even when theme ids are inconsistent', async () => {
    const { getGamesByTheme } = await loadRegistry();

    const pinyinGamesFromHub = getGamesByTheme('pinyin-hub');
    const pinyinGamesFromSlug = getGamesByTheme('pinyin');

    expect(pinyinGamesFromHub.map((game) => game.id)).toEqual([
      'pinyin-memory',
      'pinyin-link',
      'pinyin-puzzle',
      'pinyin-whack-a-mole-generic',
      'pinyin-rhythm',
      'pinyin-whack-a-mole',
      'pinyin-exam',
      'pinyin-initials-learn',
      'pinyin-finals-learn',
      'pinyin-whole-syllables-learn',
      'pinyin-unified-practice',
      'pinyin-training',
    ]);
    expect(pinyinGamesFromSlug.map((game) => game.id)).toEqual(pinyinGamesFromHub.map((game) => game.id));
  });

  it('sorts theme hubs by learning route order', async () => {
    const { getThemeHubs } = await loadRegistry();

    expect(getThemeHubs().slice(0, 4).map((hub) => hub.id)).toEqual([
      'pinyin-hub',
      'math-hub',
      'english-hub',
      'stories-hub',
    ]);
  });

  it('returns previous and next nodes for a routed game', async () => {
    const { getGameRouteContext } = await loadRegistry();

    const route = getGameRouteContext('math-pattern');

    expect(route?.previous?.id).toBe('math-tasks');
    expect(route?.current.id).toBe('math-pattern');
    expect(route?.next?.id).toBe('math-balance');
    expect(route?.total).toBe(7);
  });

  it('recommends a hub for the child age range', async () => {
    const { getRecommendedThemeHub } = await loadRegistry();

    expect(getRecommendedThemeHub(5)?.id).toBe('pinyin-hub');
    expect(getRecommendedThemeHub(7)?.id).toBe('math-hub');
  });

  it('registers history timeline under the history hub', async () => {
    const { getGamesByTheme } = await loadRegistry();

    expect(getGamesByTheme('history-hub').map((game) => game.id)).toEqual(['history-timeline']);
  });

  it('registers the AI typing series under its hub', async () => {
    const { getGamesByTheme } = await loadRegistry();

    expect(getGamesByTheme('ai-typing-hub').map((game) => game.id)).toEqual([
      'keyboard-scout',
      'meteor-defense',
      'prompt-workshop',
      'rhythm-assembly',
    ]);
  });
});
