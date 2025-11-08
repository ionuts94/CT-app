import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { KPIStats } from "../dashboard/components/kpi-stats";
import { ContractsFilter } from "./components/contracts-filter";
import { ContractsTable } from "./components/contracts-table";
import { GetAuthUserContracts } from "@/actions/post/contracts";

export default async function ContractsPage() {
  const { data: contractsData, error: contractsError } = await GetAuthUserContracts()

  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <ContractsHeader />
        <KPIStats />
        <ContractsFilter />
        <ContractsTable contracts={contractsData || []} />
      </PageContainer>
    </main>
  )
}