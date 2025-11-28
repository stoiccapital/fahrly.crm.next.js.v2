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

type TicketRow = {
  id: string;
  title?: string;
  subject?: string;
  customerName?: string;
  status: string;
  priority: string;
  createdAt: string;
};

export function TicketsTable() {
  const router = useRouter();
  const tickets = useCRMStore((state) => state.tickets || []) as TicketRow[];

  const columns = React.useMemo<DataTableColumn<TicketRow>[]>(
    () => [
      {
        id: "subject",
        header: "Ticket",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {row.subject || row.title || row.id}
            </span>
            {row.customerName && (
              <span className="text-xs text-slate-500">
                {row.customerName}
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
        id: "priority",
        header: "Priority",
        cell: (row) =>
          row.priority ? (
            <span className="text-xs text-slate-500">
              {row.priority}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "createdAt",
        header: "Created",
        cell: (row) =>
          row.createdAt ? (
            <span className="text-xs text-slate-500">
              {new Date(row.createdAt).toLocaleDateString()}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
    ],
    []
  );

  return (
    <DataTable<TicketRow>
      title="Tickets"
      subtitle="Support requests"
      data={tickets}
      columns={columns}
      emptyMessage="No tickets yet."
      onRowClick={(row) => router.push(`/crm/tickets/${row.id}`)}
      toolbar={<Button size="sm">New ticket</Button>}
    />
  );
}

