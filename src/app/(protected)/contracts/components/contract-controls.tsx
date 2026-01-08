"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import CTEmail from "@/sdk/email"
import { Contract, ContractStatus } from "@prisma/client"
import { Eye, Pen, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SendContractDialog } from "../create/components/send-contract-dialog"
import { useDialog } from "@/hooks/use-dialog"
import { T_SendContractPayload } from "@/validators/contract.validator"

type Props = {
    contract: Contract
}

const LOCKED_SEND_STATES: ContractStatus[] = [
    ContractStatus.DECLINED,
    ContractStatus.EXPIRED,
    ContractStatus.FULLY_SIGNED,
    ContractStatus.REVOKED
]

const LOCKED_EDIT_STATES: ContractStatus[] = [
    ContractStatus.DECLINED,
    ContractStatus.EXPIRED,
    ContractStatus.FULLY_SIGNED,
    ContractStatus.REVOKED
]

const LOCKED_VIEW_STATES: ContractStatus[] = [
    ContractStatus.DRAFT
]

export const ContractControls: React.FC<Props> = ({ contract }) => {
    const router = useRouter()
    const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog()

    const isSendDisabled = LOCKED_SEND_STATES.includes(contract.status)
    const isEditDisabled = LOCKED_EDIT_STATES.includes(contract.status)
    const isViewDisabled = LOCKED_VIEW_STATES.includes(contract.status)

    const handleView = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isViewDisabled) return toast.info("Contractul nu poate fi vizualizat încă.\nTrimite-l mai întâi spre semnare pentru a putea fi accesat.")
        router.push("/c/view-contract?c=" + contract.id)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isEditDisabled) return toast.info("Contractul nu mai poate fi editat.\nStatusul actual îl face definitiv.")
        router.push("/contracts/edit?c=" + contract.id)
    }

    const handleOpenSendContract = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isSendDisabled) return toast.info("Contractul a fost deja trimis sau este finalizat.\nNu mai poate fi retrimis.")
        openDialog()
    }

    const handleSendContract = async (sendValues: T_SendContractPayload) => {
        console.log("Send values")
        console.log(sendValues)
        const { error } = await CTEmail.sendContractToClient({
            contractId: contract.id,
            optionalMessage: sendValues.optionalMessage,
            receiverEmail: sendValues.receiverEmail,
            signingDeadline: sendValues.signingDeadline,
        })
        if (error) return toast.error("Nu am putut trimite contractul. Va rugam incercati din nou iar daca problema persista puteti incerca manual din pagina de editare a contractului.")
        toast.success("Contractul a fost trimis cu succes. Destinatarul va primi un email cu linkul de semnare.")
        router.refresh()
        closeDialog()
    }


    return (
        <div className="flex items-center gap-1 w-fit">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleView}
                        variant="outline"
                        className={cn("!p-[4px] border-[1px]", isViewDisabled && "opacity-40")}
                    >
                        <Eye />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isViewDisabled ? "Disponibil după trimitere" : "Vezi contractul"}</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleEdit}
                        variant="outline"
                        className={cn("!p-[4px] border-[1px]", isEditDisabled && "opacity-40")}
                    >
                        <Pen />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isEditDisabled ? "Editarea nu mai este permisă" : "Editează contractul"}</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleOpenSendContract}
                        variant="outline"
                        className={cn("!p-[4px] border-[1px]", isSendDisabled && "opacity-40")}
                    >
                        <Send />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isSendDisabled ? "Nu mai poate fi trimis" : "Trimite spre semnare"}</p>
                </TooltipContent>
            </Tooltip>
            <SendContractDialog
                isOpen={isOpen}
                receiverEmail={contract.receiverEmail}
                signingDeadline={contract.signingDeadline || undefined}
                optionalMessage={contract.optionalMessage}
                onOpenChange={toggleDialog}
                onSendContract={handleSendContract}
            />
        </div >
    )
}