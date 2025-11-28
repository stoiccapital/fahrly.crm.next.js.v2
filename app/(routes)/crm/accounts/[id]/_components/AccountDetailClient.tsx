// app/(routes)/crm/accounts/[id]/_components/AccountDetailClient.tsx

'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useCRMStore } from '@/store/crmStore';

import { AccountDetailHeader } from './AccountDetailHeader';

import { AccountInfoSection } from './AccountInfoSection';

import { AccountContactsSection } from './AccountContactsSection';

type AccountDetailClientProps = {
  accountId: string;
};

export function AccountDetailClient({ accountId }: AccountDetailClientProps) {
  const router = useRouter();

  const { accounts, contacts, notes } = useCRMStore();

  const account = accounts?.find((a) => a.id === accountId);

  const accountContacts = useMemo(
    () => (contacts ?? []).filter((c) => c.accountId === accountId),
    [contacts, accountId],
  );

  const accountNotes = useMemo(
    () =>
      (notes ?? []).filter(
        (n) => n.targetType === 'account' && n.targetId === accountId,
      ),
    [notes, accountId],
  );

  if (!account) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6 lg:px-0">
        <div className="rounded-2xl border bg-white p-6 text-sm text-gray-500 shadow-sm">
          Account not found. It may have been deleted or moved back to Leads.
          <button
            type="button"
            onClick={() => router.push('/crm/accounts')}
            className="mt-3 inline-flex rounded-xl border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to accounts list
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 lg:px-0">
      <div className="space-y-6">
        <AccountDetailHeader account={account} />

        <div className="grid gap-6 lg:grid-cols-[2fr,1.5fr] lg:items-start">
          <AccountInfoSection account={account} />
          <AccountContactsSection account={account} contacts={accountContacts} />
        </div>

        {/* Account Notes Section */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Notes</h2>
          {accountNotes.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">No notes yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {accountNotes.map((note: any) => (
                <li
                  key={note.id}
                  className="rounded-xl border bg-gray-50 p-3 text-sm"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{note.author || 'Unknown'}</span>
                    {note.createdAt && (
                      <span>
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 whitespace-pre-line text-gray-800">
                    {note.content}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
