import { CustomerDetailClient } from "./_components/CustomerDetailClient";

type PageProps = {
  params: { id: string };
};

export default function CustomerPage({ params }: PageProps) {
  return <CustomerDetailClient customerId={params.id} />;
}
