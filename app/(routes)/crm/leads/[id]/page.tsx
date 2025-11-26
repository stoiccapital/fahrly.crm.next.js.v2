import { LeadDetailClient } from './_components/LeadDetailClient';

type LeadDetailPageProps = {
  params: {
    id: string;
  };
};

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  return <LeadDetailClient leadId={params.id} />;
}

