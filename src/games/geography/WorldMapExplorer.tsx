import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { EChartsOption } from 'echarts';
import GeoEChart from './GeoEChart';
import {
  allContinents,
  continentColors,
  continentEmojis,
  worldCountries,
  type WorldCountry,
} from './data/worldData';
import {
  filterWorldCountries,
  getWorldCountryFeatureName,
  pickNextWorldQuizTarget,
  resolveWorldCountryByFeatureName,
  summarizeWorldProgress,
} from './explorerUtils';

const WORLD_MAP_KEY = 'kids-game-world-map';
const WORLD_MAP_ASSET_URL = '/maps/world.geo.json';

type WorldTab = 'basic' | 'culture' | 'food' | 'history';
type QuizStatus = 'waiting' | 'correct' | 'wrong';

function withAlpha(color: string, alpha: string) {
  return `${color}${alpha}`;
}

function TagPill({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <span
      style={{
        background: bg,
        color,
        borderRadius: '999px',
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: 800,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {text}
    </span>
  );
}

function StatCard({
  label,
  value,
  accent,
  helper,
}: {
  label: string;
  value: string;
  accent: string;
  helper: string;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '22px',
        padding: '18px 20px',
        border: `1px solid ${withAlpha(accent, '66')}`,
        boxShadow: `0 12px 32px ${withAlpha(accent, '22')}`,
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#B3E5FC', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFF', marginBottom: '6px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#D7EEFF', lineHeight: 1.5 }}>
        {helper}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.94)',
        borderRadius: '22px',
        padding: '18px',
        boxShadow: '0 16px 38px rgba(6, 20, 46, 0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '15px',
          fontWeight: 900,
          color: '#17325C',
          marginBottom: '14px',
        }}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function CountryDetailPanel({
  country,
  onFocusQuiz,
}: {
  country: WorldCountry;
  onFocusQuiz: () => void;
}) {
  const [tab, setTab] = useState<WorldTab>('basic');
  const accent = continentColors[country.continent] ?? '#FF9800';

  return (
    <motion.div
      key={country.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.24 }}
      style={{
        background: 'rgba(255,255,255,0.96)',
        borderRadius: '28px',
        padding: '20px',
        border: `2px solid ${withAlpha(accent, '44')}`,
        boxShadow: '0 22px 50px rgba(9, 30, 66, 0.16)',
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${withAlpha(accent, '18')}, ${withAlpha(accent, '42')})`,
          borderRadius: '22px',
          padding: '18px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '54px', marginBottom: '10px' }}>{country.flag}</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#17325C' }}>{country.name}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#37527D', marginTop: '4px' }}>
          {country.nameEn} · {continentEmojis[country.continent]} {country.continent}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <TagPill text={`首都 ${country.capital}`} bg={withAlpha(accent, '18')} color={accent} />
          <TagPill text={`GDP 第 ${country.gdpRank} 名`} bg="#E8F5E9" color="#1B5E20" />
          <TagPill
            text={
              country.difficulty === 'easy'
                ? '⭐ 入门'
                : country.difficulty === 'medium'
                  ? '⭐⭐ 进阶'
                  : '⭐⭐⭐ 挑战'
            }
            bg="#FFF4D6"
            color="#E67E22"
          />
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #FFF8E1, #FFF3E0)',
          borderRadius: '18px',
          padding: '14px 16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 183, 77, 0.42)',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#E67E22', marginBottom: '6px' }}>
          儿童趣味知识
        </div>
        <div style={{ fontSize: '14px', color: '#5D4037', lineHeight: 1.7, fontWeight: 700 }}>
          {country.funFact}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {(
          [
            ['basic', '🌍 基本'],
            ['culture', '🎭 文化'],
            ['food', '🍽️ 美食'],
            ['history', '📜 历史'],
          ] as const
        ).map(([tabKey, label]) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            style={{
              border: 'none',
              borderRadius: '14px',
              padding: '9px 14px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 900,
              background: tab === tabKey ? accent : '#EEF4FB',
              color: tab === tabKey ? '#FFF' : '#36506E',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {tab === 'basic' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: '💰 货币', value: `${country.currency} (${country.currencyCode})` },
                  { label: '🗣️ 语言', value: country.language },
                  { label: '📐 面积', value: country.area },
                  { label: '🏛️ 政体', value: country.government },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ background: '#F6F9FD', borderRadius: '16px', padding: '12px' }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E84A3', marginBottom: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#17325C', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <SectionCard title="自然地貌" icon="🏔️">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#4E647E', lineHeight: 1.7 }}>
                  {country.terrain}
                </div>
              </SectionCard>
              <SectionCard title="经济亮点" icon="🚀">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#4E647E', lineHeight: 1.7 }}>
                  {country.economy}
                </div>
              </SectionCard>
            </>
          )}

          {tab === 'culture' && (
            <>
              <SectionCard title="文化名片" icon="🎨">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#4E647E', lineHeight: 1.7 }}>
                  {country.culture}
                </div>
              </SectionCard>
              <SectionCard title="传统习俗" icon="🎊">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {country.customs.map((custom) => (
                    <div
                      key={custom}
                      style={{
                        background: '#FFF7E9',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        color: '#634A2C',
                        fontSize: '14px',
                        fontWeight: 700,
                        borderLeft: `4px solid ${accent}`,
                      }}
                    >
                      {custom}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {tab === 'food' && (
            <>
              <SectionCard title="必吃美食" icon="🍜">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {country.food.map((food) => (
                    <TagPill key={food} text={food} bg="#FFF3E0" color="#E67E22" />
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="地标与特产" icon="🗼">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {country.landmarks.map((landmark) => (
                    <TagPill key={landmark} text={landmark} bg="#E8F1FF" color="#1F5CA8" />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {country.specialties.map((specialty) => (
                    <TagPill key={specialty} text={specialty} bg="#EAF8EC" color="#1B7F3B" />
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {tab === 'history' && (
            <>
              {country.founded && (
                <SectionCard title="重要年份" icon="📅">
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#17325C' }}>{country.founded}</div>
                </SectionCard>
              )}
              <SectionCard title="历史简介" icon="📚">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#4E647E', lineHeight: 1.8 }}>
                  {country.history}
                </div>
              </SectionCard>
              {country.tags && country.tags.length > 0 && (
                <SectionCard title="记忆关键词" icon="🔖">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {country.tags.map((tag) => (
                      <TagPill key={tag} text={tag} bg="#F2EAFE" color="#6D3FC9" />
                    ))}
                  </div>
                </SectionCard>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onFocusQuiz}
        style={{
          width: '100%',
          marginTop: '16px',
          border: 'none',
          borderRadius: '16px',
          padding: '14px 18px',
          fontSize: '14px',
          fontWeight: 900,
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${accent}, #FFD166)`,
          color: '#17325C',
        }}
      >
        用 {country.name} 开启一题闯关
      </button>
    </motion.div>
  );
}

