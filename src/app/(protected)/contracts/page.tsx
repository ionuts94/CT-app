import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { ContractsTable } from "./components/contracts-table";
import { ContractsFilterBar } from "./components/contracts-filter-bar";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import ContractService from "@/services/contracts";

type Props = {
  searchParams: Promise<{
    status: string
  }>
}

export default async function ContractsPage({ searchParams }: Props) {
  const { status } = await searchParams
  const { data: contractsData, error: contractsError } = await withSafeService(() => ContractService.getAuthUserContracts({ status }))

  return (
    <main className="min-h-screen" key={status || "default"}>
      <PageContainer className="flex flex-col gap-4">
        <ContractsHeader />
        {/* <KPIStats /> */}
        <ContractsFilterBar status={status} />
        <ContractsTable contracts={contractsData || []} key={status || "default"} />
      </PageContainer>
    </main>
  )
}