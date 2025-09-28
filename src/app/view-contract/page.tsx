import { PageWidth } from "@/components/layout"
import { PageHeader } from "./components/page-header"
import { FreeGetViewContract, GetContractWithCompany } from "@/actions/post/contracts"
import { ContractContentView } from "./components/contract-content-view"
import { ReceiverContractAssistant } from "./components/assistant/receiver-contract-assistant"

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
            <PageWidth className="px-[70px] flex flex-1 gap-4 justify-between py-4 shadow-sm">
                <div className="w-full lg:w-3/5">
                    <ContractContentView contract={data} />
                </div>
                <div className="lg:w-2/5 flex-1">
                    <ReceiverContractAssistant />
                </div>
            </PageWidth>
        </main>
    )
}