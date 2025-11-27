"use client";

import type { ReactNode } from "react";

import { Modal } from "@/app/components/shared/ui";

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      maxWidthClassName="max-w-lg"
    >
      {children}
    </Modal>
  );
}
