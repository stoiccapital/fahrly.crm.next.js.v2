import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

type Props = {
  customer: CustomerType;
};

export function CustomerHeader({ customer }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {customer.companyName}
        </h1>
        {customer.legalCompanyName && customer.legalCompanyName !== customer.companyName && (
          <p className="mt-1 text-sm text-gray-500">
            {customer.legalCompanyName}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-xs font-medium text-green-700">
          Customer
        </span>
        {customer.customerSince && (
          <span className="text-xs text-gray-500">
            Since {new Date(customer.customerSince).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

