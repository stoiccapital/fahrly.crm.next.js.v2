"use client";

import { useCRMStore } from "@/store/crmStore";
import { Card } from "@/app/components/shared/ui";
import { ActivityFeed } from "./ActivityFeed";
import { OverviewMetricCard } from "./OverviewMetricCard";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const formatSignedPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

export default function HomeDashboardClient() {
  const saasMetrics = useCRMStore((state) => state.saasMetrics);
  const opportunities = useCRMStore((state) => state.opportunities || []);
  const tasks = useCRMStore((state) => state.tasks || []);

  if (!saasMetrics) {
    return (
      <Card className="p-6">
        <p className="text-sm text-slate-500">Loading metrics...</p>
      </Card>
    );
  }

  const { companyPulse, pipeline, support } = saasMetrics;

  // Calculate ARR from MRR
  const arr = companyPulse.mrr * 12;

  // Count open opportunities and tasks
  const openOpportunities = opportunities.filter(
    (opp) => opp.stage !== "Closed Won" && opp.stage !== "Closed Lost"
  ).length;

  const openTasks = tasks.filter((task) => task.status !== "Done").length;

  // Calculate MRR trend percentage
  const mrrTrendPercent =
    companyPulse.mrr > 0
      ? (companyPulse.netNewMrr / (companyPulse.mrr - companyPulse.netNewMrr)) *
        100
      : 0;

  // Use pipeline.stages for display (excluding closed won)
  const displayStages = pipeline.stages.filter(
    (s) => s.key !== "closedWon"
  ) as Array<{
    key: string;
    label: string;
    amount: number;
    count: number;
    probability: number;
  }>;

  const totalPipelineAmount = displayStages.reduce(
    (sum, stage) => sum + stage.amount,
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              High-level SaaS, pipeline, and activity metrics across your CRM
              workspace.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Last 30 days
            </span>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 opacity-70" />
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewMetricCard
          label="Monthly recurring revenue"
          value={formatCurrency(companyPulse.mrr)}
          helperText="Core subscription revenue this month."
          trendLabel="vs. last month"
          trendValue={formatSignedPercent(mrrTrendPercent)}
          trendDirection={
            mrrTrendPercent > 0
              ? "up"
              : mrrTrendPercent < 0
                ? "down"
                : "neutral"
          }
        />

        <OverviewMetricCard
          label="Annual recurring revenue"
          value={formatCurrency(arr)}
          helperText="Annualized run rate from current MRR."
        />

        <OverviewMetricCard
          label="Active customers"
          value={companyPulse.activeCustomers.toLocaleString("de-DE")}
          helperText="Accounts with at least one active subscription."
        />

        <OverviewMetricCard
          label="Open pipeline"
          value={formatCurrency(totalPipelineAmount)}
          helperText={`${openOpportunities} opportunities in active stages.`}
        />

        <OverviewMetricCard
          label="Net revenue retention"
          value={`${companyPulse.nrr}%`}
          helperText="Revenue retention including expansion."
          trendDirection={companyPulse.nrr >= 100 ? "up" : "down"}
        />

        <OverviewMetricCard
          label="Open tasks"
          value={openTasks.toString()}
          helperText="Tasks pending completion across all entities."
        />

        <OverviewMetricCard
          label="Churn rate"
          value={`${companyPulse.churnRate}%`}
          helperText="Monthly logo or revenue churn percentage."
          trendDirection={companyPulse.churnRate < 1 ? "up" : "down"}
        />

        <OverviewMetricCard
          label="Open tickets"
          value={support.openTickets.toString()}
          helperText="Support tickets awaiting resolution."
        />
      </section>

      {/* Lower layout: Pipeline + Activity */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          {/* Pipeline snapshot */}
          <Card className="p-5 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Pipeline snapshot
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Opportunities grouped by stage and expected value.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {displayStages.map((stage) => {
                const share =
                  totalPipelineAmount > 0
                    ? (stage.amount / totalPipelineAmount) * 100
                    : 0;
                return (
                  <div key={stage.key} className="flex items-center gap-3">
                    <div className="w-24 text-xs font-medium text-slate-600">
                      {stage.label}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right text-xs text-slate-500">
                      {formatCurrency(stage.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  Weighted pipeline
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatCurrency(pipeline.totalWeightedPipeline)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Notes, tasks, and changes across key deals.
                </p>
              </div>
            </div>
            <ActivityFeed items={saasMetrics.activity} />
          </Card>
        </div>
      </section>
    </div>
  );
}
