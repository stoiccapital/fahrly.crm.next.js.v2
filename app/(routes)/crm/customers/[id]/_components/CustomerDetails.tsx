import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

type Props = {
  customer: CustomerType;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

function DetailRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-sm text-gray-900">{value || "—"}</span>
    </div>
  );
}

export function CustomerDetails({ customer }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Details</h2>
      <div className="grid gap-4 text-sm md:grid-cols-2">
        <DetailRow label="Company Name" value={customer.companyName} />
        {customer.legalCompanyName && (
          <DetailRow label="Legal Name" value={customer.legalCompanyName} />
        )}
        <DetailRow label="Status" value={customer.status} />
        <DetailRow label="Lifecycle Stage" value={customer.lifecycleStage} />
        <DetailRow label="Website" value={customer.website} />
        <DetailRow label="Tax ID" value={customer.taxId} />
        {customer.street && (
          <DetailRow
            label="Address"
            value={`${customer.street}, ${customer.zipCode || ""} ${customer.city || ""}`.trim()}
          />
        )}
        <DetailRow label="Country" value={customer.country} />
        <DetailRow label="Fleet Size" value={customer.fleetSizeEstimate?.toString()} />
        <DetailRow label="Owner" value={customer.owner} />
        <DetailRow label="Source" value={customer.source} />
        <DetailRow
          label="Customer Since"
          value={customer.customerSince ? formatDate(customer.customerSince) : undefined}
        />
        <DetailRow label="Created" value={formatDate(customer.createdAt)} />
      </div>
      {customer.summary && (
        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Summary
          </div>
          <p className="mt-1 text-sm text-gray-700">{customer.summary}</p>
        </div>
      )}
    </div>
  );
}

