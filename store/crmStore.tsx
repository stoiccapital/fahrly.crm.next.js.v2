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
  id?: string;
  entityType?: "opportunity" | "account" | "customer" | "lead";
  entityId?: string;
  targetType?: "account" | "contact";
  targetId?: string;
  type?: "Call" | "Email" | "Meeting" | "Internal";
  body?: string;
  content?: string;
  authorId?: string;
  author?: string;
  createdAt?: string;
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
  addNote: (note: Partial<CRMNote>) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addContact: (contact: Omit<CRMContact, "id">) => void;
  updateContactDetails: (updates: { contactId: string } & Partial<CRMContact>) => void;
  updateAccountDetails: (updates: { accountId: string } & Partial<CRMAccount>) => void;
  moveAccountToLead: (accountId: string) => void;
  convertLeadToAccount: (params: { leadId: string; accountData: Partial<CRMAccount> }) => void;
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
  addNote: (note: Partial<CRMNote>) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...note,
          id: note.id || `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: note.createdAt || new Date().toISOString(),
        } as CRMNote,
      ],
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
  addContact: (contact) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        {
          ...contact,
          id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      ],
    })),
  updateContactDetails: ({ contactId, ...updates }) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        String(contact.id) === String(contactId)
          ? { ...contact, ...updates }
          : contact
      ),
    })),
  updateAccountDetails: ({ accountId, ...updates }) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        String(account.id) === String(accountId)
          ? { ...account, ...updates }
          : account
      ),
    })),
  moveAccountToLead: (accountId) =>
    set((state) => {
      const account = state.accounts.find((acc) => String(acc.id) === String(accountId));
      if (!account) return state;

      const lead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        companyName: account.companyName || "",
        contactName: "",
        email: "",
        phone: "",
        status: "new" as const,
        source: account.source || "Inbound",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        accounts: state.accounts.filter((acc) => String(acc.id) !== String(accountId)),
        leads: [...state.leads, lead],
      };
    }),
  convertLeadToAccount: ({ leadId, accountData }) =>
    set((state) => {
      const lead = state.leads.find((l) => String(l.id) === String(leadId));
      if (!lead) return state;

      const account = {
        id: `acc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        companyName: lead.companyName || "",
        legalCompanyName: accountData.legalCompanyName || lead.companyName || "",
        street: accountData.street,
        zipCode: accountData.zipCode,
        city: accountData.city || lead.city,
        country: accountData.country || lead.country,
        taxId: accountData.taxId,
        website: accountData.website,
        status: "prospect" as const,
        lifecycleStage: "new" as const,
        owner: "",
        createdAt: new Date().toISOString(),
        source: lead.source,
        isCustomer: false,
      };

      return {
        leads: state.leads.filter((l) => String(l.id) !== String(leadId)),
        accounts: [...state.accounts, account],
      };
    }),
}));
