"use client";

import { useState } from "react";

import { ProposalHeader } from "./ProposalHeader";

import { ProposalEditor } from "./ProposalEditor";

import { ProposalSummary } from "./ProposalSummary";

import { ProposalSignaturePaymentPanel } from "./ProposalSignaturePaymentPanel";

import type { ProposalType, ProposalStatus } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  opportunity: any | null;
  account: any | null;
  contact: any | null;
};

type ContractLinksState = {
  docuSealUrl?: string;
  stripePaymentUrl?: string;
};

export function ProposalDetailClient({
  proposal,
  opportunity,
  account,
  contact,
}: Props) {
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
    <div className="space-y-4 p-4 md:p-6">
      <ProposalHeader
        proposal={proposalState}
        opportunity={opportunity}
        account={account}
        onStatusChange={handleStatusChange}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ProposalEditor proposal={proposalState} onChange={setProposalState} />

        <div className="space-y-4">
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

