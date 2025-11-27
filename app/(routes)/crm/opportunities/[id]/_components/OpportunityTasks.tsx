"use client";

import { useMemo, useState } from "react";

import { useCRMStore } from "@/store/crmStore";

import type { Task, TaskPriority } from "@/app/(routes)/crm/tasks/_types";

import { Button, Input, Textarea } from "@/app/components/shared/ui";

type OpportunityTasksProps = {
  opportunityId: string;
};

const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

export function OpportunityTasks({ opportunityId }: OpportunityTasksProps) {
  const { opportunities, tasks, addTask, updateTaskStatus } = useCRMStore() as any;

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  const opportunity = useMemo(
    () => opportunities?.find((o: any) => o.id === opportunityId),
    [opportunities, opportunityId]
  );

  const opportunityTasks: Task[] = useMemo(
    () =>
      ((tasks ?? []) as Task[]).filter(
        (t) => t.opportunityId === opportunityId
      ),
    [tasks, opportunityId]
  );

  const handleCreate = () => {
    if (!title.trim() || !opportunity) return;

    const now = new Date().toISOString();
    const newTask: Task = {
      id: `task_${Date.now().toString(36)}`,
      title: title.trim(),
      description: description.trim() || undefined,
      status: "open",
      priority,
      dueDate: dueDate || undefined,
      opportunityId,
      opportunityName:
        opportunity.name ??
        opportunity.dealName ??
        opportunity.title ??
        opportunity.accountName,
      createdAt: now,
      updatedAt: now,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setShowForm(false);
  };

  const handleToggleStatus = (task: Task) => {
    if (task.status === "completed") {
      updateTaskStatus(task.id, "open");
    } else {
      updateTaskStatus(task.id, "completed");
    }
  };

  return (
    <section className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tasks</h2>
        <Button size="sm" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Add task"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-4 space-y-3 rounded-2xl border bg-slate-50 p-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Next step for this opportunity"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Optional details or context"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Priority
              </label>
              <select
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as TaskPriority)
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Due date
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowForm(false);
                setTitle("");
                setDescription("");
                setPriority("medium");
                setDueDate("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleCreate}
              disabled={!title.trim() || !opportunity}
            >
              Save task
            </Button>
          </div>
        </div>
      )}

      {opportunityTasks.length === 0 ? (
        <p className="text-sm text-slate-500">
          No tasks yet. Create a next step for this opportunity.
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {opportunityTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded-xl border px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className={`h-4 w-4 rounded-full border ${
                      task.status === "completed"
                        ? "bg-emerald-500 border-emerald-500"
                        : "bg-white"
                    }`}
                    aria-label="Toggle status"
                  />
                  <span
                    className={`truncate font-medium ${
                      task.status === "completed"
                        ? "text-slate-400 line-through"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                {task.description && (
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {task.description}
                  </div>
                )}
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                  {task.dueDate && (
                    <span>
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span>•</span>
                  <span className="capitalize">{task.priority} priority</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
