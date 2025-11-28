"use client";

import { useState, FormEvent, useMemo, useEffect } from "react";

import { Card, CardHeader, CardTitle, Input, Textarea, Button, Badge } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";

import type {
  AccountType,
  ContactType,
} from "@/app/(routes)/crm/accounts/_types";

type AccountContactsSectionProps = {
  account: AccountType;
  contacts: ContactType[];
};

export function AccountContactsSection({
  account,
  contacts,
}: AccountContactsSectionProps) {
  const { addContact } = useCRMStore();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email) return;

    addContact({
      accountId: account.id,
      name,
      email,
      phone: phone || undefined,
      role: role || undefined,
      isPrimary,
    });

    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setIsPrimary(false);
    setIsAdding(false);
  };

  return (
    <Card className="p-6">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Contacts
          </CardTitle>
          <Button
            type="button"
            size="sm"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            {isAdding ? "Cancel" : "Add contact"}
          </Button>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {contacts.length === 0 && !isAdding && (
          <p className="text-sm text-slate-500">
            No contacts yet. Add the first point of contact for{" "}
            <span className="font-medium text-slate-700">
              {account.companyName}
            </span>
            .
          </p>
        )}

        {contacts.length > 0 && (
          <ul className="space-y-3">
            {contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </ul>
        )}

        {isAdding && (
          <form onSubmit={handleSubmit} className="mt-2 space-y-3 border-t border-slate-200 pt-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Name *
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Email *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Role
                </label>
                <Input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Mark as primary contact
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save contact
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}

type ContactItemProps = {
  contact: ContactType;
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  isPrimary: boolean;
  summary: string;
};

function ContactItem({ contact }: ContactItemProps) {
  const { notes, addNote, updateContactDetails } = useCRMStore();

  const CONTACT_SUMMARY_CHAR_LIMIT_UI = 250;

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormState>(() => ({
    name: contact.name,
    email: contact.email,
    phone: contact.phone ?? "",
    role: contact.role ?? "",
    isPrimary: contact.isPrimary ?? false,
    summary: contact.summary ?? "",
  }));

  const [showFullContactSummary, setShowFullContactSummary] = useState(false);

  // Sync form when contact changes and not editing
  useEffect(() => {
    if (isEditingContact) return;

    setContactForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? "",
      role: contact.role ?? "",
      isPrimary: contact.isPrimary ?? false,
      summary: contact.summary ?? "",
    });
  }, [contact, isEditingContact]);

  const contactNotes = useMemo(
    () =>
      notes.filter(
        (n) => n.targetType === "contact" && n.targetId === contact.id
      ),
    [notes, contact.id]
  );

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    addNote({
      targetType: "contact",
      targetId: contact.id,
      content: noteText.trim(),
    });

    setNoteText("");
  };

  const handleContactChange = (
    field: keyof ContactFormState,
    value: string | boolean
  ) => {
    setContactForm((prev) => ({
      ...prev,
      [field]:
        field === "summary" && typeof value === "string"
          ? value.slice(0, CONTACT_SUMMARY_CHAR_LIMIT_UI)
          : (value as never),
    }));
  };

  const handleSaveContact = () => {
    updateContactDetails({
      contactId: contact.id,
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      role: contactForm.role.trim(),
      isPrimary: contactForm.isPrimary,
      summary: contactForm.summary,
    });

    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setIsEditingContact(false);
    setContactForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? "",
      role: contact.role ?? "",
      isPrimary: contact.isPrimary ?? false,
      summary: contact.summary ?? "",
    });
  };

  return (
    <li className="relative flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          if (isEditingContact) {
            handleCancelContact();
          } else {
            setIsEditingContact(true);
          }
        }}
        className="absolute right-2 top-2 text-[10px]"
      >
        {isEditingContact ? "Cancel" : "Edit"}
      </Button>
      <div className="flex items-start justify-between gap-2 pr-20">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isEditingContact ? (
              <Input
                type="text"
                value={contactForm.name}
                onChange={(e) => handleContactChange("name", e.target.value)}
                className="text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-slate-900">
                {contact.name}
              </p>
            )}
            {!isEditingContact && contact.isPrimary && (
              <Badge variant="default" className="text-[10px] uppercase">
                Primary
              </Badge>
            )}
          </div>
          {isEditingContact ? (
            <Input
              type="text"
              value={contactForm.role}
              onChange={(e) => handleContactChange("role", e.target.value)}
              placeholder="Role"
              className="mt-0.5 text-xs"
            />
          ) : (
            <p className="text-xs text-slate-500">
              {contact.role || "No role specified"}
            </p>
          )}
          {/* Contact summary always visible */}
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Contact summary
              </span>
            </div>

            {isEditingContact ? (
              <div className="mt-1 space-y-1">
                <Textarea
                  value={contactForm.summary}
                  onChange={(e) => handleContactChange("summary", e.target.value)}
                  maxLength={CONTACT_SUMMARY_CHAR_LIMIT_UI}
                  placeholder={`Short summary of ${contact.name} (style, preferences, decision power)...`}
                  rows={3}
                  className="text-[11px]"
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-[10px] text-slate-400">
                    {contactForm.summary.length}/{CONTACT_SUMMARY_CHAR_LIMIT_UI}
                  </span>
                </div>
              </div>
            ) : (
              <>
                {(() => {
                  const full = contact.summary || "No contact summary yet.";
                  const limit = 200;
                  const isLong = full.length > limit;
                  const displayed = isLong ? full.slice(0, limit) + "…" : full;

                  return (
                    <div className="text-[11px] text-slate-700">
                      <p>
                        {isLong && !showFullContactSummary ? displayed : full}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowFullContactSummary((prev) => !prev)
                          }
                          className="mt-1 text-[10px] font-medium text-indigo-600 underline"
                        >
                          {showFullContactSummary ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
          {isEditingContact ? (
            <Input
              type="email"
              value={contactForm.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              className="mt-0.5 text-xs"
            />
          ) : (
            <p className="mt-1 text-xs text-slate-600">{contact.email}</p>
          )}
          {isEditingContact ? (
            <Input
              type="tel"
              value={contactForm.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              className="mt-0.5 text-xs"
            />
          ) : (
            contact.phone && (
              <p className="mt-0.5 text-xs text-slate-600">{contact.phone}</p>
            )
          )}
          {isEditingContact && (
            <label className="mt-1 flex items-center gap-2 text-[11px] text-slate-700">
              <input
                type="checkbox"
                checked={contactForm.isPrimary}
                onChange={(e) =>
                  handleContactChange("isPrimary", e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300"
              />
              Mark as primary contact
            </label>
          )}
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {isEditingContact && (
        <div className="mt-3 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCancelContact}
            className="text-[11px]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSaveContact}
            className="text-[11px]"
          >
            Save changes
          </Button>
        </div>
      )}

      {isNotesOpen && (
        <div className="mt-3 border-t border-slate-200 pt-2">
          <form onSubmit={handleAddNote} className="mb-2 space-y-2">
            <Textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={`Add a note about ${contact.name}...`}
              rows={3}
              className="text-xs"
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" className="text-[11px]">
                Save note
              </Button>
            </div>
          </form>

          <div className="space-y-1.5">
            {contactNotes.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                No notes yet for this contact.
              </p>
            ) : (
              contactNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
                >
                  <p className="whitespace-pre-line text-[11px] text-slate-800">
                    {note.content}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {note.author || "Unknown"} ·{" "}
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsNotesOpen((prev) => !prev)}
          className="text-[11px]"
        >
          Notes ({contactNotes.length})
        </Button>
      </div>
    </li>
  );
}
