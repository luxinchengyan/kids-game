import type { JourneyThemeSummary } from '../data/homeLearningJourney';
import { getLearningMap } from '../games/registry';
import { loadGameProgress } from './gameHelpers';

export function buildJourneyThemeSummaries(): JourneyThemeSummary[] {
  return getLearningMap().map(({ hub, games }) => {
    const progressList = games.map((game) => loadGameProgress(game.id));
    const playedCount = progressList.filter((progress) => (progress?.completedSessions ?? 0) > 0).length;
    const totalStars = progressList.reduce((sum, progress) => sum + (progress?.bestStars ?? 0), 0);
    const totalGames = games.length;

    return {
      id: hub.id,
      name: hub.name,
      icon: hub.icon,
      learningPath: hub.learningPath,
      progress: {
        totalGames,
        playedCount,
        completionRate: totalGames > 0 ? Math.round((playedCount / totalGames) * 100) : 0,
        totalStars,
      },
    };
  });
}
