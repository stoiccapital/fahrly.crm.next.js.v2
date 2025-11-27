export type ProposalStatus = "Draft" | "Sent" | "Accepted" | "Rejected";

export type ProposalType = {
  id: string;
  opportunityId: string;
  accountId: string;
  contactId?: string;
  title: string;
  amount: number;
  currency: string; // e.g. "EUR", "CHF", "USD"
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  status: ProposalStatus;
  scopeOfWork: string;
  pricingDetails: string;
  paymentTerms: string;
  notes: string;
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
};

