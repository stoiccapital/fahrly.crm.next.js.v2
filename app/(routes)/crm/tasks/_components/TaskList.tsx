"use client";

import type { Task } from "../_types";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-4 shadow-sm text-sm text-slate-500">
        No tasks yet. Tasks are created from the opportunity detail pages.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold">All tasks</h1>
      </div>
      <div className="space-y-2 text-sm">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl border px-3 py-2"
          >
            <div className="min-w-0">
              <div className="truncate font-medium">{task.title}</div>
              {task.description && (
                <div className="truncate text-xs text-slate-500">
                  {task.description}
                </div>
              )}
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                {task.opportunityName && (
                  <span>Opportunity: {task.opportunityName}</span>
                )}
                {task.dueDate && (
                  <>
                    <span>•</span>
                    <span>
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </>
                )}
                <span>•</span>
                <span className="capitalize">{task.priority} priority</span>
                <span>•</span>
                <span className="uppercase">{task.status}</span>
              </div>
            </div>
            <div className="ml-4 text-right text-xs text-slate-400">
              <div>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
              {task.updatedAt && (
                <div>
                  Updated:{" "}
                  {new Date(task.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

