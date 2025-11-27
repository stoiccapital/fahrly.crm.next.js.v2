"use client";

import { useCRMStore } from "@/store/crmStore";

import type { Ticket } from "./_types";

import { TicketList } from "./_components/TicketList";

export default function TicketsPage() {
  const { tickets } = useCRMStore() as { tickets: Ticket[] };

  return (
    <div className="h-full">
      <TicketList tickets={tickets} />
    </div>
  );
}

