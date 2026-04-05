"use client"

import { ContractForm } from "./contract-form"
import { Signature, Template } from "@prisma/client"
import { T_ContractWithCompanyAndOwner } from "@/services/contracts/get"
import { useForm } from "react-hook-form"
import { ContractSchema, T_ContractPayload } from "@/validators/contract.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContractControlsSidebar } from "./contract-controls-sidebar"

type PropsTwo = {
    isEditing?: boolean,
    signatures: Signature[] | null,
    mainSignature: Signature,

    template?: Template | null,
    contract?: T_ContractWithCompanyAndOwner
}

export const PageContent: React.FC<PropsTwo> = ({ contract, mainSignature, signatures, isEditing, template, }) => {
    const form = useForm<T_ContractPayload>({
        resolver: zodResolver(ContractSchema),
        defaultValues: {
            title: "",
            content: "" as any,
            ownerSignatureId: mainSignature?.id || "",
            receiverName: "",
            receiverEmail: "",
            expiresAt: undefined,
            signingDeadline: undefined,
            optionalMessage: ""
        }
    })

    const renderContract = () => {
        if (contract) {
            return <ContractForm
                isEditing
                mainSignature={mainSignature}
                signatures={signatures}
                form={form}
                data={{
                    contractId: contract.id,
                    title: contract.title,
                    content: contract.currentVersionContent.content,
                    contractStatus: contract.status,
                    expiresAt: contract.expiresAt || undefined,
                    ownerSignatureId: contract.ownerSignatureId,
                    receiverEmail: contract.receiverEmail,
                    receiverName: contract.receiverName,
                    signingDeadline: contract.signingDeadline || undefined,
                    optionalMessage: contract.optionalMessage,
                }}
            />
        }

        return <ContractForm
            form={form}
            signatures={signatures}
            mainSignature={mainSignature}
            data={{
                content: template?.content as string,
                templateTitle: template?.title,
            }}
        />

    }

    return (
        <div className="grid grid-cols-[7fr_3fr] gap-4">
            {renderContract()}
            <ContractControlsSidebar form={form} />
        </div>
    )
}