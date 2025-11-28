"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, Button, Input, Select, Badge } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";

import { CustomerHeader } from "./CustomerHeader";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerTickets } from "./CustomerTickets";
import { CustomerContracts } from "./CustomerContracts";

type CustomerDetailClientProps = {
  id: string;
};

export default function CustomerDetailClient({ id }: CustomerDetailClientProps) {
  const router = useRouter();
  // Use separate selectors to avoid creating new objects on every render
  const customers = useCRMStore((state: any) => state.customers || []);
  const accounts = useCRMStore((state: any) => state.accounts || []);
  const tickets = useCRMStore((state: any) => state.tickets || []);
  const addTicket = useCRMStore((state: any) => state.addTicket);

  const customer = customers.find(
    (c: any) => String(c.id) === String(id)
  );

  if (!customer) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Customer not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find a customer with ID{" "}
            <span className="font-mono">{id}</span>.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/crm/customers")}
            className="mt-4"
          >
            Back to customers
          </Button>
        </Card>
      </div>
    );
  }

  const relatedAccount = accounts.find(
    (a: any) => String(a.id) === String(customer.accountId)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <CustomerHeader customer={customer} />

      <div className="grid gap-6 lg:grid-cols-[2fr,1.5fr] lg:items-start">
        <div className="space-y-6">
          <CustomerDetails customer={customer} />
          <CustomerContracts customer={customer} />
        </div>

        <div className="space-y-6">
          <CustomerTickets customerId={customer.id} />
        </div>
      </div>
    </div>
  );
}
