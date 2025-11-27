// app/(routes)/crm/leads/[id]/_components/LeadDetailClient.tsx

'use client';

import { useState } from 'react';
import { useCRMStore } from '@/store/crmStore';
import { LeadDetailHeader } from './LeadDetailHeader';
import { LeadDetailForm } from './LeadDetailForm';
import { LeadConvertModal } from './LeadConvertModal';

type LeadDetailClientProps = {
  leadId: string;
};

export function LeadDetailClient({ leadId }: LeadDetailClientProps) {
  const { leads } = useCRMStore();
  const lead = leads?.find((l) => l.id === leadId);
  const [isConvertOpen, setIsConvertOpen] = useState(false);

  if (!lead) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="rounded-2xl border bg-white p-6 text-sm text-gray-500 shadow-sm">
          Lead not found. It may have been converted or deleted.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
      <div className="space-y-6">
        <LeadDetailHeader 
          lead={lead} 
          onConvert={() => setIsConvertOpen(true)} 
        />
        <LeadDetailForm initialLead={lead} />
        <LeadConvertModal 
          lead={lead} 
          isOpen={isConvertOpen}
          onClose={() => setIsConvertOpen(false)}
        />
      </div>
    </main>
  );
}
