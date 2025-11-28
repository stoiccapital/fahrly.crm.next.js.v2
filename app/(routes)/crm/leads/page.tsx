"use client";

import { useCRMStore } from "@/store/crmStore";

import { LeadsTable } from "./_components/LeadsTable";

export default function LeadsPage() {
  return (
    <div className="space-y-4">
      <LeadsTable />
    </div>
  );
}
