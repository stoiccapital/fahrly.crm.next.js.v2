"use client";

import { useState } from "react";

import { useCRMStore, type Opportunity, type CRMNote, type Task } from "@/store/crmStore";

type OpportunityDetailClientProps = {
  id: string;
};

const STAGES: Opportunity["stage"][] = [
  "Qualified",
  "Trial",
  "Decision",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

const RISK_LEVELS: Opportunity["riskLevel"][] = ["Low", "Medium", "High"];

export default function OpportunityDetailClient({ id }: OpportunityDetailClientProps) {
  // Use separate selectors to avoid creating new objects on every render
  const opportunities = useCRMStore(
    (state) => (state.opportunities || []) as Opportunity[]
  );
  const accounts = useCRMStore((state) => state.accounts || []);
  const contacts = useCRMStore((state) => state.contacts || []);
  const proposals = useCRMStore((state) => state.proposals || []);
  const tasks = useCRMStore((state) => (state.tasks || []) as Task[]);
  const notes = useCRMStore((state) => (state.notes || []) as CRMNote[]);
  const updateOpportunity = useCRMStore((state) => state.updateOpportunity);
  const addNote = useCRMStore((state) => state.addNote);
  const addTask = useCRMStore((state) => state.addTask);
  const updateTask = useCRMStore((state) => state.updateTask);

  const opportunity = opportunities.find(
    (o) => String(o.id) === String(id)
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!opportunity) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Opportunity not found</h1>
          <p className="mt-2 text-sm text-gray-500">
            We couldn&apos;t find an opportunity with ID{" "}
            <span className="font-mono">{id}</span>.
          </p>
        </div>
      </div>
    );
  }

  const relatedAccount = accounts.find(
    (a: any) => String(a.id) === String(opportunity.accountId)
  );

  const primaryContact = opportunity.primaryContactId
    ? contacts.find(
        (c: any) => String(c.id) === String(opportunity.primaryContactId)
      )
    : undefined;

  const relatedProposals = (proposals || []).filter(
    (p: any) =>
      p.opportunityId && String(p.opportunityId) === String(opportunity.id)
  );

  const relatedTasks = (tasks || []).filter(
    (t: Task | any) =>
      t.opportunityId && String(t.opportunityId) === String(opportunity.id)
  );

  const relatedNotes = (notes || []).filter((n: CRMNote | any) => {
    // Support both new structured notes and older mock shapes:
    const byEntityMatch =
      n.entityType === "opportunity" &&
      String(n.entityId) === String(opportunity.id);
    const byLegacyField =
      n.opportunityId && String(n.opportunityId) === String(opportunity.id);
    return byEntityMatch || byLegacyField;
  });

  const formatDate = (value: any) => {
    if (!value) return "";
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleDateString("de-DE");
    } catch {
      return String(value);
    }
  };

  // ---------- LOCAL EDIT STATE (no useEffect) ----------
  const [editStage, setEditStage] = useState<Opportunity["stage"]>(
    opportunity.stage
  );
  const [editAmount, setEditAmount] = useState<string>(
    opportunity.amount.toString()
  );
  const [editCloseDate, setEditCloseDate] = useState<string>(
    opportunity.closeDate || ""
  );
  const [editNextStep, setEditNextStep] = useState<string>(
    opportunity.nextStep || ""
  );
  const [editNextStepDueDate, setEditNextStepDueDate] = useState<string>(
    opportunity.nextStepDueDate || ""
  );
  const [editRiskLevel, setEditRiskLevel] = useState<
    Opportunity["riskLevel"] | ""
  >(opportunity.riskLevel || "");

  // ---------- LOCAL NOTE STATE (no useEffect) ----------
  const [newNoteType, setNewNoteType] = useState<CRMNote["type"]>("Internal");
  const [newNoteBody, setNewNoteBody] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // ---------- LOCAL TASK STATE (no useEffect) ----------
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const amountNumber = Number(editAmount.replace(",", "."));
  const amountValid = !Number.isNaN(amountNumber) && amountNumber >= 0;

  const handleSave = () => {
    if (!amountValid) return;

    updateOpportunity(opportunity.id, {
      stage: editStage,
      amount: amountNumber,
      closeDate: editCloseDate,
      nextStep: editNextStep || undefined,
      nextStepDueDate: editNextStepDueDate || undefined,
      riskLevel: (editRiskLevel || undefined) as Opportunity["riskLevel"] | undefined,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditStage(opportunity.stage);
    setEditAmount(opportunity.amount.toString());
    setEditCloseDate(opportunity.closeDate || "");
    setEditNextStep(opportunity.nextStep || "");
    setEditNextStepDueDate(opportunity.nextStepDueDate || "");
    setEditRiskLevel(opportunity.riskLevel || "");
  };

  const handleAddNote = () => {
    if (!newNoteBody.trim()) return;

    const now = new Date().toISOString();

    const note: CRMNote = {
      id: `note-${Date.now()}`,
      entityType: "opportunity",
      entityId: opportunity.id,
      type: newNoteType,
      body: newNoteBody.trim(),
      authorId: "you", // placeholder; can be user id later
      createdAt: now,
    };

    addNote(note);

    setNewNoteBody("");
    setNewNoteType("Internal");
    setIsAddingNote(false);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const now = new Date().toISOString();

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: "",
      status: "Open",
      priority: newTaskPriority,
      dueDate: newTaskDueDate || undefined,
      opportunityId: opportunity.id,
      accountId: opportunity.accountId,
      ownerId: opportunity.ownerId,
      createdAt: now,
      updatedAt: now,
    };

    addTask(task);
    setNewTaskTitle("");
    setNewTaskDueDate("");
    setNewTaskPriority("Medium");
    setIsAddingTask(false);
  };

  const amountLabel = `€${opportunity.amount.toLocaleString("de-DE")}`;
  const termLabel = `${opportunity.termMonths} Monate`;
  const bfLabel =
    opportunity.billingFrequency === "Monthly" ? "monatlich" : "jährlich";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{opportunity.name}</h1>
            {relatedAccount && (
              <p className="mt-1 text-sm text-gray-500">
                {relatedAccount.name}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-700">
              {amountLabel} · {termLabel} · {bfLabel}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm sm:items-end">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-800">
                {opportunity.stage}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                {opportunity.probability}% win prob
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Source: {opportunity.source} · Segment: {opportunity.segment}
            </div>
            <div className="text-xs text-gray-400">
              Owner: {opportunity.ownerId} · Close: {opportunity.closeDate}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black disabled:opacity-40"
                    onClick={handleSave}
                    disabled={!amountValid}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top row: Deal overview + People & execution */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
        {/* Deal overview (with editable stage/amount/closeDate) */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Deal overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Contract shape and commercial details.
          </p>
          <div className="mt-4 grid gap-4 text-sm text-gray-700 sm:grid-cols-2">
            {/* Stage */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Stage
              </div>
              <div className="mt-1">
                {isEditing ? (
                  <select
                    className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    value={editStage}
                    onChange={(e) => setEditStage(e.target.value as Opportunity["stage"])}
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                ) : (
                  opportunity.stage
                )}
              </div>
            </div>

            {/* Amount */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Amount
              </div>
              <div className="mt-1">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                    {!amountValid && (
                      <div className="mt-1 text-xs text-red-500">
                        Please enter a valid amount.
                      </div>
                    )}
                  </>
                ) : (
                  `${amountLabel} (${opportunity.currency})`
                )}
              </div>
            </div>

            {/* Close date */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Close date
              </div>
              <div className="mt-1">
                {isEditing ? (
                  <input
                    type="date"
                    className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    value={editCloseDate}
                    onChange={(e) => setEditCloseDate(e.target.value)}
                  />
                ) : (
                  opportunity.closeDate || "—"
                )}
              </div>
            </div>

            {/* Term (read-only) */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Term
              </div>
              <div className="mt-1">
                {opportunity.termMonths} months · {opportunity.billingFrequency}
              </div>
            </div>

            {/* Discount */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Discount
              </div>
              <div className="mt-1">
                {typeof opportunity.discountPercent === "number"
                  ? `${opportunity.discountPercent}%`
                  : "—"}
              </div>
            </div>

            {/* Vehicles */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Vehicles
              </div>
              <div className="mt-1">
                {typeof opportunity.vehicles === "number"
                  ? `${opportunity.vehicles} Fahrzeuge`
                  : "—"}
              </div>
            </div>

            {/* Modules */}
            <div className="sm:col-span-2">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Modules
              </div>
              <div className="mt-1">
                {opportunity.modules && opportunity.modules.length > 0
                  ? opportunity.modules.join(", ")
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* People & execution (with editable nextStep, nextStepDueDate, riskLevel) */}
        <div className="space-y-4">
          {/* People */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">People</h2>
            <p className="mt-1 text-sm text-gray-500">
              Who is on the customer side for this deal.
            </p>
            <div className="mt-4 text-sm text-gray-700">
              <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Primary contact
              </div>
              <div className="mt-1">
                {primaryContact ? (
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">
                      {primaryContact.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {primaryContact.role || primaryContact.title || ""}
                    </div>
                    <div className="text-xs text-gray-500">
                      {primaryContact.email || ""}
                    </div>
                  </div>
                ) : opportunity.primaryContactId ? (
                  <span className="text-xs text-gray-500">
                    Linked contact ID:{" "}
                    <span className="font-mono">
                      {opportunity.primaryContactId}
                    </span>
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">
                    No primary contact linked.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Execution */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Execution</h2>
            <p className="mt-1 text-sm text-gray-500">
              What needs to happen next to win.
            </p>
            <div className="mt-4 grid gap-4 text-sm text-gray-700">
              {/* Next step */}
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Next step
                </div>
                <div className="mt-1">
                  {isEditing ? (
                    <textarea
                      className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      rows={2}
                      value={editNextStep}
                      onChange={(e) => setEditNextStep(e.target.value)}
                      placeholder="e.g. Send proposal v2, schedule trial kickoff"
                    />
                  ) : (
                    opportunity.nextStep || "—"
                  )}
                </div>
              </div>

              {/* Next step due */}
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Next step due
                </div>
                <div className="mt-1">
                  {isEditing ? (
                    <input
                      type="date"
                      className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      value={editNextStepDueDate}
                      onChange={(e) => setEditNextStepDueDate(e.target.value)}
                    />
                  ) : opportunity.nextStepDueDate ? (
                    formatDate(opportunity.nextStepDueDate)
                  ) : (
                    "—"
                  )}
                </div>
              </div>

              {/* Risk level */}
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Risk level
                </div>
                <div className="mt-1">
                  {isEditing ? (
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      value={editRiskLevel}
                      onChange={(e) =>
                        setEditRiskLevel(
                          (e.target.value || "") as Opportunity["riskLevel"] | ""
                        )
                      }
                    >
                      <option value="">—</option>
                      {RISK_LEVELS.map((rl) => (
                        <option key={rl} value={rl || ""}>
                          {rl}
                        </option>
                      ))}
                    </select>
                  ) : (
                    opportunity.riskLevel || "—"
                  )}
                </div>
              </div>
            </div>
            {(opportunity.reasonWon || opportunity.reasonLost) && (
              <div className="mt-4 text-sm text-gray-700">
                <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Outcome notes
                </div>
                <div className="mt-1 space-y-1">
                  {opportunity.reasonWon && (
                    <div>
                      <span className="font-semibold">Won: </span>
                      {opportunity.reasonWon}
                    </div>
                  )}
                  {opportunity.reasonLost && (
                    <div>
                      <span className="font-semibold">Lost: </span>
                      {opportunity.reasonLost}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proposals panel (read-only) */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Proposals</h2>
            <p className="mt-1 text-sm text-gray-500">
              Documents and offers linked to this opportunity.
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {relatedProposals.length} proposal
            {relatedProposals.length === 1 ? "" : "s"}
          </span>
        </div>

        {relatedProposals.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No proposals linked to this opportunity yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y text-sm">
            {relatedProposals.map((proposal: any) => (
              <li key={proposal.id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {proposal.title || proposal.name || proposal.id}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Created:{" "}
                      {formatDate(proposal.createdAt || proposal.created)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs">
                    {proposal.status && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                        {proposal.status}
                      </span>
                    )}
                    {proposal.version && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                        v{proposal.version}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tasks panel */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Tasks</h2>
            <p className="mt-1 text-sm text-gray-500">
              Open tasks related to this opportunity.
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {relatedTasks.length} task
            {relatedTasks.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Add task toggle + form */}
        <div className="mt-4 flex justify-end">
          {isAddingTask ? (
            <button
              type="button"
              className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black"
              onClick={() => setIsAddingTask(true)}
            >
              Add task
            </button>
          )}
        </div>

        {isAddingTask && (
          <div className="mt-3 rounded-xl border bg-gray-50 p-4 text-sm space-y-3">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Send proposal v2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Due date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Priority
                </label>
                <select
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={newTaskPriority}
                  onChange={(e) =>
                    setNewTaskPriority(e.target.value as "Low" | "Medium" | "High")
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black disabled:opacity-40"
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
              >
                Save task
              </button>
            </div>
          </div>
        )}

        {/* Tasks list with inline editing */}
        {relatedTasks.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No tasks linked to this opportunity.
          </p>
        ) : (
          <ul className="mt-4 divide-y text-sm">
            {relatedTasks.map((task) => (
              <li key={task.id} className="py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {task.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Due:{" "}
                      {task.dueDate ? formatDate(task.dueDate) : "—"} ·{" "}
                      {task.status}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Status inline edit */}
                    <select
                      className="rounded-full border px-2 py-1 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      value={task.status}
                      onChange={(e) =>
                        updateTask(task.id, {
                          status: e.target.value as Task["status"],
                        })
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>

                    {/* Due date inline edit */}
                    <input
                      type="date"
                      className="rounded-full border px-2 py-1 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      value={task.dueDate || ""}
                      onChange={(e) =>
                        updateTask(task.id, {
                          dueDate: e.target.value || undefined,
                        })
                      }
                    />

                    {task.priority && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                        Priority: {task.priority}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notes panel */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Notes</h2>
            <p className="mt-1 text-sm text-gray-500">
              Structured notes for calls, emails, meetings and internal comments.
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {relatedNotes.length} note
            {relatedNotes.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Add note toggle + form */}
        <div className="mt-4 flex justify-end">
          {isAddingNote ? (
            <button
              type="button"
              className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsAddingNote(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black"
              onClick={() => setIsAddingNote(true)}
            >
              Add note
            </button>
          )}
        </div>

        {isAddingNote && (
          <div className="mt-3 rounded-xl border bg-gray-50 p-4 text-sm space-y-3">
            <div className="grid gap-3 sm:grid-cols-[160px_minmax(0,1fr)]">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Type
                </label>
                <select
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={newNoteType}
                  onChange={(e) =>
                    setNewNoteType(e.target.value as CRMNote["type"])
                  }
                >
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  rows={3}
                  value={newNoteBody}
                  onChange={(e) => setNewNoteBody(e.target.value)}
                  placeholder="Short summary of call, email, meeting or internal thought."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsAddingNote(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black disabled:opacity-40"
                onClick={handleAddNote}
                disabled={!newNoteBody.trim()}
              >
                Save note
              </button>
            </div>
          </div>
        )}

        {/* Notes list */}
        {relatedNotes.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No notes for this opportunity yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y text-sm">
            {relatedNotes
              .slice() // copy to avoid mutating
              .sort((a: CRMNote, b: CRMNote) =>
                (b.createdAt || "").localeCompare(a.createdAt || "")
              )
              .map((note: any) => (
                <li key={note.id} className="py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                          {note.type || "Note"}
                        </span>
                        <span>
                          {note.createdAt
                            ? formatDate(note.createdAt)
                            : ""}
                        </span>
                        {note.authorId && (
                          <span className="text-gray-400">
                            · {note.authorId}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm text-gray-800">
                        {note.body || note.text}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
