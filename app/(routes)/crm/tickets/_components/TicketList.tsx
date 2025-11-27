"use client";

import type { Ticket } from "../_types";

type TicketListProps = {
  tickets: Ticket[];
};

export function TicketList({ tickets }: TicketListProps) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-4 shadow-sm text-sm text-slate-500">
        No tickets yet. Tickets are created from the customer detail pages.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold">All tickets</h1>
      </div>
      <div className="space-y-2 text-sm">
        {tickets.map((ticket) => (
          <div
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
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="capitalize">{ticket.priority} priority</span>
                <span>•</span>
                <span className="uppercase">{ticket.status}</span>
                {ticket.customerName && (
                  <>
                    <span>•</span>
                    <span>Customer: {ticket.customerName}</span>
                  </>
                )}
              </div>
            </div>
            <div className="ml-4 text-right text-xs text-slate-400">
              <div>
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
              {ticket.updatedAt && (
                <div>
                  Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

