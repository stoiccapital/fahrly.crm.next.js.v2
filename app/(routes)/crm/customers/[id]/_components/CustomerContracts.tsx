import type { CustomerType } from "@/app/(routes)/crm/customers/_types";
import { Card } from "@/app/components/shared/ui";

type Props = {
  customer: CustomerType;
};

export function CustomerContracts({ customer }: Props) {
  return (
    <Card className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Contracts</h2>
      <div className="text-sm text-gray-500">
        No contracts available yet.
      </div>
    </Card>
  );
}

