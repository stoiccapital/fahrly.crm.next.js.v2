// lib/mocks/crm/mockOpportunities.ts

export type MockOpportunity = {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  amount: number;
  currency?: string;
  probability: number;
  closeDate?: string;
};

export const mockOpportunities: MockOpportunity[] = [
  {
    id: "opp-1",
    name: "Alpha Taxi – 50 vehicles rollout",
    accountId: "acc-alpha-taxi",
    stage: "Proposal",
    amount: 24000,
    currency: "EUR",
    probability: 60,
    closeDate: "30.11.2025",
  },
  {
    id: "opp-2",
    name: "CityRide – pilot 25 vehicles",
    accountId: "acc-cityride",
    stage: "Trial",
    amount: 12500,
    currency: "EUR",
    probability: 40,
    closeDate: "15.12.2025",
  },
  {
    id: "opp-3",
    name: "Express Shuttle – renewal",
    accountId: "acc-express-shuttle",
    stage: "Decision",
    amount: 9000,
    currency: "CHF",
    probability: 50,
    closeDate: "20.12.2025",
  },
];

