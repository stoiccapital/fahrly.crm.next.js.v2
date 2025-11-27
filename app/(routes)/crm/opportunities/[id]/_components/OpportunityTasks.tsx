// app/(routes)/crm/opportunities/[id]/_components/OpportunityTasks.tsx

type TaskStatus = "open" | "done";

type Task = {
  id: string;
  opportunityId: string;
  title: string;
  dueDate?: string;
  owner: string;
  status: TaskStatus;
};

type Props = {
  opportunityId: string;
};

const nowIso = () => new Date().toISOString();

const mockTasks: Task[] = [
  {
    id: "task-1",
    opportunityId: "opp-1",
    title: "Referenzkunde vorbereiten",
    dueDate: undefined,
    owner: "Anh Chu",
    status: "open"
  },
  {
    id: "task-2",
    opportunityId: "opp-2",
    title: "Pricing-Freigabe mit Management",
    dueDate: nowIso(),
    owner: "Anh Chu",
    status: "open"
  },
  {
    id: "task-3",
    opportunityId: "opp-3",
    title: "Onboarding Kick-off-Call",
    dueDate: nowIso(),
    owner: "Anh Chu",
    status: "done"
  }
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

export function OpportunityTasks({ opportunityId }: Props) {
  const tasks = mockTasks.filter((task) => task.opportunityId === opportunityId);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Tasks</h2>
        <button
          type="button"
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          Task hinzufügen
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          Keine Tasks für diese Opportunity.
        </p>
      ) : (
        <ul className="space-y-3 text-sm">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
            >
              <div className="flex items-start gap-2">
                <span
                  className={[
                    "mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border text-[10px]",
                    task.status === "done"
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  ].join(" ")}
                >
                  {task.status === "done" ? "✓" : ""}
                </span>
                <div>
                  <div className="font-medium text-gray-900">
                    {task.title}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>Owner: {task.owner}</span>
                    {task.dueDate && (
                      <span>Due: {formatDate(task.dueDate)}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                …
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
