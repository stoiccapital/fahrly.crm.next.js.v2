// app/(routes)/crm/opportunities/[id]/_components/OpportunityActivities.tsx

type ActivityType = "call" | "email" | "meeting" | "note";

type Activity = {
  id: string;
  opportunityId: string;
  type: ActivityType;
  title: string;
  description?: string;
  at: string; // ISO date/time
  owner: string;
};

type Props = {
  opportunityId: string;
};

const nowIso = () => new Date().toISOString();

const mockActivities: Activity[] = [
  {
    id: "act-1",
    opportunityId: "opp-1",
    type: "call",
    title: "Discovery Call – Anforderungen Flottenleiter",
    description: "Use Cases für Dashcams und Fahrgasttracking geklärt.",
    at: nowIso(),
    owner: "Anh Chu"
  },
  {
    id: "act-2",
    opportunityId: "opp-1",
    type: "email",
    title: "Angebot v1 gesendet",
    description: "PDF-Angebot per E-Mail an Einkauf gesendet.",
    at: nowIso(),
    owner: "Anh Chu"
  },
  {
    id: "act-3",
    opportunityId: "opp-2",
    type: "meeting",
    title: "Workshop mit Operations & IT",
    description: "Architektur und Rollout-Plan diskutiert.",
    at: nowIso(),
    owner: "Anh Chu"
  }
];

const typeLabel: Record<ActivityType, string> = {
  call: "Call",
  email: "E-Mail",
  meeting: "Meeting",
  note: "Note"
};

export function OpportunityActivities({ opportunityId }: Props) {
  const activities = mockActivities.filter(
    (act) => act.opportunityId === opportunityId
  );

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Activities
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          Activity loggen
        </button>
      </div>
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">
          Noch keine Aktivitäten für diese Opportunity.
        </p>
      ) : (
        <ol className="space-y-4 text-sm">
          {activities.map((act) => (
            <li key={act.id} className="flex gap-3">
              <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                {typeLabel[act.type].slice(0, 1)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-gray-900">
                    {act.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(act.at).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </div>
                {act.description && (
                  <p className="mt-1 text-gray-700">
                    {act.description}
                  </p>
                )}
                <div className="mt-1 text-xs text-gray-500">
                  Owner: {act.owner} · Type: {typeLabel[act.type]}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
