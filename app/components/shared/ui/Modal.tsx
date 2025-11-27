"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { CardHeader, CardTitle, CardDescription } from "./Card";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClassName?: string; // e.g. "max-w-lg"
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidthClassName = "max-w-lg"
}: ModalProps) {
  if (!isOpen) return null;

  function handleOverlayClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "w-full rounded-2xl bg-white p-6 shadow-xl",
          maxWidthClassName
        )}
      >
        <CardHeader className="mb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </CardHeader>
        <div className="mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

