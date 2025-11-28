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

type ProposalRow = {
  id: string;
  title: string;
  accountId: string;
  amount: number;
  status: string;
  updatedAt: string;
};

export function ProposalsTable() {
  const router = useRouter();
  const proposals = useCRMStore((state) => state.proposals) as ProposalRow[];
  const accounts = useCRMStore((state) => state.accounts);

  const columns = React.useMemo<DataTableColumn<ProposalRow>[]>(
    () => [
      {
        id: "title",
        header: "Proposal",
        cell: (row) => {
          const account = accounts.find((acc) => acc.id === row.accountId);
          const accountName = account?.companyName || account?.legalCompanyName;
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">
                {row.title}
              </span>
              {accountName && (
                <span className="text-xs text-slate-500">
                  {accountName}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: (row) =>
          row.status ? (
            <Badge>{row.status}</Badge>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "amount",
        header: "Amount",
        align: "right",
        cell: (row) =>
          typeof row.amount === "number" ? (
            <span className="text-sm tabular-nums text-slate-900">
              €{row.amount.toLocaleString("de-DE")}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "lastUpdated",
        header: "Last updated",
        cell: (row) =>
          row.updatedAt ? (
            <span className="text-xs text-slate-500">
              {new Date(row.updatedAt).toLocaleDateString()}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
    ],
    []
  );

  return (
    <DataTable<ProposalRow>
      title="Proposals"
      subtitle="Offers sent to customers"
      data={proposals}
      columns={columns}
      emptyMessage="No proposals yet."
      onRowClick={(row) => router.push(`/crm/proposals/${row.id}`)}
      toolbar={<Button size="sm">New proposal</Button>}
    />
  );
}

