import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { KPIStats } from "../dashboard/components/kpi-stats";
import { ContractsTable } from "./components/contracts-table";
import { GetAuthUserContracts } from "@/actions/post/contracts";
import { ContractsFilterBar } from "./components/contracts-filter-bar";

type Props = {
  searchParams: Promise<{
    status: string
  }>
}

export default async function ContractsPage({ searchParams }: Props) {
  const { status } = await searchParams

  console.log("searchparams in page")
  console.log(status)

  const { data: contractsData, error: contractsError } = await GetAuthUserContracts({ status })

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