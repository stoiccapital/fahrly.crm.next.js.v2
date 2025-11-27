"use client";

import Link from "next/link";

import { Card, Badge, Button } from "@/app/components/shared/ui";

import { mockProposals } from "@/app/(routes)/crm/proposals/_data/mockProposals";

import type { ProposalType } from "@/app/(routes)/crm/proposals/_types";

const statusClassName: Record<ProposalType["status"], string> = {
  Draft: "bg-slate-100 text-slate-800",
  Sent: "bg-blue-100 text-blue-800",
  Accepted: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
};

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("de-DE")} ${currency}`;
  }
}

export function ProposalList() {
  if (!mockProposals.length) {
    return (
      <Card className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">No proposals yet</h2>
        <p className="mt-1 text-sm text-slate-600">
          Create a proposal from an opportunity to see it here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border bg-white p-0 shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h1 className="text-base font-semibold text-slate-900">Proposals</h1>
          <p className="text-xs text-slate-600">
            Overview of all proposals linked to your opportunities.
          </p>
        </div>
        {/* Placeholder for future "New proposal" action */}
        <Button variant="secondary" size="sm" disabled>
          New proposal
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-t text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Currency</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProposals.map((proposal) => (
              <tr
                key={proposal.id}
                className="border-t last:border-b hover:bg-slate-50/60"
              >
                <td className="px-4 py-2 align-middle">
                  <Link
                    href={`/crm/proposals/${proposal.id}`}
                    className="text-sm font-medium text-slate-900 hover:underline"
                  >
                    {proposal.title || "Untitled proposal"}
                  </Link>
                  <div className="text-xs text-slate-500">
                    ID: {proposal.id}
                  </div>
                </td>
                <td className="px-4 py-2 align-middle">
                  <Badge className={statusClassName[proposal.status]}>
                    {proposal.status}
                  </Badge>
                </td>
                <td className="px-4 py-2 align-middle">
                  <span className="font-medium text-slate-900">
                    {formatCurrency(proposal.amount, proposal.currency)}
                  </span>
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {proposal.currency}
                </td>
                <td className="px-4 py-2 align-middle text-right">
                  <Link href={`/crm/proposals/${proposal.id}`}>
                    <Button variant="ghost" size="sm">
                      Open
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

