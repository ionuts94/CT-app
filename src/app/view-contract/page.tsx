import { PageWidth } from "@/components/layout"
import { PageHeader } from "./components/page-header"
import { FreeGetViewContract } from "@/actions/post/contracts"
import { ContractContentView } from "./components/contract-content-view"
import { ReceiverContractAssistant } from "./components/assistant/receiver-contract-assistant"
import { CommentsSection } from "./components/comments-section"
import { GetContractComments } from "@/actions/post/contracts/comments"
import { GetAuthUser } from "@/actions/post/auth"
import { redirect } from "next/navigation"
import { LogAudit } from "@/actions/post/audit"

type Props = {
    searchParams: Promise<{ c: string }>
}

export default async function ViewContractPage({ searchParams }: Props) {
    const { c } = await searchParams

    const [
        { data: contractData, error: contractError },
        { data: commentsData, error: commentsError },
        { data: authUser }
    ] = await Promise.all([
        FreeGetViewContract({ contractId: c }),
        GetContractComments({ contractId: c }),
        GetAuthUser()
    ])

    if (!contractData) {
        return (
            <p>Nu am putut incarca contractul</p>
        )
    }

    if (authUser && authUser.email !== contractData.receiverEmail) {
        return redirect("/dashboard")
    }

    LogAudit({
        contractId: contractData?.id!,
        action: "CONTRACT_VIEWED",
        actorType: "SIGNER",
        ip: "192.168.1.1",
        userAgent: "Chrome",
        metadata: {},
        contractVersion: 1,
        userEmail: contractData.receiverEmail
    })

    return (
        <main className="bg-app flex flex-col min-h-screen">
            <PageHeader contract={contractData} />
            <PageWidth className="px-[70px] flex flex-1 gap-4 justify-between py-4 shadow-sm">
                <div className="w-full lg:w-3/5">
                    <ContractContentView contract={contractData} />
                </div>
                <div className="lg:w-2/5 flex-1">
                    <ReceiverContractAssistant contractContent={contractData.currentVersion.content as string} />
                </div>
            </PageWidth>
            <PageWidth className="px-[70px] py-4 w-full">
                <CommentsSection
                    comments={commentsData}
                    contract={contractData}
                    isSender={false}
                />
            </PageWidth>
        </main>
    )
}