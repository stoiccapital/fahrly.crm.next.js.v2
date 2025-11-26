// app/(routes)/crm/accounts/_data/mockNotes.ts

import type { NoteType } from '../_types';

export const mockNotes: NoteType[] = [
  {
    id: 'note-1',
    targetType: 'account',
    targetId: 'acc-uber-berlin',
    content: 'Pilot started with 20 vehicles in Q1. Next review in 3 months.',
    createdAt: '2024-04-01T10:00:00.000Z',
    author: 'Anh Chu',
  },
  {
    id: 'note-2',
    targetType: 'contact',
    targetId: 'contact-uber-ops',
    content: 'Max prefers email in the morning and short Loom videos for feature updates.',
    createdAt: '2024-04-05T09:30:00.000Z',
    author: 'Anh Chu',
  },
];

