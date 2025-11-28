"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { CrmModal } from "@/app/components/shared/layout/CrmModal";
import { Input, Button } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";
import type { Lead } from "../../_types";

type LeadConvertModalProps = {
  lead: Lead;
  isOpen?: boolean;
  onClose?: () => void;
};

export function LeadConvertModal({
  lead,
  isOpen = true,
  onClose,
}: LeadConvertModalProps) {
  const router = useRouter();
  const { convertLeadToAccount } = useCRMStore();

  const [legalCompanyName, setLegalCompanyName] = useState(
    lead.companyName ?? "",
  );
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState(lead.city ?? "");
  const [country, setCountry] = useState(lead.country ?? "");
  const [taxId, setTaxId] = useState("");
  const [website, setWebsite] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    convertLeadToAccount({
      leadId: lead.id,
      accountData: {
        legalCompanyName,
        street: street || undefined,
        zipCode: zipCode || undefined,
        city: city || undefined,
        country: country || undefined,
        taxId: taxId || undefined,
        website: website || undefined,
      },
    });

    if (onClose) onClose();
    router.push("/crm/accounts");
  };

  return (
    <CrmModal
      isOpen={isOpen}
      onClose={onClose || (() => {})}
      title="Convert lead to account"
      description="Fill in the required information to convert this lead into an account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Legal company name *
          </label>
          <Input
            type="text"
            value={legalCompanyName}
            onChange={(e) => setLegalCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Street
            </label>
            <Input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              ZIP code
            </label>
            <Input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              City
            </label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Country
            </label>
            <Input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Tax ID (optional)
          </label>
          <Input
            type="text"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Website (optional)
          </label>
          <Input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {onClose && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm">
            Convert to account
          </Button>
        </div>
      </form>
    </CrmModal>
  );
}
