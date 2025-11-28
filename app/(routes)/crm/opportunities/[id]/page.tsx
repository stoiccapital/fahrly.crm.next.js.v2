import OpportunityDetailClient from "./_components/OpportunityDetailClient";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return <OpportunityDetailClient id={params.id} />;
}
