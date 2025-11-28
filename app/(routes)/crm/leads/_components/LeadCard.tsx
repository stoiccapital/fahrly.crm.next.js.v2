"use client";

import { Card } from "@/app/components/shared/ui";
import { Badge } from "@/app/components/shared/ui";
import { Lead } from "../_types";

type LeadCardProps = {
  lead: Lead;
  onClick?: (leadId: string) => void;
};

function getStatusVariant(status: Lead["status"]) {
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

function getStatusLabel(status: Lead["status"]) {
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

export function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <Card
      className="p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={() => onClick?.(lead.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {lead.companyName}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {lead.city ? `${lead.city}, ` : ""}
            {lead.country}
          </p>
        </div>
        <Badge variant={getStatusVariant(lead.status) as any}>
          {getStatusLabel(lead.status)}
        </Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
        <span>{lead.contactName}</span>
        {lead.contactEmail && (
          <span className="text-slate-500">• {lead.contactEmail}</span>
        )}
        <Badge variant="soft" className="text-[10px] uppercase tracking-wide">
          {lead.source}
        </Badge>
      </div>
      {lead.notes && (
        <p className="mt-3 text-xs text-slate-500 line-clamp-2">{lead.notes}</p>
      )}
    </Card>
  );
}
