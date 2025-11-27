'use client';

import type { ReactNode } from 'react';

import { CRMProvider } from '@/store/crmStore';
import { CrmSidebar } from "@/app/components/shared/layout/CrmSidebar";
import { CrmHeader } from "@/app/components/shared/layout/CrmHeader";

type CRMLayoutProps = {
  children: ReactNode;
};

export default function CRMLayout({ children }: CRMLayoutProps) {
  return (
    <CRMProvider>
      <div className="flex h-screen">
        <CrmSidebar />
        <div className="flex flex-col flex-1">
          <CrmHeader />
          <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </CRMProvider>
  );
}

