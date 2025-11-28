// lib/mocks/crm/mockNotes.ts

import type { NoteType } from '@/app/(routes)/crm/accounts/_types';

export const mockNotes: NoteType[] = [
  {
    id: 'note-1',
    targetType: 'account',
    targetId: 'acc-alpha-taxi',
    content: 'Pilot started with 20 vehicles in Q1. Next review in 3 months.',
    createdAt: '2024-04-01T10:00:00.000Z',
    author: 'Anh Chu',
  },
  {
    id: 'note-2',
    targetType: 'account',
    targetId: 'acc-cityride',
    content: 'Expanding to 50 vehicles by end of year. Strong interest in maintenance module.',
    createdAt: '2024-04-15T14:20:00.000Z',
    author: 'Anh Chu',
  },
  {
    id: 'note-3',
    targetType: 'account',
    targetId: 'acc-express-shuttle',
    content: 'Churn risk identified. Usage down 30% in last quarter. Schedule check-in call.',
    createdAt: '2024-05-01T09:00:00.000Z',
    author: 'Anh Chu',
  },
  {
    id: 'note-4',
    targetType: 'contact',
    targetId: 'contact-alpha-taxi-ops',
    content: 'Max prefers email in the morning and short Loom videos for feature updates.',
    createdAt: '2024-04-05T09:30:00.000Z',
    author: 'Anh Chu',
  },
];

