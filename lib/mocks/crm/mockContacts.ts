// lib/mocks/crm/mockContacts.ts

import type { ContactType } from '@/app/(routes)/crm/accounts/_types';

export const mockContacts: ContactType[] = [
  {
    id: 'contact-alpha-taxi-ops',
    accountId: 'acc-alpha-taxi',
    name: 'Max Mustermann',
    email: 'max.mustermann@alpha-taxi.de',
    phone: '+49 30 1234567',
    role: 'Operations Lead',
    isPrimary: true,
    summary: 'Main operational decision maker, cares about reliability and driver safety.',
  },
  {
    id: 'contact-alpha-taxi-finance',
    accountId: 'acc-alpha-taxi',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@alpha-taxi.de',
    phone: '+49 30 9876543',
    role: 'Finance',
    isPrimary: false,
    summary: 'Finance contact for budgeting and contract approvals.',
  },
  {
    id: 'contact-cityride-ceo',
    accountId: 'acc-cityride',
    name: 'Sarah Schmidt',
    email: 'sarah.schmidt@cityride-berlin.de',
    phone: '+49 30 5551234',
    role: 'CEO',
    isPrimary: true,
    summary: 'Founder/CEO, very quality-driven and open to strategic projects.',
  },
  {
    id: 'contact-express-shuttle-ops',
    accountId: 'acc-express-shuttle',
    name: 'Lukas Keller',
    email: 'lukas.keller@express-shuttle.ch',
    phone: '+41 44 123 45 67',
    role: 'Operations Manager',
    isPrimary: true,
    summary: 'Handles day-to-day operations and fleet management.',
  },
];