function QuizCoach({
  target,
  status,
  score,
  total,
  onExit,
}: {
  target: WorldCountry | null;
  status: QuizStatus;
  score: number;
  total: number;
  onExit: () => void;
}) {
  return (
    <SectionCard title="任务面板" icon="🎯">
      <AnimatePresence mode="wait">
        <motion.div
          key={status === 'waiting' ? target?.id ?? 'empty' : status}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {status === 'correct' ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
                borderRadius: '18px',
                padding: '18px',
                color: '#1B5E20',
                fontSize: '18px',
                fontWeight: 900,
                textAlign: 'center',
              }}
            >
              🎉 答对了，地图徽章点亮啦！
            </div>
          ) : status === 'wrong' ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #FFEBEE, #FFF3F3)',
                borderRadius: '18px',
                padding: '18px',
                color: '#C62828',
                fontSize: '18px',
                fontWeight: 900,
                textAlign: 'center',
              }}
            >
              ❌ 差一点，再看一下首都和大洲提示。
            </div>
          ) : target ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #E3F2FD, #F5FBFF)',
                borderRadius: '18px',
                padding: '18px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#5C769C', marginBottom: '8px' }}>
                请在地图上找到
              </div>
              <div style={{ fontSize: '30px', fontWeight: 900, color: '#17325C' }}>
                {target.flag} {target.name}
              </div>
              <div style={{ fontSize: '14px', color: '#486381', fontWeight: 700, marginTop: '6px' }}>
                {target.continent} · 首都 {target.capital}
              </div>
              <div
                style={{
                  marginTop: '14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}
              >
                <div style={{ background: '#FFF', borderRadius: '14px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7B90AB' }}>文化记忆点</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#17325C', marginTop: '4px' }}>
                    {target.tags?.[0] ?? target.food[0]}
                  </div>
                </div>
                <div style={{ background: '#FFF', borderRadius: '14px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7B90AB' }}>提示词</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#17325C', marginTop: '4px' }}>
                    {target.currencyCode} · {target.language}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#486381' }}>
              当前筛选下暂无可用题目，请切换大洲后再试。
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          marginTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#17325C' }}>
          当前得分 {score} / {total}
        </div>
        <button
          onClick={onExit}
          style={{
            border: 'none',
            borderRadius: '14px',
            padding: '10px 14px',
            fontSize: '13px',
            fontWeight: 900,
            cursor: 'pointer',
            background: '#EEF4FB',
            color: '#36506E',
          }}
        >
          返回探索模式
        </button>
      </div>
    </SectionCard>
  );
}

