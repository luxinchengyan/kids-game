import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Analytics Module', () => {
  beforeEach(() => {
    vi.resetModules();
    // Mock window.dispatchEvent
    global.window = {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      sessionStorage: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn(),
      },
    } as any;

    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: {
        DEV: true,
        PROD: false,
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('track function', () => {
    it('dispatches custom event with correct detail', async () => {
      const { track } = await import('../lib/analytics');
      
      track('test_event', { key: 'value' });

      expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
      const callArgs = (window.dispatchEvent as any).mock.calls[0][0];
      expect(callArgs.type).toBe('kids-analytics');
      expect(callArgs.detail.event).toBe('test_event');
      expect(callArgs.detail.props).toEqual({ key: 'value' });
      expect(callArgs.detail.sessionId).toBeDefined();
      expect(callArgs.detail.ts).toBeDefined();
    });

    it('handles calls without props', async () => {
      const { track } = await import('../lib/analytics');
      
      track('simple_event');

      expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
      const callArgs = (window.dispatchEvent as any).mock.calls[0][0];
      expect(callArgs.detail.event).toBe('simple_event');
      expect(callArgs.detail.props).toEqual({});
    });

    it('generates consistent session ID', async () => {
      const { track } = await import('../lib/analytics');
      
      track('event1');
      track('event2');

      const call1 = (window.dispatchEvent as any).mock.calls[0][0];
      const call2 = (window.dispatchEvent as any).mock.calls[1][0];
      
      expect(call1.detail.sessionId).toBe(call2.detail.sessionId);
    });

    it('includes timestamp in milliseconds', async () => {
      const { track } = await import('../lib/analytics');
      const beforeTrack = Date.now();
      
      track('timestamp_test');
      
      const afterTrack = Date.now();
      const callArgs = (window.dispatchEvent as any).mock.calls[0][0];
      
      expect(callArgs.detail.ts).toBeGreaterThanOrEqual(beforeTrack);
      expect(callArgs.detail.ts).toBeLessThanOrEqual(afterTrack);
    });
  });
});
