"use client";

import { useCRMStore, type Task } from "@/store/crmStore";

export default function TasksPage() {
  const tasks = useCRMStore((state) => (state.tasks || []) as Task[]);

  if (!tasks.length) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="mt-2 text-sm text-gray-500">
            No tasks yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="mt-1 text-sm text-gray-500">
          All open tasks across opportunities and accounts.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Priority</th>
              <th className="py-2">Due</th>
              <th className="py-2">Linked to</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="py-2 text-sm text-gray-900">
                  {task.title}
                </td>
                <td className="py-2 text-xs">
                  {task.status}
                </td>
                <td className="py-2 text-xs">
                  {task.priority || "—"}
                </td>
                <td className="py-2 text-xs">
                  {task.dueDate || "—"}
                </td>
                <td className="py-2 text-xs text-gray-500">
                  {task.opportunityId
                    ? `Opportunity: ${task.opportunityId}`
                    : task.accountId
                    ? `Account: ${task.accountId}`
                    : task.customerId
                    ? `Customer: ${task.customerId}`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
