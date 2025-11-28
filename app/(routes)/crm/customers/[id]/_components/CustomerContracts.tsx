import { Card } from "@/app/components/shared/ui";
import type { CustomerType } from "@/app/(routes)/crm/customers/_types";

type Props = {
  customer: CustomerType;
};

export function CustomerContracts({ customer }: Props) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">Contracts</h2>
      <p className="text-sm text-slate-500">
        No contracts available yet.
      </p>
    </Card>
  );
}
