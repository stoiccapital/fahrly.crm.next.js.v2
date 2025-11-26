// app/(routes)/crm/accounts/_types.ts

export type AccountStatus = 'prospect' | 'customer' | 'churned';

export type AccountLifecycleStage = 'new' | 'active' | 'expansion' | 'churned';

export type AccountType = {
  id: string;
  companyName: string;          // Display name (same as Leads companyName)
  legalCompanyName: string;     // Full legal name for contracts
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  taxId?: string;
  website?: string;
  fleetSizeEstimate?: number;
  status: AccountStatus;
  lifecycleStage: AccountLifecycleStage;
  owner: string;
  createdAt: string;            // ISO date
  source?: string;              // lead source / signup source
  summary?: string;             // key account summary shown at the top
};

export type ContactType = {
  id: string;
  accountId: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isPrimary?: boolean;
  summary?: string;             // key contact summary shown at the top
};

export type NoteTargetType = 'account' | 'contact';

export type NoteType = {
  id: string;
  targetType: NoteTargetType;
  targetId: string;             // accountId or contactId
  content: string;
  createdAt: string;            // ISO date
  author?: string;
};
