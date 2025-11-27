import type { AccountType } from "@/app/(routes)/crm/accounts/_types";

export type CustomerType = AccountType & {
  isCustomer: true;
  customerSince: string | null;
};

