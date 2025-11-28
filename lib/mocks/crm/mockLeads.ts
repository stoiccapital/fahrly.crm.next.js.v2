// lib/mocks/crm/mockLeads.ts

export type MockLead = {
  id: string;
  name: string;
  companyName: string;
  status: string;
  source?: string;
  createdAt?: string;
};

export const mockLeads: MockLead[] = [
  {
    id: "lead-1",
    name: "Max Müller",
    companyName: "Alpha Taxi GmbH",
    status: "New",
    source: "Inbound",
    createdAt: "01.11.2025",
  },
  {
    id: "lead-2",
    name: "Sarah Schmidt",
    companyName: "CityRide Berlin",
    status: "Contacted",
    source: "Outbound",
    createdAt: "05.11.2025",
  },
  {
    id: "lead-3",
    name: "Lukas Keller",
    companyName: "Express Shuttle AG",
    status: "Qualified",
    source: "Partner",
    createdAt: "10.11.2025",
  },
];

