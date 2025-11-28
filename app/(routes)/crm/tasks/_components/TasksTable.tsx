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

type TaskRow = {
  id: string;
  title: string;
  opportunityName?: string;
  dueDate?: string;
  status: string;
};

export function TasksTable() {
  const router = useRouter();
  const tasks = useCRMStore((state) => state.tasks) as TaskRow[];

  const columns = React.useMemo<DataTableColumn<TaskRow>[]>(
    () => [
      {
        id: "title",
        header: "Task",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {row.title}
            </span>
            {row.opportunityName && (
              <span className="text-xs text-slate-500">
                {row.opportunityName}
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
          (row as any).priority ? (
            <span className="text-xs text-slate-500">
              {(row as any).priority}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
      {
        id: "dueDate",
        header: "Due date",
        cell: (row) =>
          row.dueDate ? (
            <span className="text-xs text-slate-500">
              {new Date(row.dueDate).toLocaleDateString()}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          ),
      },
    ],
    []
  );

  return (
    <DataTable<TaskRow>
      title="Tasks"
      subtitle="All CRM tasks"
      data={tasks}
      columns={columns}
      emptyMessage="No tasks yet."
      onRowClick={(row) => router.push(`/crm/tasks/${row.id}`)}
      toolbar={<Button size="sm">New task</Button>}
    />
  );
}

