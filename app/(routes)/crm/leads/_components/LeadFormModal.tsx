"use client";

import { useState } from "react";

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New lead</h2>
            <p className="text-sm text-gray-500">
              Create a new unqualified lead at the top of your funnel.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Company name *
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Müller Taxi GmbH"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Contact name *
              </label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Max Müller"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Contact email
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Contact phone
              </label>
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="+41 ..."
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Source
              </label>
              <select
                value={form.source}
                onChange={(e) =>
                  handleChange("source", e.target.value as LeadSource)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {sourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  handleChange("status", e.target.value as LeadStatus)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Estimated fleet size
              </label>
              <input
                type="number"
                min={0}
                value={form.estimatedFleetSize}
                onChange={(e) =>
                  handleChange("estimatedFleetSize", e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 25"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. DE, CH, AT"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Berlin"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Owner
              </label>
              <input
                type="text"
                value={form.owner}
                onChange={(e) => handleChange("owner", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Anh Chu"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Context, pain points, next steps..."
            />
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Create lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

