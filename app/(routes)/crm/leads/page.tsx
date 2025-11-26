'use client';

import { useCRMStore } from '@/store/crmStore';
import { LeadList } from './_components/LeadList';

export default function LeadsPage() {
  const { leads } = useCRMStore();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 lg:px-0">
      <LeadList initialLeads={leads} />
    </main>
  );
}
