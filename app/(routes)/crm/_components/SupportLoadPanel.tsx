"use client";

import { SupportMetrics } from "../_types";
import { Card, Badge } from "@/app/components/shared/ui";

type Props = {
  metrics: SupportMetrics;
};

export function SupportLoadPanel({ metrics }: Props) {
  const loadLabel =
    metrics.openTickets <= 10
      ? "Low load"
      : metrics.openTickets <= 25
      ? "Healthy"
      : "High load";

  return (
    <Card className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Support load</h2>
          <p className="text-xs text-gray-500">
            Tickets, response times, and SLA health.
          </p>
        </div>
        <Badge className="text-[10px]">{loadLabel}</Badge>
      </div>
      <div className="mb-3 grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Open tickets</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.openTickets}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Tickets this week</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.ticketsThisWeek}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">SLA breaches</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.slaBreachesThisWeek}
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Avg response</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.avgResponseTimeMinutes} min
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-gray-500">Avg resolution</div>
          <div className="mt-1 text-lg font-semibold">
            {metrics.avgResolutionTimeHours.toFixed(1)} h
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Top issues:
        <div className="mt-1 flex flex-wrap gap-1.5">
          {metrics.topIssueTags.map((tag) => (
            <Badge key={tag.tag} className="bg-gray-100 text-[10px]">
              {tag.tag} • {tag.count}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

