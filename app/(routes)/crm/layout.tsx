import type { ReactNode } from "react";

import CRMNavbar from "./_components/CRMNavbar";

type CRMLayoutProps = {
  children: ReactNode;
};

export default function CRMLayout({ children }: CRMLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl">
        <CRMNavbar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
