export type TicketStatus = "open" | "in_progress" | "resolved";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export type Ticket = {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  customerId: string;
  customerName?: string;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
};

