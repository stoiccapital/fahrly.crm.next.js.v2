// lib/mocks/crm/mockCustomers.ts

export type MockCustomer = {
  id: string;
  accountId: string;
  name: string;
  status: string;
  plan?: string;
  mrr?: number;
  since?: string;
};

export const mockCustomers: MockCustomer[] = [
  {
    id: "cust-alpha-taxi",
    accountId: "acc-alpha-taxi",
    name: "Alpha Taxi GmbH",
    status: "Active",
    plan: "Pro",
    mrr: 1200,
    since: "01.03.2024",
  },
  {
    id: "cust-cityride",
    accountId: "acc-cityride",
    name: "CityRide Berlin",
    status: "Active",
    plan: "Business",
    mrr: 2300,
    since: "15.01.2024",
  },
  {
    id: "cust-express-shuttle",
    accountId: "acc-express-shuttle",
    name: "Express Shuttle AG",
    status: "Churn risk",
    plan: "Starter",
    mrr: 800,
    since: "10.11.2023",
  },
];

