"use client";

import { SaaSOverviewMetrics } from "../_types";
import { CompanyPulse } from "./CompanyPulse";
import { PipelineOverview } from "./PipelineOverview";
import { CustomerHealthPanel } from "./CustomerHealthPanel";
import { SupportLoadPanel } from "./SupportLoadPanel";
import { ProductReliabilityPanel } from "./ProductReliabilityPanel";
import { RevenueChart } from "./RevenueChart";
import { AlertsPanel } from "./AlertsPanel";
import { ActivityFeed } from "./ActivityFeed";

type Props = {
  metrics: SaaSOverviewMetrics;
};

export default function HomeDashboardClient({ metrics }: Props) {
  return (
    <div className="space-y-6">
      {/* Top: Pulse */}
      <CompanyPulse metrics={metrics.companyPulse} />

      {/* Middle: Pipeline + Revenue + Customer health */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PipelineOverview metrics={metrics.pipeline} />
          <RevenueChart analytics={metrics.revenue} />
        </div>
        <CustomerHealthPanel metrics={metrics.customerHealth} />
      </div>

      {/* Lower: Support + Reliability + Alerts + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            <SupportLoadPanel metrics={metrics.support} />
            <ProductReliabilityPanel metrics={metrics.reliability} />
          </div>
          <AlertsPanel alerts={metrics.alerts} />
        </div>
        <ActivityFeed items={metrics.activity} />
      </div>
    </div>
  );
}

