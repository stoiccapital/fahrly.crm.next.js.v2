import { create } from "zustand";

import { mockAccounts } from "@/lib/mocks/crm/mockAccounts";

import { mockLeads } from "@/lib/mocks/crm/mockLeads";

import { mockOpportunities } from "@/lib/mocks/crm/mockOpportunities";

import { mockCustomers } from "@/lib/mocks/crm/mockCustomers";

import { mockContacts } from "@/lib/mocks/crm/mockContacts";

import { mockNotes } from "@/lib/mocks/crm/mockNotes";

import { mockSaaSMetrics } from "@/lib/mocks/crm/mockSaaSMetrics";

import { mockProposals } from "@/lib/mocks/crm/mockProposals";

import type { SaaSOverviewMetrics } from "@/app/(routes)/crm/_types";

export type CRMAccount = any;

export type CRMLead = any;

export type Opportunity = {
  id: string;
  name: string;
  // Linked objects
  accountId: string;
  primaryContactId?: string;
  // Commercial core
  amount: number; // total ARR or TCV
  currency: "EUR" | "USD";
  termMonths: number; // 12 / 24 / 36 etc.
  billingFrequency: "Monthly" | "Yearly";
  discountPercent?: number;
  // Deal structure (SaaS / fleet)
  vehicles?: number; // for fleet SaaS
  modules?: string[]; // "Dashcams", "Tracking", etc.
  // Stage / probability / timeline
  stage:
    | "Qualified"
    | "Trial"
    | "Decision"
    | "Proposal"
    | "Closed Won"
    | "Closed Lost";
  probability: number; // auto from stage in the future
  closeDate: string; // ISO date string
  // Process + risk
  nextStep?: string;
  nextStepDueDate?: string;
  riskLevel?: "Low" | "Medium" | "High";
  // Context
  source: "Inbound" | "Outbound" | "Partner" | "Expansion";
  segment: "SMB" | "Mid-Market" | "Enterprise";
  // Admin
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  // Status notes when closing
  reasonLost?: string;
  reasonWon?: string;
};

export type CRMOpportunity = any;

export type CRMCustomer = any;

export type CRMContact = any;

export type CRMNote = {
  id: string;
  entityType: "opportunity" | "account" | "customer" | "lead";
  entityId: string;
  type: "Call" | "Email" | "Meeting" | "Internal";
  body: string;
  authorId?: string;
  createdAt: string;
};

export type CRMSaaSMetrics = SaaSOverviewMetrics;

export type CRMProposal = any;

export type CRMTicket = any;

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "Open" | "In Progress" | "Done";
  priority?: "Low" | "Medium" | "High";
  dueDate?: string;
  opportunityId?: string;
  accountId?: string;
  customerId?: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CRMTask = any;

type CRMState = {
  accounts: CRMAccount[];
  leads: CRMLead[];
  opportunities: Opportunity[];
  customers: CRMCustomer[];
  contacts: CRMContact[];
  notes: CRMNote[];
  proposals: CRMProposal[];
  tickets: CRMTicket[];
  tasks: Task[];
  saasMetrics: SaaSOverviewMetrics;
  // Actions
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  addTicket: (ticket: CRMTicket) => void;
  addNote: (note: CRMNote) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
};

export const useCRMStore = create<CRMState>((set) => ({
  // seed from canonical mocks
  accounts: mockAccounts,
  leads: mockLeads,
  opportunities: mockOpportunities as unknown as Opportunity[],
  customers: mockCustomers,
  contacts: mockContacts,
  notes: (mockNotes as unknown as CRMNote[]) || [],
  proposals: mockProposals,
  tickets: [], // Empty for now, can be seeded from mocks later
  tasks: ([] as Task[]), // Empty for now, can be seeded from mocks later
  saasMetrics: mockSaaSMetrics,
  // ACTIONS
  updateOpportunity: (id, updates) =>
    set((state) => ({
      opportunities: state.opportunities.map((opp) =>
        String(opp.id) === String(id) ? { ...opp, ...updates } : opp
      ),
    })),
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [...state.tickets, ticket],
    })),
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        String(t.id) === String(id)
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      ),
    })),
}));
