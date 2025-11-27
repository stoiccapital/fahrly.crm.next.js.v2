"use client";

import { useCRMStore } from "@/store/crmStore";

import { Card } from "@/app/components/shared/ui";

import { CustomerHeader } from "./CustomerHeader";

import { CustomerDetails } from "./CustomerDetails";

import { CustomerContracts } from "./CustomerContracts";

import { CustomerTickets } from "./CustomerTickets";

import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

type Props = {
  customerId: string;
};

export function CustomerDetailClient({ customerId }: Props) {
  // ❗️ Context store → useCRMStore() returns FULL store, not selector
  const { accounts } = useCRMStore();

  // Defensive normalisation
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  const customers = safeAccounts.filter(
    (a) => a?.isCustomer
  ) as CustomerType[];

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="p-4 md:p-6">
        <Card className="rounded-2xl border bg-white p-6 text-center shadow-sm">
          <h1 className="text-base font-semibold text-slate-900">
            Customer not found
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            This customer does not exist in the current CRM session.
            It may have been removed or the page was refreshed.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <CustomerHeader customer={customer} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <CustomerDetails customer={customer} />
        <CustomerContracts customer={customer} />
      </div>
      <CustomerTickets customerId={customerId} />
    </div>
  );
}

