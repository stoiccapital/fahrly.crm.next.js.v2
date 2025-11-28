"use client";

import { useState } from "react";

import { Card, CardHeader, CardTitle, Input, Select, Textarea, Button } from "@/app/components/shared/ui";
import { Lead, LeadSource, LeadStatus } from "../../_types";

type LeadDetailFormProps = {
  initialLead: Lead;
};

export function LeadDetailForm({ initialLead }: LeadDetailFormProps) {
  const [lead, setLead] = useState<Lead>(initialLead);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange<K extends keyof Lead>(key: K, value: Lead[K]) {
    setLead((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Lead Information</CardTitle>
          {!isEditing ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Form */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Company */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Company name
          </label>
          <Input
            type="text"
            value={lead.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Contact name */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Contact name
          </label>
          <Input
            type="text"
            value={lead.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Email
          </label>
          <Input
            type="email"
            value={lead.contactEmail || ""}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Phone
          </label>
          <Input
            type="tel"
            value={lead.contactPhone || ""}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Source */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Source
          </label>
          <Select
            value={lead.source}
            disabled={!isEditing}
            onChange={(e) =>
              handleChange("source", e.target.value as LeadSource)
            }
          >
            <option value="outbound">Outbound</option>
            <option value="inbound">Inbound</option>
            <option value="referral">Referral</option>
            <option value="partner">Partner</option>
            <option value="event">Event</option>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Status
          </label>
          <Select
            value={lead.status}
            disabled={!isEditing}
            onChange={(e) =>
              handleChange("status", e.target.value as LeadStatus)
            }
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="disqualified">Disqualified</option>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            City
          </label>
          <Input
            type="text"
            value={lead.city || ""}
            disabled={!isEditing}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Country
          </label>
          <Input
            type="text"
            value={lead.country || ""}
            disabled={!isEditing}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        {/* Fleet size */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Estimated fleet size
          </label>
          <Input
            type="number"
            min={0}
            disabled={!isEditing}
            value={lead.estimatedFleetSize || ""}
            onChange={(e) =>
              handleChange(
                "estimatedFleetSize",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />
        </div>

        {/* Owner */}
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Owner
          </label>
          <Input
            type="text"
            disabled={!isEditing}
            value={lead.owner}
            onChange={(e) => handleChange("owner", e.target.value)}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Notes
        </label>
        <Textarea
          disabled={!isEditing}
          value={lead.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          rows={3}
        />
      </div>
    </Card>
  );
}
