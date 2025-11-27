"use client";

import { RevenueAnalytics } from "../_types";
import { Card } from "@/app/components/shared/ui";

type Props = {
  analytics: RevenueAnalytics;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export function RevenueChart({ analytics }: Props) {
  const points = analytics.series;

  if (!points.length) {
    return (
      <Card className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold">MRR trend</h2>
        <p className="mt-1 text-xs text-gray-500">
          No data available yet.
        </p>
      </Card>
    );
  }

  const maxMrr = Math.max(...points.map((p) => p.mrr)) || 1;
  const width = 260;
  const height = 80;
  const stepX = width / Math.max(points.length - 1, 1);
  const linePath = points
    .map((p, idx) => {
      const x = idx * stepX;
      const y = height - (p.mrr / maxMrr) * height;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <Card className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">MRR trend</h2>
          <p className="text-xs text-gray-500">
            Monthly recurring revenue over the last months.
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-24 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-gray-800"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex justify-between gap-4">
            <span>Last month MRR</span>
            <span className="font-semibold">
              {formatCurrency(points[points.length - 1]?.mrr ?? 0)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Avg new MRR</span>
            <span className="font-semibold">
              {formatCurrency(
                points.reduce((acc, p) => acc + p.newMrr, 0) /
                  points.length,
              )}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Avg churn MRR</span>
            <span className="font-semibold text-red-500">
              −
              {formatCurrency(
                points.reduce((acc, p) => acc + p.churnMrr, 0) /
                  points.length,
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-gray-400">
        {points.map((p) => (
          <span key={p.month}>{p.month}</span>
        ))}
      </div>
    </Card>
  );
}

