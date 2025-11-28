// app/(routes)/crm/opportunities/_components/OpportunityList.tsx

import Link from "next/link";

import type { Opportunity } from "../_types";

import { formatStage } from "../_utils";

type Props = {
  items: Opportunity[];
};

const formatCurrency = (amount: number, currency: Opportunity["currency"]) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency
  }).format(amount);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

export function OpportunityList({ items }: Props) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-6 text-center text-sm text-gray-500">
        Keine Opportunities gefunden.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Opportunity</th>
            <th className="px-4 py-3">Account</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Close Date</th>
            <th className="px-4 py-3">Owner</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((opp) => (
            <tr
              key={opp.id}
              className="transition hover:bg-gray-50/80"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/crm/opportunities/${opp.id}`}
                  className="font-medium text-gray-900 hover:underline"
                >
                  {opp.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-700">{opp.accountName}</td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                  {formatStage(opp.stage)}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {formatCurrency(opp.amount, opp.currency)}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {formatDate(opp.closeDate)}
              </td>
              <td className="px-4 py-3 text-gray-700">{opp.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

