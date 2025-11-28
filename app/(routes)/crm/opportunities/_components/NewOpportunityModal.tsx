"use client";

import { useState } from "react";

import { CrmModal } from "@/app/components/shared/layout/CrmModal";
import { Input, Select, Textarea, Button } from "@/app/components/shared/ui";

import type { OpportunityStage } from "../_types";
import { stageOrder, formatStage } from "../_utils";

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
          <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Opportunity name *
            </label>
            <Input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Dashcam rollout Switzerland"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Account *
            </label>
            <Select
              value={form.accountId}
              onChange={(e) => handleChange("accountId", e.target.value)}
              required
            >
              <option value="">Select an account...</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Amount *
            </label>
            <Input
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="e.g. 48000"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Currency *
            </label>
            <Select
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              required
            >
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
              <option value="USD">USD</option>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Expected close date *
            </label>
            <Input
              type="date"
              value={form.closeDate}
              onChange={(e) => handleChange("closeDate", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Stage *
            </label>
            <Select
              value={form.stage}
              onChange={(e) =>
                handleChange("stage", e.target.value as OpportunityStage)
              }
              required
            >
              {stageOrder.map((s) => (
                <option key={s} value={s}>
                  {formatStage(s)}
                </option>
              ))}
            </Select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Owner *
            </label>
            <Input
              type="text"
              value={form.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
              placeholder="e.g. Anh Chu"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Description
          </label>
          <Textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            placeholder="Context, key stakeholders, risks..."
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
            Create opportunity
          </Button>
        </div>
      </form>
    </CrmModal>
  );
}
