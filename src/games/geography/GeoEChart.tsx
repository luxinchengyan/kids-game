import { useEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface GeoJsonFeatureCollection {
  type: string;
  features: Array<{
    type: string;
    properties?: Record<string, unknown>;
    geometry?: Record<string, unknown>;
  }>;
}

interface GeoEChartProps {
  mapKey: string;
  mapAssetUrl: string;
  option: EChartsOption;
  height?: number;
  onRegionClick?: (name: string) => void;
  onRegionHover?: (name: string | null) => void;
}

const registeredMapPromises = new Map<string, Promise<void>>();

function ensureMapRegistered(mapKey: string, mapAssetUrl: string) {
  if (echarts.getMap(mapKey)) {
    return Promise.resolve();
  }

  const existingPromise = registeredMapPromises.get(mapKey);
  if (existingPromise) {
    return existingPromise;
  }

  const registrationPromise = fetch(mapAssetUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`地图资源加载失败：${response.status} ${response.statusText}`);
      }

      return (await response.json()) as GeoJsonFeatureCollection;
    })
    .then((geoJson) => {
      echarts.registerMap(mapKey, geoJson);
    });

  registeredMapPromises.set(mapKey, registrationPromise);
  return registrationPromise;
}

export default function GeoEChart({
  mapKey,
  mapAssetUrl,
  option,
  height = 560,
  onRegionClick,
  onRegionHover,
}: GeoEChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mergedOption = useMemo<EChartsOption>(
    () => ({
      animationDuration: 450,
      animationDurationUpdate: 260,
      ...option,
    }),
    [option]
  );

  useEffect(() => {
    let cancelled = false;
    setMapState('loading');
    setErrorMessage('');

    ensureMapRegistered(mapKey, mapAssetUrl)
      .then(() => {
        if (!cancelled) {
          setMapState('ready');
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setMapState('error');
          setErrorMessage(error instanceof Error ? error.message : '地图资源加载失败');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [mapAssetUrl, mapKey]);

  useEffect(() => {
    if (!containerRef.current || chartRef.current) {
      return;
    }

    chartRef.current = echarts.init(containerRef.current, undefined, {
      renderer: 'canvas',
    });

    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const clickHandler = (params: { name?: string }) => {
      if (typeof params.name === 'string') {
        onRegionClick?.(params.name);
      }
    };

    const mouseOverHandler = (params: { name?: string }) => {
      onRegionHover?.(typeof params.name === 'string' ? params.name : null);
    };

    const mouseOutHandler = () => {
      onRegionHover?.(null);
    };

    chart.off('click');
    chart.off('mouseover');
    chart.off('mouseout');
    chart.on('click', clickHandler);
    chart.on('mouseover', mouseOverHandler);
    chart.on('mouseout', mouseOutHandler);

    return () => {
      chart.off('click', clickHandler);
      chart.off('mouseover', mouseOverHandler);
      chart.off('mouseout', mouseOutHandler);
    };
  }, [onRegionClick, onRegionHover]);

  useEffect(() => {
    const chart = chartRef.current;
    const container = containerRef.current;
    if (!chart || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mapState !== 'ready' || !chartRef.current) {
      return;
    }

    chartRef.current.setOption(mergedOption, true);
    chartRef.current.resize();
  }, [mapState, mergedOption]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: `${height}px`,
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: `${height}px` }} />

      {mapState !== 'ready' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(9, 28, 57, 0.82), rgba(20, 61, 117, 0.58))',
            color: '#FFF',
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '0.02em',
            textAlign: 'center',
            padding: '24px',
          }}
        >
          {mapState === 'loading' ? '地图正在出发，请稍等...' : `地图加载失败：${errorMessage}`}
        </div>
      )}
    </div>
  );
}
