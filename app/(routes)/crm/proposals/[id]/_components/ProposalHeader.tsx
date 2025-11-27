"use client";

import { useMemo } from "react";

import { useRouter } from "next/navigation";

import { Badge, Button, Card } from "@/app/components/shared/ui";

import type { ProposalStatus, ProposalType } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  opportunity: any | null;
  account: any | null;
  onStatusChange: (status: ProposalStatus) => void;
};

const statusLabel: Record<ProposalStatus, string> = {
  Draft: "Draft",
  Sent: "Sent to customer",
  Accepted: "Accepted",
  Rejected: "Rejected",
};

const statusClassName: Record<ProposalStatus, string> = {
  Draft: "bg-slate-100 text-slate-800",
  Sent: "bg-blue-100 text-blue-800",
  Accepted: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
};

export function ProposalHeader({ proposal, opportunity, account, onStatusChange }: Props) {
  const router = useRouter();

  const accountName: string = account?.name ?? account?.companyName ?? "Unknown account";

  const opportunityName: string =
    opportunity?.name ?? opportunity?.title ?? "Linked opportunity";

  const statusBadge = useMemo(
    () => ({
      label: statusLabel[proposal.status],
      className: statusClassName[proposal.status],
    }),
    [proposal.status]
  );

  const handleBack = () => {
    if (proposal.opportunityId) {
      router.push(`/crm/opportunities/${proposal.opportunityId}`);
    } else {
      router.push("/crm/opportunities");
    }
  };

  return (
    <Card className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-semibold md:text-xl">
            {proposal.title || "Proposal"}
          </h1>
          <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="truncate">
            Account: <span className="font-medium text-slate-900">{accountName}</span>
          </span>
          <span className="hidden text-slate-300 md:inline">•</span>
          <span className="truncate">
            Opportunity:{" "}
            <span className="font-medium text-slate-900">{opportunityName}</span>
          </span>
          {opportunity?.stage && (
            <>
              <span className="hidden text-slate-300 md:inline">•</span>
              <span className="truncate">
                Stage:{" "}
                <span className="font-medium text-slate-900">
                  {String(opportunity.stage)}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm" onClick={handleBack}>
          Back to Opportunity
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onStatusChange("Sent")}
          disabled={proposal.status === "Sent"}
        >
          Mark as Sent
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onStatusChange("Accepted")}
          disabled={proposal.status === "Accepted"}
        >
          Mark as Accepted
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onStatusChange("Rejected")}
          disabled={proposal.status === "Rejected"}
        >
          Mark as Rejected
        </Button>
      </div>
    </Card>
  );
}

