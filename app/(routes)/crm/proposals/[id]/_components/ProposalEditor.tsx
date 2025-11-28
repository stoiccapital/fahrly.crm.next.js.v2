"use client";

import { useMemo } from "react";

import { Card, Input, Select, Textarea } from "@/app/components/shared/ui";

import type { ProposalType } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  onChange: (proposal: ProposalType) => void;
};

const currencies = ["EUR", "CHF", "USD"];

function calculateTermInMonths(startDate?: string, endDate?: string): number | null {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  const totalMonths = years * 12 + months;

  return totalMonths > 0 ? totalMonths : null;
}

export function ProposalEditor({ proposal, onChange }: Props) {
  const termInMonths = useMemo(
    () => calculateTermInMonths(proposal.startDate, proposal.endDate),
    [proposal.startDate, proposal.endDate]
  );

  const handleFieldChange =
    <K extends keyof ProposalType>(key: K) =>
    (value: ProposalType[K]) => {
      onChange({ ...proposal, [key]: value });
    };

  const handleInputChange =
    <K extends keyof ProposalType>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (key === "amount") {
        const numeric = Number(value.replace(",", "."));
        onChange({ ...proposal, amount: Number.isNaN(numeric) ? 0 : numeric });
      } else if (key === "startDate" || key === "endDate") {
        handleFieldChange(key)(value as ProposalType[K]);
      } else {
        handleFieldChange(key)(value as ProposalType[K]);
      }
    };

  const handleTextAreaChange =
    <K extends keyof ProposalType>(key: K) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleFieldChange(key)(event.target.value as ProposalType[K]);
    };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Proposal Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Title
            </label>
            <Input
              value={proposal.title}
              onChange={handleInputChange("title")}
              placeholder="Proposal – Fahrly Platform – 25 Vehicles"
            />
          </div>
          <div className="grid grid-cols-[1.3fr_0.7fr] gap-2">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Amount
              </label>
              <Input
                type="number"
                min={0}
                value={proposal.amount.toString()}
                onChange={handleInputChange("amount")}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Currency
              </label>
              <Select
                value={proposal.currency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFieldChange("currency")(e.target.value)
                }
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Start date
            </label>
            <Input
              type="date"
              value={proposal.startDate?.slice(0, 10) ?? ""}
              onChange={handleInputChange("startDate")}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              End date
            </label>
            <Input
              type="date"
              value={proposal.endDate?.slice(0, 10) ?? ""}
              onChange={handleInputChange("endDate")}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Term length (months)
            </label>
            <Input
              value={termInMonths !== null ? termInMonths.toString() : ""}
              readOnly
              className="bg-slate-50"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Pricing &amp; Scope</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Scope of work
            </label>
            <Textarea
              rows={4}
              value={proposal.scopeOfWork}
              onChange={handleTextAreaChange("scopeOfWork")}
              placeholder="Describe the modules, services, and scope included in this proposal."
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Pricing details
            </label>
            <Textarea
              rows={4}
              value={proposal.pricingDetails}
              onChange={handleTextAreaChange("pricingDetails")}
              placeholder="- X vehicles @ Y EUR/vehicle/month
- One-time implementation fee
- Optional add-ons..."
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Commercial Terms</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Payment terms
            </label>
            <Textarea
              rows={3}
              value={proposal.paymentTerms}
              onChange={handleTextAreaChange("paymentTerms")}
              placeholder="Net 30 days from invoice date. Invoices issued annually in advance."
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Notes
            </label>
            <Textarea
              rows={3}
              value={proposal.notes}
              onChange={handleTextAreaChange("notes")}
              placeholder="Additional legal or commercial notes, special conditions, or comments."
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
