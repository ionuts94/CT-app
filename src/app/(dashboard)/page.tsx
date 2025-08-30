import { H1, Text } from "@/components/topography"
import { StatsCard } from "./components/stats-card"
import { ContractsTable } from "./components/contracts-table"
import { Header } from "@/components/header"
import { PageContainer } from "@/components/layout"
import { DashboardHeader } from "./components/dashboard-header"
import { userMockData } from "@/mock-data/user"
import { KPIStats } from "./components/kpi-stats"

const sampleContracts = [
  { id: "1", title: "Contract Servicii Foto", client: "Studio Lumi", status: "PENDING", updatedAt: "2h ago" },
  { id: "2", title: "Contract Mentenantă", client: "ACME SRL", status: "SIGNED", updatedAt: "Yesterday" },
  { id: "3", title: "Contract Consultanță", client: "BlueLine", status: "DRAFT", updatedAt: "2 days ago" },
] as const

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <PageContainer className="flex flex-col gap-4">
        <DashboardHeader user={userMockData} />
        <KPIStats />

        {/* Recent contracts table */}
        <ContractsTable data={sampleContracts as any} />
      </PageContainer>
    </div>
  )
}
