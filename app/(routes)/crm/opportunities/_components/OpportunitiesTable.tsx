"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  DataTable,
  type DataTableColumn,
  Button,
  Badge,
} from "@/app/components/shared/ui";

import { useCRMStore } from "@/store/crmStore";

type OpportunityRow = {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  amount: number;
  probability: number;
  closeDate?: string;
};

export function OpportunitiesTable() {
  const router = useRouter();

  const opportunities = (useCRMStore((state) => state.opportunities) ??
    []) as OpportunityRow[];

  const accounts = useCRMStore((state) => state.accounts) ?? [];

  console.log("🔥 OpportunitiesTable opportunities:", opportunities);

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
                  {account.name}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "stage",
        header: "Stage",
        cell: (row) => <Badge>{row.stage}</Badge>,
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

  return (
    <DataTable<OpportunityRow>
      title="Opportunities"
      subtitle="Pipeline overview"
      data={opportunities}
      columns={columns}
      emptyMessage="No opportunities in your pipeline."
      onRowClick={(row) => router.push(`/crm/opportunities/${row.id}`)}
      toolbar={<Button size="sm">New opportunity</Button>}
    />
  );
}

