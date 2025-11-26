'use client';

import { AccountList } from './_components/AccountList';
import { useCRMStore } from '@/store/crmStore';

export default function AccountsPage() {
  const { accounts } = useCRMStore();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 lg:px-0">
      <AccountList accounts={accounts} />
    </main>
  );
}
