"use client";

import { CustomerHealthMetrics } from "../_types";
import { Card, Badge } from "@/app/components/shared/ui";

type Props = {
  metrics: CustomerHealthMetrics;
};

export function CustomerHealthPanel({ metrics }: Props) {
  return (
    <Card className="flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Customer health</h2>
          <p className="text-xs text-gray-500">
            Activation, retention, and module penetration across 600+ fleets.
          </p>
        </div>
        <Badge className="text-[10px]">
          {metrics.active7dPercent}% active / 7d
        </Badge>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Active last 30 days</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.active30dPercent}%
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Healthy vs at risk</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.healthyCustomers}
            <span className="text-xs text-gray-500"> healthy</span>
          </div>
          <div className="text-xs text-red-500">
            {metrics.atRiskCustomers} flagged at risk
          </div>
        </div>
      </div>
      <div className="mb-2 text-xs font-medium text-gray-700">
        Module adoption
      </div>
      <div className="space-y-2">
        {metrics.moduleUsage.map((m) => (
          <div key={m.module} className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{m.module}</span>
              <span className="text-gray-500">{m.percent}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-1.5 rounded-full bg-gray-800"
                style={{ width: `${m.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

