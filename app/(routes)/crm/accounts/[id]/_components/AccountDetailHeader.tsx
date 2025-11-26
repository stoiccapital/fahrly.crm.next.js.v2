// app/(routes)/crm/accounts/[id]/_components/AccountDetailHeader.tsx

'use client';

import { useRouter } from 'next/navigation';
import type { AccountType } from '@/app/(routes)/crm/accounts/_types';
import { useCRMStore } from '@/store/crmStore';

type AccountDetailHeaderProps = {
  account: AccountType;
};

const STATUS_LABELS: Record<AccountType['status'], string> = {
  prospect: 'Prospect',
  customer: 'Customer',
  churned: 'Churned',
};

const LIFECYCLE_LABELS: Record<AccountType['lifecycleStage'], string> = {
  new: 'New',
  active: 'Active',
  expansion: 'Expansion',
  churned: 'Churned',
};

export function AccountDetailHeader({ account }: AccountDetailHeaderProps) {
  const router = useRouter();
  const { moveAccountToLead } = useCRMStore();

  const handleMoveToLeads = () => {
    moveAccountToLead(account.id);
    router.push('/crm/leads');
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => router.push('/crm/accounts')}
          className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm text-gray-600 hover:bg-gray-50"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {account.companyName}
          </h1>
          <p className="text-sm text-gray-500">
            {account.city && account.country
              ? `${account.city}, ${account.country}`
              : account.city || account.country || 'No location'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
          Status: {STATUS_LABELS[account.status]}
        </span>
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
          Lifecycle: {LIFECYCLE_LABELS[account.lifecycleStage]}
        </span>
        <button
          type="button"
          onClick={handleMoveToLeads}
          className="rounded-xl border px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50"
        >
          Move to Leads
        </button>
      </div>
    </div>
  );
}
