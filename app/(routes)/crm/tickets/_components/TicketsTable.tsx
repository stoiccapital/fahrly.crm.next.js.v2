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

type TicketRow = {
  id: string;
  title?: string;
  subject?: string;
  customerName?: string;
  status: string;
  priority: string;
  createdAt: string;
};

function getStatusVariant(status: string) {
  const s = status.toLowerCase();
  if (s === "resolved" || s === "closed") return "success";
  if (s === "in_progress" || s === "in progress") return "warning";
  return "default";
}

function getPriorityVariant(priority: string) {
  const p = priority.toLowerCase();
  if (p === "critical" || p === "high") return "danger";
  if (p === "medium") return "warning";
  return "soft";
}

export function TicketsTable() {
  const router = useRouter();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

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
            <Badge variant={getStatusVariant(row.status) as any}>
              {row.status}
            </Badge>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "priority",
        header: "Priority",
        cell: (row) =>
          row.priority ? (
            <Badge variant={getPriorityVariant(row.priority) as any}>
              {row.priority}
            </Badge>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Tickets
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Support tickets across your customers.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsNewTicketOpen(true)} disabled>
          New ticket
        </Button>
      </div>

      {/* Table */}
      <DataTable<TicketRow>
        data={tickets}
        columns={columns}
        emptyMessage="No tickets yet."
        onRowClick={(row) => router.push(`/crm/tickets/${row.id}`)}
      />
    </div>
  );
}
