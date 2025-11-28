// app/(routes)/crm/opportunities/_utils.ts

import type { OpportunityStage, OpportunityStatus } from "./_types";

export const formatStage = (stage: OpportunityStage): string => {
  switch (stage) {
    case "QUALIFIED":
      return "Qualified";
    case "TRIAL":
      return "Trial";
    case "DECISION":
      return "Decision";
    case "PROPOSAL":
      return "Proposal";
    case "CLOSING":
      return "Closing";
    case "WON":
      return "Won";
    case "LOST":
      return "Lost";
    default:
      return stage;
  }
};

export const statusColorClasses: Record<OpportunityStatus, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-100",
  "Closed Won": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Closed Lost": "bg-rose-50 text-rose-700 border-rose-100"
};

export const stageOrder: OpportunityStage[] = [
  "QUALIFIED",
  "TRIAL",
  "DECISION",
  "PROPOSAL",
  "CLOSING",
  "WON",
  "LOST"
];

// Stage → default probability mapping
export const stageProbability: Record<OpportunityStage, number> = {
  QUALIFIED: 0.1, // 10%
  TRIAL: 0.3,     // 30%
  DECISION: 0.5,  // 50%
  PROPOSAL: 0.9,  // 90%
  CLOSING: 0.95,  // 95%
  WON: 1,         // 100%
  LOST: 0         // 0%
};

