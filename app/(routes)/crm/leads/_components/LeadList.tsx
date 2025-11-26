"use client";

import { useMemo, useState, useEffect } from "react";

import { Lead, LeadStatus } from "../_types";

import { LeadFormModal } from "./LeadFormModal";

type LeadListProps = {
  initialLeads: Lead[];
};

const statusFilters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "disqualified", label: "Disqualified" }
];

function getStatusLabel(status: LeadStatus) {
  switch (status) {
    case "new":
      return "New";
    case "contacted":
      return "Contacted";
    case "qualified":
      return "Qualified";
    case "disqualified":
      return "Disqualified";
    default:
      return status;
  }
}

function getStatusClasses(status: LeadStatus) {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "contacted":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "qualified":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "disqualified":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function LeadList({ initialLeads }: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>(() => initialLeads);

  // Sync with prop changes (e.g., when lead is converted)
  useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = status === "all" || lead.status === status;

      const term = search.trim().toLowerCase();
      if (!term) return matchesStatus;

      const haystack = [
        lead.companyName,
        lead.contactName,
        lead.contactEmail,
        lead.city,
        lead.country,
        lead.owner
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && haystack.includes(term);
    });
  }, [leads, search, status]);

  const hasLeads = filteredLeads.length > 0;

  function handleCreateLead(lead: Lead) {
    setLeads((prev) => [lead, ...prev]);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500">
              Unqualified contacts at the top of your sales funnel.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by company, contact, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
            <button
              type="button"
              onClick={() => setIsNewLeadOpen(true)}
              className="hidden rounded-2xl bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:inline-flex"
            >
              New lead
            </button>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = status === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatus(filter.value)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* List / table */}
        {!hasLeads ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-sm font-medium text-gray-700">
              No leads for this view.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Adjust your filters or create your first lead.
            </p>
            <button
              type="button"
              onClick={() => setIsNewLeadOpen(true)}
              className="mt-4 rounded-2xl bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              New lead
            </button>
          </div>
        ) : (
          <div className="mt-2 overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="hidden border-b bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 md:grid md:grid-cols-8">
              <div className="col-span-2">Company</div>
              <div className="col-span-2">Contact</div>
              <div>Source</div>
              <div>Status</div>
              <div>Owner</div>
              <div className="text-right">Fleet size</div>
            </div>
            <ul className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <li
                  key={lead.id}
                  onClick={() => (window.location.href = `/crm/leads/${lead.id}`)}
                  className="cursor-pointer px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 transition"
                >
                  {/* Desktop: table-style grid */}
                  <div className="hidden items-center md:grid md:grid-cols-8 md:gap-2">
                    <div className="col-span-2 flex flex-col">
                      <span className="font-medium">{lead.companyName}</span>
                      <span className="text-xs text-gray-500">
                        {lead.city ? `${lead.city}, ` : ""}
                        {lead.country}
                      </span>
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <span>{lead.contactName}</span>
                      {lead.contactEmail && (
                        <span className="text-xs text-gray-500">
                          {lead.contactEmail}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                        {lead.source}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClasses(
                          lead.status
                        )}`}
                      >
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700">{lead.owner}</div>
                    <div className="text-right text-xs text-gray-600">
                      {lead.estimatedFleetSize
                        ? `~${lead.estimatedFleetSize} vehicles`
                        : "–"}
                    </div>
                  </div>

                  {/* Mobile: stacked rows */}
                  <div className="flex flex-col gap-1 md:hidden">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">
                          {lead.companyName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lead.city ? `${lead.city}, ` : ""}
                          {lead.country}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClasses(
                          lead.status
                        )}`}
                      >
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                      <span>{lead.contactName}</span>
                      {lead.contactEmail && (
                        <span className="text-gray-500">
                          • {lead.contactEmail}
                        </span>
                      )}
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-600">
                        {lead.source}
                      </span>
                      <span className="text-gray-400">
                        Owner:{" "}
                        <span className="text-gray-700">{lead.owner}</span>
                      </span>
                      {lead.estimatedFleetSize && (
                        <span className="text-gray-500">
                          ~{lead.estimatedFleetSize} vehicles
                        </span>
                      )}
                    </div>
                  </div>

                  {lead.notes && (
                    <p className="mt-2 line-clamp-2 text-xs text-gray-500">
                      {lead.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <LeadFormModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onCreate={handleCreateLead}
      />
    </>
  );
}
