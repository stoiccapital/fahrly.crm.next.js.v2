"use client";

import { Lead } from "../../_types";

type LeadDetailHeaderProps = {
  lead: Lead;
  onConvert: () => void;
};

export function LeadDetailHeader({ lead, onConvert }: LeadDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">{lead.companyName}</h1>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConvert}
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Convert to Account
        </button>
      </div>
    </div>
  );
}

