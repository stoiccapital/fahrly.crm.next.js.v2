import type { ProposalType, ProposalStatus } from "@/app/(routes)/crm/proposals/_types";

const now = new Date().toISOString();

const makeProposal = (overrides: Partial<ProposalType>): ProposalType => ({
  id: overrides.id ?? "proposal-1",
  opportunityId: overrides.opportunityId ?? "opp-1",
  accountId: overrides.accountId ?? "acc-1",
  contactId: overrides.contactId,
  title: overrides.title ?? "Standard SaaS Subscription",
  amount: overrides.amount ?? 15000,
  currency: overrides.currency ?? "EUR",
  startDate: overrides.startDate,
  endDate: overrides.endDate,
  status: overrides.status ?? ("Draft" as ProposalStatus),
  scopeOfWork:
    overrides.scopeOfWork ??
    "Full access to the Fahrly platform for fleet and driver management, including real-time telematics dashboards and reporting.",
  pricingDetails:
    overrides.pricingDetails ??
    "- 25 vehicles @ 50 EUR/vehicle/month\n- Implementation & onboarding: 2.000 EUR one-time\n- Optional modules available on request.",
  paymentTerms:
    overrides.paymentTerms ??
    "Net 30 days from invoice date. Invoices issued annually in advance.",
  notes:
    overrides.notes ??
    "This proposal is valid for 30 days from the issue date unless otherwise agreed in writing.",
  createdAt: overrides.createdAt ?? now,
  updatedAt: overrides.updatedAt ?? now,
});

export const mockProposals: ProposalType[] = [
  makeProposal({
    id: "proposal-1",
    opportunityId: "opp-1",
    accountId: "acc-1",
    contactId: "contact-uber-ops",
    title: "Proposal – Fahrly Platform – 25 Vehicles",
    amount: 15000,
    currency: "EUR",
    status: "Draft",
  }),
  makeProposal({
    id: "proposal-2",
    opportunityId: "opp-2",
    accountId: "acc-2",
    contactId: "contact-zurich-ceo",
    title: "Proposal – Fahrly Platform – 50 Vehicles",
    amount: 36000,
    currency: "EUR",
    status: "Sent",
  }),
  makeProposal({
    id: "proposal-3",
    opportunityId: "opp-3",
    accountId: "acc-3",
    contactId: "contact-uber-ops",
    title: "Proposal – Fahrly Platform – 15 Vehicles",
    amount: 10800,
    currency: "CHF",
    status: "Accepted",
  }),
];

// NOTE:
// The IDs used above (opp-1, opp-2, opp-3, acc-1, acc-2, acc-3, etc.) are placeholders.
// Align them with the actual IDs defined in your mockOpportunities, mockAccounts,
// and mockContacts data to have everything resolve perfectly.

