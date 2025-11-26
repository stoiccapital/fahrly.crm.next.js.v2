import { Lead } from "../_types";

export const mockLeads: Lead[] = [
  {
    id: "lead_1",
    companyName: "Müller Taxi GmbH",
    contactName: "Max Müller",
    contactEmail: "max.mueller@mueller-taxi.de",
    contactPhone: "+49 171 1234567",
    source: "outbound",
    status: "contacted",
    leadType: "taxi",
    estimatedFleetSize: 25,
    country: "DE",
    city: "Berlin",
    owner: "Anh Chu",
    createdAt: "2025-11-20T09:15:00.000Z",
    notes: "Interested in Fahrly for dispatch + driver app."
  },
  {
    id: "lead_2",
    companyName: "City Shuttle AG",
    contactName: "Laura Steiner",
    contactEmail: "laura.steiner@cityshuttle.ch",
    source: "referral",
    status: "new",
    leadType: "bus",
    estimatedFleetSize: 40,
    country: "CH",
    city: "Zürich",
    owner: "Anh Chu",
    createdAt: "2025-11-22T13:30:00.000Z",
    notes: "Referred by existing customer."
  },
  {
    id: "lead_3",
    companyName: "RideNow Services",
    contactName: "Jonas Becker",
    contactEmail: "jonas.becker@ridenow.eu",
    source: "inbound",
    status: "qualified",
    leadType: "fleet",
    estimatedFleetSize: 120,
    country: "DE",
    city: "Hamburg",
    owner: "Anh Chu",
    createdAt: "2025-11-18T16:45:00.000Z",
    notes: "ICP fit. Wants pricing for 100–150 vehicles."
  },
  {
    id: "lead_4",
    companyName: "Airport Shuttle Köln",
    contactName: "Sabine Kraus",
    contactEmail: "s.kraus@airportshuttle.koeln",
    source: "event",
    status: "disqualified",
    leadType: "other",
    estimatedFleetSize: 4,
    country: "DE",
    city: "Köln",
    owner: "Anh Chu",
    createdAt: "2025-11-10T11:00:00.000Z",
    notes: "Too small for now (<5 vehicles)."
  }
];
