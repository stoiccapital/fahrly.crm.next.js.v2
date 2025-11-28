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

type CustomerRow = {
  id: string;
  accountId: string;
  name: string;
  status: string;
  plan?: string;
  mrr?: number;
  since?: string;
};

function getStatusVariant(status: string) {
  const s = status.toLowerCase();
  if (s === "active") return "success";
  if (s === "churned" || s === "cancelled") return "danger";
  return "default";
}

export function CustomersTable() {
  const router = useRouter();
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);

  const customers = (useCRMStore((state) => state.customers) ??
    []) as CustomerRow[];

  const accounts = useCRMStore((state) => state.accounts) ?? [];

  const columns = React.useMemo<DataTableColumn<CustomerRow>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
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
        id: "plan",
        header: "Plan",
        cell: (row) =>
          row.plan ? (
            <span className="text-xs text-slate-500">{row.plan}</span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "mrr",
        header: "MRR",
        align: "right",
        cell: (row) =>
          typeof row.mrr === "number" ? (
            <span className="text-sm tabular-nums text-slate-900">
              €{row.mrr.toLocaleString("de-DE")}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "since",
        header: "Since",
        cell: (row) =>
          row.since ? (
            <span className="text-xs text-slate-500">{row.since}</span>
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
            Customers
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Active customers and key accounts.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsNewCustomerOpen(true)} disabled>
          New customer
        </Button>
      </div>

      {/* Table */}
      <DataTable<CustomerRow>
        data={customers}
        columns={columns}
        emptyMessage="No customers yet."
        onRowClick={(row) => router.push(`/crm/customers/${row.id}`)}
      />
    </div>
  );
}
