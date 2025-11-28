import type { ReactNode } from "react";
import CrmSidebar from "./_components/CrmSidebar";

type CRMLayoutProps = {
  children: ReactNode;
};

export default function CRMLayout({ children }: CRMLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar sits flush on the left */}
      <CrmSidebar />

      {/* Main content column */}
      <main className="flex-1 overflow-y-auto">
        {/* If you still want content constrained, do it *inside* main */}
        <div className="px-4 py-6 md:px-8 md:py-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
