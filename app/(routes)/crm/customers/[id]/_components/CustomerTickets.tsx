"use client";

import { useMemo, useState } from "react";

import { useCRMStore } from "@/store/crmStore";

import type { Ticket, TicketPriority } from "@/app/(routes)/crm/tickets/_types";

import { Button, Modal, Input, Textarea } from "@/app/components/shared/ui";

type CustomerTicketsProps = {
  customerId: string;
};

const PRIORITIES: TicketPriority[] = ["low", "medium", "high", "critical"];

export function CustomerTickets({ customerId }: CustomerTicketsProps) {
  const { accounts, tickets, addTicket } = useCRMStore() as any;

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");

  const customer = useMemo(
    () => accounts?.find((a: any) => a.id === customerId),
    [accounts, customerId]
  );

  const customerTickets: Ticket[] = useMemo(
    () =>
      ((tickets ?? []) as Ticket[]).filter(
        (t) => t.customerId === customerId
      ),
    [tickets, customerId]
  );

  const handleCreate = () => {
    if (!title.trim() || !customer) return;

    const now = new Date().toISOString();
    const newTicket: Ticket = {
      id: `t_${Date.now().toString(36)}`,
      title: title.trim(),
      description: description.trim() || undefined,
      status: "open",
      priority,
      customerId,
      customerName: customer.companyName,
      createdAt: now,
      updatedAt: now,
    };

    addTicket(newTicket);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setIsOpen(false);
  };

  return (
    <section className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tickets</h2>
        <Button size="sm" onClick={() => setIsOpen(true)}>
          New ticket
        </Button>
      </div>

      {customerTickets.length === 0 ? (
        <p className="text-sm text-slate-500">
          No tickets yet for this customer.
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {customerTickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex items-center justify-between rounded-xl border px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{ticket.title}</div>
                {ticket.description && (
                  <div className="truncate text-xs text-slate-500">
                    {ticket.description}
                  </div>
                )}
                <div className="mt-1 flex gap-2 text-xs text-slate-400">
                  <span className="uppercase">{ticket.status}</span>
                  <span>•</span>
                  <span className="capitalize">{ticket.priority} priority</span>
                </div>
              </div>
              <div className="ml-4 text-right text-xs text-slate-400">
                <div>
                  Created:{" "}
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
                {ticket.updatedAt && (
                  <div>
                    Updated:{" "}
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New ticket">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short description of the issue"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Optional details, context, or steps to reproduce"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Priority
            </label>
            <select
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} disabled={!title.trim()}>
              Create ticket
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

