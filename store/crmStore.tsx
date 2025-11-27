// store/crmStore.tsx

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { Lead } from '@/app/(routes)/crm/leads/_types';
import {
  AccountType,
  ContactType,
  NoteType,
  NoteTargetType,
} from '@/app/(routes)/crm/accounts/_types';
import type { Opportunity } from '@/app/(routes)/crm/opportunities/_types';
import type { ProposalType } from '@/app/(routes)/crm/proposals/_types';
import type { Task, TaskStatus } from '@/app/(routes)/crm/tasks/_types';
import type { Ticket, TicketStatus } from '@/app/(routes)/crm/tickets/_types';
import { mockLeads } from '@/app/(routes)/crm/leads/_data/mockLeads';
import { mockAccounts } from '@/app/(routes)/crm/accounts/_data/mockAccounts';
import { mockContacts } from '@/app/(routes)/crm/accounts/_data/mockContacts';
import { mockNotes } from '@/app/(routes)/crm/accounts/_data/mockNotes';
import { opportunities as mockOpportunities } from '@/app/(routes)/crm/opportunities/_data/mockOpportunities';
import { mockProposals } from '@/app/(routes)/crm/proposals/_data/mockProposals';

const SUMMARY_CHAR_LIMIT = 250;

const CRM_STORAGE_KEY = "fahrly-crm-state-v1";

type CRMStorageShape = {
  leads?: any[];
  accounts?: any[];
  opportunities?: any[];
  contacts?: any[];
  notes?: any[];
  proposals?: any[];
  tasks?: any[];
  tickets?: any[];
};

type ConvertLeadAccountData = {
  legalCompanyName: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  taxId?: string;
  website?: string;
};

type AddContactData = {
  accountId: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isPrimary?: boolean;
};

type AddNoteInput = {
  targetType: NoteTargetType;
  targetId: string;
  content: string;
  author?: string;
};

type UpdateAccountDetailsInput = {
  accountId: string;
  legalCompanyName?: string;
  owner?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  website?: string;
  taxId?: string;
  fleetSizeEstimate?: number;
  source?: string;
  summary?: string;
};

type UpdateContactDetailsInput = {
  contactId: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  isPrimary?: boolean;
  summary?: string;
};

