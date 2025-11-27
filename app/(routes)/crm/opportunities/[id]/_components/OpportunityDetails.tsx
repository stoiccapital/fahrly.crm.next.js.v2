"use client";

import Link from "next/link";

import type { Opportunity, OpportunityStage } from "../_types";

import { formatStage, stageOrder } from "../../_data/mockOpportunities";

type Props = {
  opportunity: Opportunity;
  isEditingDetails: boolean;
  onToggleEditDetails: () => void;
  onStageChange: (stage: OpportunityStage) => void;
  onCloseDateChange: (date: string) => void;
  contactName?: string;
};

const formatCurrency = (amount: number, currency: Opportunity["currency"]) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

export function OpportunityDetails({
  opportunity,
  isEditingDetails,
  onToggleEditDetails,
  onStageChange,
  onCloseDateChange,
  contactName
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Details</h2>
        <button
          type="button"
          onClick={onToggleEditDetails}
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          {isEditingDetails ? "Done" : "Edit"}
        </button>
      </div>

      <div className="grid gap-4 text-sm md:grid-cols-2">
        {/* Account (clickable) */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Account
          </span>
          <Link
            href={`/crm/accounts/${opportunity.accountId}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            {opportunity.accountName}
          </Link>
        </div>

        {/* Contact (clickable – currently routes to account detail) */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Contact
          </span>
          {contactName ? (
            <Link
              href={`/crm/accounts/${opportunity.accountId}`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {contactName}
            </Link>
          ) : (
            <span className="text-sm text-gray-400">No contact set</span>
          )}
        </div>

        {/* Stage row */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Stage
          </span>
          {isEditingDetails ? (
            <select
              value={opportunity.stage}
              onChange={(e) =>
                onStageChange(e.target.value as OpportunityStage)
              }
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {stageOrder.map((stage) => (
                <option key={stage} value={stage}>
                  {formatStage(stage)}
                </option>
              ))}
            </select>
          ) : (
            <span className="inline-flex w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              {formatStage(opportunity.stage)}
            </span>
          )}
        </div>

        {/* Close date row (editable) */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Close date
          </span>
          {isEditingDetails ? (
            <input
              type="date"
              value={opportunity.closeDate}
              onChange={(e) => onCloseDateChange(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          ) : (
            <span className="text-sm text-gray-900">
              {formatDate(opportunity.closeDate)}
            </span>
          )}
        </div>

        {/* Amount */}
        <DetailRow
          label="Amount"
          value={formatCurrency(opportunity.amount, opportunity.currency)}
        />

        {/* Owner */}
        <DetailRow label="Owner" value={opportunity.owner} />

        {/* Probability */}
        <DetailRow
          label="Probability"
          value={`${Math.round(opportunity.probability * 100)} %`}
        />

        {/* Created */}
        <DetailRow
          label="Created"
          value={formatDate(opportunity.createdAt)}
        />

        {/* Last update */}
        <DetailRow
          label="Last update"
          value={formatDate(opportunity.updatedAt)}
        />
      </div>

      {opportunity.description && (
        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Description
          </div>
          <p className="mt-1 text-sm text-gray-700">
            {opportunity.description}
          </p>
        </div>
      )}
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
