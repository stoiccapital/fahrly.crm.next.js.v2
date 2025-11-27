"use client";

import type { ReactNode } from "react";

type CrmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export function CrmModal({
  isOpen,
  onClose,
  title,
  description,
  children
}: CrmModalProps) {
  if (!isOpen) return null;

  function handleClose() {
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

