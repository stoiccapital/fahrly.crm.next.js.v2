"use client";

import { ActivityItem } from "../_types";
import { Badge } from "@/app/components/shared/ui";

type Props = {
  items: ActivityItem[];
};

export function ActivityFeed({ items }: Props) {
  return (
    <div className="flex-1 space-y-2 overflow-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 transition-colors hover:bg-slate-50"
        >
          <div className="flex-1 min-w-0">
            <div className="mb-0.5 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-900 truncate">
                {item.title}
              </span>
              <TypeBadge type={item.type} />
            </div>
            <div className="text-xs text-slate-500">
              {item.description}
            </div>
          </div>
          <div className="shrink-0 text-[10px] text-slate-400">
            {item.timeAgo}
          </div>
        </div>
      ))}
      {!items.length && (
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-center text-xs text-slate-500">
          No recent activity.
        </div>
      )}
    </div>
  );
}

function TypeBadge({ type }: { type: ActivityItem["type"] }) {
  const map: Record<
    ActivityItem["type"],
    { label: string; className: string }
  > = {
    deal_won: {
      label: "Deal won",
      className: "bg-emerald-100 text-emerald-700",
    },
    signup: {
      label: "Signup",
      className: "bg-blue-100 text-blue-700",
    },
    churn: {
      label: "Churn",
      className: "bg-red-100 text-red-700",
    },
    ticket_opened: {
      label: "Ticket",
      className: "bg-amber-100 text-amber-700",
    },
    usage_spike: {
      label: "Usage",
      className: "bg-purple-100 text-purple-700",
    },
  };

  const { label, className } = map[type];

  return (
    <Badge className={`text-[10px] ${className}`}>
      {label}
    </Badge>
  );
}

