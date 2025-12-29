import { PageContainer } from "@/components/layout"
import { DashboardHeader } from "./components/dashboard-header"
import { userMockData } from "@/mock-data/user"
import { KPIStats } from "./components/kpi-stats"
import { UpcomingNext } from "./components/upcoming-next"
import { RecentContracts } from "./components/recent-contracts"
import { RecentActivity } from "./components/recent-activity"

export default async function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <PageContainer className="flex flex-col gap-4">
        <DashboardHeader />
        <KPIStats />
        <UpcomingNext />
        <div className="flex gap-4">
          <RecentContracts />
          <RecentActivity />
        </div>
      </PageContainer>
    </div>
  )
}