type CRMContextValue = {
  leads: Lead[];
  accounts: AccountType[];
  opportunities: Opportunity[];
  proposals: ProposalType[];
  contacts: ContactType[];
  notes: NoteType[];
  tasks: Task[];
  tickets: Ticket[];
  convertLeadToAccount: (options: {
    leadId: string;
    accountData: ConvertLeadAccountData;
  }) => void;
  addContact: (data: AddContactData) => void;
  moveAccountToLead: (accountId: string) => void;
  addNote: (input: AddNoteInput) => void;
  updateAccountSummary: (accountId: string, summary: string) => void;
  updateContactSummary: (contactId: string, summary: string) => void;
  updateAccountDetails: (input: UpdateAccountDetailsInput) => void;
  updateContactDetails: (input: UpdateContactDetailsInput) => void;
  markAccountAsCustomer: (accountId: string, customerSince?: string) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  updateTicket: (id: string, patch: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addOpportunity: (opp: Opportunity) => void;
  updateOpportunity: (id: string, patch: Partial<Opportunity>) => void;
};

const CRMContext = createContext<CRMContextValue | undefined>(undefined);

type CRMProviderProps = {
  children: ReactNode;
};

export function CRMProvider({ children }: CRMProviderProps) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [accounts, setAccounts] = useState<AccountType[]>(mockAccounts);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [proposals, setProposals] = useState<ProposalType[]>(mockProposals);
  const [contacts, setContacts] = useState<ContactType[]>(mockContacts);
  const [notes, setNotes] = useState<NoteType[]>(mockNotes);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Restore state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(CRM_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as CRMStorageShape;

      if (parsed.leads && Array.isArray(parsed.leads)) {
        setLeads(parsed.leads as any);
      }

      if (parsed.accounts && Array.isArray(parsed.accounts)) {
        setAccounts(parsed.accounts as any);
      }

      if (parsed.opportunities && Array.isArray(parsed.opportunities)) {
        setOpportunities(parsed.opportunities as any);
      }

      if (parsed.contacts && Array.isArray(parsed.contacts)) {
        setContacts(parsed.contacts as any);
      }

      if (parsed.notes && Array.isArray(parsed.notes)) {
        setNotes(parsed.notes as any);
      }

      if (parsed.tasks && Array.isArray(parsed.tasks)) {
        setTasks(parsed.tasks as any);
      }

      if (parsed.tickets && Array.isArray(parsed.tickets)) {
        setTickets(parsed.tickets as any);
      }

      if (parsed.proposals && Array.isArray(parsed.proposals)) {
        setProposals(parsed.proposals as any);
      }
    } catch (error) {
      console.error("Failed to restore CRM state from localStorage", error);
    }
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload: CRMStorageShape = {
      leads,
      accounts,
      opportunities,
      proposals,
      contacts,
      notes,
      tasks,
      tickets,
    };

    try {
      window.localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to persist CRM state to localStorage", error);
    }
  }, [leads, accounts, opportunities, proposals, contacts, notes, tasks, tickets]);

  const convertLeadToAccount = useCallback(
    (options: { leadId: string; accountData: ConvertLeadAccountData }) => {
      const { leadId, accountData } = options;

      setLeads((prevLeads) => {
        const lead = prevLeads.find((l) => l.id === leadId);
        if (!lead) {
          return prevLeads;
        }

        const newAccount: AccountType = {
          id: `acc-${lead.id}`,
          companyName: lead.companyName,
          legalCompanyName:
            accountData.legalCompanyName || lead.companyName || 'Unnamed account',
          street: accountData.street,
          zipCode: accountData.zipCode,
          city: accountData.city ?? lead.city,
          country: accountData.country ?? lead.country,
          taxId: accountData.taxId,
          website: accountData.website,
          fleetSizeEstimate: lead.estimatedFleetSize,
          status: 'customer',
          lifecycleStage: 'active',
          owner: lead.owner,
          createdAt: new Date().toISOString(),
          source: lead.source,
          summary:
            'New customer created from lead. Needs onboarding and first review.'.slice(
              0,
              SUMMARY_CHAR_LIMIT,
            ),
          isCustomer: true,
          customerSince: new Date().toISOString(),
          stripeCustomerId: null,
        };

        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);

        return prevLeads.filter((l) => l.id !== leadId);
      });
    },
    [],
  );

  const addContact = useCallback((data: AddContactData) => {
    const newContact: ContactType = {
      id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      accountId: data.accountId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      isPrimary: data.isPrimary ?? false,
      summary: '',
    };

    setContacts((prev) => [...prev, newContact]);
  }, []);

  const moveAccountToLead = useCallback((accountId: string) => {
    setAccounts((prevAccounts) => {
      const account = prevAccounts.find((a) => a.id === accountId);
      if (!account) return prevAccounts;

      const newLead: Lead = {
        id: `lead-from-${account.id}-${Date.now()}`,
        companyName: account.companyName,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        city: account.city ?? '',
        country: account.country ?? '',
        source: (account.source === 'inbound' || account.source === 'outbound' || account.source === 'referral' || account.source === 'partner' || account.source === 'event') 
          ? account.source 
          : 'inbound',
        status: 'new',
        estimatedFleetSize: account.fleetSizeEstimate,
        notes: account.summary ?? '',
        owner: account.owner,
        createdAt: new Date().toISOString(),
      };

      setLeads((prevLeads) => [...prevLeads, newLead]);

      return prevAccounts.filter((a) => a.id !== accountId);
    });
  }, []);

  const addNote = useCallback((input: AddNoteInput) => {
    const newNote: NoteType = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      targetType: input.targetType,
      targetId: input.targetId,
      content: input.content,
      createdAt: new Date().toISOString(),
      author: input.author ?? 'Me',
    };

    setNotes((prev) => [newNote, ...prev]); // newest first
  }, []);

  const updateAccountSummary = useCallback(
    (accountId: string, summary: string) => {
      const normalized = summary.slice(0, SUMMARY_CHAR_LIMIT).trim();
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, summary: normalized } : acc,
        ),
      );
    },
    [],
  );

  const updateContactSummary = useCallback(
    (contactId: string, summary: string) => {
      const normalized = summary.slice(0, SUMMARY_CHAR_LIMIT).trim();
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, summary: normalized } : contact,
        ),
      );
    },
    [],
  );

  const updateAccountDetails = useCallback(
    (input: UpdateAccountDetailsInput) => {
      const {
        accountId,
        legalCompanyName,
        owner,
        street,
        zipCode,
        city,
        country,
        website,
        taxId,
        fleetSizeEstimate,
        source,
        summary,
      } = input;

      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id !== accountId) return acc;

          return {
            ...acc,
            legalCompanyName: legalCompanyName ?? acc.legalCompanyName,
            owner: owner ?? acc.owner,
            street: street ?? acc.street,
            zipCode: zipCode ?? acc.zipCode,
            city: city ?? acc.city,
            country: country ?? acc.country,
            website: website ?? acc.website,
            taxId: taxId ?? acc.taxId,
            fleetSizeEstimate:
              fleetSizeEstimate !== undefined
                ? fleetSizeEstimate
                : acc.fleetSizeEstimate,
            source: source ?? acc.source,
            summary:
              summary != null
                ? summary.slice(0, SUMMARY_CHAR_LIMIT).trim()
                : acc.summary,
          };
        }),
      );
    },
    [],
  );

  const updateContactDetails = useCallback(
    (input: UpdateContactDetailsInput) => {
      const { contactId, name, email, phone, role, isPrimary, summary } = input;

      setContacts((prev) =>
        prev.map((c) => {
          if (c.id !== contactId) return c;

          return {
            ...c,
            name: name ?? c.name,
            email: email ?? c.email,
            phone: phone ?? c.phone,
            role: role ?? c.role,
            isPrimary: isPrimary ?? c.isPrimary,
            summary:
              summary != null
                ? summary.slice(0, SUMMARY_CHAR_LIMIT).trim()
                : c.summary,
          };
        }),
      );
    },
    [],
  );

  const markAccountAsCustomer = useCallback(
    (accountId: string, customerSince?: string) => {
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === accountId
            ? {
                ...account,
                isCustomer: true,
                customerSince:
                  customerSince ?? account.customerSince ?? new Date().toISOString(),
                status: 'customer',
              }
            : account
        ),
      );
    },
    [],
  );

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addTicket = useCallback((ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
  }, []);

  const updateTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const updateTicket = useCallback((id: string, patch: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const deleteTicket = useCallback((id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addOpportunity = useCallback((opp: Opportunity) => {
    setOpportunities((prev) => [...prev, opp]);
  }, []);

  const updateOpportunity = useCallback((id: string, patch: Partial<Opportunity>) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...patch } : o))
    );
  }, []);

  const value = useMemo(
    () => ({
      leads,
      accounts,
      opportunities,
      proposals,
      contacts,
      notes,
      tasks,
      tickets,
      convertLeadToAccount,
      addContact,
      moveAccountToLead,
      addNote,
      updateAccountSummary,
      updateContactSummary,
      updateAccountDetails,
      updateContactDetails,
      markAccountAsCustomer,
      addTask,
      updateTaskStatus,
      updateTask,
      deleteTask,
      addTicket,
      updateTicketStatus,
      updateTicket,
      deleteTicket,
      addOpportunity,
      updateOpportunity,
    }),
    [leads, accounts, opportunities, proposals, contacts, notes, tasks, tickets, convertLeadToAccount, addContact, moveAccountToLead, addNote, updateAccountSummary, updateContactSummary, updateAccountDetails, updateContactDetails, markAccountAsCustomer, addTask, updateTaskStatus, updateTask, deleteTask, addTicket, updateTicketStatus, updateTicket, deleteTicket, addOpportunity, updateOpportunity],
  );

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRMStore() {
  const ctx = useContext(CRMContext);
  if (!ctx) {
    throw new Error('useCRMStore must be used within a CRMProvider');
  }
  return ctx;
}
