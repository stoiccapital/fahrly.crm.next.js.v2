"use client";

import * as React from "react";

import Link from "next/link";

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

export function CustomersTable() {
  const router = useRouter();

  const customers = (useCRMStore((state) => state.customers) ??
    []) as CustomerRow[];

  const accounts = useCRMStore((state) => state.accounts) ?? [];

  console.log("🔥 CustomersTable customers:", customers);

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
              <Link
                href={`/crm/customers/${row.id}`}
                className="text-sm font-medium text-gray-900 underline underline-offset-2"
              >
                {row.name}
              </Link>
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
    <DataTable<CustomerRow>
      title="Customers"
      subtitle="Active paying customers"
      data={customers}
      columns={columns}
      emptyMessage="No customers yet."
      onRowClick={(row) => router.push(`/crm/customers/${row.id}`)}
      toolbar={<Button size="sm">New customer</Button>}
    />
  );
}
