import { describe, expect, it } from 'vitest';
import {
  buildPerspectiveStoryBeats,
  getHistoryEventIndex,
  getHistoryPeopleIndex,
  historyStoryEras,
} from '../games/history/historyData';

describe('history timeline data', () => {
  it('covers each era with china and world map context', () => {
    expect(historyStoryEras.length).toBeGreaterThanOrEqual(9);

    historyStoryEras.forEach((era) => {
      expect(era.china.administration.length).toBeGreaterThan(0);
      expect(era.world.administration.length).toBeGreaterThan(0);
      expect(era.china.mapNodes.length).toBeGreaterThan(2);
      expect(era.world.mapNodes.length).toBeGreaterThan(2);
      expect(era.china.terrain.length).toBeGreaterThan(10);
      expect(era.world.terrain.length).toBeGreaterThan(10);
    });
  });

  it('builds reusable people and event indexes', () => {
    expect(getHistoryPeopleIndex()).toContain('秦始皇');
    expect(getHistoryPeopleIndex()).toContain('郑和');
    expect(getHistoryPeopleIndex()).toContain('孔子');
    expect(getHistoryPeopleIndex()).toContain('牛顿');
    expect(getHistoryEventIndex()).toContain('张骞通西域');
    expect(getHistoryEventIndex()).toContain('改革开放');
    expect(getHistoryEventIndex()).toContain('百家争鸣');
    expect(getHistoryEventIndex()).toContain('新航路开辟');
  });

  it('derives child-friendly story beats for playback cards', () => {
    const beats = buildPerspectiveStoryBeats(historyStoryEras[0].china);

    expect(beats).toHaveLength(3);
    expect(beats[0].title).toBe('故事开场');
    expect(beats[1].focusLabels.length).toBeGreaterThan(0);
    expect(beats[2].narration).toContain('地图');
  });
});
