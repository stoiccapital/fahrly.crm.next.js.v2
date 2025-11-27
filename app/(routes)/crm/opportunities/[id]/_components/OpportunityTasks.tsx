"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  Badge
} from "@/app/components/shared/ui";

type TaskStatus = "open" | "done";

type TaskPriority = "low" | "medium" | "high";

type Task = {
  id: string;
  opportunityId: string;
  title: string;
  dueDate?: string; // ISO date
  owner: string;
  status: TaskStatus;
  priority: TaskPriority;
};

type Props = {
  opportunityId: string;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

export function OpportunityTasks({ opportunityId }: Props) {
  const [tasks, setTasks] = useState<Task[]>(() => [
    {
      id: "task-1",
      opportunityId,
      title: "Send updated proposal",
      dueDate: todayISO(),
      owner: "Anh Chu",
      status: "open",
      priority: "high"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<{
    title: string;
    dueDate: string;
    owner: string;
    priority: TaskPriority;
  }>({
    title: "",
    dueDate: todayISO(),
    owner: "Anh Chu",
    priority: "medium"
  });

  const filteredTasks = tasks
    .filter((t) => t.opportunityId === opportunityId)
    .slice()
    .sort((a, b) => {
      // open tasks first, then done; within each by due date
      if (a.status !== b.status) {
        return a.status === "open" ? -1 : 1;
      }
      if (!a.dueDate || !b.dueDate) return 0;
      return a.dueDate.localeCompare(b.dueDate);
    });

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask: Task = {
      id: "task-" + Math.random().toString(36).slice(2, 8),
      opportunityId,
      title: form.title.trim(),
      dueDate: form.dueDate || undefined,
      owner: form.owner.trim() || "Unknown",
      status: "open",
      priority: form.priority
    };

    setTasks((prev) => [newTask, ...prev]);
    setForm({
      title: "",
      dueDate: todayISO(),
      owner: "Anh Chu",
      priority: "medium"
    });
    setIsAdding(false);
  };

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "open" ? "done" : "open"
            }
          : task
      )
    );
  };

  const priorityBadgeVariant = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "danger" as const;
      case "medium":
        return "warning" as const;
      case "low":
      default:
        return "soft" as const;
    }
  };

  return (
    <Card>
      <CardHeader className="mb-3 flex items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setIsAdding((prev) => !prev)}
        >
          {isAdding ? "Cancel" : "Add task"}
        </Button>
      </CardHeader>
      <CardContent className="mt-0 space-y-4">
        {isAdding && (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-3"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Title *
              </label>
              <Input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Send proposal, schedule demo, legal review"
                required
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Due date
                </label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Owner
                </label>
                <Input
                  value={form.owner}
                  onChange={(e) => handleChange("owner", e.target.value)}
                  placeholder="e.g. Anh Chu"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Priority
              </label>
              <Select
                value={form.priority}
                onChange={(e) =>
                  handleChange("priority", e.target.value as TaskPriority)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save task
              </Button>
            </div>
          </form>
        )}
        {filteredTasks.length === 0 ? (
          <p className="text-xs text-gray-500">
            No tasks yet. Use <span className="font-medium">Add task</span> to
            create follow-ups for this opportunity.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-3 py-2"
              >
                <div className="flex flex-1 items-start gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(task.id)}
                    className="mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-500 hover:border-gray-500"
                    aria-label={
                      task.status === "open"
                        ? "Mark task as done"
                        : "Mark task as open"
                    }
                  >
                    {task.status === "done" ? "✓" : ""}
                  </button>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          "text-sm font-medium " +
                          (task.status === "done"
                            ? "text-gray-500 line-through"
                            : "text-gray-900")
                        }
                      >
                        {task.title}
                      </span>
                      <Badge variant={priorityBadgeVariant(task.priority)}>
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}{" "}
                        priority
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>Owner: {task.owner}</span>
                      {task.dueDate && (
                        <span>• Due: {task.dueDate}</span>
                      )}
                      <span>
                        • Status:{" "}
                        {task.status === "open" ? "Open" : "Done"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
