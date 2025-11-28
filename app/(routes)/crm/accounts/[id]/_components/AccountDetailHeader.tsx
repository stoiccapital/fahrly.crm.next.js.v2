"use client";

import { useRouter } from "next/navigation";
import type { AccountType } from "@/app/(routes)/crm/accounts/_types";
import { Button, Badge } from "@/app/components/shared/ui";
import { useCRMStore } from "@/store/crmStore";

type AccountDetailHeaderProps = {
  account: AccountType;
};

const STATUS_LABELS: Record<AccountType["status"], string> = {
  prospect: "Prospect",
  customer: "Customer",
  churned: "Churned",
};

const LIFECYCLE_LABELS: Record<AccountType["lifecycleStage"], string> = {
  new: "New",
  active: "Active",
  expansion: "Expansion",
  churned: "Churned",
};

function getStatusVariant(status: AccountType["status"]) {
  switch (status) {
    case "customer":
      return "success";
    case "churned":
      return "danger";
    default:
      return "default";
  }
}

export function AccountDetailHeader({ account }: AccountDetailHeaderProps) {
  const router = useRouter();
  const { moveAccountToLead } = useCRMStore();

  const handleMoveToLeads = () => {
    moveAccountToLead(account.id);
    router.push("/crm/leads");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/crm/accounts")}
          className="h-8 w-8"
        >
          ←
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {account.companyName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {account.city && account.country
              ? `${account.city}, ${account.country}`
              : account.city || account.country || "No location"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={getStatusVariant(account.status) as any}>
          {STATUS_LABELS[account.status]}
        </Badge>
        <Badge variant="soft">
          {LIFECYCLE_LABELS[account.lifecycleStage]}
        </Badge>
        <Button size="sm" variant="secondary" onClick={handleMoveToLeads}>
          Move to Leads
        </Button>
      </div>
    </div>
  );
}
