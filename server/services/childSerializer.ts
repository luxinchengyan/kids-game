import type { DBChild, IDatabase } from '../db/types';
import { inferLearnerProfile } from './learnerProfile';

export async function serializeChild(db: IDatabase, child: DBChild) {
  const progress = await db.getProgressByChild(child.id);
  const learnerProfile = inferLearnerProfile(child, progress);

  return {
    ...child,
    ...learnerProfile,
  };
}

export async function serializeChildren(db: IDatabase, children: DBChild[]) {
  return Promise.all(children.map((child) => serializeChild(db, child)));
}
