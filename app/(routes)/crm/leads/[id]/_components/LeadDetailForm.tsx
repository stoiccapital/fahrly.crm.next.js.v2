"use client";

import { useState } from "react";

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
    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Lead Information</h2>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="currentColor"></path>
            </svg>
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-2xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Company */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Company name
          </label>
          <input
            type="text"
            value={lead.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            disabled={!isEditing}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Contact name */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Contact name
          </label>
          <input
            type="text"
            value={lead.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
            disabled={!isEditing}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={lead.contactEmail || ""}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            disabled={!isEditing}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={lead.contactPhone || ""}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            disabled={!isEditing}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Source */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Source
          </label>
          <select
            value={lead.source}
            disabled={!isEditing}
            onChange={(e) =>
              handleChange("source", e.target.value as LeadSource)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          >
            <option value="outbound">Outbound</option>
            <option value="inbound">Inbound</option>
            <option value="referral">Referral</option>
            <option value="partner">Partner</option>
            <option value="event">Event</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Status
          </label>
          <select
            value={lead.status}
            disabled={!isEditing}
            onChange={(e) =>
              handleChange("status", e.target.value as LeadStatus)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="disqualified">Disqualified</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={lead.city || ""}
            disabled={!isEditing}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            value={lead.country || ""}
            disabled={!isEditing}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Fleet size */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Estimated fleet size
          </label>
          <input
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
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>

        {/* Owner */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Owner
          </label>
          <input
            type="text"
            disabled={!isEditing}
            value={lead.owner}
            onChange={(e) => handleChange("owner", e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Notes
        </label>
        <textarea
          disabled={!isEditing}
          value={lead.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-50"
        />
      </div>
    </div>
  );
}

