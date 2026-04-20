import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GamePageHeader, PageLayout } from '../../components/PageLayout';
import { track } from '../../lib/analytics';
import {
  buildPerspectiveStoryBeats,
  getHistoryEventIndex,
  getHistoryPeopleIndex,
  historyStoryEras,
  type HistoryMapNode,
  type HistoryStoryBeat,
  type HistoryStoryPerspective,
} from './historyData';

type StoryScope = 'all' | 'china' | 'world';

function speakText(text: string, onDone: () => void) {
  if (!('speechSynthesis' in window)) {
    onDone();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.88;
  utterance.pitch = 1.08;
  utterance.onend = onDone;
  utterance.onerror = onDone;
  window.speechSynthesis.speak(utterance);
}

function withAlpha(color: string, alpha: string) {
  return `${color}${alpha}`;
}

function Tag({
  children,
  background,
  color,
}: {
  children: ReactNode;
  background: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 12px',
        borderRadius: '999px',
        background,
        color,
        fontSize: '12px',
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  tone,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  tone: 'warm' | 'cool';
}) {
  const palette =
    tone === 'warm'
      ? { background: '#FFF3E0', border: '#FFB74D', color: '#B85C00' }
      : { background: '#E3F2FD', border: '#64B5F6', color: '#1565C0' };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: '40px',
        padding: '8px 14px',
        borderRadius: '999px',
        border: active ? `2px solid ${palette.border}` : '2px solid rgba(0,0,0,0.06)',
        background: active ? palette.background : '#FFFFFF',
        color: active ? palette.color : '#6D4C41',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 800,
        boxShadow: active ? `0 8px 18px ${withAlpha(palette.border, '30')}` : 'none',
      }}
    >
      {label}
    </button>
  );
}

function IndexActionButton({
  label,
  accent,
  onClick,
  expanded,
  controls,
}: {
  label: string;
  accent: string;
  onClick: () => void;
  expanded: boolean;
  controls: string;
}) {
  return (
    <motion.button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        minHeight: '36px',
        padding: '8px 12px',
        borderRadius: '999px',
        border: `1px solid ${withAlpha(accent, '32')}`,
        background: '#FFFFFF',
        color: accent,
        fontSize: '12px',
        fontWeight: 900,
        cursor: 'pointer',
        boxShadow: `0 8px 16px ${withAlpha(accent, '12')}`,
      }}
    >
      {label}
    </motion.button>
  );
}

function SectionCard({
  title,
  icon,
  children,
  accent,
  actions,
}: {
  title: string;
  icon: string;
  children: ReactNode;
  accent: string;
  actions?: ReactNode;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '14px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px',
            fontWeight: 900,
            color: accent,
          }}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function CollapsibleRows({
  children,
  collapsedRows = 2,
  expanded,
  accent,
  contentId,
}: {
  children: ReactNode;
  collapsedRows?: number;
  expanded: boolean;
  accent: string;
  contentId?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);

  const measureHeight = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const directChildren = Array.from(container.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    const items =
      directChildren.length === 1 && directChildren[0].children.length > 0
        ? Array.from(directChildren[0].children).filter((node): node is HTMLElement => node instanceof HTMLElement)
        : directChildren;

    if (items.length === 0) {
      setCollapsedHeight(null);
      return;
    }

    const rowTops: number[] = [];
    items.forEach((item) => {
      if (!rowTops.some((top) => Math.abs(top - item.offsetTop) <= 1)) {
        rowTops.push(item.offsetTop);
      }
    });

    if (rowTops.length <= collapsedRows) {
      setCollapsedHeight(null);
      return;
    }

    const allowedRows = rowTops.slice(0, collapsedRows);
    const height = Math.max(
      ...items
        .filter((item) => allowedRows.some((top) => Math.abs(top - item.offsetTop) <= 1))
        .map((item) => item.offsetTop + item.offsetHeight),
    );

    setCollapsedHeight(height);
  }, [collapsedRows]);

  useEffect(() => {
    measureHeight();

    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const observer = new ResizeObserver(() => measureHeight());
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [children, measureHeight]);

  const isCollapsed = !expanded && collapsedHeight !== null;

  return (
    <div style={{ position: 'relative' }}>
      <div
        id={contentId}
        data-collapse-id={contentId}
        ref={containerRef}
        style={{
          maxHeight: isCollapsed ? `${collapsedHeight}px` : 'none',
          overflow: isCollapsed ? 'hidden' : 'visible',
          transition: 'max-height 0.28s ease',
        }}
      >
        {children}
      </div>
      {isCollapsed && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '52px',
            pointerEvents: 'none',
            background: `linear-gradient(180deg, ${withAlpha(accent, '00')}, rgba(255,255,255,0.98))`,
          }}
        />
      )}
    </div>
  );
}

