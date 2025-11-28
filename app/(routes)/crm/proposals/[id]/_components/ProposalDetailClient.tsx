"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, Button } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";

import { ProposalHeader } from "./ProposalHeader";
import { ProposalEditor } from "./ProposalEditor";
import { ProposalSummary } from "./ProposalSummary";
import { ProposalSignaturePaymentPanel } from "./ProposalSignaturePaymentPanel";

import type { ProposalType, ProposalStatus } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  id: string;
};

type ContractLinksState = {
  docuSealUrl?: string;
  stripePaymentUrl?: string;
};

export function ProposalDetailClient({ id }: Props) {
  const router = useRouter();
  const { proposals, opportunities, accounts, contacts } = useCRMStore();

  const proposal = proposals?.find((p) => p.id === id);

  if (!proposal) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <p className="text-sm text-slate-500">
            Proposal not found. It may have been deleted.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/crm/proposals")}
            className="mt-3"
          >
            Back to proposals
          </Button>
        </Card>
      </div>
    );
  }

  const opportunity = opportunities?.find((o) => o.id === proposal.opportunityId) ?? null;
  const account = accounts?.find((a) => a.id === proposal.accountId) ?? null;
  const contact = proposal.contactId
    ? contacts?.find((c) => c.id === proposal.contactId) ?? null
    : null;

  const [proposalState, setProposalState] = useState<ProposalType>(proposal);

  const [contractLinks, setContractLinks] = useState<ContractLinksState>({});

  const handleStatusChange = (status: ProposalStatus) => {
    setProposalState((prev) => ({
      ...prev,
      status,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Mock generators for now – later you will call your backend
  const handleGenerateDocuSeal = () => {
    // In production, this would be a response from your backend (DocuSeal API)
    const url = `https://app.docuseal.com/sign/${encodeURIComponent(
      proposalState.id
    )}`;
    setContractLinks((prev) => ({ ...prev, docuSealUrl: url }));
  };

  const handleGenerateStripeLink = () => {
    // In production, this would be a response from your backend (Stripe API)
    const url = `https://checkout.stripe.com/pay/${encodeURIComponent(
      proposalState.id
    )}`;
    setContractLinks((prev) => ({ ...prev, stripePaymentUrl: url }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ProposalHeader
        proposal={proposalState}
        opportunity={opportunity}
        account={account}
        onStatusChange={handleStatusChange}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr,1.5fr] lg:items-start">
        <ProposalEditor proposal={proposalState} onChange={setProposalState} />

        <div className="space-y-6">
          <ProposalSummary
            proposal={proposalState}
            opportunity={opportunity}
            account={account}
            contact={contact}
          />

          <ProposalSignaturePaymentPanel
            proposal={proposalState}
            docuSealUrl={contractLinks.docuSealUrl}
            stripePaymentUrl={contractLinks.stripePaymentUrl}
            onGenerateDocuSeal={handleGenerateDocuSeal}
            onGenerateStripeLink={handleGenerateStripeLink}
          />
        </div>
      </div>
    </div>
  );
}
