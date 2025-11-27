export type PipelineStageKey =
  | "qualified"
  | "trial"
  | "decision"
  | "proposal"
  | "closedWon";

export type CompanyPulseMetrics = {
  mrr: number; // current MRR in €
  netNewMrr: number; // this month
  churnRate: number; // logo or revenue churn %
  nrr: number; // Net Revenue Retention %
  activeCustomers: number;
};

export type PipelineStageSummary = {
  key: PipelineStageKey;
  label: string;
  count: number;
  amount: number; // € value in pipeline
  probability: number; // 0–1
};

export type PipelineOverviewMetrics = {
  stages: PipelineStageSummary[];
  totalWeightedPipeline: number;
  closingThisMonth: number; // € expected close this month
  newLeadsThisMonth: number;
  newTrialsThisMonth: number;
};

export type ModuleUsage = {
  module: string;
  percent: number; // 0–100
};

export type CustomerHealthMetrics = {
  active7dPercent: number;
  active30dPercent: number;
  atRiskCustomers: number;
  healthyCustomers: number;
  moduleUsage: ModuleUsage[];
};

export type SupportMetrics = {
  openTickets: number;
  ticketsThisWeek: number;
  avgResponseTimeMinutes: number;
  avgResolutionTimeHours: number;
  slaBreachesThisWeek: number;
  topIssueTags: {
    tag: string;
    count: number;
  }[];
};

export type ReliabilityMetrics = {
  apiUptimePercent: number;
  appUptimePercent: number;
  incidentsThisMonth: number;
  syncFailuresLast24h: number;
  errorRatePerMillion: number;
};

export type RevenueTimeseriesPoint = {
  month: string; // e.g. "Jan", "2025-01"
  mrr: number;
  newMrr: number;
  churnMrr: number;
};

export type RevenueAnalytics = {
  series: RevenueTimeseriesPoint[];
};

export type AlertSeverity = "critical" | "warning" | "info";

export type AlertItem = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  createdAt: string; // ISO or "2h ago"
};

export type ActivityType =
  | "deal_won"
  | "signup"
  | "churn"
  | "ticket_opened"
  | "usage_spike";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timeAgo: string;
};

export type SaaSOverviewMetrics = {
  companyPulse: CompanyPulseMetrics;
  pipeline: PipelineOverviewMetrics;
  customerHealth: CustomerHealthMetrics;
  support: SupportMetrics;
  reliability: ReliabilityMetrics;
  revenue: RevenueAnalytics;
  alerts: AlertItem[];
  activity: ActivityItem[];
};

