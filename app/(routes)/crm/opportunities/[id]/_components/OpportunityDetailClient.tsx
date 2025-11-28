"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, Input, Select, Textarea, Button, Badge } from "@/app/components/shared/ui";
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
  const router = useRouter();
  
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
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <p className="text-sm text-slate-500">
            Opportunity not found. It may have been deleted or moved.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/crm/opportunities")}
            className="mt-3"
          >
            Back to opportunities
          </Button>
        </Card>
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

  function getStageVariant(stage: string) {
    const s = stage.toLowerCase();
    if (s === "won" || s === "closed won") return "success";
    if (s === "lost" || s === "closed lost") return "danger";
    if (s === "proposal" || s === "closing") return "warning";
    return "default";
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {opportunity.name}
          </h1>
          {relatedAccount && (
            <p className="mt-1 text-sm text-slate-500">
              {relatedAccount.name || relatedAccount.companyName || relatedAccount.legalCompanyName}
            </p>
          )}
          <p className="mt-1 text-sm text-slate-500">
            {amountLabel} · {termLabel} · {bfLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={getStageVariant(opportunity.stage) as any}>
            {opportunity.stage}
          </Badge>
          <Badge variant="soft">
            {opportunity.probability}% win prob
          </Badge>
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={!amountValid}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1.5fr] lg:items-start">
        {/* Deal overview */}
        <Card className="p-6">
          <CardHeader className="mb-4">
            <CardTitle>Deal overview</CardTitle>
            <p className="mt-1 text-xs text-slate-500">
              Contract shape and commercial details.
            </p>
          </CardHeader>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            {/* Stage */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Stage
              </p>
              {isEditing ? (
                <Select
                  value={editStage}
                  onChange={(e) => setEditStage(e.target.value as Opportunity["stage"])}
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              ) : (
                <p className="text-sm text-slate-700">{opportunity.stage}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Amount
              </p>
              {isEditing ? (
                <>
                  <Input
                    type="number"
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
                <p className="text-sm text-slate-700">
                  {amountLabel} ({opportunity.currency})
                </p>
              )}
            </div>

            {/* Close date */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Close date
              </p>
              {isEditing ? (
                <Input
                  type="date"
                  value={editCloseDate}
                  onChange={(e) => setEditCloseDate(e.target.value)}
                />
              ) : (
                <p className="text-sm text-slate-700">
                  {opportunity.closeDate || "—"}
                </p>
              )}
            </div>

            {/* Term (read-only) */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Term
              </p>
              <p className="text-sm text-slate-700">
                {opportunity.termMonths} months · {opportunity.billingFrequency}
              </p>
            </div>

            {/* Discount */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Discount
              </p>
              <p className="text-sm text-slate-700">
                {typeof opportunity.discountPercent === "number"
                  ? `${opportunity.discountPercent}%`
                  : "—"}
              </p>
            </div>

            {/* Vehicles */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Vehicles
              </p>
              <p className="text-sm text-slate-700">
                {typeof opportunity.vehicles === "number"
                  ? `${opportunity.vehicles} Fahrzeuge`
                  : "—"}
              </p>
            </div>

            {/* Modules */}
            <div className="sm:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Modules
              </p>
              <p className="text-sm text-slate-700">
                {opportunity.modules && opportunity.modules.length > 0
                  ? opportunity.modules.join(", ")
                  : "—"}
              </p>
            </div>
          </div>
        </Card>

        {/* People & execution */}
        <div className="space-y-6">
          {/* People */}
          <Card className="p-6">
            <CardHeader className="mb-4">
              <CardTitle>People</CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                Who is on the customer side for this deal.
              </p>
            </CardHeader>
            <div className="text-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Primary contact
              </p>
              <div className="mt-1">
                {primaryContact ? (
                  <div className="space-y-1">
                    <div className="font-medium text-slate-900">
                      {primaryContact.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {primaryContact.role || primaryContact.title || ""}
                    </div>
                    <div className="text-xs text-slate-500">
                      {primaryContact.email || ""}
                    </div>
                  </div>
                ) : opportunity.primaryContactId ? (
                  <span className="text-xs text-slate-500">
                    Linked contact ID:{" "}
                    <span className="font-mono">
                      {opportunity.primaryContactId}
                    </span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    No primary contact linked.
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Execution */}
          <Card className="p-6">
            <CardHeader className="mb-4">
              <CardTitle>Execution</CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                What needs to happen next to win.
              </p>
            </CardHeader>
            <div className="grid gap-4 text-sm">
              {/* Next step */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                  Next step
                </p>
                {isEditing ? (
                  <Textarea
                    rows={2}
                    value={editNextStep}
                    onChange={(e) => setEditNextStep(e.target.value)}
                    placeholder="e.g. Send proposal v2, schedule trial kickoff"
                  />
                ) : (
                  <p className="text-sm text-slate-700">
                    {opportunity.nextStep || "—"}
                  </p>
                )}
              </div>

              {/* Next step due */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                  Next step due
                </p>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editNextStepDueDate}
                    onChange={(e) => setEditNextStepDueDate(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-slate-700">
                    {opportunity.nextStepDueDate ? formatDate(opportunity.nextStepDueDate) : "—"}
                  </p>
                )}
              </div>

              {/* Risk level */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                  Risk level
                </p>
                {isEditing ? (
                  <Select
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
                  </Select>
                ) : (
                  <p className="text-sm text-slate-700">
                    {opportunity.riskLevel || "—"}
                  </p>
                )}
              </div>
            </div>
            {(opportunity.reasonWon || opportunity.reasonLost) && (
              <div className="mt-4 text-sm">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                  Outcome notes
                </p>
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
          </Card>
        </div>
      </div>

      {/* Proposals panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Proposals</h2>
            <p className="mt-1 text-xs text-slate-500">
              Documents and offers linked to this opportunity.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {relatedProposals.length} proposal
            {relatedProposals.length === 1 ? "" : "s"}
          </span>
        </div>

        {relatedProposals.length === 0 ? (
          <p className="text-sm text-slate-500">
            No proposals linked to this opportunity yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {relatedProposals.map((proposal: any) => (
              <li key={proposal.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-slate-900">
                      {proposal.title || proposal.name || proposal.id}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Created:{" "}
                      {formatDate(proposal.createdAt || proposal.created)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {proposal.status && (
                      <Badge variant="soft">{proposal.status}</Badge>
                    )}
                    {proposal.version && (
                      <Badge variant="soft">v{proposal.version}</Badge>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Tasks panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Tasks</h2>
            <p className="mt-1 text-xs text-slate-500">
              Open tasks related to this opportunity.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {relatedTasks.length} task
            {relatedTasks.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Add task toggle + form */}
        <div className="mb-4 flex justify-end">
          {isAddingTask ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={() => setIsAddingTask(true)}
            >
              Add task
            </Button>
          )}
        </div>

        {isAddingTask && (
          <Card className="mb-4 border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Title
                </label>
                <Input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Send proposal v2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Due date
                </label>
                <Input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Priority
                </label>
                <Select
                  value={newTaskPriority}
                  onChange={(e) =>
                    setNewTaskPriority(e.target.value as "Low" | "Medium" | "High")
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
              >
                Save task
              </Button>
            </div>
          </Card>
        )}

        {/* Tasks list with inline editing */}
        {relatedTasks.length === 0 ? (
          <p className="text-sm text-slate-500">
            No tasks linked to this opportunity.
          </p>
        ) : (
          <ul className="space-y-3">
            {relatedTasks.map((task) => (
              <li key={task.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium text-slate-900">
                      {task.title}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Due:{" "}
                      {task.dueDate ? formatDate(task.dueDate) : "—"} ·{" "}
                      {task.status}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Status inline edit */}
                    <Select
                      className="text-xs"
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
                    </Select>

                    {/* Due date inline edit */}
                    <Input
                      type="date"
                      className="text-xs"
                      value={task.dueDate || ""}
                      onChange={(e) =>
                        updateTask(task.id, {
                          dueDate: e.target.value || undefined,
                        })
                      }
                    />

                    {task.priority && (
                      <Badge variant="soft" className="text-xs">
                        Priority: {task.priority}
                      </Badge>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Notes panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Notes</h2>
            <p className="mt-1 text-xs text-slate-500">
              Structured notes for calls, emails, meetings and internal comments.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {relatedNotes.length} note
            {relatedNotes.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Add note toggle + form */}
        <div className="mb-4 flex justify-end">
          {isAddingNote ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddingNote(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={() => setIsAddingNote(true)}
            >
              Add note
            </Button>
          )}
        </div>

        {isAddingNote && (
          <Card className="mb-4 border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-[160px_minmax(0,1fr)]">
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Type
                </label>
                <Select
                  value={newNoteType}
                  onChange={(e) =>
                    setNewNoteType(e.target.value as CRMNote["type"])
                  }
                >
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Internal">Internal</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Note
                </label>
                <Textarea
                  rows={3}
                  value={newNoteBody}
                  onChange={(e) => setNewNoteBody(e.target.value)}
                  placeholder="Short summary of call, email, meeting or internal thought."
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAddingNote(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAddNote}
                disabled={!newNoteBody.trim()}
              >
                Save note
              </Button>
            </div>
          </Card>
        )}

        {/* Notes list */}
        {relatedNotes.length === 0 ? (
          <p className="text-sm text-slate-500">
            No notes for this opportunity yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {relatedNotes
              .slice() // copy to avoid mutating
              .sort((a: CRMNote, b: CRMNote) =>
                (b.createdAt || "").localeCompare(a.createdAt || "")
              )
              .map((note: any) => (
                <li key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <Badge variant="soft">{note.type || "Note"}</Badge>
                        <span>
                          {note.createdAt
                            ? formatDate(note.createdAt)
                            : ""}
                        </span>
                        {note.authorId && (
                          <span className="text-slate-400">
                            · {note.authorId}
                          </span>
                        )}
                      </div>
                      <p className="whitespace-pre-line text-sm text-slate-800">
                        {note.body || note.text}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
