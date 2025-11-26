// app/(routes)/crm/accounts/_components/AccountList.tsx

'use client';

import { useRouter } from 'next/navigation';

import { useMemo, useState } from 'react';

import { AccountType, AccountStatus } from '../_types';

type AccountListProps = {
  accounts: AccountType[];
};

const STATUS_LABELS: Record<AccountStatus, string> = {
  prospect: 'Prospect',
  customer: 'Customer',
  churned: 'Churned',
};

export function AccountList({ accounts }: AccountListProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccountStatus | 'all'>(
    'all',
  );

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        !search ||
        account.companyName.toLowerCase().includes(search.toLowerCase()) ||
        account.city?.toLowerCase().includes(search.toLowerCase()) ||
        account.owner.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || account.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [accounts, search, statusFilter]);

  if (!accounts.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          No accounts yet. Convert a lead or create an account manually.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Accounts</h1>
          <p className="text-sm text-gray-500">
            Showing {filteredAccounts.length} of {accounts.length} accounts.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by name, city or owner…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400 sm:w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400 sm:w-40"
          >
            <option value="all">All statuses</option>
            <option value="prospect">Prospect</option>
            <option value="customer">Customer</option>
            <option value="churned">Churned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Fleet</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Since</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr
                key={account.id}
                onClick={() => router.push(`/crm/accounts/${account.id}`)}
                className="cursor-pointer border-t text-gray-700 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{account.companyName}</span>
                    {account.website && (
                      <span className="text-xs text-gray-400">
                        {account.website.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {account.city && account.country
                      ? `${account.city}, ${account.country}`
                      : account.city || account.country || '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {account.fleetSizeEstimate != null ? (
                    <span className="text-sm text-gray-700">
                      ~{account.fleetSizeEstimate} vehicles
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Unknown</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {STATUS_LABELS[account.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {account.owner || '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(account.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </td>
              </tr>
            ))}

            {!filteredAccounts.length && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-gray-500"
                  colSpan={6}
                >
                  No accounts match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
