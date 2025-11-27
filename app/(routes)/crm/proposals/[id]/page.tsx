import { notFound } from "next/navigation";

import { ProposalDetailClient } from "./_components/ProposalDetailClient";

import { mockProposals } from "@/app/(routes)/crm/proposals/_data/mockProposals";

import { mockOpportunities } from "@/app/(routes)/crm/opportunities/_data/mockOpportunities";

import { mockAccounts } from "@/app/(routes)/crm/accounts/_data/mockAccounts";

import { mockContacts } from "@/app/(routes)/crm/accounts/_data/mockContacts";

import type { ProposalType } from "@/app/(routes)/crm/proposals/_types";

type PageProps = {
  params: {
    id: string;
  };
};

function findProposalById(id: string): ProposalType | undefined {
  return mockProposals.find((p) => p.id === id);
}

export default function ProposalPage({ params }: PageProps) {
  const proposal = findProposalById(params.id);

  if (!proposal) {
    notFound();
  }

  const opportunity =
    mockOpportunities.find((o: any) => o.id === proposal.opportunityId) ?? null;

  const account =
    mockAccounts.find((a: any) => a.id === proposal.accountId) ?? null;

  const contact =
    proposal.contactId != null
      ? mockContacts.find((c: any) => c.id === proposal.contactId) ?? null
      : null;

  return (
    <ProposalDetailClient
      proposal={proposal}
      opportunity={opportunity}
      account={account}
      contact={contact}
    />
  );
}
