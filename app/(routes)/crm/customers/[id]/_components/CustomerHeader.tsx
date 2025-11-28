import { Badge } from "@/app/components/shared/ui";
import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

type Props = {
  customer: CustomerType;
};

export function CustomerHeader({ customer }: Props) {
  const sinceLabel = customer.customerSince
    ? new Date(customer.customerSince).toLocaleDateString("de-DE")
    : null;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          {customer.companyName}
        </h1>
        {customer.legalCompanyName && customer.legalCompanyName !== customer.companyName && (
          <p className="mt-1 text-sm text-slate-500">
            {customer.legalCompanyName}
          </p>
        )}
        {sinceLabel && (
          <p className="mt-1 text-sm text-slate-500">
            Customer since {sinceLabel}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success">Customer</Badge>
        {customer.status && (
          <Badge variant="default">{customer.status}</Badge>
        )}
      </div>
    </div>
  );
}
