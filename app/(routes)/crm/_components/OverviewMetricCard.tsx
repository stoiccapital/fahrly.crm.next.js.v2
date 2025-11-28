"use client";

import { Card } from "@/app/components/shared/ui";
import { cn } from "@/lib/utils";

type OverviewMetricCardProps = {
  label: string;
  value: string;
  helperText?: string;
  trendLabel?: string;
  trendValue?: string;
  trendDirection?: "up" | "down" | "neutral";
};

export function OverviewMetricCard({
  label,
  value,
  helperText,
  trendLabel,
  trendValue,
  trendDirection = "neutral",
}: OverviewMetricCardProps) {
  const trendColorClass =
    trendDirection === "up"
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
      : trendDirection === "down"
      ? "border-rose-100 bg-rose-50 text-rose-700"
      : "border-slate-200 bg-slate-100 text-slate-700";

  const trendClasses = cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
    trendColorClass
  );

  return (
    <Card className="h-full overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              {label}
            </p>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {value}
            </p>
          </div>
          {trendLabel && trendValue && (
            <span className={trendClasses}>
              <span className="mr-1">{trendValue}</span>
              <span className="text-slate-500">{trendLabel}</span>
            </span>
          )}
        </div>
        {helperText && (
          <p className="text-xs leading-snug text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    </Card>
  );
}

