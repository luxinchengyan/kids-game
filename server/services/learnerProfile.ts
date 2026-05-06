import type { DBChild, DBLearningProgress } from '../db/types';

type SubjectKey = 'pinyin' | 'math' | 'english' | 'stories';
type DifficultyLevel = 'easy' | 'medium' | 'hard';
type AgeSource = 'birth' | 'birth+progress' | 'progress';

export interface LearnerProfile {
  chronologicalAge: number;
  inferredAge: number;
  inferredDifficulty: DifficultyLevel;
  ageSource: AgeSource;
  recommendedDifficulties: Partial<Record<SubjectKey, DifficultyLevel>>;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseBirthYearMonth(input?: string): { year: number; month: number } | null {
  if (!input || !/^\d{4}-(0[1-9]|1[0-2])$/.test(input)) {
    return null;
  }

  const [yearText, monthText] = input.split('-');
  return { year: Number(yearText), month: Number(monthText) };
}

export function calculateAgeFromBirthYearMonth(input?: string, now = new Date()): number | null {
  const parsed = parseBirthYearMonth(input);
  if (!parsed) {
    return null;
  }

  let age = now.getFullYear() - parsed.year;
  const currentMonth = now.getMonth() + 1;
  if (currentMonth < parsed.month) {
    age -= 1;
  }

  return clamp(age, 0, 120);
}

function getSubjectRecommendations(progress?: DBLearningProgress): Partial<Record<SubjectKey, DifficultyLevel>> {
  if (!progress?.subjectsJson) {
    return {};
  }

  const subjects = JSON.parse(progress.subjectsJson || '{}') as Record<string, {
    tasksCompleted?: number;
    accuracy?: number;
    level?: number;
  }>;

  return (['pinyin', 'math', 'english', 'stories'] as SubjectKey[]).reduce((acc, key) => {
    const subject = subjects[key];
    if (!subject) {
      return acc;
    }

    const tasksCompleted = subject.tasksCompleted ?? 0;
    const accuracy = subject.accuracy ?? 0;
    const level = subject.level ?? 1;

    if (tasksCompleted >= 15 && accuracy >= 0.88 && level >= 2) {
      acc[key] = 'hard';
    } else if (tasksCompleted >= 8 && accuracy >= 0.65) {
      acc[key] = 'medium';
    } else {
      acc[key] = 'easy';
    }

    return acc;
  }, {} as Partial<Record<SubjectKey, DifficultyLevel>>);
}

function deriveOverallDifficulty(
  recommendations: Partial<Record<SubjectKey, DifficultyLevel>>,
  progress?: DBLearningProgress
): DifficultyLevel {
  const values = Object.values(recommendations);
  if (values.includes('hard')) {
    return 'hard';
  }
  if (values.includes('medium')) {
    return 'medium';
  }

  const totalTasks = progress?.totalTasksCompleted ?? 0;
  const overallAccuracy = progress?.overallAccuracy ?? 0;
  if (totalTasks >= 10 && overallAccuracy >= 0.65) {
    return 'medium';
  }

  return 'easy';
}

export function inferLearnerProfile(child: DBChild, progress?: DBLearningProgress | null): LearnerProfile {
  const chronologicalAge = calculateAgeFromBirthYearMonth(child.birthYearMonth) ?? child.age;
  const totalTasksCompleted = progress?.totalTasksCompleted ?? 0;
  const overallAccuracy = progress?.overallAccuracy ?? 0;
  const enoughHistory = totalTasksCompleted >= 12;

  let ageAdjustment = 0;
  if (enoughHistory && totalTasksCompleted >= 30 && overallAccuracy >= 0.9) {
    ageAdjustment = 1;
  } else if (enoughHistory && overallAccuracy <= 0.45) {
    ageAdjustment = -1;
  }

  const inferredAge = clamp(chronologicalAge + ageAdjustment, 2, 15);
  const recommendedDifficulties = getSubjectRecommendations(progress ?? undefined);
  const inferredDifficulty = deriveOverallDifficulty(recommendedDifficulties, progress ?? undefined);

  let ageSource: AgeSource = 'birth';
  if (!child.birthYearMonth && enoughHistory) {
    ageSource = 'progress';
  } else if (child.birthYearMonth && enoughHistory) {
    ageSource = 'birth+progress';
  }

  return {
    chronologicalAge,
    inferredAge,
    inferredDifficulty,
    ageSource,
    recommendedDifficulties,
  };
}
