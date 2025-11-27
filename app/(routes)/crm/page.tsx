import HomeDashboardClient from "./_components/HomeDashboardClient";
import { mockSaaSMetrics } from "./_data/mockSaaSMetrics";

export default function CrmHomePage() {
  return (
    <div className="p-4 md:p-6">
      <HomeDashboardClient metrics={mockSaaSMetrics} />
    </div>
  );
}

