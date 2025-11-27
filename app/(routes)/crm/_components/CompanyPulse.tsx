"use client";

import { CompanyPulseMetrics } from "../_types";
import { Card } from "@/app/components/shared/ui";

type Props = {
  metrics: CompanyPulseMetrics;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export function CompanyPulse({ metrics }: Props) {
  const items = [
    {
      label: "MRR",
      value: formatCurrency(metrics.mrr),
      helper: "Current Monthly Recurring Revenue",
    },
    {
      label: "Net new MRR",
      value: formatCurrency(metrics.netNewMrr),
      helper: "This month vs last month",
    },
    {
      label: "Churn",
      value: `${metrics.churnRate.toFixed(1)}%`,
      helper: "Monthly revenue churn",
    },
    {
      label: "NRR",
      value: `${metrics.nrr.toFixed(0)}%`,
      helper: "Net Revenue Retention",
    },
    {
      label: "Active customers",
      value: metrics.activeCustomers.toString(),
      helper: "Paying logos",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => (
        <Card
          key={item.label}
          className="flex flex-col justify-between rounded-2xl border bg-white p-4 shadow-sm"
        >
          <div className="text-sm text-gray-500">{item.label}</div>
          <div className="mt-2 text-xl font-semibold">{item.value}</div>
          <div className="mt-1 text-xs text-gray-400">{item.helper}</div>
        </Card>
      ))}
    </div>
  );
}

