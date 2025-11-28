"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Badge, Button } from "@/app/components/shared/ui";

import type { ProposalStatus, ProposalType } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  opportunity: any | null;
  account: any | null;
  onStatusChange: (status: ProposalStatus) => void;
};

function getStatusVariant(status: ProposalStatus) {
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

export function ProposalHeader({ proposal, opportunity, account, onStatusChange }: Props) {
  const router = useRouter();

  const accountName: string = account?.name ?? account?.companyName ?? "Unknown account";

  const opportunityName: string =
    opportunity?.name ?? opportunity?.title ?? "Linked opportunity";

  const handleBack = () => {
    if (proposal.opportunityId) {
      router.push(`/crm/opportunities/${proposal.opportunityId}`);
    } else {
      router.push("/crm/opportunities");
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          {proposal.title || "Proposal"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {accountName}
          {opportunityName && ` • ${opportunityName}`}
          {opportunity?.stage && ` • ${String(opportunity.stage)}`}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={getStatusVariant(proposal.status) as any}>
          {proposal.status}
        </Badge>
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
    </div>
  );
}
