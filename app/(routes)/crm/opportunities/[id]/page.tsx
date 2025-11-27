import { notFound } from "next/navigation";

import { opportunities } from "../_data/mockOpportunities";

import type { Opportunity } from "./_types";

import { OpportunityDetailClient } from "./_components/OpportunityDetailClient";

type Props = {
  params: { id: string };
};

export default function OpportunityDetailPage({ params }: Props) {
  const opportunity: Opportunity | undefined = opportunities.find(
    (opp) => opp.id === params.id
  );

  if (!opportunity) {
    notFound();
  }

  return <OpportunityDetailClient opportunity={opportunity} />;
}
