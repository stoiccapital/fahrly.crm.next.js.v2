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

type LeadRow = {
  id: string;
  name?: string;
  companyName?: string;
  status?: string;
  source?: string;
  createdAt?: string;
};

export function LeadsTable() {
  const router = useRouter();

  const leads = (useCRMStore((state) => state.leads) ?? []) as LeadRow[];

  console.log("🔥 LeadsTable leads:", leads);

  const columns = React.useMemo<DataTableColumn<LeadRow>[]>(
    () => [
      {
        id: "lead",
        header: "Lead",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {(row as any).contactName || row.name || "Unnamed lead"}
            </span>
            {row.companyName && (
              <span className="text-xs text-slate-500">
                {row.companyName}
              </span>
            )}
          </div>
        ),
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
        id: "source",
        header: "Source",
        cell: (row) =>
          row.source ? (
            <span className="text-xs text-slate-500">{row.source}</span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "createdAt",
        header: "Created",
        cell: (row) =>
          row.createdAt ? (
            <span className="text-xs text-slate-500">{row.createdAt}</span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
    ],
    []
  );

  return (
    <DataTable<LeadRow>
      title="Leads"
      subtitle="Top of funnel"
      data={leads}
      columns={columns}
      emptyMessage="No leads yet. Start by creating your first lead."
      onRowClick={(row) => router.push(`/crm/leads/${row.id}`)}
      toolbar={<Button size="sm">New lead</Button>}
    />
  );
}

