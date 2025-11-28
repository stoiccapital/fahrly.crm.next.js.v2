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

type ProposalRow = {
  id: string;
  title: string;
  accountId: string;
  amount: number;
  status: string;
  updatedAt: string;
};

function getStatusVariant(status: string) {
  const s = status.toLowerCase();
  if (s === "accepted") return "success";
  if (s === "rejected") return "danger";
  if (s === "sent") return "warning";
  return "default";
}

export function ProposalsTable() {
  const router = useRouter();
  const [isNewProposalOpen, setIsNewProposalOpen] = useState(false);

  const proposals = useCRMStore((state) => state.proposals) as ProposalRow[];
  const accounts = useCRMStore((state) => state.accounts);

  const columns = React.useMemo<DataTableColumn<ProposalRow>[]>(
    () => [
      {
        id: "title",
        header: "Proposal",
        cell: (row) => {
          const account = accounts.find((acc) => acc.id === row.accountId);
          const accountName = account?.companyName || account?.legalCompanyName || account?.name;
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
            <Badge variant={getStatusVariant(row.status) as any}>
              {row.status}
            </Badge>
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
    [accounts]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Proposals
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quotes and offers sent to customers.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsNewProposalOpen(true)} disabled>
          New proposal
        </Button>
      </div>

      {/* Table */}
      <DataTable<ProposalRow>
        data={proposals}
        columns={columns}
        emptyMessage="No proposals yet."
        onRowClick={(row) => router.push(`/crm/proposals/${row.id}`)}
      />
    </div>
  );
}
