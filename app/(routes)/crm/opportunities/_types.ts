// app/(routes)/crm/opportunities/_types.ts

export type OpportunityStage =
  | "QUALIFIED"
  | "TRIAL"
  | "DECISION"
  | "PROPOSAL"
  | "CLOSING"
  | "WON"
  | "LOST";

export type OpportunityStatus = "Open" | "Closed Won" | "Closed Lost";

export type Opportunity = {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  // NEW: primary contact on the opportunity
  contactName?: string;
  stage: OpportunityStage;
  status: OpportunityStatus;
  amount: number;
  currency: "EUR" | "USD" | "CHF";
  probability: number; // 0–1
  closeDate: string; // ISO date string
  owner: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
};

