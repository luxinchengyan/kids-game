import type { Child as AuthChild, Parent as AuthParent } from '../services/authService';
import type { Child as StoreChild, Parent as StoreParent } from '../types';

export function toStoreChild(child: AuthChild): StoreChild {
  return {
    _id: child.id,
    parentId: child.parentId,
    nickname: child.nickname,
    age: child.age,
    birthYearMonth: child.birthYearMonth,
    gender: child.gender,
    avatarId: child.avatarId,
    avatarUrl: child.avatarUrl,
    chronologicalAge: child.chronologicalAge,
    inferredAge: child.inferredAge,
    inferredDifficulty: child.inferredDifficulty,
    ageSource: child.ageSource,
    recommendedDifficulties: child.recommendedDifficulties,
    petId: child.petId,
  };
}

export function toStoreParent(parent: AuthParent, children: AuthChild[]): StoreParent {
  return {
    _id: parent.id,
    phone: parent.phone,
    settings: {
      dailyTimeLimit: parent.dailyTimeLimit,
      soundEnabled: parent.soundEnabled,
      musicEnabled: parent.musicEnabled,
      notificationsEnabled: parent.notificationsEnabled,
    },
    children: children.map((child) => child.id),
  };
}
