"use client";

import { useState } from "react";

import type { Opportunity, OpportunityStage } from "../_types";

import { stageProbability } from "../../_data/mockOpportunities";

import { OpportunityHeader } from "./OpportunityHeader";

import { OpportunityStageBar } from "./OpportunityStageBar";

import { OpportunityDetails } from "./OpportunityDetails";

import { OpportunityActivities } from "./OpportunityActivities";

import { OpportunityTasks } from "./OpportunityTasks";

import { mockContacts } from "../../../accounts/_data/mockContacts";

const contacts = mockContacts as any[];

type Props = {
  opportunity: Opportunity;
};

function getPrimaryContactName(accountId: string): string | undefined {
  if (!accountId) return undefined;

  // Prefer explicit "primary" flag, otherwise first contact for the account
  const primary = contacts.find(
    (c) => c.accountId === accountId && (c.isPrimary === true || c.primary === true)
  );

  const fallback = contacts.find((c) => c.accountId === accountId);

  const contact = primary ?? fallback;

  if (!contact) return undefined;

  return contact.name;
}

export function OpportunityDetailClient({ opportunity: initial }: Props) {
  const [opportunity, setOpportunity] = useState<Opportunity>(initial);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleStageChange = (stage: OpportunityStage) => {
    setOpportunity((prev) => ({
      ...prev,
      stage,
      probability: stageProbability[stage],
      updatedAt: new Date().toISOString()
    }));
  };

  const handleCloseDateChange = (date: string) => {
    setOpportunity((prev) => ({
      ...prev,
      closeDate: date,
      updatedAt: new Date().toISOString()
    }));
  };

  const toggleEditDetails = () => {
    setIsEditingDetails((prev) => !prev);
  };

  const contactName = getPrimaryContactName(opportunity.accountId);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <OpportunityHeader opportunity={opportunity} />
      <OpportunityStageBar opportunity={opportunity} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OpportunityDetails
            opportunity={opportunity}
            isEditingDetails={isEditingDetails}
            onToggleEditDetails={toggleEditDetails}
            onStageChange={handleStageChange}
            onCloseDateChange={handleCloseDateChange}
            contactName={contactName}
          />
          <OpportunityActivities opportunityId={opportunity.id} />
        </div>
        <div className="space-y-6">
          <OpportunityTasks opportunityId={opportunity.id} />
        </div>
      </div>
    </div>
  );
}
