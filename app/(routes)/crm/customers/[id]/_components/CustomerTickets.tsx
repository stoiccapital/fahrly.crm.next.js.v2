"use client";

import { useMemo, useState } from "react";

import { useCRMStore } from "@/store/crmStore";

import type { Ticket, TicketPriority } from "@/app/(routes)/crm/tickets/_types";

import { Card, Button, Modal, Input, Textarea, Select, Badge } from "@/app/components/shared/ui";

type CustomerTicketsProps = {
  customerId: string;
};

const PRIORITIES: TicketPriority[] = ["low", "medium", "high", "critical"];

function getPriorityVariant(priority: TicketPriority) {
  switch (priority) {
    case "critical":
      return "danger";
    case "high":
      return "warning";
    case "medium":
      return "default";
    default:
      return "soft";
  }
}

function getStatusVariant(status: string) {
  const s = status.toLowerCase();
  if (s === "closed" || s === "resolved") return "success";
  if (s === "open" || s === "new") return "warning";
  return "default";
}

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
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Tickets</h2>
            <p className="mt-1 text-xs text-slate-500">
              Support tickets for this customer.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {customerTickets.length} ticket
            {customerTickets.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mb-4 flex justify-end">
          <Button size="sm" onClick={() => setIsOpen(true)}>
            New ticket
          </Button>
        </div>

        {customerTickets.length === 0 ? (
          <p className="text-sm text-slate-500">
            No tickets yet for this customer.
          </p>
        ) : (
          <ul className="space-y-3">
            {customerTickets.map((ticket) => (
              <li
                key={ticket.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900">{ticket.title}</div>
                    {ticket.description && (
                      <div className="mt-1 text-xs text-slate-500">
                        {ticket.description}
                      </div>
                    )}
                    <div className="mt-2 flex gap-2">
                      <Badge variant={getStatusVariant(ticket.status) as any} className="text-xs">
                        {ticket.status}
                      </Badge>
                      <Badge variant={getPriorityVariant(ticket.priority) as any} className="text-xs">
                        {ticket.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-400">
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New ticket">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short description of the issue"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
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
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Priority
            </label>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} disabled={!title.trim()}>
              Create ticket
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
