import CustomerDetailClient from "./_components/CustomerDetailClient";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return <CustomerDetailClient id={params.id} />;
}
