import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { EChartsOption } from 'echarts';
import GeoEChart from './GeoEChart';
import {
  allRegions,
  chinaProvinces,
  regionColors,
  regionEmojis,
  typeLabels,
  type ChinaProvince,
} from './data/chinaData';
import {
  filterChinaProvinces,
  pickNextChinaQuizTarget,
  summarizeChinaProgress,
} from './explorerUtils';

const CHINA_MAP_KEY = 'kids-game-china-map';
const CHINA_MAP_ASSET_URL = '/maps/china.geo.json';

type ProvinceTab = 'basic' | 'food' | 'landmarks' | 'economy' | 'culture';
type QuizStatus = 'waiting' | 'correct' | 'wrong';
type QuizPromptType = 'find' | 'abbr' | 'capital';

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
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#CCF5D4', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFF', marginBottom: '6px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8FFF0', lineHeight: 1.5 }}>
        {helper}
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.96)',
        borderRadius: '22px',
        padding: '18px',
        boxShadow: '0 16px 38px rgba(12, 43, 24, 0.14)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '15px',
          fontWeight: 900,
          color: '#164B2B',
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

function ProvinceDetailPanel({
  province,
  onFocusQuiz,
}: {
  province: ChinaProvince;
  onFocusQuiz: () => void;
}) {
  const [tab, setTab] = useState<ProvinceTab>('basic');
  const accent = regionColors[province.region] ?? '#2E7D32';

  return (
    <motion.div
      key={province.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.24 }}
      style={{
        background: 'rgba(255,255,255,0.96)',
        borderRadius: '28px',
        padding: '20px',
        border: `2px solid ${withAlpha(accent, '44')}`,
        boxShadow: '0 22px 50px rgba(16, 51, 29, 0.14)',
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
        <div style={{ fontSize: '52px', marginBottom: '10px' }}>{province.flag}</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#164B2B' }}>{province.name}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#3E6F50', marginTop: '4px' }}>
          简称 {province.abbr} · 省会 {province.capital}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <TagPill text={typeLabels[province.type]} bg={withAlpha(accent, '18')} color={accent} />
          <TagPill text={`${regionEmojis[province.region]} ${province.region}`} bg="#EEF7F1" color="#164B2B" />
          <TagPill text={`GDP 第 ${province.gdpRank} 名`} bg="#E8F5E9" color="#1B5E20" />
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
          记忆金句
        </div>
        <div style={{ fontSize: '14px', color: '#5D4037', lineHeight: 1.7, fontWeight: 700 }}>
          {province.funFact}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {(
          [
            ['basic', '📍 基本'],
            ['food', '🍜 美食'],
            ['landmarks', '🏞️ 景区'],
            ['economy', '💼 经济'],
            ['culture', '🎭 文化'],
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
              background: tab === tabKey ? accent : '#EEF7F1',
              color: tab === tabKey ? '#FFF' : '#2D5A3D',
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
                  { label: '📐 面积', value: province.area },
                  { label: '🌤️ 气候', value: province.climate },
                  { label: '🏔️ 地形', value: province.terrain },
                  { label: '🏙️ 主要城市', value: province.majorCities.slice(0, 4).join('、') },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ background: '#F6FBF7', borderRadius: '16px', padding: '12px' }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#6A8D77', marginBottom: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#164B2B', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <SectionCard title="历史简介" icon="📜">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#456755', lineHeight: 1.7 }}>
                  {province.history}
                </div>
              </SectionCard>
              {province.universities.length > 0 && (
                <SectionCard title="顶尖高校" icon="🎓">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {province.universities.map((university) => (
                      <TagPill key={university} text={university} bg="#E3F2FD" color="#1565C0" />
                    ))}
                  </div>
                </SectionCard>
              )}
            </>
          )}

          {tab === 'food' && (
            <>
              <SectionCard title="地方味道" icon="🍽️">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {province.cuisine.map((food) => (
                    <TagPill key={food} text={food} bg="#FFF3E0" color="#E67E22" />
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="代表特产" icon="🎁">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {province.specialties.map((specialty) => (
                    <TagPill key={specialty} text={specialty} bg="#EAF8EC" color="#1B7F3B" />
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {tab === 'landmarks' && (
            <>
              <SectionCard title="旅行打卡点" icon="🧳">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {province.landmarks.map((landmark) => (
                    <div
                      key={landmark}
                      style={{
                        background: '#F4FBF5',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        color: '#315742',
                        fontSize: '14px',
                        fontWeight: 800,
                        borderLeft: `4px solid ${accent}`,
                      }}
                    >
                      {landmark}
                    </div>
                  ))}
                </div>
              </SectionCard>
              {province.festivals.length > 0 && (
                <SectionCard title="节日与习俗" icon="🎉">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {province.festivals.map((festival) => (
                      <div
                        key={festival}
                        style={{
                          background: '#FFF7E9',
                          borderRadius: '14px',
                          padding: '12px 14px',
                          color: '#634A2C',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {festival}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}
            </>
          )}

          {tab === 'economy' && (
            <>
              <SectionCard title="发展亮点" icon="🚄">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#456755', lineHeight: 1.7 }}>
                  {province.economy}
                </div>
              </SectionCard>
              <SectionCard title="支柱产业" icon="🏭">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {province.industries.map((industry) => (
                    <TagPill key={industry} text={industry} bg="#E3F2FD" color="#1565C0" />
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {tab === 'culture' && (
            <>
              <SectionCard title="文化名片" icon="🪭">
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#456755', lineHeight: 1.7 }}>
                  {province.culture}
                </div>
              </SectionCard>
              {province.famousPeople.length > 0 && (
                <SectionCard title="代表人物" icon="🌟">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {province.famousPeople.map((person) => (
                      <TagPill key={person} text={person} bg="#F2EAFE" color="#6D3FC9" />
                    ))}
                  </div>
                </SectionCard>
              )}
              {province.tags && province.tags.length > 0 && (
                <SectionCard title="关键词" icon="🔖">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {province.tags.map((tag) => (
                      <TagPill key={tag} text={tag} bg="#EEF7F1" color={accent} />
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
          background: `linear-gradient(135deg, ${accent}, #B7E4C7)`,
          color: '#164B2B',
        }}
      >
        用 {province.name} 来一题挑战
      </button>
    </motion.div>
  );
}

function QuizCoach({
  target,
  promptType,
  status,
  score,
  total,
  onExit,
}: {
  target: ChinaProvince | null;
  promptType: QuizPromptType;
  status: QuizStatus;
  score: number;
  total: number;
  onExit: () => void;
}) {
  const promptText =
    promptType === 'find'
      ? '请在地图上找到这个省份'
      : promptType === 'abbr'
        ? '哪个省份的简称是'
        : '哪个省份的省会是';

  const answerText =
    promptType === 'find'
      ? `${target?.flag ?? '🗺️'} ${target?.name ?? '新目标'}`
      : promptType === 'abbr'
        ? `「${target?.abbr ?? ''}」`
        : `${target?.capital ?? ''}`;

  return (
    <SectionCard title="闯关任务" icon="🎯">
      <AnimatePresence mode="wait">
        <motion.div
          key={status === 'waiting' ? `${promptType}-${target?.id ?? 'empty'}` : status}
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
              🎉 答对了，省份印象又加深了一格！
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
              ❌ 再观察一下区域颜色和简称提示。
            </div>
          ) : target ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #E8F5E9, #F5FFF7)',
                borderRadius: '18px',
                padding: '18px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#5F866A', marginBottom: '8px' }}>
                {promptText}
              </div>
              <div style={{ fontSize: '30px', fontWeight: 900, color: '#164B2B' }}>{answerText}</div>
              <div style={{ fontSize: '14px', color: '#476858', fontWeight: 700, marginTop: '6px' }}>
                {target.region} · {typeLabels[target.type]}
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
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7B9A82' }}>提示词</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#164B2B', marginTop: '4px' }}>
                    {target.tags?.[0] ?? target.specialties[0]}
                  </div>
                </div>
                <div style={{ background: '#FFF', borderRadius: '14px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7B9A82' }}>文化记忆点</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#164B2B', marginTop: '4px' }}>
                    {target.cuisine[0]}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#476858' }}>
              当前筛选下暂无可用题目，请切换地区后再试。
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
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#164B2B' }}>
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
            background: '#EEF7F1',
            color: '#2D5A3D',
          }}
        >
          返回探索模式
        </button>
      </div>
    </SectionCard>
  );
}

export default function ChinaMapExplorer() {
  const [selectedProvince, setSelectedProvince] = useState<ChinaProvince | null>(
    chinaProvinces[0] ?? null
  );
  const [hoveredProvinceName, setHoveredProvinceName] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState<'explore' | 'quiz'>('explore');
  const [exploredIds, setExploredIds] = useState<Set<string>>(
    () => new Set(chinaProvinces[0] ? [chinaProvinces[0].id] : [])
  );
  const [quizState, setQuizState] = useState<{
    targetId: string | null;
    promptType: QuizPromptType;
    score: number;
    total: number;
    status: QuizStatus;
  }>({
    targetId: null,
    promptType: 'find',
    score: 0,
    total: 0,
    status: 'waiting',
  });
  const timerRef = useRef<number | null>(null);

  const filteredProvinces = useMemo(
    () => filterChinaProvinces(chinaProvinces, searchTerm, filterRegion),
    [filterRegion, searchTerm]
  );
  const summary = useMemo(
    () => summarizeChinaProgress(chinaProvinces, exploredIds),
    [exploredIds]
  );
  const hoveredProvince = useMemo(
    () => chinaProvinces.find((province) => province.name === hoveredProvinceName) ?? null,
    [hoveredProvinceName]
  );
  const quizPool = useMemo(() => {
    const regionScoped =
      filterRegion === 'all'
        ? chinaProvinces
        : chinaProvinces.filter((province) => province.region === filterRegion);
    return regionScoped.length > 0 ? regionScoped : chinaProvinces;
  }, [filterRegion]);
  const quizTarget = useMemo(
    () => chinaProvinces.find((province) => province.id === quizState.targetId) ?? null,
    [quizState.targetId]
  );

  const spotlightProvinces = useMemo(() => {
    if (filteredProvinces.length > 0) {
      return filteredProvinces.slice(0, 6);
    }

    return chinaProvinces.filter((province) => !exploredIds.has(province.id)).slice(0, 6);
  }, [exploredIds, filteredProvinces]);

  const startQuizRound = useCallback(
    (previousId?: string, keepScore = true) => {
      const target = pickNextChinaQuizTarget(quizPool, exploredIds, previousId);
      const promptTypes: QuizPromptType[] = ['find', 'abbr', 'capital'];
      const promptType = promptTypes[Math.floor(Math.random() * promptTypes.length)] ?? 'find';
      setQuizState((previous) => ({
        targetId: target?.id ?? null,
        promptType,
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
    if (!quizTarget || !quizPool.some((province) => province.id === quizTarget.id)) {
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
        setSelectedProvince(null);
        const target = pickNextChinaQuizTarget(quizPool, exploredIds);
        const promptTypes: QuizPromptType[] = ['find', 'abbr', 'capital'];
        const promptType = promptTypes[Math.floor(Math.random() * promptTypes.length)] ?? 'find';
        setQuizState({
          targetId: target?.id ?? null,
          promptType,
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

  const handleProvinceSelect = useCallback(
    (provinceName: string) => {
      const province = chinaProvinces.find((item) => item.name === provinceName);
      if (!province) return;

      setHoveredProvinceName(provinceName);

      if (mode === 'explore') {
        setSelectedProvince(province);
        setExploredIds((previous) => new Set([...previous, province.id]));
        return;
      }

      if (!quizTarget) return;

      setSelectedProvince(province);
      const isCorrect = province.id === quizTarget.id;

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
        setExploredIds((previous) => new Set([...previous, province.id]));
        timerRef.current = window.setTimeout(() => {
          startQuizRound(province.id);
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
    const visibleIds = new Set(filteredProvinces.map((province) => province.id));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(21, 54, 31, 0.94)',
        borderWidth: 0,
        textStyle: { color: '#FFF' },
        formatter: (params: { name?: string }) => {
          const province = params.name
            ? chinaProvinces.find((item) => item.name === params.name)
            : undefined;

          if (!province) {
            return `<div style="font-weight:800">${params.name ?? '未知区域'}</div>`;
          }

          return `
            <div style="min-width: 180px">
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${province.flag} ${province.name}</div>
              <div style="font-size: 12px; opacity: 0.9;">${province.region} · ${typeLabels[province.type]}</div>
              <div style="margin-top: 10px; font-size: 12px; line-height: 1.7;">
                <div>简称：${province.abbr}</div>
                <div>省会：${province.capital}</div>
                <div>关键词：${province.tags?.[0] ?? province.specialties[0]}</div>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          type: 'map',
          map: CHINA_MAP_KEY,
          roam: true,
          zoom: 1.02,
          aspectScale: 0.86,
          scaleLimit: { min: 1, max: 6 },
          layoutCenter: ['50%', '52%'],
          layoutSize: '112%',
          itemStyle: {
            areaColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.9)',
            borderWidth: 1,
          },
          label: {
            show: true,
            fontSize: 11,
            color: '#F8FFF9',
            formatter: ({ name }: { name?: string }) => {
              const province = chinaProvinces.find((item) => item.name === name);
              return province?.abbr.replace(/（.*?）/g, '').slice(0, 3) ?? name ?? '';
            },
          },
          emphasis: {
            label: {
              color: '#164B2B',
              fontWeight: 'bold',
            },
            itemStyle: {
              areaColor: '#B7E4C7',
              borderColor: '#F1FFF5',
              borderWidth: 1.3,
            },
          },
          data: chinaProvinces.map((province) => {
            const accent = regionColors[province.region] ?? '#2E7D32';
            const isSelected = selectedProvince?.id === province.id;
            const isHovered = hoveredProvince?.id === province.id;
            const isVisible = visibleIds.has(province.id);
            const isExplored = exploredIds.has(province.id);
            const areaColor = isSelected
              ? '#B7E4C7'
              : isHovered
                ? withAlpha(accent, 'CC')
                : isExplored
                  ? accent
                  : filterRegion !== 'all' && !isVisible
                    ? 'rgba(255,255,255,0.14)'
                    : isVisible
                      ? withAlpha(accent, '88')
                      : withAlpha(accent, '40');

            return {
              name: province.name,
              value: isExplored ? 100 : 60,
              itemStyle: {
                areaColor,
              },
              label: {
                color: isSelected ? '#164B2B' : '#F8FFF9',
              },
            };
          }),
        },
      ],
    };
  }, [exploredIds, filterRegion, filteredProvinces, hoveredProvince, selectedProvince]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #12361B 0%, #1E5A31 45%, #2C7A4B 100%)',
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
              🗺️ 中国地图探索
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#E3FBEA', fontWeight: 700, lineHeight: 1.7 }}>
              把省份位置、简称、特产和文化做成一张孩子愿意反复点击的中国成长地图。
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
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#CCF5D4', marginBottom: '8px' }}>
              当前学习焦点
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '6px' }}>
              {mode === 'quiz'
                ? `挑战 ${quizTarget?.name ?? '新题目'}`
                : `${selectedProvince?.flag ?? '🧭'} ${selectedProvince?.name ?? '从任意省份开始'}`}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8FFF0', lineHeight: 1.6 }}>
              {mode === 'quiz'
                ? '闯关模式会轮流考省份位置、简称和省会，帮助孩子形成多维记忆。'
                : '探索模式突出“点哪里、学哪里”的即时反馈，降低地图学习门槛。'}
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
            accent="#A5D6A7"
            helper={`已探索 ${summary.exploredCount} / ${summary.totalCount} 个省级行政区`}
          />
          <StatCard
            label="当前地区范围"
            value={filterRegion === 'all' ? '全国' : filterRegion}
            accent="#FFD166"
            helper={filterRegion === 'all' ? '支持按地理大区筛选' : '点击地区按钮可快速切换'}
          />
          <StatCard
            label="闯关成绩"
            value={`${quizState.score}/${quizState.total}`}
            accent="#81C784"
            helper="答对后自动换题，错题会保留短暂视觉反馈。"
          />
          <StatCard
            label="推荐下一步"
            value={spotlightProvinces[0]?.name ?? '继续点亮中国地图'}
            accent="#90CAF9"
            helper="系统优先推荐未探索或当前筛选范围内的省份。"
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
            placeholder="搜索省份 / 省会 / 特产 / 美食"
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
              color: '#164B2B',
              boxShadow: '0 12px 28px rgba(12, 43, 24, 0.16)',
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
            {(['all', ...allRegions] as const).map((region) => {
              const isActive = filterRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => setFilterRegion(region)}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 900,
                    background: isActive ? '#FFF' : 'transparent',
                    color: isActive ? '#164B2B' : '#F6FFF8',
                  }}
                >
                  {region === 'all' ? '🧭 全部地区' : `${regionEmojis[region]} ${region}`}
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
                    color: isActive ? '#164B2B' : '#FFF',
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
              boxShadow: '0 24px 60px rgba(12, 43, 24, 0.22)',
            }}
          >
            <GeoEChart
              mapKey={CHINA_MAP_KEY}
              mapAssetUrl={CHINA_MAP_ASSET_URL}
              option={chartOption}
              height={620}
              onRegionClick={handleProvinceSelect}
              onRegionHover={setHoveredProvinceName}
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
              {summary.regionProgress.map((item) => (
                <button
                  key={item.region}
                  onClick={() => setFilterRegion(item.region)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    background:
                      filterRegion === item.region ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
                    color: '#FFF',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 900 }}>
                    {regionEmojis[item.region]} {item.region}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8FFF0', marginTop: '4px' }}>
                    {item.explored}/{item.total} · {item.completionRate}%
                  </div>
                </button>
              ))}
            </div>

            {hoveredProvince && (
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
                    {hoveredProvince.flag} {hoveredProvince.name}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#E8FFF0', marginTop: '4px' }}>
                    {hoveredProvince.abbr} · {hoveredProvince.capital}
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFF4BE' }}>
                  {hoveredProvince.tags?.[0] ?? hoveredProvince.specialties[0]}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'quiz' && (
              <QuizCoach
                target={quizTarget}
                promptType={quizState.promptType}
                status={quizState.status}
                score={quizState.score}
                total={quizState.total}
                onExit={() => handleModeChange('explore')}
              />
            )}

            <SectionCard title="推荐探索清单" icon="🧩">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {spotlightProvinces.map((province) => (
                  <button
                    key={province.id}
                    onClick={() => {
                      setSelectedProvince(province);
                      setMode('explore');
                      setExploredIds((previous) => new Set([...previous, province.id]));
                    }}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '18px',
                      padding: '14px 16px',
                      background:
                        selectedProvince?.id === province.id
                          ? `linear-gradient(135deg, ${withAlpha(regionColors[province.region], '22')}, rgba(255,255,255,0.96))`
                          : '#F7FCF8',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: '#164B2B' }}>
                          {province.flag} {province.name}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#5D7E68', marginTop: '4px' }}>
                          {province.region} · {province.capital}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: regionColors[province.region] }}>
                        {exploredIds.has(province.id) ? '已探索' : '待点亮'}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#456755', marginTop: '8px', lineHeight: 1.6 }}>
                      {province.funFact}
                    </div>
                  </button>
                ))}
              </div>
            </SectionCard>

            <AnimatePresence mode="wait">
              {selectedProvince ? (
                <ProvinceDetailPanel
                  key={selectedProvince.id}
                  province={selectedProvince}
                  onFocusQuiz={() => {
                    handleModeChange('quiz');
                    setQuizState({
                      targetId: selectedProvince.id,
                      promptType: 'find',
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
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#456755', lineHeight: 1.8 }}>
                      {mode === 'quiz'
                        ? '闯关时先观察地理大区颜色，再结合简称、省会和特产线索，孩子会更快定位。'
                        : '先看熟悉的城市，再往周边省份扩散，最适合建立中国地图的整体方位感。'}
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
