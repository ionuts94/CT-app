import { PageWidth } from "@/components/layout"
import { PageHeader } from "./components/page-header"
import { FreeGetViewContract, GetContractWithCompany } from "@/actions/post/contracts"
import { ContractContentView } from "./components/contract-content-view"
import { UserContractAssistant } from "./components/user-contract-assistant"

type Props = {
    searchParams: Promise<{ c: string }>
}

export default async function ViewContractPage({ searchParams }: Props) {
    const { c } = await searchParams

    const { data, error } = await FreeGetViewContract({ contractId: c })

    console.log("error")

    console.log(error)

    console.log(data)

    if (!data) {
        return (
            <p>Nu am putut incarca contractul</p>
        )
    }

    return (
        <main className="bg-app flex flex-col min-h-screen">
            <PageHeader contract={data} />
            <PageWidth className="px-[70px] flex flex-1 gap-4 items-center justify-between py-6 shadow-sm">
                <div className="w-full lg:w-3/5">
                    <ContractContentView contract={data} />
                </div>
                <UserContractAssistant />
            </PageWidth>
        </main>
    )
}