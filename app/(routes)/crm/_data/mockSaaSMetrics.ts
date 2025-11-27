import { SaaSOverviewMetrics } from "../_types";

export const mockSaaSMetrics: SaaSOverviewMetrics = {
  companyPulse: {
    mrr: 78000,
    netNewMrr: 5200,
    churnRate: 0.9,
    nrr: 118,
    activeCustomers: 612,
  },
  pipeline: {
    stages: [
      {
        key: "qualified",
        label: "Qualified",
        count: 38,
        amount: 15000,
        probability: 0.1,
      },
      {
        key: "trial",
        label: "Trial",
        count: 24,
        amount: 24000,
        probability: 0.3,
      },
      {
        key: "decision",
        label: "Decision",
        count: 12,
        amount: 28000,
        probability: 0.5,
      },
      {
        key: "proposal",
        label: "Proposal",
        count: 8,
        amount: 36000,
        probability: 0.9,
      },
      {
        key: "closedWon",
        label: "Closed Won",
        count: 6,
        amount: 18000,
        probability: 1,
      },
    ],
    // hard-coded for now based on above
    totalWeightedPipeline:
      15000 * 0.1 + 24000 * 0.3 + 28000 * 0.5 + 36000 * 0.9 + 18000 * 1,
    closingThisMonth: 42000,
    newLeadsThisMonth: 62,
    newTrialsThisMonth: 19,
  },
  customerHealth: {
    active7dPercent: 86,
    active30dPercent: 94,
    atRiskCustomers: 27,
    healthyCustomers: 545,
    moduleUsage: [
      { module: "Trips", percent: 91 },
      { module: "Drivers", percent: 84 },
      { module: "Maintenance", percent: 67 },
      { module: "CRM", percent: 58 },
      { module: "Documents", percent: 72 },
      { module: "Dashcams", percent: 49 },
    ],
  },
  support: {
    openTickets: 14,
    ticketsThisWeek: 63,
    avgResponseTimeMinutes: 11,
    avgResolutionTimeHours: 4.3,
    slaBreachesThisWeek: 1,
    topIssueTags: [
      { tag: "Onboarding", count: 14 },
      { tag: "Integrations", count: 11 },
      { tag: "Billing", count: 7 },
      { tag: "Sync delays", count: 6 },
    ],
  },
  reliability: {
    apiUptimePercent: 99.97,
    appUptimePercent: 99.94,
    incidentsThisMonth: 1,
    syncFailuresLast24h: 3,
    errorRatePerMillion: 7,
  },
  revenue: {
    series: [
      { month: "Jan", mrr: 52000, newMrr: 4000, churnMrr: 800 },
      { month: "Feb", mrr: 56000, newMrr: 4500, churnMrr: 900 },
      { month: "Mar", mrr: 60000, newMrr: 4800, churnMrr: 1000 },
      { month: "Apr", mrr: 65000, newMrr: 5200, churnMrr: 1100 },
      { month: "May", mrr: 70000, newMrr: 5400, churnMrr: 1200 },
      { month: "Jun", mrr: 78000, newMrr: 6200, churnMrr: 1300 },
    ],
  },
  alerts: [
    {
      id: "a1",
      title: "Key customer at risk",
      description: "Top 20 account: usage down 43% in the last 14 days.",
      severity: "critical",
      createdAt: "2h ago",
    },
    {
      id: "a2",
      title: "Spike in sync failures",
      description: "Webfleet integration error rate up 3× vs. last week.",
      severity: "warning",
      createdAt: "5h ago",
    },
    {
      id: "a3",
      title: "Churn cluster detected",
      description: "3 SMB customers churned in the same region.",
      severity: "warning",
      createdAt: "yesterday",
    },
    {
      id: "a4",
      title: "NRR slightly down",
      description: "Net Revenue Retention dropped from 121% → 118%.",
      severity: "info",
      createdAt: "2 days ago",
    },
  ],
  activity: [
    {
      id: "ac1",
      type: "deal_won",
      title: "Closed Won: FleetX Mobility",
      description: "€1,800 MRR • 65 vehicles • Full Fahrly suite.",
      timeAgo: "30 min ago",
    },
    {
      id: "ac2",
      type: "signup",
      title: "New signup: CityCab Berlin",
      description: "Trial started • Expected conversion in 21 days.",
      timeAgo: "1 h ago",
    },
    {
      id: "ac3",
      type: "ticket_opened",
      title: "Priority ticket from MoveNow",
      description: "Dashcam data delay reported by operations lead.",
      timeAgo: "3 h ago",
    },
    {
      id: "ac4",
      type: "usage_spike",
      title: "Usage spike: RheinTaxi Group",
      description: "+38% trips this week • upsell opportunity.",
      timeAgo: "5 h ago",
    },
    {
      id: "ac5",
      type: "churn",
      title: "Churn: SmallTaxi24",
      description: "€120 MRR lost • reason: switched to competitor.",
      timeAgo: "yesterday",
    },
  ],
};

