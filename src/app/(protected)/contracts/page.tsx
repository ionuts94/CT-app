import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { KPIStats } from "../dashboard/components/kpi-stats";
import { ContractsFilter } from "./components/contracts-filter";
import { ContractsTable } from "./components/contracts-table";

export default async function ContractsPage() {
  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <ContractsHeader />
        <KPIStats />
        <ContractsFilter />
        <ContractsTable />
      </PageContainer>
    </main>
  )
}