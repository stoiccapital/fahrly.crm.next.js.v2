import OpportunityDetailClient from "./_components/OpportunityDetailClient";

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  return <OpportunityDetailClient id={params.id} />;
}
