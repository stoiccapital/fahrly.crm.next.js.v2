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

function getStatusVariant(status: ProposalType["status"]) {
  switch (status) {
    case "Accepted":
      return "success";
    case "Rejected":
      return "danger";
    case "Sent":
      return "warning";
    default:
      return "default";
  }
}

export function ProposalSummary({ proposal, opportunity, account, contact }: Props) {
  const accountName: string = account?.name ?? account?.companyName ?? "Unknown account";

  const contactName: string =
    contact?.name ?? contact?.fullName ?? contact?.firstName ?? "No primary contact";

  const contactEmail: string | undefined = contact?.email ?? contact?.primaryEmail;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Proposal Summary</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
              Status
            </p>
            <Badge variant={getStatusVariant(proposal.status) as any}>
              {proposal.status}
            </Badge>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
              Total amount
            </p>
            <p className="text-sm text-slate-700">
              {formatCurrency(proposal.amount, proposal.currency)}
            </p>
          </div>
          {proposal.startDate && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Start date
              </p>
              <p className="text-sm text-slate-700">
                {proposal.startDate.slice(0, 10)}
              </p>
            </div>
          )}
          {proposal.endDate && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                End date
              </p>
              <p className="text-sm text-slate-700">{proposal.endDate.slice(0, 10)}</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Account &amp; Contact</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
              Account
            </p>
            <p className="text-sm text-slate-700">{accountName}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
              Primary contact
            </p>
            <p className="text-sm text-slate-700">{contactName}</p>
            {contactEmail && (
              <p className="text-xs text-slate-500 mt-1">{contactEmail}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Linked Opportunity
        </h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
              Opportunity
            </p>
            <p className="text-sm text-slate-700">
              {opportunity?.name ?? opportunity?.title ?? "Unknown opportunity"}
            </p>
          </div>
          {opportunity?.stage && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Stage
              </p>
              <p className="text-sm text-slate-700">{String(opportunity.stage)}</p>
            </div>
          )}
          {opportunity?.closeDate && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
                Close date
              </p>
              <p className="text-sm text-slate-700">
                {String(opportunity.closeDate).slice(0, 10)}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
