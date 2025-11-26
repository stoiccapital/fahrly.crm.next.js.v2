export type LeadStatus = "new" | "contacted" | "qualified" | "disqualified";

export type LeadSource =
  | "outbound"
  | "inbound"
  | "referral"
  | "partner"
  | "event";

export type LeadType = "fleet" | "taxi" | "bus" | "other";

export type Lead = {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  source: LeadSource;
  status: LeadStatus;
  leadType?: LeadType;
  estimatedFleetSize?: number;
  country?: string;
  city?: string;
  owner: string;
  createdAt: string;
  notes?: string;
};
