// app/(routes)/crm/leads/[id]/_components/LeadDetailClient.tsx

'use client';

import { useState } from 'react';
import { Card } from "@/app/components/shared/ui";
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
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <p className="text-sm text-slate-500">
            Lead not found. It may have been converted or deleted.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
  );
}
