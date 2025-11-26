// app/(routes)/crm/leads/[id]/_components/LeadConvertModal.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCRMStore } from '@/store/crmStore';
import type { Lead } from '../../_types';

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
    lead.companyName ?? '',
  );
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState(lead.city ?? '');
  const [country, setCountry] = useState(lead.country ?? '');
  const [taxId, setTaxId] = useState('');
  const [website, setWebsite] = useState('');

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
    router.push('/crm/accounts');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Convert lead to account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Legal company name
            </label>
            <input
              type="text"
              value={legalCompanyName}
              onChange={(e) => setLegalCompanyName(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ZIP code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tax ID (optional)
            </label>
            <input
              type="text"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Website (optional)
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
            >
              Convert to account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
