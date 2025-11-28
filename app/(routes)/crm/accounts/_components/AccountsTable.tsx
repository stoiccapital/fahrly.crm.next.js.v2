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

type AccountRow = {
  id: string;
  name?: string;
  companyName?: string;
  legalCompanyName?: string;
  city?: string;
  country?: string;
  status?: string;
};

function getStatusVariant(status?: string) {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "customer") return "success";
  if (s === "churned") return "danger";
  return "default";
}

export function AccountsTable() {
  const router = useRouter();

  const fullState = useCRMStore((s) => s);

  const accounts = (fullState.accounts ?? []) as AccountRow[];

  const columns = React.useMemo<DataTableColumn<AccountRow>[]>(
    () => [
      {
        id: "name",
        header: "Account",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {row.name || row.companyName || row.legalCompanyName || "Unnamed account"}
            </span>
            {row.legalCompanyName &&
              row.companyName !== row.legalCompanyName && (
                <span className="text-xs text-slate-500">
                  {row.legalCompanyName}
                </span>
              )}
          </div>
        ),
      },
      {
        id: "location",
        header: "Location",
        cell: (row) =>
          row.city ? (
            <span className="text-sm text-slate-700">
              {row.city}
              {row.country && `, ${row.country}`}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
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
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Accounts
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Companies you do business with.
          </p>
        </div>
        <Button size="sm">New account</Button>
      </div>

      {/* Table */}
      <DataTable<AccountRow>
        data={accounts}
        columns={columns}
        emptyMessage="No accounts yet."
        onRowClick={(row) => router.push(`/crm/accounts/${row.id}`)}
      />
    </div>
  );
}
