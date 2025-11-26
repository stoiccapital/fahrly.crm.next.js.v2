// app/(routes)/crm/accounts/[id]/_components/AccountInfoSection.tsx

'use client';

import { useState, FormEvent, useMemo, useEffect } from 'react';

import type { AccountType } from '@/app/(routes)/crm/accounts/_types';

import { useCRMStore } from '@/store/crmStore';

type AccountInfoSectionProps = {
  account: AccountType;
};

type AccountFormState = {
  legalCompanyName: string;
  owner: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  website: string;
  taxId: string;
  fleetSizeEstimate: string;
  source: string;
  summary: string;
};

export function AccountInfoSection({ account }: AccountInfoSectionProps) {
  const { notes, addNote, updateAccountDetails } = useCRMStore();

  const SUMMARY_CHAR_LIMIT_UI = 250;

  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const [noteText, setNoteText] = useState('');

  const [isEditingAccount, setIsEditingAccount] = useState(false);

  const [accountForm, setAccountForm] = useState<AccountFormState>(() => ({
    legalCompanyName: account.legalCompanyName ?? '',
    owner: account.owner ?? '',
    street: account.street ?? '',
    zipCode: account.zipCode ?? '',
    city: account.city ?? '',
    country: account.country ?? '',
    website: account.website ?? '',
    taxId: account.taxId ?? '',
    fleetSizeEstimate:
      account.fleetSizeEstimate != null ? String(account.fleetSizeEstimate) : '',
    source: account.source ?? '',
    summary: account.summary ?? '',
  }));

  const [showFullSummary, setShowFullSummary] = useState(false);

  // Sync form when account changes and not editing
  useEffect(() => {
    if (isEditingAccount) return;

    setAccountForm({
      legalCompanyName: account.legalCompanyName ?? '',
      owner: account.owner ?? '',
      street: account.street ?? '',
      zipCode: account.zipCode ?? '',
      city: account.city ?? '',
      country: account.country ?? '',
      website: account.website ?? '',
      taxId: account.taxId ?? '',
      fleetSizeEstimate:
        account.fleetSizeEstimate != null ? String(account.fleetSizeEstimate) : '',
      source: account.source ?? '',
      summary: account.summary ?? '',
    });
  }, [account, isEditingAccount]);

  const accountNotes = useMemo(
    () =>
      notes.filter(
        (n) => n.targetType === 'account' && n.targetId === account.id,
      ),
    [notes, account.id],
  );

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    addNote({
      targetType: 'account',
      targetId: account.id,
      content: noteText.trim(),
    });

    setNoteText('');
  };

  const handleAccountChange = (field: keyof AccountFormState, value: string) => {
    setAccountForm((prev) => ({
      ...prev,
      [field]:
        field === 'summary'
          ? value.slice(0, SUMMARY_CHAR_LIMIT_UI)
          : value,
    }));
  };

  const handleSaveAccount = () => {
    const fleetSize =
      accountForm.fleetSizeEstimate.trim() === ''
        ? undefined
        : Number.parseInt(accountForm.fleetSizeEstimate, 10);

    updateAccountDetails({
      accountId: account.id,
      legalCompanyName: accountForm.legalCompanyName.trim(),
      owner: accountForm.owner.trim(),
      street: accountForm.street.trim(),
      zipCode: accountForm.zipCode.trim(),
      city: accountForm.city.trim(),
      country: accountForm.country.trim(),
      website: accountForm.website.trim(),
      taxId: accountForm.taxId.trim(),
      source: accountForm.source.trim(),
      fleetSizeEstimate: Number.isNaN(fleetSize) ? undefined : fleetSize,
      summary: accountForm.summary,
    });

    setIsEditingAccount(false);
  };

  const handleCancelAccount = () => {
    setIsEditingAccount(false);
    setAccountForm({
      legalCompanyName: account.legalCompanyName ?? '',
      owner: account.owner ?? '',
      street: account.street ?? '',
      zipCode: account.zipCode ?? '',
      city: account.city ?? '',
      country: account.country ?? '',
      website: account.website ?? '',
      taxId: account.taxId ?? '',
      fleetSizeEstimate:
        account.fleetSizeEstimate != null ? String(account.fleetSizeEstimate) : '',
      source: account.source ?? '',
      summary: account.summary ?? '',
    });
  };

  return (
    <section className="relative rounded-2xl border bg-white p-5 shadow-sm">
      {/* Top summary row */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Account summary
            </h2>

            <button
              type="button"
              onClick={() => setIsEditingAccount((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-xs text-gray-800 hover:bg-gray-50"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="currentColor"></path>
              </svg>
              {isEditingAccount ? 'Cancel edit' : 'Edit account'}
            </button>
          </div>

          {isEditingAccount ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={accountForm.summary}
                onChange={(e) => handleAccountChange('summary', e.target.value)}
                maxLength={SUMMARY_CHAR_LIMIT_UI}
                placeholder="Short summary of this account (key risks, opportunities, context)..."
                className="w-full h-24 rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
              <div className="mt-1 flex justify-end">
                <span className="text-[11px] text-gray-400">
                  {accountForm.summary.length}/{SUMMARY_CHAR_LIMIT_UI}
                </span>
              </div>
            </div>
          ) : (
            <>
              {(() => {
                const full = account.summary || 'No summary yet.';
                const limit = 200;
                const isLong = full.length > limit;
                const displayed = isLong ? full.slice(0, limit) + '…' : full;

                return (
                  <div className="mt-1 text-sm text-gray-800">
                    <p>{isLong && !showFullSummary ? displayed : full}</p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setShowFullSummary((prev) => !prev)}
                        className="mt-1 text-xs font-medium text-blue-600 underline"
                      >
                        {showFullSummary ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>

      {/* Company info */}
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Company information
      </h3>

      {isEditingAccount ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <EditableField
            label="Legal company name"
            value={accountForm.legalCompanyName}
            onChange={(v) => handleAccountChange('legalCompanyName', v)}
          />
          <EditableField
            label="Account owner"
            value={accountForm.owner}
            onChange={(v) => handleAccountChange('owner', v)}
          />
          <EditableField
            label="Street"
            value={accountForm.street}
            onChange={(v) => handleAccountChange('street', v)}
          />
          <EditableField
            label="ZIP code"
            value={accountForm.zipCode}
            onChange={(v) => handleAccountChange('zipCode', v)}
          />
          <EditableField
            label="City"
            value={accountForm.city}
            onChange={(v) => handleAccountChange('city', v)}
          />
          <EditableField
            label="Country"
            value={accountForm.country}
            onChange={(v) => handleAccountChange('country', v)}
          />
          <EditableField
            label="Website"
            value={accountForm.website}
            onChange={(v) => handleAccountChange('website', v)}
          />
          <EditableField
            label="Tax ID"
            value={accountForm.taxId}
            onChange={(v) => handleAccountChange('taxId', v)}
          />
          <EditableField
            label="Fleet size estimate"
            value={accountForm.fleetSizeEstimate}
            onChange={(v) => handleAccountChange('fleetSizeEstimate', v)}
          />
          <EditableField
            label="Source"
            value={accountForm.source}
            onChange={(v) => handleAccountChange('source', v)}
          />
        </div>
      ) : (
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <InfoRow label="Legal company name" value={account.legalCompanyName} />
          <InfoRow label="Account owner" value={account.owner} />
          <InfoRow
            label="Address"
            value={
              account.street || account.city || account.zipCode || account.country
                ? `${account.street ?? ''}${
                    account.street ? ', ' : ''
                  }${account.zipCode ?? ''} ${account.city ?? ''}${
                    account.country ? `, ${account.country}` : ''
                  }`
                : 'No address on file'
            }
          />
          <InfoRow
            label="Website"
            value={
              account.website ? (
                <a
                  href={account.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  {account.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                'No website'
              )
            }
          />
          <InfoRow label="Tax ID" value={account.taxId || 'No tax ID'} />
          <InfoRow
            label="Fleet size"
            value={
              account.fleetSizeEstimate != null
                ? `~${account.fleetSizeEstimate} vehicles`
                : 'Unknown'
            }
          />
          <InfoRow
            label="Source"
            value={account.source || 'No source specified'}
          />
          <InfoRow
            label="Customer since"
            value={new Date(account.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          />
        </dl>
      )}

      {/* Save/Cancel buttons */}
      {isEditingAccount && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancelAccount}
            className="rounded-xl border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAccount}
            className="rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900"
          >
            Save changes
          </button>
        </div>
      )}

      {/* Notes panel */}
      {isNotesOpen && (
        <div className="mt-5 border-t pt-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Account notes
          </h3>

          <form onSubmit={handleAddNote} className="mb-3 space-y-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a new note about this account..."
              className="h-20 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900"
              >
                Save note
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {accountNotes.length === 0 ? (
              <p className="text-xs text-gray-500">
                No notes yet. Start capturing key events, risks, and next steps.
              </p>
            ) : (
              accountNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border bg-gray-50 px-3 py-2 text-xs text-gray-800"
                >
                  <p className="whitespace-pre-line">{note.content}</p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    {note.author || 'Unknown'} ·{' '}
                    {new Date(note.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsNotesOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50"
        >
          <svg fill="currentColor" viewBox="0 0 32 32" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M25,26a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V5H17V3H5V26a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V13H25Z"></path>
              <path d="M27.12,2.88a3.08,3.08,0,0,0-4.24,0L17,8.75,16,14.05,21.25,13l5.87-5.87A3,3,0,0,0,27.12,2.88Zm-6.86,8.27-1.76.35.35-1.76,3.32-3.33,1.42,1.42Zm5.45-5.44-.71.7L23.59,5l.7-.71h0a1,1,0,0,1,1.42,0A1,1,0,0,1,25.71,5.71Z"></path>
            </g>
          </svg>
          <span>Notes ({accountNotes.length})</span>
        </button>
      </div>
    </section>
  );
}

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-gray-800">{value}</dd>
    </div>
  );
}

type EditableFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function EditableField({ label, value, onChange }: EditableFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 text-sm text-gray-900 outline-none ring-0 focus:border-gray-400"
      />
    </div>
  );
}
