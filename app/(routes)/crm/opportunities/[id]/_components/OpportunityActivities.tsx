"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  Textarea,
  Badge
} from "@/app/components/shared/ui";

type ActivityType = "Call" | "Meeting" | "Email" | "Note";

type Activity = {
  id: string;
  opportunityId: string;
  type: ActivityType;
  subject: string;
  date: string; // ISO date (YYYY-MM-DD)
  author: string;
  notes?: string;
};

type Props = {
  opportunityId: string;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

export function OpportunityActivities({ opportunityId }: Props) {
  const [activities, setActivities] = useState<Activity[]>(() => [
    {
      id: "act-1",
      opportunityId,
      type: "Call",
      subject: "Intro call with main contact",
      date: todayISO(),
      author: "Anh Chu",
      notes: "Discussed high-level goals, agreed to send follow-up proposal."
    }
  ]);

  const [isLogging, setIsLogging] = useState(false);

  const [form, setForm] = useState<{
    type: ActivityType;
    subject: string;
    date: string;
    author: string;
    notes: string;
  }>({
    type: "Call",
    subject: "",
    date: todayISO(),
    author: "Anh Chu",
    notes: ""
  });

  const filteredActivities = activities
    .filter((a) => a.opportunityId === opportunityId)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim()) {
      return;
    }

    const newActivity: Activity = {
      id: "act-" + Math.random().toString(36).slice(2, 8),
      opportunityId,
      type: form.type,
      subject: form.subject.trim(),
      date: form.date,
      author: form.author.trim() || "Unknown",
      notes: form.notes.trim() || undefined
    };

    setActivities((prev) => [newActivity, ...prev]);
    setForm({
      type: "Call",
      subject: "",
      date: todayISO(),
      author: "Anh Chu",
      notes: ""
    });
    setIsLogging(false);
  };

  return (
    <Card>
      <CardHeader className="mb-3 flex items-center justify-between">
        <CardTitle>Activity log</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setIsLogging((prev) => !prev)}
        >
          {isLogging ? "Cancel" : "Log activity"}
        </Button>
      </CardHeader>
      <CardContent className="mt-0 space-y-4">
        {isLogging && (
          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Type
                </label>
                <Select
                  value={form.type}
                  onChange={(e) =>
                    handleChange("type", e.target.value as ActivityType)
                  }
                >
                  <option value="Call">Call</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Email">Email</option>
                  <option value="Note">Note</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Date
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Subject *
              </label>
              <Input
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="e.g. Discovery call, demo, follow-up email"
                required
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Owner
                </label>
                <Input
                  value={form.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  placeholder="e.g. Anh Chu"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Notes
              </label>
              <Textarea
                rows={3}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="What happened? What did you agree on? Next steps..."
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setIsLogging(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save activity
              </Button>
            </div>
          </form>
        )}
        {filteredActivities.length === 0 ? (
          <p className="text-xs text-gray-500">
            No activities logged yet. Use{" "}
            <span className="font-medium">Log activity</span> to add your first
            touchpoint.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-3 py-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="soft">{activity.type}</Badge>
                    <span className="text-xs text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {activity.subject}
                  </div>
                  <div className="text-xs text-gray-500">
                    Logged by {activity.author}
                  </div>
                  {activity.notes && (
                    <p className="text-xs text-gray-600">{activity.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
