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

type TaskRow = {
  id: string;
  title: string;
  opportunityName?: string;
  dueDate?: string;
  status: string;
  priority?: string;
};

function getStatusVariant(status: string) {
  const s = status.toLowerCase();
  if (s === "completed" || s === "done") return "success";
  if (s === "in progress" || s === "in_progress") return "warning";
  return "default";
}

function getPriorityVariant(priority?: string) {
  if (!priority) return "default";
  const p = priority.toLowerCase();
  if (p === "high" || p === "critical") return "danger";
  if (p === "medium") return "warning";
  return "soft";
}

export function TasksTable() {
  const router = useRouter();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Open tasks across your pipeline.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsNewTaskOpen(true)} disabled>
          New task
        </Button>
      </div>

      {/* Table */}
      <DataTable<TaskRow>
        data={tasks}
        columns={columns}
        emptyMessage="No tasks yet."
        onRowClick={(row) => router.push(`/crm/tasks/${row.id}`)}
      />
    </div>
  );
}
