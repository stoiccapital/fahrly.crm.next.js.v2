'use client';

import type { ReactNode } from 'react';

import "@/styles/globals.css";
import { CRMProvider } from '@/store/crmStore';
import { CrmSidebar } from "./_components/CrmSidebar";
import { CrmHeader } from "./_components/CrmHeader";

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

