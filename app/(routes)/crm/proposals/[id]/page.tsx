import { ProposalDetailClient } from "./_components/ProposalDetailClient";

export default function ProposalPage({ params }: { params: { id: string } }) {
  return <ProposalDetailClient id={params.id} />;
}
