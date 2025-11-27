// app/(routes)/crm/opportunities/_data/mockOpportunities.ts

import type { Opportunity, OpportunityStage, OpportunityStatus } from "../_types";

const today = new Date();

const iso = (offsetDays: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    name: "Passenger tracking rollout Berlin",
    accountId: "acc-1",
    accountName: "Berlin Mobility GmbH",
    contactName: "Lukas Weber",
    stage: "QUALIFIED",
    status: "Open",
    amount: 48000,
    currency: "EUR",
    probability: 0.1,
    closeDate: iso(30),
    owner: "Anh Chu",
    createdAt: iso(-20),
    updatedAt: iso(-2),
    description:
      "Extension of the existing telematics to passenger tracking for 120 vehicles in Berlin."
  },
  {
    id: "opp-2",
    name: "Dashcam fleet upgrade Switzerland",
    accountId: "acc-2",
    accountName: "Alpen Transport AG",
    contactName: "Sarah Meier",
    stage: "TRIAL",
    status: "Open",
    amount: 92000,
    currency: "CHF",
    probability: 0.3,
    closeDate: iso(10),
    owner: "Anh Chu",
    createdAt: iso(-35),
    updatedAt: iso(-1),
    description:
      "Upgrade from front cameras to dual dashcams including cloud storage and AI event detection."
  },
  {
    id: "opp-3",
    name: "Pilot Fahrly OS – Vienna",
    accountId: "acc-3",
    accountName: "Vienna Shuttle Services",
    contactName: "Martin Huber",
    stage: "WON",
    status: "Closed Won",
    amount: 18000,
    currency: "EUR",
    probability: 1,
    closeDate: iso(-5),
    owner: "Anh Chu",
    createdAt: iso(-60),
    updatedAt: iso(-5),
    description:
      "12-month pilot for Fahrly OS with 40 vehicles including dispatching and driver app."
  },
  {
    id: "opp-4",
    name: "Vehicle tracking Zurich region",
    accountId: "acc-4",
    accountName: "City Taxi Zürich",
    contactName: "Daniel Frei",
    stage: "LOST",
    status: "Closed Lost",
    amount: 36000,
    currency: "CHF",
    probability: 0,
    closeDate: iso(-14),
    owner: "Anh Chu",
    createdAt: iso(-80),
    updatedAt: iso(-14),
    description:
      "Tracking solution for 60 vehicles. Customer stopped the project due to budget freeze."
  }
];

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

// Alias export for compatibility
export const mockOpportunities = opportunities;
