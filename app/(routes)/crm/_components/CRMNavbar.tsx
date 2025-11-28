"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/crm" },
  { label: "Leads", href: "/crm/leads" },
  { label: "Accounts", href: "/crm/accounts" },
  { label: "Opportunities", href: "/crm/opportunities" },
  { label: "Proposals", href: "/crm/proposals" },
  { label: "Customers", href: "/crm/customers" },
  { label: "Tasks", href: "/crm/tasks" },
  { label: "Tickets", href: "/crm/tickets" },
  { label: "Reporting", href: "/crm/reporting" },
];

export default function CRMNavbar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 text-xs font-semibold text-white shadow-sm">
          CRM
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold tracking-tight text-slate-50">
            Fahrly CRM
          </div>
          <div className="text-[11px] text-slate-400">
            Internal GTM workspace
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 text-sm">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(item.href) && item.href !== "/crm");

            const baseClasses =
              "group flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150";
            const activeClasses =
              "bg-slate-900/80 text-slate-50 shadow-sm";
            const inactiveClasses =
              "text-slate-300 hover:bg-slate-900/40 hover:text-slate-50";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${baseClasses} ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {/* Accent bar / dot */}
                <span
                  className={[
                    "inline-flex h-5 w-0.5 rounded-full transition-colors",
                    isActive
                      ? "bg-gradient-to-b from-indigo-400 via-sky-400 to-emerald-400"
                      : "bg-slate-700 group-hover:bg-slate-500",
                  ].join(" ")}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer meta */}
      <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-500">
        <div className="flex items-center justify-between">
          <span>v1 · Mock data</span>
          <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-0.5 text-[10px] font-medium text-slate-300">
            Local
          </span>
        </div>
      </div>
    </aside>
  );
}
