"use client";

import { ReliabilityMetrics } from "../_types";
import { Card } from "@/app/components/shared/ui";

type Props = {
  metrics: ReliabilityMetrics;
};

export function ProductReliabilityPanel({ metrics }: Props) {
  return (
    <Card className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-base font-semibold">Reliability</h2>
        <p className="text-xs text-gray-500">
          Uptime, incidents, and sync stability.
        </p>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">API uptime</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.apiUptimePercent.toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">App uptime</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.appUptimePercent.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Incidents this month</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.incidentsThisMonth}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Sync failures (24h)</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.syncFailuresLast24h}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Error rate:{" "}
        <span className="font-semibold">
          {metrics.errorRatePerMillion} / 1M requests
        </span>
      </div>
    </Card>
  );
}

