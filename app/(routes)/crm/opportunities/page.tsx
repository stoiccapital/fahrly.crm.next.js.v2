"use client";

import { useState } from "react";

import { useCRMStore } from "@/store/crmStore";

import { stageProbability } from "./_data/mockOpportunities";

import { OpportunityList } from "./_components/OpportunityList";

import { NewOpportunityModal } from "./_components/NewOpportunityModal";

import type { OpportunityStage, OpportunityStatus } from "./_types";

export default function OpportunitiesPage() {
  const { opportunities, accounts, addOpportunity } = useCRMStore();
  const [open, setOpen] = useState(false);

  const safeOpportunities = (opportunities ?? []) as any[];
  const safeAccounts = (accounts ?? []) as any[];

  const createOpportunity = (data: {
    name: string;
    accountId: string;
    amount: number;
    currency: string;
    closeDate: string;
    stage: OpportunityStage;
    owner: string;
    description?: string;
  }) => {
    const stage = data.stage;
    const probability = stageProbability[stage];

    const account = safeAccounts.find((a) => a.id === data.accountId);

    const accountName =
      account?.companyName || account?.legalCompanyName || "Unknown account";

    const now = new Date().toISOString().slice(0, 10);

    const status: OpportunityStatus = stage === "WON" ? "Closed Won" : stage === "LOST" ? "Closed Lost" : "Open";
    const currency: "EUR" | "USD" | "CHF" = data.currency as "EUR" | "USD" | "CHF";

    const newOpp = {
      ...data,
      id: "opp-" + Math.random().toString(36).slice(2, 8),
      accountName,
      createdAt: now,
      updatedAt: now,
      probability,
      status,
      currency
    };

    addOpportunity(newOpp);
  };

  return (
    <>
      {open && (
        <NewOpportunityModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onCreate={createOpportunity}
          accounts={safeAccounts.map((a) => ({
            id: a.id,
            name: a.companyName || a.legalCompanyName || "Unknown account"
          }))}
        />
      )}
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Opportunities</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your pipeline, forecast, and sales progress.
            </p>
          </div>
          <button
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
            onClick={() => setOpen(true)}
          >
            New Opportunity
          </button>
        </div>
        <OpportunityList items={safeOpportunities} />
      </div>
    </>
  );
}
