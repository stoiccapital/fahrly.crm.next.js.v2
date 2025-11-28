"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, Button, Input, Badge } from "@/app/components/shared/ui";
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

function getStatusVariant(status: LeadStatus) {
  switch (status) {
    case "qualified":
      return "success";
    case "disqualified":
      return "danger";
    case "contacted":
      return "warning";
    default:
      return "default";
  }
}

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

export function LeadList({ initialLeads }: LeadListProps) {
  const router = useRouter();
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Leads
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Unqualified contacts at the top of your sales funnel.
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by company, contact, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-64"
            />
            <Button
              size="sm"
              onClick={() => setIsNewLeadOpen(true)}
              className="hidden sm:inline-flex"
            >
              New lead
            </Button>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = status === filter.value;
            return (
              <Button
                key={filter.value}
                type="button"
                variant={isActive ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatus(filter.value)}
                className="rounded-full"
              >
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* List / table */}
        {!hasLeads ? (
          <Card className="p-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              No leads for this view.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Adjust your filters or create your first lead.
            </p>
            <Button
              size="sm"
              onClick={() => setIsNewLeadOpen(true)}
              className="mt-4"
            >
              New lead
            </Button>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden">
            <div className="hidden border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 md:grid md:grid-cols-8">
              <div className="col-span-2">Company</div>
              <div className="col-span-2">Contact</div>
              <div>Source</div>
              <div>Status</div>
              <div>Owner</div>
              <div className="text-right">Fleet size</div>
            </div>
            <ul className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <li
                  key={lead.id}
                  onClick={() => router.push(`/crm/leads/${lead.id}`)}
                  className="cursor-pointer px-4 py-3 text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {/* Desktop: table-style grid */}
                  <div className="hidden items-center md:grid md:grid-cols-8 md:gap-2">
                    <div className="col-span-2 flex flex-col">
                      <span className="font-medium text-slate-900">{lead.companyName}</span>
                      <span className="text-xs text-slate-500">
                        {lead.city ? `${lead.city}, ` : ""}
                        {lead.country}
                      </span>
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <span className="text-slate-900">{lead.contactName}</span>
                      {lead.contactEmail && (
                        <span className="text-xs text-slate-500">
                          {lead.contactEmail}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600">
                      <Badge variant="soft" className="text-[10px] uppercase tracking-wide">
                        {lead.source}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant={getStatusVariant(lead.status) as any}>
                        {getStatusLabel(lead.status)}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-700">{lead.owner}</div>
                    <div className="text-right text-xs text-slate-600">
                      {lead.estimatedFleetSize
                        ? `~${lead.estimatedFleetSize} vehicles`
                        : "–"}
                    </div>
                  </div>

                  {/* Mobile: stacked rows */}
                  <div className="flex flex-col gap-1 md:hidden">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {lead.companyName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {lead.city ? `${lead.city}, ` : ""}
                          {lead.country}
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(lead.status) as any}>
                        {getStatusLabel(lead.status)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span>{lead.contactName}</span>
                      {lead.contactEmail && (
                        <span className="text-slate-500">
                          • {lead.contactEmail}
                        </span>
                      )}
                      <Badge variant="soft" className="text-[10px] uppercase tracking-wide">
                        {lead.source}
                      </Badge>
                      <span className="text-slate-400">
                        Owner:{" "}
                        <span className="text-slate-700">{lead.owner}</span>
                      </span>
                      {lead.estimatedFleetSize && (
                        <span className="text-slate-500">
                          ~{lead.estimatedFleetSize} vehicles
                        </span>
                      )}
                    </div>
                  </div>

                  {lead.notes && (
                    <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                      {lead.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Card>
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
