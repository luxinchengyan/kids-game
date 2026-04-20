import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import HistoryTimelineExplorer from '../games/history/HistoryTimelineExplorer';

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const createMotionComponent = (tag: string) =>
    ReactModule.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...props }, ref) => {
      const {
        whileHover: _whileHover,
        whileTap: _whileTap,
        animate: _animate,
        initial: _initial,
        exit: _exit,
        transition: _transition,
        ...domProps
      } = props;

      return ReactModule.createElement(tag, { ref, ...domProps }, children);
    });

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      button: createMotionComponent('button'),
    },
  };
});

vi.mock('../components/PageLayout', () => ({
  PageLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  GamePageHeader: ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <header>
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  ),
}));

vi.mock('../lib/analytics', () => ({
  track: vi.fn(),
}));

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement | null = null;
let root: Root | null = null;

async function renderExplorer() {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () => {
    root!.render(
      <MemoryRouter initialEntries={['/games/history/timeline']}>
        <HistoryTimelineExplorer />
      </MemoryRouter>,
    );
  });

  return container;
}

function mockWrappedRowLayout(contentId: string, rows: Array<{ start: number; end: number; top: number; height: number }>) {
  const wrapper = document.querySelector<HTMLElement>(`#${contentId} > div`);
  if (!wrapper) {
    throw new Error(`Missing wrapper for ${contentId}`);
  }

  const items = Array.from(wrapper.children) as HTMLElement[];
  rows.forEach(({ start, end, top, height }) => {
    items.slice(start, end).forEach((item) => {
      Object.defineProperty(item, 'offsetTop', {
        configurable: true,
        value: top,
      });
      Object.defineProperty(item, 'offsetHeight', {
        configurable: true,
        value: height,
      });
    });
  });
}

afterEach(async () => {
  if (root) {
    await act(async () => {
      root!.unmount();
    });
  }
  container?.remove();
  container = null;
  root = null;
});

describe('HistoryTimelineExplorer', () => {
  it('adds friendly search and jumps to the matched era', async () => {
    const app = await renderExplorer();

    const searchInput = app.querySelector<HTMLInputElement>('input[aria-label="爱搜索"]');
    expect(searchInput).not.toBeNull();
    expect(app.textContent).toContain('文明的晨光');
    expect(app.textContent).toContain('展开时间索引');
    expect(app.textContent).toContain('展开人物索引');

    await act(async () => {
      searchInput!.value = '郑和';
      searchInput!.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(app.textContent).toContain('草原风与大海风');
    expect(app.textContent).toContain('郑和');
  }, 15000);

  it('collapses timeline and people indexes to two rows by default and expands on demand', async () => {
    const app = await renderExplorer();

    mockWrappedRowLayout('history-timeline-index', [
      { start: 0, end: 3, top: 0, height: 100 },
      { start: 3, end: 6, top: 116, height: 100 },
      { start: 6, end: 12, top: 232, height: 100 },
    ]);
    mockWrappedRowLayout('history-people-index', [
      { start: 0, end: 7, top: 0, height: 40 },
      { start: 7, end: 14, top: 48, height: 40 },
      { start: 14, end: 40, top: 96, height: 40 },
    ]);

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    const timelineContent = app.querySelector<HTMLElement>('#history-timeline-index');
    const peopleContent = app.querySelector<HTMLElement>('#history-people-index');
    expect(timelineContent?.style.maxHeight).toBe('216px');
    expect(peopleContent?.style.maxHeight).toBe('88px');

    const timelineToggle = Array.from(app.querySelectorAll('button')).find(
      (button) => button.textContent === '展开时间索引',
    );
    const peopleToggle = Array.from(app.querySelectorAll('button')).find(
      (button) => button.textContent === '展开人物索引',
    );

    expect(timelineToggle?.getAttribute('aria-expanded')).toBe('false');
    expect(peopleToggle?.getAttribute('aria-expanded')).toBe('false');

    await act(async () => {
      timelineToggle!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      peopleToggle!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(timelineContent?.style.maxHeight).toBe('none');
    expect(peopleContent?.style.maxHeight).toBe('none');
    expect(timelineToggle?.getAttribute('aria-expanded')).toBe('true');
    expect(peopleToggle?.getAttribute('aria-expanded')).toBe('true');
  }, 15000);
});
