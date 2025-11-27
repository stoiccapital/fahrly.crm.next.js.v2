"use client";

import { useCRMStore } from "@/store/crmStore";

import { CustomerList } from "./_components/CustomerList";

import type { CustomerType } from "./_types";

export default function CustomersPage() {
  const { accounts } = useCRMStore();

  const customers = accounts.filter((account) => account.isCustomer) as CustomerType[];

  return (
    <div className="h-full">
      <CustomerList customers={customers} />
    </div>
  );
}
