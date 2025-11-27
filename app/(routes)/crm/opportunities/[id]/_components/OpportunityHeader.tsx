// app/(routes)/crm/opportunities/[id]/_components/OpportunityHeader.tsx

import type { Opportunity } from "../_types";

import { statusColorClasses } from "../../_data/mockOpportunities";

type Props = {
  opportunity: Opportunity;
};

const formatCurrency = (amount: number, currency: Opportunity["currency"]) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency
  }).format(amount);

export function OpportunityHeader({ opportunity }: Props) {
  const statusClasses =
    statusColorClasses[opportunity.status] ??
    "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">
            {opportunity.name}
          </h1>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClasses}`}
          >
            {opportunity.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {opportunity.accountName}
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 text-right md:items-end">
        <div className="text-sm text-gray-500">Expected value</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatCurrency(opportunity.amount, opportunity.currency)}
        </div>
        <div className="text-xs text-gray-500">
          Probability {Math.round(opportunity.probability * 100)}%
        </div>
      </div>
    </div>
  );
}
