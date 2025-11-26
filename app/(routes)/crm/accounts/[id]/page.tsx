import { AccountDetailClient } from './_components/AccountDetailClient';

type AccountDetailPageProps = {
  params: {
    id: string;
  };
};

export default function AccountDetailPage({ params }: AccountDetailPageProps) {
  return <AccountDetailClient accountId={params.id} />;
}
