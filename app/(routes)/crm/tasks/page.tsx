"use client";

import { useCRMStore } from "@/store/crmStore";

import { TaskList } from "./_components/TaskList";

import type { Task } from "./_types";

export default function TasksPage() {
  const { tasks } = useCRMStore() as { tasks: Task[] };

  return (
    <div className="h-full">
      <TaskList tasks={tasks} />
    </div>
  );
}

