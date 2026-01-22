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
        if (isViewDisabled)
            return toast.info(
                "This contract can’t be viewed yet.\nSend it for signing first to make it accessible."
            )
        router.push("/c/view-contract?c=" + contract.id)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isEditDisabled)
            return toast.info(
                "This contract can no longer be edited.\nIts current status makes it final."
            )
        router.push("/contracts/edit?c=" + contract.id)
    }

    const handleOpenSendContract = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isSendDisabled)
            return toast.info(
                "This contract has already been sent or completed.\nIt can’t be sent again."
            )
        openDialog()
    }

    const handleSendContract = async (sendValues: T_SendContractPayload) => {
        const { error } = await CTEmail.sendContractToClient({
            contractId: contract.id,
            optionalMessage: sendValues.optionalMessage,
            receiverEmail: sendValues.receiverEmail,
            signingDeadline: sendValues.signingDeadline,
        })
        if (error)
            return toast.error(
                "We couldn’t send the contract. " + error
            )
        toast.success(
            "Contract sent successfully. The recipient will receive an email with the signing link."
        )
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
                    <p>{isViewDisabled ? "Available after sending" : "View contract"}</p>
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
                    <p>{isEditDisabled ? "Editing is no longer allowed" : "Edit contract"}</p>
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
                    <p>{isSendDisabled ? "Can’t be sent again" : "Send for signing"}</p>
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
