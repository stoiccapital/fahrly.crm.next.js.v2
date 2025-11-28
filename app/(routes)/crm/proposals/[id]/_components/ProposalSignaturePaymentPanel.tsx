"use client";

import { useState } from "react";

import { Card, Button, Input } from "@/app/components/shared/ui";

import type { ProposalType } from "@/app/(routes)/crm/proposals/_types";

type Props = {
  proposal: ProposalType;
  docuSealUrl?: string;
  stripePaymentUrl?: string;
  onGenerateDocuSeal: () => void;
  onGenerateStripeLink: () => void;
};

export function ProposalSignaturePaymentPanel({
  proposal,
  docuSealUrl,
  stripePaymentUrl,
  onGenerateDocuSeal,
  onGenerateStripeLink,
}: Props) {
  const [copiedField, setCopiedField] = useState<"docuseal" | "stripe" | null>(null);

  const handleCopy = async (value: string, field: "docuseal" | "stripe") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      // ignore errors – not critical
    }
  };

  const hasLinks = !!docuSealUrl || !!stripePaymentUrl;

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Signature &amp; Payment
      </h2>
      <p className="mb-4 text-xs text-slate-500">
        Generate a DocuSeal contract link for signature and a Stripe payment link
        directly from this proposal. In a later step, these actions will call your
        backend API that talks to DocuSeal and Stripe.
      </p>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              DocuSeal link
            </label>
            <Button
              size="sm"
              variant="secondary"
              onClick={onGenerateDocuSeal}
            >
              Generate
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={docuSealUrl ?? ""}
              placeholder="DocuSeal signing link will appear here"
              className="text-xs"
            />
            <Button
              size="sm"
              variant="ghost"
              disabled={!docuSealUrl}
              onClick={() =>
                docuSealUrl && handleCopy(docuSealUrl, "docuseal")
              }
            >
              {copiedField === "docuseal" ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Stripe payment link
            </label>
            <Button
              size="sm"
              variant="secondary"
              onClick={onGenerateStripeLink}
            >
              Generate
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={stripePaymentUrl ?? ""}
              placeholder="Stripe payment link will appear here"
              className="text-xs"
            />
            <Button
              size="sm"
              variant="ghost"
              disabled={!stripePaymentUrl}
              onClick={() =>
                stripePaymentUrl && handleCopy(stripePaymentUrl, "stripe")
              }
            >
              {copiedField === "stripe" ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
      {!hasLinks && (
        <p className="mt-4 text-[11px] text-slate-500">
          Hint: in production, these buttons will call your backend (e.g.{" "}
          <code className="rounded bg-slate-50 px-1 py-0.5 text-[10px]">
            POST /api/contracts/generate
          </code>{" "}
          and{" "}
          <code className="rounded bg-slate-50 px-1 py-0.5 text-[10px]">
            POST /api/payments/create-link
          </code>
          ) which integrates with DocuSeal and Stripe.
        </p>
      )}
    </Card>
  );
}
