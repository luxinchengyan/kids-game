import { type ChinaProvince } from './data/chinaData';
import { type WorldCountry } from './data/worldData';

const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '');

const includesKeyword = (source: string, query: string) =>
  normalizeKeyword(source).includes(normalizeKeyword(query));

export const WORLD_FEATURE_NAME_ALIASES: Record<string, string> = {
  'Korea, South': 'South Korea',
  'United Arab Emirates': 'UAE',
};

export function getWorldCountryFeatureName(country: WorldCountry): string {
  if (country.id === 'KOR') return 'Korea, South';
  if (country.id === 'UAE') return 'United Arab Emirates';
  return country.nameEn;
}

export function resolveWorldCountryByFeatureName(
  countries: WorldCountry[],
  featureName: string
): WorldCountry | undefined {
  const alias = WORLD_FEATURE_NAME_ALIASES[featureName] ?? featureName;
  const normalizedName = normalizeKeyword(alias);

  return countries.find((country) => {
    return [country.name, country.nameEn, getWorldCountryFeatureName(country)].some(
      (name) => normalizeKeyword(name) === normalizedName
    );
  });
}

export function filterWorldCountries(
  countries: WorldCountry[],
  searchTerm: string,
  continent: string
): WorldCountry[] {
  const trimmed = searchTerm.trim();

  return countries.filter((country) => {
    const matchesContinent = continent === 'all' || country.continent === continent;
    if (!matchesContinent) return false;
    if (!trimmed) return true;

    return [
      country.name,
      country.nameEn,
      country.capital,
      country.currency,
      country.language,
      ...(country.tags ?? []),
      ...country.food,
      ...country.specialties,
      ...country.landmarks,
    ].some((entry) => includesKeyword(entry, trimmed));
  });
}

export function summarizeWorldProgress(countries: WorldCountry[], exploredIds: Set<string>) {
  const continentProgress = Array.from(
    countries.reduce((acc, country) => {
      const current = acc.get(country.continent) ?? { total: 0, explored: 0 };
      current.total += 1;
      if (exploredIds.has(country.id)) current.explored += 1;
      acc.set(country.continent, current);
      return acc;
    }, new Map<string, { total: number; explored: number }>())
  ).map(([continent, value]) => ({
    continent,
    ...value,
    completionRate: value.total === 0 ? 0 : Math.round((value.explored / value.total) * 100),
  }));

  const exploredCount = countries.filter((country) => exploredIds.has(country.id)).length;

  return {
    exploredCount,
    totalCount: countries.length,
    completionRate: countries.length === 0 ? 0 : Math.round((exploredCount / countries.length) * 100),
    continentProgress: continentProgress.sort((left, right) => right.explored - left.explored),
  };
}

export function pickNextWorldQuizTarget(
  countries: WorldCountry[],
  exploredIds: Set<string>,
  previousId?: string
): WorldCountry | null {
  const eligible = countries.filter((country) => country.id !== previousId);
  if (eligible.length === 0) return null;

  const unexplored = eligible.filter((country) => !exploredIds.has(country.id));
  const preferredPool = unexplored.length > 0 ? unexplored : eligible;
  const easyPool = preferredPool.filter((country) => country.difficulty === 'easy');
  const mediumPool = preferredPool.filter((country) => country.difficulty === 'medium');
  const finalPool =
    easyPool.length > 0 ? easyPool : mediumPool.length > 0 ? mediumPool : preferredPool;

  return finalPool[Math.floor(Math.random() * finalPool.length)] ?? null;
}

export function filterChinaProvinces(
  provinces: ChinaProvince[],
  searchTerm: string,
  region: string
): ChinaProvince[] {
  const trimmed = searchTerm.trim();

  return provinces.filter((province) => {
    const matchesRegion = region === 'all' || province.region === region;
    if (!matchesRegion) return false;
    if (!trimmed) return true;

    return [
      province.name,
      province.abbr,
      province.capital,
      province.culture,
      province.history,
      province.economy,
      ...province.specialties,
      ...province.cuisine,
      ...province.landmarks,
      ...province.majorCities,
      ...(province.tags ?? []),
    ].some((entry) => includesKeyword(entry, trimmed));
  });
}

export function summarizeChinaProgress(provinces: ChinaProvince[], exploredIds: Set<string>) {
  const regionProgress = Array.from(
    provinces.reduce((acc, province) => {
      const current = acc.get(province.region) ?? { total: 0, explored: 0 };
      current.total += 1;
      if (exploredIds.has(province.id)) current.explored += 1;
      acc.set(province.region, current);
      return acc;
    }, new Map<string, { total: number; explored: number }>())
  ).map(([region, value]) => ({
    region,
    ...value,
    completionRate: value.total === 0 ? 0 : Math.round((value.explored / value.total) * 100),
  }));

  const exploredCount = provinces.filter((province) => exploredIds.has(province.id)).length;

  return {
    exploredCount,
    totalCount: provinces.length,
    completionRate: provinces.length === 0 ? 0 : Math.round((exploredCount / provinces.length) * 100),
    regionProgress: regionProgress.sort((left, right) => right.explored - left.explored),
  };
}

export function pickNextChinaQuizTarget(
  provinces: ChinaProvince[],
  exploredIds: Set<string>,
  previousId?: string
): ChinaProvince | null {
  const eligible = provinces.filter((province) => province.id !== previousId);
  if (eligible.length === 0) return null;

  const unexplored = eligible.filter((province) => !exploredIds.has(province.id));
  const preferredPool = unexplored.length > 0 ? unexplored : eligible;
  const municipalities = preferredPool.filter((province) => province.type === 'municipality');
  const standardProvinces = preferredPool.filter((province) => province.type === 'province');
  const finalPool =
    municipalities.length > 0
      ? municipalities
      : standardProvinces.length > 0
        ? standardProvinces
        : preferredPool;

  return finalPool[Math.floor(Math.random() * finalPool.length)] ?? null;
}
