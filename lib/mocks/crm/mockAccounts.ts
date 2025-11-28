// lib/mocks/crm/mockAccounts.ts

export type MockAccount = {
  id: string;
  name: string;
  industry?: string;
  city?: string;
  mrr?: number;
};

export const mockAccounts: MockAccount[] = [
  {
    id: "acc-alpha-taxi",
    name: "Alpha Taxi GmbH",
    industry: "Taxi / Ride-hailing",
    city: "Berlin",
    mrr: 1200,
  },
  {
    id: "acc-cityride",
    name: "CityRide Berlin",
    industry: "Taxi / Shuttle",
    city: "Berlin",
    mrr: 2300,
  },
  {
    id: "acc-express-shuttle",
    name: "Express Shuttle AG",
    industry: "Airport shuttle",
    city: "Zürich",
    mrr: 800,
  },
];

