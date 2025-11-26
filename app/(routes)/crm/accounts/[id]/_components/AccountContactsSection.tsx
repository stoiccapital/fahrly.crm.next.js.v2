// app/(routes)/crm/accounts/[id]/_components/AccountContactsSection.tsx

'use client';

import { useState, FormEvent, useMemo, useEffect } from 'react';

import { useCRMStore } from '@/store/crmStore';

import type {
  AccountType,
  ContactType,
} from '@/app/(routes)/crm/accounts/_types';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
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

    setName('');
    setEmail('');
    setPhone('');
    setRole('');
    setIsPrimary(false);
    setIsAdding(false);
  };

  return (
    <section className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Contacts
        </h2>
        <button
          type="button"
          onClick={() => setIsAdding((prev) => !prev)}
          className="rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900"
        >
          {isAdding ? 'Cancel' : 'Add contact'}
        </button>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500">
            No contacts yet. Add the first point of contact for{' '}
            <span className="font-medium text-gray-700">
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
          <form onSubmit={handleSubmit} className="mt-2 space-y-3 border-t pt-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Mark as primary contact
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-xl border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900"
              >
                Save contact
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
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

  const [noteText, setNoteText] = useState('');

  const [isEditingContact, setIsEditingContact] = useState(false);

  const [contactForm, setContactForm] = useState<ContactFormState>(() => ({
    name: contact.name,
    email: contact.email,
    phone: contact.phone ?? '',
    role: contact.role ?? '',
    isPrimary: contact.isPrimary ?? false,
    summary: contact.summary ?? '',
  }));

  const [showFullContactSummary, setShowFullContactSummary] = useState(false);

  // Sync form when contact changes and not editing
  useEffect(() => {
    if (isEditingContact) return;

    setContactForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? '',
      role: contact.role ?? '',
      isPrimary: contact.isPrimary ?? false,
      summary: contact.summary ?? '',
    });
  }, [contact, isEditingContact]);

  const contactNotes = useMemo(
    () =>
      notes.filter(
        (n) => n.targetType === 'contact' && n.targetId === contact.id,
      ),
    [notes, contact.id],
  );

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    addNote({
      targetType: 'contact',
      targetId: contact.id,
      content: noteText.trim(),
    });

    setNoteText('');
  };

  const handleContactChange = (
    field: keyof ContactFormState,
    value: string | boolean,
  ) => {
    setContactForm((prev) => ({
      ...prev,
      [field]:
        field === 'summary' && typeof value === 'string'
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
      phone: contact.phone ?? '',
      role: contact.role ?? '',
      isPrimary: contact.isPrimary ?? false,
      summary: contact.summary ?? '',
    });
  };

  return (
    <li className="relative flex flex-col rounded-xl border bg-gray-50 px-3 py-2">
      <button
        type="button"
        onClick={() => {
          if (isEditingContact) {
            handleCancelContact();
          } else {
            setIsEditingContact(true);
          }
        }}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-xl border bg-white px-2 py-0.5 text-[10px] font-medium text-gray-800 shadow-sm hover:bg-gray-50"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="currentColor"></path>
        </svg>
        {isEditingContact ? 'Cancel' : 'Edit'}
      </button>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isEditingContact ? (
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                className="rounded-xl border px-2 py-1 text-sm text-gray-900 outline-none ring-0 focus:border-gray-400"
              />
            ) : (
              <p className="text-sm font-medium text-gray-900">
                {contact.name}
              </p>
            )}
            {!isEditingContact && contact.isPrimary && (
              <span className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Primary
              </span>
            )}
          </div>
          {isEditingContact ? (
            <input
              type="text"
              value={contactForm.role}
              onChange={(e) => handleContactChange('role', e.target.value)}
              placeholder="Role"
              className="mt-0.5 w-full rounded-xl border px-2 py-1 text-xs text-gray-900 outline-none ring-0 focus:border-gray-400"
            />
          ) : (
            <p className="text-xs text-gray-500">
              {contact.role || 'No role specified'}
            </p>
          )}
          {/* Contact summary always visible */}
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Contact summary
              </span>
            </div>

            {isEditingContact ? (
              <div className="mt-1 space-y-1">
                <textarea
                  value={contactForm.summary}
                  onChange={(e) => handleContactChange('summary', e.target.value)}
                  maxLength={CONTACT_SUMMARY_CHAR_LIMIT_UI}
                  placeholder={`Short summary of ${contact.name} (style, preferences, decision power)...`}
                  className="w-full h-16 rounded-xl border px-2 py-1.5 text-[11px] outline-none ring-0 focus:border-gray-400"
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-[10px] text-gray-400">
                    {contactForm.summary.length}/{CONTACT_SUMMARY_CHAR_LIMIT_UI}
                  </span>
                </div>
              </div>
            ) : (
              <>
                {(() => {
                  const full = contact.summary || 'No contact summary yet.';
                  const limit = 200;
                  const isLong = full.length > limit;
                  const displayed = isLong ? full.slice(0, limit) + '…' : full;

                  return (
                    <div className="text-[11px] text-gray-700">
                      <p>{isLong && !showFullContactSummary ? displayed : full}</p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() => setShowFullContactSummary((prev) => !prev)}
                          className="mt-1 text-[10px] font-medium text-blue-600 underline"
                        >
                          {showFullContactSummary ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
          {isEditingContact ? (
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="mt-0.5 w-full rounded-xl border px-2 py-1 text-xs text-gray-900 outline-none ring-0 focus:border-gray-400"
            />
          ) : (
            <p className="mt-1 text-xs text-gray-600">{contact.email}</p>
          )}
          {isEditingContact ? (
            <input
              type="tel"
              value={contactForm.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="mt-0.5 w-full rounded-xl border px-2 py-1 text-xs text-gray-900 outline-none ring-0 focus:border-gray-400"
            />
          ) : (
            contact.phone && (
              <p className="mt-0.5 text-xs text-gray-600">{contact.phone}</p>
            )
          )}
          {isEditingContact && (
            <label className="mt-1 flex items-center gap-2 text-[11px] text-gray-700">
              <input
                type="checkbox"
                checked={contactForm.isPrimary}
                onChange={(e) => handleContactChange('isPrimary', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Mark as primary contact
            </label>
          )}
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {isEditingContact && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancelContact}
            className="rounded-xl border px-3 py-1.5 text-[11px] text-gray-700 hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveContact}
            className="rounded-xl bg-black px-3 py-1.5 text-[11px] font-medium text-white hover:bg-gray-900"
          >
            Save changes
          </button>
        </div>
      )}

      {isNotesOpen && (
        <div className="mt-3 border-t pt-2">
          <form onSubmit={handleAddNote} className="mb-2 space-y-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={`Add a note about ${contact.name}...`}
              className="h-16 w-full rounded-xl border px-3 py-2 text-xs outline-none ring-0 focus:border-gray-400"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-black px-3 py-1.5 text-[11px] font-medium text-white hover:bg-gray-900"
              >
                Save note
              </button>
            </div>
          </form>

          <div className="space-y-1.5">
            {contactNotes.length === 0 ? (
              <p className="text-[11px] text-gray-500">
                No notes yet for this contact.
              </p>
            ) : (
              contactNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border bg-white px-2 py-1.5 text-[11px] text-gray-800"
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
          className="inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-[11px] font-medium text-gray-800 hover:bg-white"
        >
          <svg fill="currentColor" viewBox="0 0 32 32" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M25,26a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V5H17V3H5V26a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V13H25Z"></path>
              <path d="M27.12,2.88a3.08,3.08,0,0,0-4.24,0L17,8.75,16,14.05,21.25,13l5.87-5.87A3,3,0,0,0,27.12,2.88Zm-6.86,8.27-1.76.35.35-1.76,3.32-3.33,1.42,1.42Zm5.45-5.44-.71.7L23.59,5l.7-.71h0a1,1,0,0,1,1.42,0A1,1,0,0,1,25.71,5.71Z"></path>
            </g>
          </svg>
          <span>{contactNotes.length}</span>
        </button>
      </div>
    </li>
  );
}
