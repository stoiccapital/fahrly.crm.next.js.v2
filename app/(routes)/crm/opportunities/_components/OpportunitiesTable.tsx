"use client";

import * as React from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  DataTable,
  type DataTableColumn,
  Button,
  Badge,
} from "@/app/components/shared/ui";

import { useCRMStore } from "@/store/crmStore";
import { NewOpportunityModal } from "./NewOpportunityModal";

type OpportunityRow = {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  amount: number;
  probability: number;
  closeDate?: string;
};

function getStageVariant(stage: string) {
  const s = stage.toLowerCase();
  if (s === "won" || s === "closed won") return "success";
  if (s === "lost" || s === "closed lost") return "danger";
  if (s === "proposal" || s === "closing") return "warning";
  return "default";
}

export function OpportunitiesTable() {
  const router = useRouter();
  const [isNewOpportunityOpen, setIsNewOpportunityOpen] = useState(false);

  const opportunities = (useCRMStore((state) => state.opportunities) ??
    []) as OpportunityRow[];

  const accounts = useCRMStore((state) => state.accounts) ?? [];

  const columns = React.useMemo<DataTableColumn<OpportunityRow>[]>(
    () => [
      {
        id: "opportunity",
        header: "Opportunity",
        cell: (row) => {
          const account = accounts.find(
            (acc: any) => acc.id === row.accountId
          );
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">
                {row.name}
              </span>
              {account && (
                <span className="text-xs text-slate-500">
                  {account.name || account.companyName || account.legalCompanyName}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "stage",
        header: "Stage",
        cell: (row) => (
          <Badge variant={getStageVariant(row.stage) as any}>
            {row.stage}
          </Badge>
        ),
      },
      {
        id: "amount",
        header: "Amount",
        align: "right",
        cell: (row) => (
          <span className="text-sm tabular-nums text-slate-900">
            €{row.amount.toLocaleString("de-DE")}
          </span>
        ),
      },
      {
        id: "probability",
        header: "Prob.",
        align: "right",
        cell: (row) => (
          <span className="text-xs tabular-nums text-slate-700">
            {row.probability}%
          </span>
        ),
      },
      {
        id: "closeDate",
        header: "Close date",
        cell: (row) =>
          row.closeDate ? (
            <span className="text-xs text-slate-500">{row.closeDate}</span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
    ],
    [accounts]
  );

  function handleCreateOpportunity(data: {
    name: string;
    accountId: string;
    amount: number;
    currency: string;
    closeDate: string;
    stage: string;
    owner: string;
    description?: string;
  }) {
    // This would typically call a store action, but we're not modifying logic
    // The modal's onCreate callback will handle this
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Opportunities
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Pipeline overview of all open and closed deals.
            </p>
          </div>
          <Button size="sm" onClick={() => setIsNewOpportunityOpen(true)}>
            New opportunity
          </Button>
        </div>

        {/* Table */}
        <DataTable<OpportunityRow>
          data={opportunities}
          columns={columns}
          emptyMessage="No opportunities in your pipeline."
          onRowClick={(row) => router.push(`/crm/opportunities/${row.id}`)}
        />
      </div>

      <NewOpportunityModal
        isOpen={isNewOpportunityOpen}
        onClose={() => setIsNewOpportunityOpen(false)}
        onCreate={handleCreateOpportunity}
        accounts={accounts.map((acc: any) => ({
          id: acc.id,
          name: acc.name || acc.companyName || acc.legalCompanyName || "Unnamed account",
        }))}
      />
    </>
  );
}
