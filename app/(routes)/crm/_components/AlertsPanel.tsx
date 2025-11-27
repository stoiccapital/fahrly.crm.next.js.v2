"use client";

import { AlertItem } from "../_types";
import { Card, Badge } from "@/app/components/shared/ui";

type Props = {
  alerts: AlertItem[];
};

export function AlertsPanel({ alerts }: Props) {
  return (
    <Card className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Alerts</h2>
        <span className="text-xs text-gray-500">
          {alerts.length} open signals
        </span>
      </div>
      <div className="space-y-2 text-xs">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between gap-3 rounded-xl bg-gray-50 p-3"
          >
            <div>
              <div className="mb-0.5 flex items-center gap-2">
                <span className="font-medium text-gray-800">
                  {alert.title}
                </span>
                <SeverityBadge severity={alert.severity} />
              </div>
              <div className="text-gray-500">{alert.description}</div>
            </div>
            <div className="shrink-0 text-[10px] text-gray-400">
              {alert.createdAt}
            </div>
          </div>
        ))}
        {!alerts.length && (
          <div className="rounded-xl bg-gray-50 p-3 text-center text-xs text-gray-500">
            No active alerts. Focus on building.
          </div>
        )}
      </div>
    </Card>
  );
}

function SeverityBadge({ severity }: { severity: AlertItem["severity"] }) {
  const label =
    severity === "critical"
      ? "Critical"
      : severity === "warning"
      ? "Warning"
      : "Info";

  const className =
    severity === "critical"
      ? "bg-red-100 text-red-700"
      : severity === "warning"
      ? "bg-amber-100 text-amber-700"
      : "bg-gray-100 text-gray-700";

  return (
    <Badge className={`text-[10px] ${className}`}>
      {label}
    </Badge>
  );
}

