"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  DataTable,
  type DataTableColumn,
  Button,
} from "@/app/components/shared/ui";

import { useCRMStore } from "@/store/crmStore";

type AccountRow = {
  id: string;
  name?: string;
  companyName?: string;
  legalCompanyName?: string;
  city?: string;
  country?: string;
};

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
              {row.name || row.companyName || row.legalCompanyName}
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
        cell: (row) => (
          <span className="text-xs text-slate-500">
            {(row as any).status || "—"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-3">
      <DataTable<AccountRow>
        title="Accounts"
        subtitle="Companies you do business with"
        data={accounts}
        columns={columns}
        emptyMessage="No accounts yet."
        onRowClick={(row) => router.push(`/crm/accounts/${row.id}`)}
        toolbar={<Button size="sm">New account</Button>}
      />
    </div>
  );
}

