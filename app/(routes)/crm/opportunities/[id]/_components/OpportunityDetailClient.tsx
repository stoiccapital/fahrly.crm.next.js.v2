"use client";

import { useCRMStore } from "@/store/crmStore";

import { OpportunityHeader } from "./OpportunityHeader";

import { OpportunityStageBar } from "./OpportunityStageBar";

import { OpportunityDetails } from "./OpportunityDetails";

import { OpportunityActivities } from "./OpportunityActivities";

import { OpportunityTasks } from "./OpportunityTasks";

import { stageProbability } from "../../_data/mockOpportunities";

export default function OpportunityDetailClient({ id }: { id: string }) {
  const { opportunities, contacts, markAccountAsCustomer, updateOpportunity } = useCRMStore();

  const opportunity = opportunities?.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <div className="p-4 text-sm text-slate-500">
        Loading opportunity...
      </div>
    );
  }

  const contact = contacts?.find(
    (c) =>
      c.accountId === opportunity.accountId &&
      c.isPrimary === true
  ) ?? contacts?.find((c) => c.accountId === opportunity.accountId);

  const contactName = contact?.name;

  const handleStageChange = (stage: any) => {
    const probability = stageProbability[stage as keyof typeof stageProbability];
    const updatedAt = new Date().toISOString();
    updateOpportunity(opportunity.id, { stage, probability, updatedAt });
    if (stage === "WON" && opportunity.accountId) {
      markAccountAsCustomer(opportunity.accountId, opportunity.closeDate);
    }
  };

  const handleCloseDateChange = (date: string) => {
    const updatedAt = new Date().toISOString();
    updateOpportunity(opportunity.id, { closeDate: date, updatedAt });
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <OpportunityHeader opportunity={opportunity} />
      <OpportunityStageBar opportunity={opportunity} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OpportunityDetails
            opportunity={opportunity}
            onToggleEditDetails={() => {}}
            onStageChange={handleStageChange}
            onCloseDateChange={handleCloseDateChange}
            contactName={contactName}
            isEditingDetails={false}
          />
          <OpportunityActivities opportunityId={id} />
        </div>
        <div className="space-y-6">
          <OpportunityTasks opportunityId={id} />
        </div>
      </div>
    </div>
  );
}
