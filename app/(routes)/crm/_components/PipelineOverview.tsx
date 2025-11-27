"use client";

import { PipelineOverviewMetrics } from "../_types";
import { Card, Badge } from "@/app/components/shared/ui";

type Props = {
  metrics: PipelineOverviewMetrics;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export function PipelineOverview({ metrics }: Props) {
  return (
    <Card className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold">Sales pipeline</h2>
          <p className="text-xs text-gray-500">
            Probability-weighted pipeline and funnel health.
          </p>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div>
            Weighted pipeline:{" "}
            <span className="font-semibold">
              {formatCurrency(metrics.totalWeightedPipeline)}
            </span>
          </div>
          <div>
            Closing this month:{" "}
            <span className="font-semibold">
              {formatCurrency(metrics.closingThisMonth)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {metrics.stages.map((stage) => {
          const weighted = stage.amount * stage.probability;
          return (
            <div
              key={stage.key}
              className="flex flex-col rounded-xl border bg-gray-50 p-3 text-xs"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  {stage.label}
                </span>
                <Badge className="text-[10px]">
                  {Math.round(stage.probability * 100)}%
                </Badge>
              </div>
              <div className="text-[11px] text-gray-500">
                {stage.count} deals
              </div>
              <div className="mt-1 text-[11px] text-gray-500">
                Raw:{" "}
                <span className="font-semibold">
                  {formatCurrency(stage.amount)}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-gray-500">
                Weighted:{" "}
                <span className="font-semibold">
                  {formatCurrency(weighted)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>
          New leads this month:{" "}
          <span className="font-semibold">
            {metrics.newLeadsThisMonth}
          </span>
        </div>
        <div>
          New trials this month:{" "}
          <span className="font-semibold">
            {metrics.newTrialsThisMonth}
          </span>
        </div>
      </div>
    </Card>
  );
}

