"use client";

import { useState } from "react";

import { CrmModal } from "@/app/components/shared/layout/CrmModal";
import { Input, Select, Textarea, Button } from "@/app/components/shared/ui";
import { Lead, LeadSource, LeadStatus } from "../_types";

type LeadFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (lead: Lead) => void;
};

type FormState = {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  source: LeadSource;
  status: LeadStatus;
  estimatedFleetSize: string;
  country: string;
  city: string;
  owner: string;
  notes: string;
};

const sourceOptions: { value: LeadSource; label: string }[] = [
  { value: "outbound", label: "Outbound" },
  { value: "inbound", label: "Inbound" },
  { value: "referral", label: "Referral" },
  { value: "partner", label: "Partner" },
  { value: "event", label: "Event" }
];

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "disqualified", label: "Disqualified" }
];

const initialFormState: FormState = {
  companyName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  source: "outbound",
  status: "new",
  estimatedFleetSize: "",
  country: "",
  city: "",
  owner: "",
  notes: ""
};

export function LeadFormModal({ isOpen, onClose, onCreate }: LeadFormModalProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  function handleChange<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.companyName.trim() || !form.contactName.trim()) {
      setError("Company name and contact name are required.");
      return;
    }

    const estimatedFleet = parseInt(form.estimatedFleetSize, 10);
    const estimatedFleetSize =
      !isNaN(estimatedFleet) && estimatedFleet > 0 ? estimatedFleet : undefined;

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      companyName: form.companyName.trim(),
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim() || undefined,
      contactPhone: form.contactPhone.trim() || undefined,
      source: form.source,
      status: form.status,
      estimatedFleetSize,
      country: form.country.trim() || undefined,
      city: form.city.trim() || undefined,
      owner: form.owner.trim() || "Unassigned",
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    onCreate(newLead);
    setForm(initialFormState);
    onClose();
  }

  function handleClose() {
    setForm(initialFormState);
    setError(null);
    onClose();
  }

  return (
    <CrmModal
      isOpen={isOpen}
      onClose={handleClose}
      title="New lead"
      description="Create a new unqualified lead at the top of your funnel."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Company name *
            </label>
            <Input
              type="text"
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="e.g. Miller Taxi GmbH"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Contact name *
            </label>
            <Input
              type="text"
              value={form.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              placeholder="e.g. John Miller"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Contact email
            </label>
            <Input
              type="email"
              value={form.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Contact phone
            </label>
            <Input
              type="tel"
              value={form.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="+41 ..."
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Source
            </label>
            <Select
              value={form.source}
              onChange={(e) =>
                handleChange("source", e.target.value as LeadSource)
              }
            >
              {sourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Status
            </label>
            <Select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as LeadStatus)
              }
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Estimated fleet size
            </label>
            <Input
              type="number"
              min={0}
              value={form.estimatedFleetSize}
              onChange={(e) =>
                handleChange("estimatedFleetSize", e.target.value)
              }
              placeholder="e.g. 25"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Country
            </label>
            <Input
              type="text"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="e.g. DE, CH, AT"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              City
            </label>
            <Input
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="e.g. Berlin"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Owner
            </label>
            <Input
              type="text"
              value={form.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
              placeholder="e.g. Anh Chu"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Notes
          </label>
          <Textarea
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={3}
            placeholder="Context, pain points, next steps..."
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Create lead
          </Button>
        </div>
      </form>
    </CrmModal>
  );
}
