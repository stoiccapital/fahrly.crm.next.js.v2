"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/app/components/shared/ui";
import { Button } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";

import { AccountDetailHeader } from "./AccountDetailHeader";
import { AccountInfoSection } from "./AccountInfoSection";
import { AccountContactsSection } from "./AccountContactsSection";

type AccountDetailClientProps = {
  accountId: string;
};

export function AccountDetailClient({ accountId }: AccountDetailClientProps) {
  const router = useRouter();

  const { accounts, contacts, notes } = useCRMStore();

  const account = accounts?.find((a) => a.id === accountId);

  const accountContacts = useMemo(
    () => (contacts ?? []).filter((c) => c.accountId === accountId),
    [contacts, accountId]
  );

  const accountNotes = useMemo(
    () =>
      (notes ?? []).filter(
        (n) => n.targetType === "account" && n.targetId === accountId
      ),
    [notes, accountId]
  );

  if (!account) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <p className="text-sm text-slate-500">
            Account not found. It may have been deleted or moved back to Leads.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/crm/accounts")}
            className="mt-3"
          >
            Back to accounts list
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AccountDetailHeader account={account} />

      <div className="grid gap-6 lg:grid-cols-[2fr,1.5fr] lg:items-start">
        <AccountInfoSection account={account} />
        <AccountContactsSection account={account} contacts={accountContacts} />
      </div>

      {/* Account Notes Section */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Notes</h2>
        {accountNotes.length === 0 ? (
          <p className="text-sm text-slate-500">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {accountNotes.map((note: any) => (
              <li key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{note.author || "Unknown"}</span>
                  {note.createdAt && (
                    <span>
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-line text-sm text-slate-800">
                  {note.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
