// app/(routes)/crm/accounts/_data/mockContacts.ts

import type { ContactType } from '../_types';

export const mockContacts: ContactType[] = [
  {
    id: 'contact-uber-ops',
    accountId: 'acc-uber-berlin',
    name: 'Max Mustermann',
    email: 'max.mustermann@uber-partner-berlin.de',
    phone: '+49 30 1234567',
    role: 'Operations Lead',
    isPrimary: true,
    summary: 'Main operational decision maker, cares about reliability and driver safety.',
  },
  {
    id: 'contact-uber-finance',
    accountId: 'acc-uber-berlin',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@uber-partner-berlin.de',
    phone: '+49 30 9876543',
    role: 'Finance',
    isPrimary: false,
    summary: 'Finance contact for budgeting and contract approvals.',
  },
  {
    id: 'contact-zurich-ceo',
    accountId: 'acc-zurich-ride',
    name: 'Luca Meier',
    email: 'luca.meier@zurich-ride.ch',
    phone: '+41 44 123 45 67',
    role: 'CEO',
    isPrimary: true,
    summary: 'Founder/CEO, very quality-driven and open to strategic projects.',
  },
];
