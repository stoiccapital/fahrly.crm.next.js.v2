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
import { LeadFormModal } from "./LeadFormModal";
import type { Lead } from "../_types";

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
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const storeLeads = (useCRMStore((state) => state.leads) ?? []) as LeadRow[];
  const [localLeads, setLocalLeads] = useState<LeadRow[]>(storeLeads);

  // Sync with store when it changes
  React.useEffect(() => {
    setLocalLeads(storeLeads);
  }, [storeLeads]);

  const leads = localLeads;

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
        cell: (row) => {
          if (!row.status) return <span className="text-slate-400">—</span>;
          const status = row.status.toLowerCase();
          const variant =
            status === "qualified"
              ? "success"
              : status === "disqualified"
                ? "danger"
                : status === "contacted"
                  ? "warning"
                  : "default";
          return <Badge variant={variant as any}>{row.status}</Badge>;
        },
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

  function handleCreateLead(lead: Lead) {
    setLocalLeads((prev) => [lead as LeadRow, ...prev]);
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Leads
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Unqualified contacts at the top of your sales funnel.
            </p>
          </div>
          <Button size="sm" onClick={() => setIsNewLeadOpen(true)}>
            New lead
          </Button>
        </div>

        {/* Table */}
        <DataTable<LeadRow>
          data={leads}
          columns={columns}
          emptyMessage="No leads yet. Start by creating your first lead."
          onRowClick={(row) => router.push(`/crm/leads/${row.id}`)}
        />
      </div>

      <LeadFormModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onCreate={handleCreateLead}
      />
    </>
  );
}

