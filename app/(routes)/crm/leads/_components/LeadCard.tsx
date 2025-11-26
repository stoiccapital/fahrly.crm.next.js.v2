"use client";

import { Lead } from "../_types";

type LeadCardProps = {
  lead: Lead;
  onClick?: (leadId: string) => void;
};

function getStatusLabel(status: Lead["status"]) {
  switch (status) {
    case "new":
      return "Neu";
    case "contacted":
      return "Kontakt";
    case "qualified":
      return "Qualifiziert";
    case "disqualified":
      return "Disqualifiziert";
    default:
      return status;
  }
}

function getStatusClasses(status: Lead["status"]) {
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
      return "";
  }
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(lead.id)}
      className="flex flex-col w-full rounded-2xl border bg-white p-4 text-left shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {lead.companyName}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {lead.city ? `${lead.city}, ` : ""}
            {lead.country}
          </p>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClasses(
            lead.status
          )}`}
        >
          {getStatusLabel(lead.status)}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <span>{lead.contactName}</span>
        {lead.contactEmail && (
          <span className="text-gray-500">• {lead.contactEmail}</span>
        )}
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-600">
          {lead.source}
        </span>
      </div>
      {lead.notes && (
        <p className="mt-3 text-xs text-gray-500 line-clamp-2">{lead.notes}</p>
      )}
    </button>
  );
}
