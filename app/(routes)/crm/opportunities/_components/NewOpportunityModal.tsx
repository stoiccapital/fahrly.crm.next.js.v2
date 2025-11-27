"use client";

import { useState } from "react";

import { CrmModal } from "../../_components/CrmModal";

import type { OpportunityStage } from "../_types";

import { stageOrder, formatStage } from "../_data/mockOpportunities";

type NewOpportunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    accountId: string;
    amount: number;
    currency: string;
    closeDate: string;
    stage: OpportunityStage;
    owner: string;
    description?: string;
  }) => void;
  accounts: { id: string; name: string }[];
};

type FormState = {
  name: string;
  accountId: string;
  amount: string;
  currency: string;
  closeDate: string;
  stage: OpportunityStage;
  owner: string;
  description: string;
};

const initialFormState: FormState = {
  name: "",
  accountId: "",
  amount: "",
  currency: "EUR",
  closeDate: "",
  stage: "QUALIFIED",
  owner: "",
  description: ""
};

export function NewOpportunityModal({
  isOpen,
  onClose,
  onCreate,
  accounts
}: NewOpportunityModalProps) {
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

    if (!form.name.trim() || !form.accountId || !form.amount || !form.closeDate || !form.owner.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    const amountValue = Number(form.amount);

    if (Number.isNaN(amountValue) || amountValue <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    onCreate({
      name: form.name.trim(),
      accountId: form.accountId,
      amount: amountValue,
      currency: form.currency,
      closeDate: form.closeDate,
      stage: form.stage,
      owner: form.owner.trim(),
      description: form.description.trim() || undefined
    });

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
      title="New opportunity"
      description="Create a new opportunity to track potential revenue in your pipeline."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Opportunity name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. Dashcam rollout Switzerland"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Account *
            </label>
            <select
              value={form.accountId}
              onChange={(e) => handleChange("accountId", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Select an account...</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Amount *
            </label>
            <input
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. 48000"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Currency *
            </label>
            <select
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Expected close date *
            </label>
            <input
              type="date"
              value={form.closeDate}
              onChange={(e) => handleChange("closeDate", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Stage *
            </label>
            <select
              value={form.stage}
              onChange={(e) =>
                handleChange("stage", e.target.value as OpportunityStage)
              }
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            >
              {stageOrder.map((s) => (
                <option key={s} value={s}>
                  {formatStage(s)}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Owner *
            </label>
            <input
              type="text"
              value={form.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. Anh Chu"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Context, key stakeholders, risks..."
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
            Create opportunity
          </button>
        </div>
      </form>
    </CrmModal>
  );
}
