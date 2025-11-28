"use client";

import { useState, FormEvent, useMemo, useEffect } from "react";

import { Card, CardHeader, CardTitle, Input, Select, Textarea, Button, Badge } from "@/app/components/shared/ui";
import type { AccountType } from "@/app/(routes)/crm/accounts/_types";
import { useCRMStore } from "@/store/crmStore";

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

const SUMMARY_CHAR_LIMIT_UI = 250;

export function AccountInfoSection({ account }: AccountInfoSectionProps) {
  const { notes, addNote, updateAccountDetails } = useCRMStore();

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountForm, setAccountForm] = useState<AccountFormState>(() => ({
    legalCompanyName: account.legalCompanyName ?? "",
    owner: account.owner ?? "",
    street: account.street ?? "",
    zipCode: account.zipCode ?? "",
    city: account.city ?? "",
    country: account.country ?? "",
    website: account.website ?? "",
    taxId: account.taxId ?? "",
    fleetSizeEstimate:
      account.fleetSizeEstimate != null
        ? String(account.fleetSizeEstimate)
        : "",
    source: account.source ?? "",
    summary: account.summary ?? "",
  }));

  const [showFullSummary, setShowFullSummary] = useState(false);

  // Sync form when account changes and not editing
  useEffect(() => {
    if (isEditingAccount) return;

    setAccountForm({
      legalCompanyName: account.legalCompanyName ?? "",
      owner: account.owner ?? "",
      street: account.street ?? "",
      zipCode: account.zipCode ?? "",
      city: account.city ?? "",
      country: account.country ?? "",
      website: account.website ?? "",
      taxId: account.taxId ?? "",
      fleetSizeEstimate:
        account.fleetSizeEstimate != null
          ? String(account.fleetSizeEstimate)
          : "",
      source: account.source ?? "",
      summary: account.summary ?? "",
    });
  }, [account, isEditingAccount]);

  const accountNotes = useMemo(
    () =>
      notes.filter(
        (n) => n.targetType === "account" && n.targetId === account.id
      ),
    [notes, account.id]
  );

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    addNote({
      targetType: "account",
      targetId: account.id,
      content: noteText.trim(),
    });

    setNoteText("");
  };

  const handleAccountChange = (
    field: keyof AccountFormState,
    value: string
  ) => {
    setAccountForm((prev) => ({
      ...prev,
      [field]:
        field === "summary"
          ? value.slice(0, SUMMARY_CHAR_LIMIT_UI)
          : value,
    }));
  };

  const handleSaveAccount = () => {
    const fleetSize =
      accountForm.fleetSizeEstimate.trim() === ""
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
      legalCompanyName: account.legalCompanyName ?? "",
      owner: account.owner ?? "",
      street: account.street ?? "",
      zipCode: account.zipCode ?? "",
      city: account.city ?? "",
      country: account.country ?? "",
      website: account.website ?? "",
      taxId: account.taxId ?? "",
      fleetSizeEstimate:
        account.fleetSizeEstimate != null
          ? String(account.fleetSizeEstimate)
          : "",
      source: account.source ?? "",
      summary: account.summary ?? "",
    });
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Top summary row */}
      <div>
        <CardHeader className="mb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Account summary
            </CardTitle>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditingAccount((prev) => !prev)}
            >
              {isEditingAccount ? "Cancel edit" : "Edit account"}
            </Button>
          </div>
        </CardHeader>

        {isEditingAccount ? (
          <div className="space-y-2">
            <Textarea
              value={accountForm.summary}
              onChange={(e) => handleAccountChange("summary", e.target.value)}
              maxLength={SUMMARY_CHAR_LIMIT_UI}
              placeholder="Short summary of this account (key risks, opportunities, context)..."
              rows={4}
            />
            <div className="flex justify-end">
              <span className="text-[11px] text-slate-400">
                {accountForm.summary.length}/{SUMMARY_CHAR_LIMIT_UI}
              </span>
            </div>
          </div>
        ) : (
          <>
            {(() => {
              const full = account.summary || "No summary yet.";
              const limit = 200;
              const isLong = full.length > limit;
              const displayed = isLong ? full.slice(0, limit) + "…" : full;

              return (
                <div className="text-sm text-slate-800">
                  <p>{isLong && !showFullSummary ? displayed : full}</p>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => setShowFullSummary((prev) => !prev)}
                      className="mt-1 text-xs font-medium text-indigo-600 underline"
                    >
                      {showFullSummary ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              );
            })()}
          </>
        )}
      </div>

      {/* Company info */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Company information
        </h3>

        {isEditingAccount ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Legal company name
              </label>
              <Input
                type="text"
                value={accountForm.legalCompanyName}
                onChange={(e) =>
                  handleAccountChange("legalCompanyName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Account owner
              </label>
              <Input
                type="text"
                value={accountForm.owner}
                onChange={(e) => handleAccountChange("owner", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Street
              </label>
              <Input
                type="text"
                value={accountForm.street}
                onChange={(e) => handleAccountChange("street", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                ZIP code
              </label>
              <Input
                type="text"
                value={accountForm.zipCode}
                onChange={(e) => handleAccountChange("zipCode", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                City
              </label>
              <Input
                type="text"
                value={accountForm.city}
                onChange={(e) => handleAccountChange("city", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Country
              </label>
              <Input
                type="text"
                value={accountForm.country}
                onChange={(e) =>
                  handleAccountChange("country", e.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Website
              </label>
              <Input
                type="url"
                value={accountForm.website}
                onChange={(e) => handleAccountChange("website", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Tax ID
              </label>
              <Input
                type="text"
                value={accountForm.taxId}
                onChange={(e) => handleAccountChange("taxId", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Fleet size estimate
              </label>
              <Input
                type="number"
                value={accountForm.fleetSizeEstimate}
                onChange={(e) =>
                  handleAccountChange("fleetSizeEstimate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Source
              </label>
              <Input
                type="text"
                value={accountForm.source}
                onChange={(e) => handleAccountChange("source", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Legal company name" value={account.legalCompanyName} />
            <InfoRow label="Account owner" value={account.owner} />
            <InfoRow
              label="Address"
              value={
                account.street ||
                account.city ||
                account.zipCode ||
                account.country
                  ? `${account.street ?? ""}${
                      account.street ? ", " : ""
                    }${account.zipCode ?? ""} ${account.city ?? ""}${
                      account.country ? `, ${account.country}` : ""
                    }`
                  : "No address on file"
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
                    className="text-sm text-indigo-600 underline"
                  >
                    {account.website.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  "No website"
                )
              }
            />
            <InfoRow label="Tax ID" value={account.taxId || "No tax ID"} />
            <InfoRow
              label="Fleet size"
              value={
                account.fleetSizeEstimate != null
                  ? `~${account.fleetSizeEstimate} vehicles`
                  : "Unknown"
              }
            />
            <InfoRow
              label="Source"
              value={account.source || "No source specified"}
            />
            <InfoRow
              label="Customer since"
              value={new Date(account.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            />
          </dl>
        )}
      </div>

      {/* Save/Cancel buttons */}
      {isEditingAccount && (
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCancelAccount}
          >
            Cancel
          </Button>
          <Button type="button" size="sm" onClick={handleSaveAccount}>
            Save changes
          </Button>
        </div>
      )}

      {/* Notes panel */}
      {isNotesOpen && (
        <div className="border-t border-slate-200 pt-4">
          <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Account notes
          </h3>

          <form onSubmit={handleAddNote} className="mb-3 space-y-2">
            <Textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a new note about this account..."
              rows={4}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Save note
              </Button>
            </div>
          </form>

          <div className="space-y-2">
            {accountNotes.length === 0 ? (
              <p className="text-xs text-slate-500">
                No notes yet. Start capturing key events, risks, and next steps.
              </p>
            ) : (
              accountNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <p className="whitespace-pre-line text-xs text-slate-800">
                    {note.content}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {note.author || "Unknown"} ·{" "}
                    {new Date(note.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setIsNotesOpen((prev) => !prev)}
        >
          Notes ({accountNotes.length})
        </Button>
      </div>
    </Card>
  );
}

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 mb-1">
        {label}
      </dt>
      <dd className="text-sm text-slate-800">{value}</dd>
    </div>
  );
}
