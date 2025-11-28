import { Card } from "@/app/components/shared/ui";
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
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-sm text-slate-700">{value || "—"}</p>
    </div>
  );
}

export function CustomerDetails({ customer }: Props) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">Details</h2>
      <div className="grid gap-4 text-sm sm:grid-cols-2">
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
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
            Summary
          </p>
          <p className="text-sm text-slate-700">{customer.summary}</p>
        </div>
      )}
    </Card>
  );
}