function getSearchText(era: (typeof historyStoryEras)[number]) {
  return [
    era.yearLabel,
    era.title,
    era.summary,
    era.compareNote,
    era.china.title,
    era.china.story,
    ...era.china.characters,
    ...era.china.events,
    ...era.china.administration,
    ...era.china.landforms,
    ...era.china.landmarks,
    era.world.title,
    era.world.story,
    ...era.world.characters,
    ...era.world.events,
    ...era.world.administration,
    ...era.world.landforms,
    ...era.world.landmarks,
  ]
    .join(' ')
    .toLowerCase();
}

function NarrationButton({
  label,
  active,
  accent,
  onClick,
}: {
  label: string;
  active: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        minHeight: '42px',
        padding: '10px 14px',
        borderRadius: '14px',
        border: active ? `2px solid ${accent}` : `1px solid ${withAlpha(accent, '30')}`,
        background: active ? accent : withAlpha(accent, '12'),
        color: active ? '#FFFFFF' : accent,
        fontSize: '13px',
        fontWeight: 900,
        cursor: 'pointer',
        boxShadow: active ? `0 12px 22px ${withAlpha(accent, '35')}` : 'none',
      }}
    >
      {active ? '⏹️ 停止播放' : label}
    </motion.button>
  );
}

function StoryMap({
  title,
  description,
  nodes,
  accent,
  seaColor,
}: {
  title: string;
  description: string;
  nodes: HistoryMapNode[];
  accent: string;
  seaColor: string;
}) {
  const toneColor: Record<HistoryMapNode['tone'], string> = {
    core: accent,
    frontier: '#8E24AA',
    route: '#00897B',
  };

  return (
    <SectionCard title={title} icon="🗺️" accent={accent}>
      <div
        style={{
          position: 'relative',
          minHeight: '230px',
          borderRadius: '22px',
          background: `linear-gradient(135deg, ${withAlpha(seaColor, '22')}, #FFF8E1)`,
          border: `2px dashed ${withAlpha(accent, '44')}`,
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '10%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            filter: 'blur(30px)',
          }}
        />
        {nodes.map((node) => (
          <motion.div
            key={`${node.label}-${node.top}-${node.left}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.26 }}
            style={{
              position: 'absolute',
              top: node.top,
              left: node.left,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: node.tone === 'route' ? '16px' : '18px',
                height: node.tone === 'route' ? '16px' : '18px',
                borderRadius: node.tone === 'route' ? '8px' : '50%',
                background: toneColor[node.tone],
                boxShadow: `0 0 0 6px ${withAlpha(toneColor[node.tone], '22')}`,
              }}
            />
            <span
              style={{
                background: '#FFFFFF',
                color: '#4E342E',
                padding: '6px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 800,
                boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
                whiteSpace: 'nowrap',
              }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#6D4C41', lineHeight: 1.7 }}>
        {description}
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
        <Tag background={withAlpha(accent, '15')} color={accent}>
          核心区域
        </Tag>
        <Tag background="#F3E5F5" color="#8E24AA">
          边疆/新接触地带
        </Tag>
        <Tag background="#E0F2F1" color="#00796B">
          交通路线
        </Tag>
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#8D6E63', fontWeight: 700 }}>
        这是帮助儿童理解空间关系的示意地图，不是精确历史疆域图。
      </div>
    </SectionCard>
  );
}

function PerspectivePanel({
  perspective,
  storyBeats,
  scopeKey,
  accent,
  seaColor,
  activeNarrationTarget,
  onNarrate,
}: {
  perspective: HistoryStoryPerspective;
  storyBeats: HistoryStoryBeat[];
  scopeKey: Exclude<StoryScope, 'all'>;
  accent: string;
  seaColor: string;
  activeNarrationTarget: string | null;
  onNarrate: (target: string, text: string, metadata: Record<string, string>) => void;
}) {
  const panelNarrationTarget = `panel:${scopeKey}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,248,225,0.94))',
        borderRadius: '28px',
        padding: '22px',
        border: `2px solid ${withAlpha(accent, '30')}`,
        boxShadow: '0 20px 42px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '18px',
        }}
        >
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#3E2723' }}>
              {perspective.title}
            </h2>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.85, color: '#5D4037', fontWeight: 700 }}>
              {perspective.story}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px', alignItems: 'center' }}>
              <NarrationButton
                label={scopeKey === 'china' ? '🔊 听中国故事' : '🔊 听世界故事'}
                active={activeNarrationTarget === panelNarrationTarget}
                accent={accent}
                onClick={() =>
                  onNarrate(panelNarrationTarget, `${perspective.title}。${perspective.story}`, {
                    scope: scopeKey,
                    segment: 'panel',
                  })
                }
              />
              <Tag background={withAlpha(accent, '12')} color={accent}>
                适合孩子先听一遍，再看下面的小剧场
              </Tag>
            </div>
          </div>
        <div
          style={{
            minWidth: '240px',
            background: withAlpha(accent, '10'),
            borderRadius: '20px',
            padding: '16px',
            border: `1px solid ${withAlpha(accent, '26')}`,
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 900, color: accent, marginBottom: '10px' }}>
            人物与事件索引
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {perspective.characters.map((person) => (
              <Tag key={person} background="#FFF8E1" color="#EF6C00">
                {person}
              </Tag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {perspective.events.map((event) => (
              <Tag key={event} background="#E8F5E9" color="#2E7D32">
                {event}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '18px' }}>
        <SectionCard title="故事小剧场" icon="🎧" accent={accent}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {storyBeats.map((beat, index) => {
              const beatTarget = `beat:${scopeKey}:${index}`;
              return (
                <div
                  key={`${scopeKey}-${beat.title}`}
                  style={{
                    background: '#FFFDF7',
                    borderRadius: '20px',
                    border: `1px solid ${withAlpha(accent, '26')}`,
                    padding: '16px',
                    display: 'grid',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 900, color: accent, marginBottom: '6px' }}>
                        第 {index + 1} 幕
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: '#3E2723' }}>{beat.title}</div>
                    </div>
                    <NarrationButton
                      label="▶️ 播放"
                      active={activeNarrationTarget === beatTarget}
                      accent={accent}
                      onClick={() =>
                        onNarrate(beatTarget, beat.narration, {
                          scope: scopeKey,
                          segment: `beat-${index + 1}`,
                        })
                      }
                    />
                  </div>
                  <div style={{ fontSize: '14px', color: '#6D4C41', lineHeight: 1.8, fontWeight: 700 }}>
                    {beat.narration}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {beat.focusLabels.map((item) => (
                      <Tag key={`${beat.title}-${item}`} background={withAlpha(accent, '12')} color={accent}>
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <StoryMap
          title="地图理解卡"
          description={perspective.mapSummary}
          nodes={perspective.mapNodes}
          accent={accent}
          seaColor={seaColor}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          <SectionCard title="行政区 / 管理线索" icon="🏛️" accent={accent}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {perspective.administration.map((item) => (
                <Tag key={item} background={withAlpha(accent, '14')} color={accent}>
                  {item}
                </Tag>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="地形地势" icon="⛰️" accent={accent}>
            <div style={{ fontSize: '14px', color: '#5D4037', lineHeight: 1.75, fontWeight: 700 }}>
              {perspective.terrain}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              {perspective.landforms.map((landform) => (
                <Tag key={landform} background="#E3F2FD" color="#1565C0">
                  {landform}
                </Tag>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="今天还能找到的地点" icon="📍" accent={accent}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {perspective.landmarks.map((landmark) => (
                <Tag key={landmark} background="#F3E5F5" color="#8E24AA">
                  {landmark}
                </Tag>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="听完故事想一想" icon="💡" accent={accent}>
          <div style={{ display: 'grid', gap: '10px' }}>
            {perspective.kidQuestions.map((question) => (
              <div
                key={question}
                style={{
                  background: '#FFFDF7',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#6D4C41',
                  lineHeight: 1.7,
                  border: '1px solid rgba(255, 183, 77, 0.35)',
                }}
              >
                {question}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </motion.section>
  );
}

export default function HistoryTimelineExplorer() {
  const navigate = useNavigate();
  const [selectedEraId, setSelectedEraId] = useState(historyStoryEras[0]?.id ?? '');
  const [scope, setScope] = useState<StoryScope>('all');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [peopleExpanded, setPeopleExpanded] = useState(false);
  const [activeNarrationTarget, setActiveNarrationTarget] = useState<string | null>(null);

  const peopleIndex = useMemo(() => getHistoryPeopleIndex(), []);
  const eventIndex = useMemo(() => getHistoryEventIndex(), []);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const searchMatchedEraIds = useMemo(
    () =>
      historyStoryEras
        .filter((era) => !normalizedSearchQuery || getSearchText(era).includes(normalizedSearchQuery))
        .map((era) => era.id),
    [normalizedSearchQuery],
  );

  const matchingEraIds = useMemo(
    () =>
      historyStoryEras
        .filter((era) => {
          if (!searchMatchedEraIds.includes(era.id)) {
            return false;
          }
          const people = [...era.china.characters, ...era.world.characters];
          const events = [...era.china.events, ...era.world.events];
          return (!selectedPerson || people.includes(selectedPerson)) && (!selectedEvent || events.includes(selectedEvent));
        })
        .map((era) => era.id),
    [searchMatchedEraIds, selectedEvent, selectedPerson],
  );

  const visibleTimelineEras = useMemo(
    () => historyStoryEras.filter((era) => matchingEraIds.includes(era.id)),
    [matchingEraIds],
  );

  const visiblePeopleIndex = useMemo(() => {
    const eraIds = new Set(searchMatchedEraIds);
    return peopleIndex.filter((person) => {
      const personInMatchedEra = historyStoryEras.some(
        (era) =>
          eraIds.has(era.id) && [...era.china.characters, ...era.world.characters].includes(person),
      );
      return personInMatchedEra && (!normalizedSearchQuery || person.includes(searchQuery.trim()) || !selectedPerson || person === selectedPerson);
    });
  }, [peopleIndex, searchMatchedEraIds, normalizedSearchQuery, searchQuery, selectedPerson]);

  const visibleEventIndex = useMemo(() => {
    const eraIds = new Set(searchMatchedEraIds);
    return eventIndex.filter((event) =>
      historyStoryEras.some(
        (era) => eraIds.has(era.id) && [...era.china.events, ...era.world.events].includes(event),
      ),
    );
  }, [eventIndex, searchMatchedEraIds]);

  useEffect(() => {
    if (matchingEraIds.length === 0) {
      return;
    }

    if (!matchingEraIds.includes(selectedEraId)) {
      setSelectedEraId(matchingEraIds[0]);
    }
  }, [matchingEraIds, selectedEraId]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveNarrationTarget(null);
  }, [scope, selectedEraId]);

  const selectedEra =
    historyStoryEras.find((era) => era.id === selectedEraId) ??
    historyStoryEras.find((era) => matchingEraIds.includes(era.id)) ??
    historyStoryEras[0];

  const narrationText = useMemo(() => {
    if (!selectedEra) {
      return '';
    }

    const base = [`${selectedEra.yearLabel}，${selectedEra.title}。${selectedEra.summary}`];
    if (scope !== 'world') {
      base.push(`${selectedEra.china.title}。${selectedEra.china.story}`);
      base.push(`地图重点：${selectedEra.china.mapSummary}`);
    }
    if (scope !== 'china') {
      base.push(`${selectedEra.world.title}。${selectedEra.world.story}`);
      base.push(`地图重点：${selectedEra.world.mapSummary}`);
    }
    return base.join('');
  }, [scope, selectedEra]);

  const handleNarration = useCallback(
    (target: string, text: string, metadata: Record<string, string>) => {
      if (!selectedEra || !text) {
        return;
      }

      if (activeNarrationTarget === target && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setActiveNarrationTarget(null);
        return;
      }

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      setActiveNarrationTarget(target);
      track('history_story_narration_start', { eraId: selectedEra.id, ...metadata });
      speakText(text, () => {
        setActiveNarrationTarget((current) => (current === target ? null : current));
      });
    },
    [activeNarrationTarget, selectedEra],
  );

  const handleOverviewNarration = useCallback(() => {
    handleNarration('overview', narrationText, { scope, segment: 'overview' });
  }, [handleNarration, narrationText, scope]);

  const clearFilters = useCallback(() => {
    setSelectedPerson(null);
    setSelectedEvent(null);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const hasActiveFilters = Boolean(searchQuery.trim() || selectedPerson || selectedEvent);
  const hasMatches = matchingEraIds.length > 0;

  if (!selectedEra) {
    return null;
  }

  const chinaStoryBeats = buildPerspectiveStoryBeats(selectedEra.china);
  const worldStoryBeats = buildPerspectiveStoryBeats(selectedEra.world);

  return (
    <PageLayout maxWidth="1180px">
      <GamePageHeader
        title="历史故事时间轴"
        icon="🕰️"
        subtitle="按年代旅行，一边听故事，一边看人物、事件、行政区和地图线索。"
        gradient="linear-gradient(135deg, #6D4C41, #FFB74D)"
        progressColor="#8D6E63"
        onBack={() => navigate('/games/history')}
        backLabel="← 返回历史故事馆"
      />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'linear-gradient(135deg, rgba(109,76,65,0.96), rgba(255,183,77,0.92))',
          borderRadius: '30px',
          padding: '24px',
          color: '#FFFDF8',
          boxShadow: '0 22px 50px rgba(109,76,65,0.25)',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            marginBottom: '18px',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '22px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.82, marginBottom: '8px' }}>时间站点</div>
            <div style={{ fontSize: '28px', fontWeight: 900 }}>{historyStoryEras.length} 段</div>
            <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.7 }}>
              从文明曙光走到今天，帮助孩子建立时间顺序感。
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '22px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.82, marginBottom: '8px' }}>人物索引</div>
            <div style={{ fontSize: '28px', fontWeight: 900 }}>{peopleIndex.length} 位</div>
            <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.7 }}>
              点击人物，就能回到他生活的年代看故事和地图。
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '22px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.82, marginBottom: '8px' }}>事件索引</div>
            <div style={{ fontSize: '28px', fontWeight: 900 }}>{eventIndex.length} 件</div>
            <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.7 }}>
              把重大事件和地形、地势、行政区一起看，更容易理解“为什么会发生”。
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.8, maxWidth: '760px' }}>
            这不是一张死记硬背的年代表，而是一列会讲故事的时光列车：每一站都把中国和世界放在同一时间看，
            再用人物、事件、行政区和地图线索帮孩子把故事记牢。
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOverviewNarration}
              style={{
                minHeight: '48px',
                padding: '12px 18px',
                borderRadius: '16px',
                border: 'none',
                background: '#FFFFFF',
                color: '#6D4C41',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              {activeNarrationTarget === 'overview' ? '⏹️ 停止朗读' : '🔊 听这一站的总故事'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/games/china-map')}
              style={{
                minHeight: '48px',
                padding: '12px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.14)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🇨🇳 配合中国地图看
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/games/world-map')}
              style={{
                minHeight: '48px',
                padding: '12px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.14)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🌍 配合世界地图看
            </motion.button>
          </div>
        </div>
      </motion.section>

      <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
        <SectionCard title="爱搜索" icon="🔎" accent="#6D4C41">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: '14px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                  pointerEvents: 'none',
                }}
              >
                🔍
              </span>
              <input
                aria-label="爱搜索"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="试试搜索人物、年代、事件或地图关键词"
                style={{
                  width: '100%',
                  minHeight: '52px',
                  padding: '12px 46px 12px 48px',
                  borderRadius: '999px',
                  border: '2px solid #D7CCC8',
                  background: '#FFFDF8',
                  fontSize: '15px',
                  color: '#4E342E',
                  fontWeight: 700,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="清空搜索"
                  onClick={clearSearch}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#F5F5F5',
                    color: '#8D6E63',
                    fontSize: '16px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Tag background="#FFF3E0" color="#E67E22">
                时间站点 {visibleTimelineEras.length} / {historyStoryEras.length}
              </Tag>
              <Tag background="#FFF8E1" color="#EF6C00">
                人物 {visiblePeopleIndex.length} / {peopleIndex.length}
              </Tag>
              <Tag background="#E8F5E9" color="#2E7D32">
                事件 {visibleEventIndex.length} / {eventIndex.length}
              </Tag>
              {selectedPerson && <Tag background="#FFF8E1" color="#EF6C00">人物筛选：{selectedPerson}</Tag>}
              {selectedEvent && <Tag background="#E8F5E9" color="#2E7D32">事件筛选：{selectedEvent}</Tag>}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    clearSearch();
                    clearFilters();
                  }}
                  style={{
                    minHeight: '42px',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#ECEFF1',
                    color: '#455A64',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  清空搜索和筛选
                </motion.button>
              )}
              {!hasMatches && (
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#C62828' }}>
                  没找到对应内容，换个关键词试试看。
                </div>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="时间索引"
          icon="📆"
          accent="#8D6E63"
          actions={
            <IndexActionButton
              label={timelineExpanded ? '收起时间索引' : '展开时间索引'}
              accent="#8D6E63"
              expanded={timelineExpanded}
              controls="history-timeline-index"
              onClick={() => setTimelineExpanded((current) => !current)}
            />
          }
        >
          <CollapsibleRows expanded={timelineExpanded} accent="#8D6E63" contentId="history-timeline-index">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {visibleTimelineEras.map((era) => {
              const active = era.id === selectedEra.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => {
                    setSelectedEraId(era.id);
                    track('history_timeline_select', { eraId: era.id });
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '14px',
                     borderRadius: '18px',
                     border: active ? '2px solid #FF9800' : '2px solid rgba(0,0,0,0.06)',
                     background: active
                       ? 'linear-gradient(135deg, #FFF8E1, #FFF3E0)'
                       : 'rgba(255, 248, 225, 0.78)',
                     cursor: 'pointer',
                     boxShadow: active ? '0 14px 26px rgba(255, 152, 0, 0.18)' : 'none',
                     opacity: 1,
                   }}
                 >
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#8D6E63', marginBottom: '6px' }}>
                    {era.yearLabel}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#4E342E', marginBottom: '8px' }}>
                    {era.title}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#6D4C41', lineHeight: 1.65 }}>
                    {era.summary}
                  </div>
                </button>
              );
            })}
            {!visibleTimelineEras.length && (
              <div
                style={{
                  gridColumn: '1 / -1',
                  background: '#FFF8F5',
                  borderRadius: '18px',
                  border: '1px dashed #D7CCC8',
                  padding: '16px',
                  color: '#6D4C41',
                  fontWeight: 700,
                  lineHeight: 1.7,
                }}
              >
                当前搜索下没有匹配的时间站点，试试搜人物名字、朝代、事件或地点。
              </div>
            )}
          </div>
          </CollapsibleRows>
        </SectionCard>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px' }}>
          <SectionCard
            title="人物索引"
            icon="🧑‍🏫"
            accent="#E67E22"
            actions={
              <IndexActionButton
                label={peopleExpanded ? '收起人物索引' : '展开人物索引'}
                accent="#E67E22"
                expanded={peopleExpanded}
                controls="history-people-index"
                onClick={() => setPeopleExpanded((current) => !current)}
              />
            }
          >
            <CollapsibleRows expanded={peopleExpanded} accent="#E67E22" contentId="history-people-index">
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {visiblePeopleIndex.map((person) => (
                  <FilterChip
                    key={person}
                    label={person}
                    active={selectedPerson === person}
                    onClick={() => setSelectedPerson((current) => (current === person ? null : person))}
                    tone="warm"
                  />
                ))}
                {!visiblePeopleIndex.length && (
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#8D6E63', lineHeight: 1.7 }}>
                    这个搜索词下还没有对应人物，换个关键词再试试。
                  </div>
                )}
              </div>
            </CollapsibleRows>
          </SectionCard>

          <SectionCard title="事件索引" icon="🎯" accent="#1565C0">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {visibleEventIndex.map((event) => (
                <FilterChip
                  key={event}
                  label={event}
                  active={selectedEvent === event}
                  onClick={() => setSelectedEvent((current) => (current === event ? null : event))}
                  tone="cool"
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearFilters}
              style={{
                minHeight: '42px',
                padding: '10px 14px',
                borderRadius: '14px',
                border: 'none',
                background: '#ECEFF1',
                color: '#455A64',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              清空索引筛选
            </motion.button>
          </SectionCard>
        </div>

        <SectionCard title="同一时间怎么看" icon="🔭" accent="#6D4C41">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {(
              [
                ['all', '🌏 中国 + 世界'],
                ['china', '🇨🇳 只看中国'],
                ['world', '🌍 只看世界'],
              ] as const
            ).map(([scopeKey, label]) => (
              <FilterChip
                key={scopeKey}
                label={label}
                active={scope === scopeKey}
                onClick={() => setScope(scopeKey)}
                tone="warm"
              />
            ))}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#5D4037', lineHeight: 1.75 }}>
            {selectedEra.compareNote}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginTop: '14px',
            }}
          >
            {[
              '1. 先听总故事，知道这个年代的大方向。',
              '2. 再点中国或世界小剧场，按幕听人物和事件。',
              '3. 最后配合行政区、地图和地形地势理解原因。',
            ].map((tip) => (
              <div
                key={tip}
                style={{
                  background: '#FFFDF7',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  border: '1px solid rgba(255, 183, 77, 0.35)',
                  color: '#6D4C41',
                  fontSize: '13px',
                  fontWeight: 800,
                  lineHeight: 1.7,
                }}
              >
                {tip}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {hasMatches ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedEra.id}-${scope}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.24 }}
            style={{ display: 'grid', gap: '20px' }}
          >
            <SectionCard title="当前故事站" icon="🚂" accent="#6D4C41">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <Tag background="#FFF3E0" color="#E67E22">
                  {selectedEra.yearLabel}
                </Tag>
                {selectedPerson && <Tag background="#FFF8E1" color="#EF6C00">人物索引：{selectedPerson}</Tag>}
                {selectedEvent && <Tag background="#E8F5E9" color="#2E7D32">事件索引：{selectedEvent}</Tag>}
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', color: '#3E2723' }}>{selectedEra.title}</h2>
              <p style={{ margin: 0, fontSize: '15px', color: '#6D4C41', lineHeight: 1.8, fontWeight: 700 }}>
                {selectedEra.summary}
              </p>
            </SectionCard>

            {(scope === 'all' || scope === 'china') && (
              <PerspectivePanel
                perspective={selectedEra.china}
                storyBeats={chinaStoryBeats}
                scopeKey="china"
                accent="#E67E22"
                seaColor="#FFD180"
                activeNarrationTarget={activeNarrationTarget}
                onNarrate={handleNarration}
              />
            )}
            {(scope === 'all' || scope === 'world') && (
              <PerspectivePanel
                perspective={selectedEra.world}
                storyBeats={worldStoryBeats}
                scopeKey="world"
                accent="#1565C0"
                seaColor="#90CAF9"
                activeNarrationTarget={activeNarrationTarget}
                onNarrate={handleNarration}
              />
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <SectionCard title="当前故事站" icon="🚂" accent="#6D4C41">
          <div style={{ fontSize: '15px', color: '#6D4C41', fontWeight: 700, lineHeight: 1.8 }}>
            当前搜索和筛选没有命中任何历史故事站点，清空条件后就能继续按时间旅行。
          </div>
        </SectionCard>
      )}
    </PageLayout>
  );
}
