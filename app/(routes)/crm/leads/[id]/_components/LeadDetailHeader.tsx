"use client";

import { Button } from "@/app/components/shared/ui";
import { Lead } from "../../_types";

type LeadDetailHeaderProps = {
  lead: Lead;
  onConvert: () => void;
};

export function LeadDetailHeader({ lead, onConvert }: LeadDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          {lead.companyName}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {lead.city ? `${lead.city}, ` : ""}
          {lead.country}
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={onConvert}>
          Convert to Account
        </Button>
      </div>
    </div>
  );
}

