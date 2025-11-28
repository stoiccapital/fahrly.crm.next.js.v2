"use client";

import Link from "next/link";

import { useCRMStore, type Opportunity } from "@/store/crmStore";

export default function OpportunitiesPage() {
  const opportunities = useCRMStore(
    (state) => (state.opportunities || []) as Opportunity[]
  );

  if (!opportunities.length) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Opportunities</h1>
          <p className="mt-2 text-sm text-gray-500">
            No opportunities in the pipeline yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Opportunities</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pipeline view of all open and closed deals.
        </p>
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="py-2">Opportunity</th>
              <th className="py-2">Account</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Stage</th>
              <th className="py-2">Close date</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="align-top">
                <td className="py-2">
                  <div className="font-medium text-gray-900">
                    {opp.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {opp.source} · {opp.segment}
                  </div>
                </td>
                <td className="py-2 text-sm text-gray-700">
                  {(opp as any).accountName || opp.accountId}
                </td>
                <td className="py-2 text-sm text-gray-700">
                  €{opp.amount}
                </td>
                <td className="py-2 text-sm">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                    {opp.stage}
                  </span>
                </td>
                <td className="py-2 text-sm text-gray-700">
                  {opp.closeDate}
                </td>
                <td className="py-2 text-right text-xs">
                  <Link
                    href={`/crm/opportunities/${opp.id}`}
                    className="rounded-full border px-3 py-1 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
