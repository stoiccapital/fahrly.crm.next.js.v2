// app/(routes)/crm/opportunities/[id]/_components/OpportunityStageBar.tsx

import type { Opportunity } from "../_types";

import { formatStage, stageOrder } from "../../_data/mockOpportunities";

type Props = {
  opportunity: Opportunity;
};

export function OpportunityStageBar({ opportunity }: Props) {
  const currentIndex = stageOrder.indexOf(opportunity.stage);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">
          Stage: {formatStage(opportunity.stage)}
        </p>
        <p className="text-xs text-gray-500">
          Progress through the funnel from Qualified to Won or Lost.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs font-medium">
        {stageOrder.map((stage, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  "flex h-7 flex-none items-center justify-center rounded-full border px-2.5",
                  isCurrent
                    ? "border-gray-900 bg-gray-900 text-white"
                    : isDone
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                ].join(" ")}
              >
                {formatStage(stage)}
              </div>
              {index < stageOrder.length - 1 && (
                <div className="flex-1 border-t border-dashed border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
