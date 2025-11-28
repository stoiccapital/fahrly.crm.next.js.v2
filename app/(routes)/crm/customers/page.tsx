"use client";

import { useCRMStore } from "@/store/crmStore";

import { CustomersTable } from "./_components/CustomersTable";

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <CustomersTable />
    </div>
  );
}
