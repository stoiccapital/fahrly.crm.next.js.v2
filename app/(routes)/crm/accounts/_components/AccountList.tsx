"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Card, Button, Input, Select, Badge } from "@/app/components/shared/ui";
import { AccountType, AccountStatus } from "../_types";

type AccountListProps = {
  accounts: AccountType[];
};

const STATUS_LABELS: Record<AccountStatus, string> = {
  prospect: "Prospect",
  customer: "Customer",
  churned: "Churned",
};

function getStatusVariant(status: AccountStatus) {
  switch (status) {
    case "customer":
      return "success";
    case "churned":
      return "danger";
    default:
      return "default";
  }
}

export function AccountList({ accounts }: AccountListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AccountStatus | "all">(
    "all"
  );

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        !search ||
        account.companyName.toLowerCase().includes(search.toLowerCase()) ||
        account.city?.toLowerCase().includes(search.toLowerCase()) ||
        account.owner.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || account.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [accounts, search, statusFilter]);

  if (!accounts.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-slate-500">
          No accounts yet. Convert a lead or create an account manually.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Accounts
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredAccounts.length} of {accounts.length} accounts.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search by name, city or owner…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:w-64"
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="sm:w-40"
          >
            <option value="all">All statuses</option>
            <option value="prospect">Prospect</option>
            <option value="customer">Customer</option>
            <option value="churned">Churned</option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Account</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Fleet</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Since</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  onClick={() => router.push(`/crm/accounts/${account.id}`)}
                  className="cursor-pointer border-b border-slate-100 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {account.companyName}
                      </span>
                      {account.website && (
                        <span className="text-xs text-slate-500">
                          {account.website.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">
                      {account.city && account.country
                        ? `${account.city}, ${account.country}`
                        : account.city || account.country || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {account.fleetSizeEstimate != null ? (
                      <span className="text-sm text-slate-700">
                        ~{account.fleetSizeEstimate} vehicles
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">Unknown</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(account.status) as any}>
                      {STATUS_LABELS[account.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {account.owner || "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(account.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                </tr>
              ))}

              {!filteredAccounts.length && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-slate-500"
                    colSpan={6}
                  >
                    No accounts match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
