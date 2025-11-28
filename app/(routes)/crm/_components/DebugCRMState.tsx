"use client";

import { useEffect, useState } from "react";

import { useCRMStore } from "@/store/crmStore";

export function DebugCRMState() {
  const [hasMounted, setHasMounted] = useState(false);

  const state = useCRMStore((s) => s);

  // Ensure this only renders on the client after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // On the server (and initial client render), render nothing
  if (!hasMounted) return null;

  return (
    <div className="mb-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-3 text-[10px] text-slate-900">
      <div className="mb-1 font-semibold text-amber-800">
        🔍 CRM Debug (remove in production)
      </div>
      <div className="flex flex-wrap gap-2">
        <span>leads: {state.leads ? state.leads.length : "n/a"}</span>
        <span>accounts: {state.accounts ? state.accounts.length : "n/a"}</span>
        <span>
          opportunities:{" "}
          {state.opportunities ? state.opportunities.length : "n/a"}
        </span>
        <span>
          customers: {state.customers ? state.customers.length : "n/a"}
        </span>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer text-amber-700">
          Show raw state
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-white p-2">
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
}

