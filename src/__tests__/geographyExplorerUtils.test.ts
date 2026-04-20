import { describe, expect, it, vi } from 'vitest';
import { chinaProvinces } from '../games/geography/data/chinaData';
import { worldCountries } from '../games/geography/data/worldData';
import {
  filterChinaProvinces,
  filterWorldCountries,
  pickNextChinaQuizTarget,
  pickNextWorldQuizTarget,
  resolveWorldCountryByFeatureName,
  summarizeChinaProgress,
  summarizeWorldProgress,
} from '../games/geography/explorerUtils';

describe('geography explorer utils', () => {
  it('resolves world feature aliases from GeoJSON names', () => {
    expect(resolveWorldCountryByFeatureName(worldCountries, 'Korea, South')?.name).toBe('韩国');
    expect(resolveWorldCountryByFeatureName(worldCountries, 'United Arab Emirates')?.name).toBe(
      '阿联酋'
    );
  });

  it('filters world countries by search keyword and continent', () => {
    const result = filterWorldCountries(worldCountries, '东京', '亚洲');

    expect(result.map((country) => country.name)).toContain('日本');
    expect(result.every((country) => country.continent === '亚洲')).toBe(true);
  });

  it('summarizes world progress by continent', () => {
    const exploredIds = new Set(['CHN', 'JPN', 'FRA']);
    const summary = summarizeWorldProgress(worldCountries, exploredIds);

    expect(summary.exploredCount).toBe(3);
    expect(summary.totalCount).toBe(worldCountries.length);
    expect(summary.continentProgress.find((item) => item.continent === '亚洲')).toMatchObject({
      explored: 2,
    });
  });

  it('picks an unexplored world quiz target before repeating explored ones', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const target = pickNextWorldQuizTarget(
      worldCountries.filter((country) => country.continent === '亚洲'),
      new Set(['CHN']),
      'CHN'
    );

    expect(target?.id).not.toBe('CHN');
    expect(target?.difficulty).toBe('easy');

    vi.restoreAllMocks();
  });

  it('filters china provinces by keyword and region', () => {
    const result = filterChinaProvinces(chinaProvinces, '火锅', '西南');

    expect(result.map((province) => province.name)).toContain('重庆市');
    expect(result.every((province) => province.region === '西南')).toBe(true);
  });

  it('summarizes china progress by region', () => {
    const exploredIds = new Set(['beijing', 'shanghai', 'guangdong']);
    const summary = summarizeChinaProgress(chinaProvinces, exploredIds);

    expect(summary.exploredCount).toBe(3);
    expect(summary.totalCount).toBe(chinaProvinces.length);
    expect(summary.regionProgress.find((item) => item.region === '华东')?.explored).toBeGreaterThanOrEqual(1);
  });

  it('picks an unexplored china quiz target and skips the previous one', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const target = pickNextChinaQuizTarget(
      chinaProvinces.filter((province) => province.region === '华北'),
      new Set(['beijing']),
      'beijing'
    );

    expect(target?.id).not.toBe('beijing');
    expect(target).toBeDefined();

    vi.restoreAllMocks();
  });
});
