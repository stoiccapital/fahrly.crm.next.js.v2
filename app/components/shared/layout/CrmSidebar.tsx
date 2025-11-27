"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/crm", label: "Overview" },
  { href: "/crm/leads", label: "Leads" },
  { href: "/crm/accounts", label: "Accounts" },
  { href: "/crm/opportunities", label: "Opportunities" },
  { href: "/crm/proposals", label: "Proposals" },
  { href: "/crm/customers", label: "Customers" },
  { href: "/crm/tasks", label: "Tasks" },
  { href: "/crm/tickets", label: "Tickets" },
  { href: "/crm/reporting", label: "Reporting" },
];

export function CrmSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r shadow-sm p-4 flex flex-col gap-2">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-3 py-2 text-sm font-medium ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}

