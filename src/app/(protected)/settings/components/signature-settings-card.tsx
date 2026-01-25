"use client"

import { Card } from "@/components/ui/card"
import { Signature, UserPreferences } from "@prisma/client"
import { Text } from "@/components/topography"
import { CreateNewSignatureDialog } from "./create-new-signature-dialog"
import { Input, Label } from "@/components/form-elements"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { sleep } from "@/lib/utils"
import CTUserPreferences from "@/sdk/user-preferences"

type Props = {
    userId: string,
    signatures: Signature[],
    preferences: UserPreferences
}

export const SignatureSettingsCard: React.FC<Props> = ({ userId, signatures, preferences }) => {
    const router = useRouter()
    const [showRoleOnSignature, setShowRoleOnSignature] = useState(preferences.showRoleOnSignature)
    // const [processing, setProcessing] = useState(false)

    console.log(signatures)

    const processing = useRef(false)

    const handleToggleShowRoleOnSignature = async () => {
        if (processing.current) return;
        processing.current = true;
        const newValue = !showRoleOnSignature
        setShowRoleOnSignature(newValue)
        toast.promise(
            async () => {
                const { data, error } = await CTUserPreferences.updateUserPreferences({
                    userId,
                    payload: {
                        showRoleOnSignature: newValue
                    }
                })

                if (error) throw new Error(error)
                return "Success"
            },
            {
                loading: "Saving preferences",
                success: (successMessage: string) => {
                    router.refresh()
                    return successMessage
                },
                error: (error: any) => error.message,
                finally: () => {
                    processing.current = false;
                }
            }
        )
    }

    return (
        <Card className="p-4 w-full">
            <div className="flex justify-between">
                <div>
                    <Text size="lg" weight="semibold">Signatures</Text>
                    <Text size="sm" className="text-muted-foreground">Manage how you sign your contracts</Text>
                </div>
                <CreateNewSignatureDialog />
            </div>
            <div>
                <Label className="cursor-pointer">
                    <Input className="size-4" type="checkbox" onChange={handleToggleShowRoleOnSignature} checked={showRoleOnSignature} />
                    I would like my role to appear with my signature on contracts
                </Label>
            </div>
            <div className="flex flex-col gap-2">
                {signatures.map(item => (
                    <Card key={item.id} className="h-[100px]">
                        <img className="h-full object-contain" src={item.imageUrl || ""} />
                    </Card>
                ))}
            </div>
        </Card>
    )
}