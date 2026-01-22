import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { ContractsTable } from "./components/contracts-table";
import { ContractsFilterBar } from "./components/contracts-filter-bar";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import ContractService from "@/services/contracts";
import ContractAllowanceService from "@/services/contract-allowance";
import AuthService from "@/services/auth";
import { redirect } from "next/navigation";
import { KPIStats } from "../dashboard/components/kpi-stats";

type Props = {
  searchParams: Promise<{
    status: string
  }>
}

export default async function ContractsPage({ searchParams }: Props) {
  const { status } = await searchParams
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  if (!authUser) return redirect("/")
  const { data: contractsData, error: contractsError } = await withSafeService(() => ContractService.getUserContracts({ status, userId: authUser.id }))

  return (
    <main className="min-h-screen" key={status || "default"}>
      <PageContainer className="flex flex-col gap-4">
        <ContractsHeader />
        <KPIStats userId={authUser.id} />
        <ContractsFilterBar status={status} />
        <ContractsTable contracts={contractsData || []} key={status || "default"} />
      </PageContainer>
    </main>
  )
}