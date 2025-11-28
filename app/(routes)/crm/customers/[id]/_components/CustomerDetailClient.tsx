"use client";

import { useState } from "react";

import Link from "next/link";

import { useCRMStore } from "@/store/crmStore";

type CustomerDetailClientProps = {
  id: string;
};

export default function CustomerDetailClient({ id }: CustomerDetailClientProps) {
  // Use separate selectors to avoid creating new objects on every render
  const customers = useCRMStore((state: any) => state.customers || []);
  const accounts = useCRMStore((state: any) => state.accounts || []);
  const tickets = useCRMStore((state: any) => state.tickets || []);
  const addTicket = useCRMStore((state: any) => state.addTicket);

  const customer = customers.find(
    (c: any) => String(c.id) === String(id)
  );

  if (!customer) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Customer not found</h1>
          <p className="mt-2 text-sm text-gray-500">
            We couldn&apos;t find a customer with ID{" "}
            <span className="font-mono">{id}</span>.
          </p>
        </div>
      </div>
    );
  }

  const relatedAccount = accounts.find(
    (a: any) => String(a.id) === String(customer.accountId)
  );

  const sinceLabel = (() => {
    if (!customer.since) return null;
    if (typeof customer.since === "string" && customer.since.includes(".")) {
      return customer.since;
    }
    try {
      const d = new Date(customer.since);
      if (isNaN(d.getTime())) return String(customer.since);
      return d.toLocaleDateString("de-DE");
    } catch {
      return String(customer.since);
    }
  })();

  // Tickets linked either by customerId or accountId
  const customerTickets = (tickets || []).filter((t: any) => {
    const byCustomer = t.customerId && String(t.customerId) === String(customer.id);
    const byAccount =
      customer.accountId &&
      t.accountId &&
      String(t.accountId) === String(customer.accountId);
    return byCustomer || byAccount;
  });

  const formatDate = (value: any) => {
    if (!value) return "";
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleString("de-DE");
    } catch {
      return String(value);
    }
  };

  // Local state for new ticket form
  const [newSubject, setNewSubject] = useState("");
  const [newPriority, setNewPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTicket = () => {
    if (!newSubject.trim()) return;

    const now = new Date().toISOString();

    const newTicket = {
      id: `ticket-${Date.now()}`,
      subject: newSubject.trim(),
      status: "Open",
      priority: newPriority,
      customerId: customer.id,
      accountId: customer.accountId,
      createdAt: now,
      updatedAt: now,
    };

    addTicket(newTicket);

    // Reset form
    setNewSubject("");
    setNewPriority("Medium");
    setIsCreating(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{customer.name}</h1>
            {customer.status && (
              <p className="mt-1 text-sm text-gray-500">
                Status: {customer.status}
              </p>
            )}
            {sinceLabel && (
              <p className="mt-1 text-xs text-gray-400">
                Customer since {sinceLabel}
              </p>
            )}
          </div>
          {/* Account chip + MRR / Plan summary */}
          <div className="flex flex-col items-start gap-2 text-sm sm:items-end">
            {relatedAccount && (
              <Link
                href={`/crm/accounts/${relatedAccount.id}`}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-gray-900 hover:bg-gray-50"
              >
                Account · {relatedAccount.name}
              </Link>
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
              {typeof customer.mrr === "number" && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
                  MRR: €{customer.mrr}
                </span>
              )}
              {customer.plan && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
                  Plan: {customer.plan}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer details */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Customer details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Core subscription and account information.
        </p>
        <div className="mt-4 grid gap-4 text-sm text-gray-700 sm:grid-cols-2">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Status
            </div>
            <div className="mt-1">
              {customer.status || "—"}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Customer since
            </div>
            <div className="mt-1">
              {sinceLabel || "—"}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
              MRR
            </div>
            <div className="mt-1">
              {typeof customer.mrr === "number" ? `€${customer.mrr}` : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Plan
            </div>
            <div className="mt-1">
              {customer.plan || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Support tickets & history */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Support tickets</h2>
            <p className="mt-1 text-sm text-gray-500">
              All tickets linked to this customer (via customer or account).
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {customerTickets.length} ticket
            {customerTickets.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* New ticket form toggle */}
        <div className="flex justify-end">
          {isCreating ? (
            <button
              type="button"
              className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black"
              onClick={() => setIsCreating(true)}
            >
              New support ticket
            </button>
          )}
        </div>

        {/* New ticket form */}
        {isCreating && (
          <div className="rounded-xl border bg-gray-50 p-4 text-sm space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Short description of the issue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Priority
              </label>
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-xl bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black"
                onClick={handleCreateTicket}
                disabled={!newSubject.trim()}
              >
                Create ticket
              </button>
            </div>
          </div>
        )}

        {/* Tickets list */}
        {customerTickets.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            No support tickets found for this customer.
          </p>
        ) : (
          <ul className="mt-2 divide-y text-sm">
            {customerTickets.map((ticket: any) => (
              <li key={ticket.id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {ticket.subject || ticket.title || ticket.id}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Opened: {formatDate(ticket.createdAt || ticket.openedAt)}
                      {ticket.updatedAt && (
                        <> · Last update: {formatDate(ticket.updatedAt)}</>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs">
                    {ticket.status && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                        {ticket.status}
                      </span>
                    )}
                    {ticket.priority && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                        Priority: {ticket.priority}
                      </span>
                    )}
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