export default function WorldMapExplorer() {
  const [selectedCountry, setSelectedCountry] = useState<WorldCountry | null>(
    worldCountries[0] ?? null
  );
  const [hoveredRegionName, setHoveredRegionName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [mode, setMode] = useState<'explore' | 'quiz'>('explore');
  const [exploredIds, setExploredIds] = useState<Set<string>>(
    () => new Set(worldCountries[0] ? [worldCountries[0].id] : [])
  );
  const [quizState, setQuizState] = useState<{
    targetId: string | null;
    score: number;
    total: number;
    status: QuizStatus;
  }>({
    targetId: null,
    score: 0,
    total: 0,
    status: 'waiting',
  });
  const timerRef = useRef<number | null>(null);

  const filteredCountries = useMemo(
    () => filterWorldCountries(worldCountries, searchTerm, filterContinent),
    [filterContinent, searchTerm]
  );
  const summary = useMemo(
    () => summarizeWorldProgress(worldCountries, exploredIds),
    [exploredIds]
  );
  const hoveredCountry = useMemo(
    () =>
      hoveredRegionName ? resolveWorldCountryByFeatureName(worldCountries, hoveredRegionName) ?? null : null,
    [hoveredRegionName]
  );
  const quizPool = useMemo(() => {
    const continentScoped =
      filterContinent === 'all'
        ? worldCountries
        : worldCountries.filter((country) => country.continent === filterContinent);
    return continentScoped.length > 0 ? continentScoped : worldCountries;
  }, [filterContinent]);
  const quizTarget = useMemo(
    () => worldCountries.find((country) => country.id === quizState.targetId) ?? null,
    [quizState.targetId]
  );

  const spotlightCountries = useMemo(() => {
    if (filteredCountries.length > 0) {
      return filteredCountries.slice(0, 6);
    }

    return worldCountries
      .filter((country) => !exploredIds.has(country.id))
      .slice(0, 6);
  }, [exploredIds, filteredCountries]);

  const startQuizRound = useCallback(
    (previousId?: string, keepScore = true) => {
      const target = pickNextWorldQuizTarget(quizPool, exploredIds, previousId);
      setQuizState((previous) => ({
        targetId: target?.id ?? null,
        score: keepScore ? previous.score : 0,
        total: keepScore ? previous.total : 0,
        status: 'waiting',
      }));
    },
    [exploredIds, quizPool]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mode !== 'quiz') return;
    if (!quizTarget || !quizPool.some((country) => country.id === quizTarget.id)) {
      startQuizRound(quizTarget?.id, quizState.total > 0);
    }
  }, [mode, quizPool, quizState.total, quizTarget, startQuizRound]);

  const handleModeChange = useCallback(
    (nextMode: 'explore' | 'quiz') => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setMode(nextMode);
      if (nextMode === 'quiz') {
        setSelectedCountry(null);
        const target = pickNextWorldQuizTarget(quizPool, exploredIds);
        setQuizState({
          targetId: target?.id ?? null,
          score: 0,
          total: 0,
          status: 'waiting',
        });
        return;
      }

      setQuizState((previous) => ({ ...previous, status: 'waiting' }));
    },
    [exploredIds, quizPool]
  );

  const handleCountrySelect = useCallback(
    (regionName: string) => {
      const country = resolveWorldCountryByFeatureName(worldCountries, regionName);
      if (!country) return;

      setHoveredRegionName(regionName);

      if (mode === 'explore') {
        setSelectedCountry(country);
        setExploredIds((previous) => new Set([...previous, country.id]));
        return;
      }

      if (!quizTarget) return;

      setSelectedCountry(country);
      const isCorrect = quizTarget.id === country.id;

      setQuizState((previous) => ({
        ...previous,
        score: isCorrect ? previous.score + 1 : previous.score,
        total: previous.total + 1,
        status: isCorrect ? 'correct' : 'wrong',
      }));

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      if (isCorrect) {
        setExploredIds((previous) => new Set([...previous, country.id]));
        timerRef.current = window.setTimeout(() => {
          startQuizRound(country.id);
        }, 1300);
        return;
      }

      timerRef.current = window.setTimeout(() => {
        setQuizState((previous) => ({ ...previous, status: 'waiting' }));
      }, 900);
    },
    [mode, quizTarget, startQuizRound]
  );

  const chartOption = useMemo<EChartsOption>(() => {
    const visibleIds = new Set(filteredCountries.map((country) => country.id));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(17, 34, 68, 0.92)',
        borderWidth: 0,
        textStyle: { color: '#FFF' },
        formatter: (params: { name?: string }) => {
          const country = params.name
            ? resolveWorldCountryByFeatureName(worldCountries, params.name)
            : undefined;

          if (!country) {
            return `<div style="font-weight:800">${params.name ?? '未知区域'}</div><div style="margin-top:4px">更多国家内容持续补充中</div>`;
          }

          return `
            <div style="min-width: 180px">
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${country.flag} ${country.name}</div>
              <div style="font-size: 12px; opacity: 0.9;">${country.nameEn} · ${country.continent}</div>
              <div style="margin-top: 10px; font-size: 12px; line-height: 1.7;">
                <div>首都：${country.capital}</div>
                <div>语言：${country.language}</div>
                <div>关键词：${country.tags?.[0] ?? country.food[0]}</div>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          type: 'map',
          map: WORLD_MAP_KEY,
          roam: true,
          zoom: 1.08,
          scaleLimit: { min: 1, max: 6 },
          itemStyle: {
            areaColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.72)',
            borderWidth: 0.7,
          },
          emphasis: {
            label: { show: false },
            itemStyle: {
              areaColor: '#FFD166',
              borderColor: '#FFF8E1',
              borderWidth: 1.2,
            },
          },
          data: worldCountries.map((country) => {
            const accent = continentColors[country.continent] ?? '#FF9800';
            const isSelected = selectedCountry?.id === country.id;
            const isHovered = hoveredCountry?.id === country.id;
            const isVisible = visibleIds.has(country.id);
            const isExplored = exploredIds.has(country.id);
            const areaColor = isSelected
              ? '#FFD166'
              : isHovered
                ? withAlpha(accent, 'CC')
                : isExplored
                  ? accent
                  : filterContinent !== 'all' && !isVisible
                    ? 'rgba(255,255,255,0.12)'
                    : isVisible
                      ? withAlpha(accent, '88')
                      : withAlpha(accent, '40');

            return {
              name: getWorldCountryFeatureName(country),
              value: isExplored ? 100 : 60,
              itemStyle: {
                areaColor,
              },
            };
          }),
        },
      ],
    };
  }, [exploredIds, filterContinent, filteredCountries, hoveredCountry, selectedCountry]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #07162E 0%, #0E2B56 45%, #11417D 100%)',
      }}
    >
      <div style={{ maxWidth: '1480px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '34px',
                fontWeight: 900,
                color: '#FFF',
              }}
            >
              🌍 世界地图探索
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#D9ECFF', fontWeight: 700, lineHeight: 1.7 }}>
              用一张会说话的世界地图，把国家位置、文化故事和闯关记忆点串成孩子能反复探索的成长路线。
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '14px 16px',
              minWidth: '280px',
              color: '#FFF',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#B3E5FC', marginBottom: '8px' }}>
              当前学习焦点
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '6px' }}>
              {mode === 'quiz'
                ? `挑战 ${quizTarget?.name ?? '新题目'}`
                : `${selectedCountry?.flag ?? '🧭'} ${selectedCountry?.name ?? '从任意国家开始'}`}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#D7EEFF', lineHeight: 1.6 }}>
              {mode === 'quiz'
                ? '闯关模式会优先推送未探索国家，帮助孩子把“看过”变成“记住”。'
                : '探索模式强调即时反馈：点击地图立刻高亮、展示国家卡片和下一步建议。'}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            marginBottom: '18px',
          }}
        >
          <StatCard
            label="探索进度"
            value={`${summary.completionRate}%`}
            accent="#4FC3F7"
            helper={`已探索 ${summary.exploredCount} / ${summary.totalCount} 个国家`}
          />
          <StatCard
            label="当前地图范围"
            value={filterContinent === 'all' ? '全球' : filterContinent}
            accent="#FFD166"
            helper={filterContinent === 'all' ? '支持按大洲筛选' : '点击图例可快速切换目标洲'}
          />
          <StatCard
            label="闯关成绩"
            value={`${quizState.score}/${quizState.total}`}
            accent="#81C784"
            helper="正确后自动换题，错误时保留视觉提示。"
          />
          <StatCard
            label="推荐下一步"
            value={spotlightCountries[0]?.name ?? '继续点亮地图'}
            accent="#CE93D8"
            helper="系统优先推荐未探索或被筛选聚焦的国家。"
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <input
            type="text"
            placeholder="搜索国家 / 首都 / 美食 / 关键词"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{
              flex: '1 1 260px',
              minWidth: '220px',
              border: 'none',
              outline: 'none',
              borderRadius: '18px',
              padding: '14px 16px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#163155',
              boxShadow: '0 12px 28px rgba(5, 20, 46, 0.16)',
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '18px',
              padding: '8px',
            }}
          >
            {(['all', ...allContinents] as const).map((continent) => {
              const isActive = filterContinent === continent;
              return (
                <button
                  key={continent}
                  onClick={() => setFilterContinent(continent)}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 900,
                    background: isActive ? '#FFF' : 'transparent',
                    color: isActive ? '#17325C' : '#F5FBFF',
                  }}
                >
                  {continent === 'all' ? '🧭 全部大洲' : `${continentEmojis[continent]} ${continent}`}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '18px',
              padding: '8px',
            }}
          >
            {(['explore', 'quiz'] as const).map((nextMode) => {
              const isActive = mode === nextMode;
              return (
                <button
                  key={nextMode}
                  onClick={() => handleModeChange(nextMode)}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 900,
                    background: isActive ? '#FFF' : 'transparent',
                    color: isActive ? '#17325C' : '#FFF',
                  }}
                >
                  {nextMode === 'explore' ? '🔍 探索模式' : '🎮 闯关模式'}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.9fr) minmax(320px, 0.95fr)',
            gap: '18px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '30px',
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 24px 60px rgba(5, 20, 46, 0.22)',
            }}
          >
            <GeoEChart
              mapKey={WORLD_MAP_KEY}
              mapAssetUrl={WORLD_MAP_ASSET_URL}
              option={chartOption}
              height={620}
              onRegionClick={handleCountrySelect}
              onRegionHover={setHoveredRegionName}
            />

            <div
              style={{
                marginTop: '14px',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {(summary.continentProgress.length > 0 ? summary.continentProgress : []).map((item) => (
                <button
                  key={item.continent}
                  onClick={() => setFilterContinent(item.continent)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    background:
                      filterContinent === item.continent ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
                    color: '#FFF',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 900 }}>
                    {continentEmojis[item.continent]} {item.continent}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#D7EEFF', marginTop: '4px' }}>
                    {item.explored}/{item.total} · {item.completionRate}%
                  </div>
                </button>
              ))}
            </div>

            {hoveredCountry && (
              <div
                style={{
                  marginTop: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '18px',
                  padding: '14px 16px',
                  color: '#FFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900 }}>
                    {hoveredCountry.flag} {hoveredCountry.name}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#D7EEFF', marginTop: '4px' }}>
                    {hoveredCountry.nameEn} · {hoveredCountry.capital}
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FDE6B6' }}>
                  {hoveredCountry.tags?.[0] ?? hoveredCountry.food[0]}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'quiz' && (
              <QuizCoach
                target={quizTarget}
                status={quizState.status}
                score={quizState.score}
                total={quizState.total}
                onExit={() => handleModeChange('explore')}
              />
            )}

            <SectionCard title="推荐探索清单" icon="🧩">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {spotlightCountries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => {
                      setSelectedCountry(country);
                      setMode('explore');
                      setExploredIds((previous) => new Set([...previous, country.id]));
                    }}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '18px',
                      padding: '14px 16px',
                      background:
                        selectedCountry?.id === country.id
                          ? `linear-gradient(135deg, ${withAlpha(continentColors[country.continent], '22')}, rgba(255,255,255,0.96))`
                          : '#F7FAFE',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: '#17325C' }}>
                          {country.flag} {country.name}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#5D7592', marginTop: '4px' }}>
                          {country.continent} · {country.capital}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: continentColors[country.continent] }}>
                        {exploredIds.has(country.id) ? '已探索' : '待点亮'}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#4E647E', marginTop: '8px', lineHeight: 1.6 }}>
                      {country.funFact}
                    </div>
                  </button>
                ))}
              </div>
            </SectionCard>

            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <CountryDetailPanel
                  key={selectedCountry.id}
                  country={selectedCountry}
                  onFocusQuiz={() => {
                    handleModeChange('quiz');
                    setQuizState({
                      targetId: selectedCountry.id,
                      score: 0,
                      total: 0,
                      status: 'waiting',
                    });
                  }}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                >
                  <SectionCard title="探索教练建议" icon="🧭">
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#4E647E', lineHeight: 1.8 }}>
                      {mode === 'quiz'
                        ? '闯关时建议先观察大洲颜色和悬浮提示，再结合首都、语言、货币做快速判断。'
                        : '先从熟悉的国家开始，再对比同一大洲的饮食、文化和地标，孩子会更容易建立空间记忆。'}
                    </div>
                  </SectionCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
