"use client";

import { Card, Badge } from "@/app/components/shared/ui";

import type { ProposalType } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  opportunity: any | null;
  account: any | null;
  contact: any | null;
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

export function ProposalSummary({ proposal, opportunity, account, contact }: Props) {
  const accountName: string = account?.name ?? account?.companyName ?? "Unknown account";

  const contactName: string =
    contact?.name ?? contact?.fullName ?? contact?.firstName ?? "No primary contact";

  const contactEmail: string | undefined = contact?.email ?? contact?.primaryEmail;

  const statusClassName: string =
    proposal.status === "Accepted"
      ? "bg-emerald-100 text-emerald-800"
      : proposal.status === "Rejected"
      ? "bg-red-100 text-red-800"
      : proposal.status === "Sent"
      ? "bg-blue-100 text-blue-800"
      : "bg-slate-100 text-slate-800";

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Proposal Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Status</span>
            <Badge className={statusClassName}>{proposal.status}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Total amount</span>
            <span className="font-semibold text-slate-900">
              {formatCurrency(proposal.amount, proposal.currency)}
            </span>
          </div>
          {proposal.startDate && (
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Start date</span>
              <span className="text-slate-900">
                {proposal.startDate.slice(0, 10)}
              </span>
            </div>
          )}
          {proposal.endDate && (
            <div className="flex items-center justify-between">
              <span className="text-slate-600">End date</span>
              <span className="text-slate-900">{proposal.endDate.slice(0, 10)}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Account &amp; Contact</h2>
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Account
            </div>
            <div className="text-slate-900">{accountName}</div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Primary contact
            </div>
            <div className="text-slate-900">{contactName}</div>
            {contactEmail && (
              <div className="text-xs text-slate-600">{contactEmail}</div>
            )}
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Linked Opportunity
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Opportunity
            </div>
            <div className="text-slate-900">
              {opportunity?.name ?? opportunity?.title ?? "Unknown opportunity"}
            </div>
          </div>
          {opportunity?.stage && (
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Stage
              </div>
              <div className="text-slate-900">{String(opportunity.stage)}</div>
            </div>
          )}
          {opportunity?.closeDate && (
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Close date
              </div>
              <div className="text-slate-900">
                {String(opportunity.closeDate).slice(0, 10)}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
