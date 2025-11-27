export type TaskStatus = "open" | "in_progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // ISO date string
  opportunityId: string;
  opportunityName?: string;
  createdAt: string;
  updatedAt?: string;
};
