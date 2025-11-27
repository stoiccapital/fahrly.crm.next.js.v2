"use client";

import Link from "next/link";

import { useCRMStore } from "@/store/crmStore";

import { Card, Badge, Button } from "@/app/components/shared/ui";

import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

export function CustomerList() {
  // useCRMStore is a React Context hook with NO selector
  const { accounts } = useCRMStore();

  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  const customers = (safeAccounts.filter(
    (a) => a?.isCustomer
  ) as CustomerType[]) ?? [];

  if (!customers.length) {
    return (
      <Card className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <h1 className="text-base font-semibold text-slate-900">
          No customers yet
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Once an opportunity is marked as Won, the account will appear here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border bg-white p-0 shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h1 className="text-base font-semibold text-slate-900">Customers</h1>
          <p className="text-xs text-slate-600">
            Accounts that converted via a Closed Won opportunity.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-t text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Since</th>
              <th className="px-4 py-2 text-left">Stripe</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t last:border-b hover:bg-slate-50/60"
              >
                <td className="px-4 py-2 align-middle">
                  <Link
                    href={`/crm/customers/${customer.id}`}
                    className="text-sm font-medium text-slate-900 hover:underline"
                  >
                    {customer.companyName}
                  </Link>
                  <div className="text-xs text-slate-500">ID: {customer.id}</div>
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {customer.customerSince
                    ? customer.customerSince.slice(0, 10)
                    : "—"}
                </td>
                <td className="px-4 py-2 align-middle">
                  {customer.stripeCustomerId ? (
                    <Badge className="bg-emerald-50 text-emerald-800">
                      Stripe linked
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-700">
                      Not linked
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-2 align-middle text-right">
                  <Link href={`/crm/customers/${customer.id}`}>
                    <Button variant="ghost" size="sm">
                      Open
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

