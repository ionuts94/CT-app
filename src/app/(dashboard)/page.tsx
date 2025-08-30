import { H1, Text } from "@/components/topography"
import { StatsCard } from "./components/stats-card"
import { ContractsTable } from "./components/contracts-table"
import { Header } from "@/components/header"
import { PageContainer } from "@/components/layout"
import { DashboardHeader } from "./components/dashboard-header"
import { userMockData } from "@/mock-data/user"

const sampleContracts = [
  { id: "1", title: "Contract Servicii Foto", client: "Studio Lumi", status: "PENDING", updatedAt: "2h ago" },
  { id: "2", title: "Contract Mentenantă", client: "ACME SRL", status: "SIGNED", updatedAt: "Yesterday" },
  { id: "3", title: "Contract Consultanță", client: "BlueLine", status: "DRAFT", updatedAt: "2 days ago" },
] as const

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <PageContainer>
        <DashboardHeader user={userMockData} />

        <div>
          <H1 className="mb-1">Dashboard</H1>
          <Text variant="secondary">Overview of your contracts and activity</Text>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard label="Active contracts" value="12" hint="+3 this week" />
          <StatsCard label="Pending signatures" value="5" />
          <StatsCard label="Signed (last 30d)" value="21" />
          <StatsCard label="AI reviews run" value="48" />
        </div>

        {/* Recent contracts table */}
        <ContractsTable data={sampleContracts as any} />
      </PageContainer>
    </div>
  )
}
