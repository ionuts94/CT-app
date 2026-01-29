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
import { SignatureItem } from "@/components/signature-item"
import CTSignatures from "@/sdk/signatures"
import { useUserContext } from "@/contexts/user-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
    userId: string,
    signatures: Signature[],
    preferences: UserPreferences
}

export const SignatureSettingsCard: React.FC<Props> = ({ userId, signatures, preferences }) => {
    const router = useRouter()
    const { user } = useUserContext()

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

    const handleChangeMainSignature = async (signatureId: string) => {
        if (processing.current) return;
        console.log("Changing signature")
        processing.current = true;

        toast.promise(
            async () => {
                const { error } = await CTSignatures.changeMainSignature({ newMainSignatureId: signatureId })

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
                <Label className="cursor-pointer flex items-center gap-2">
                    <Input
                        className="size-4"
                        type="checkbox"
                        onChange={handleToggleShowRoleOnSignature}
                        checked={showRoleOnSignature}
                    />
                    Show my role next to my signature
                </Label>

                {!user?.role && (
                    <div className="mt-1 flex items-center gap-1">
                        <Text size="sm" className="text-muted-foreground">
                            To display your role, please add one to your profile.
                        </Text>
                        <Button asChild variant="link" className="p-0 h-auto">
                            <Link href="/profile">
                                <Text size="sm" className="text-primary">
                                    Update profile
                                </Text>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {signatures.map(item => (
                    <div key={item.id} className="cursor-pointer relative" onClick={() => handleChangeMainSignature(item.id)}>
                        <SignatureItem
                            signature={item}
                            isSelected={item.isMainSignature}
                            companyName={user?.company.name!}
                            userName={user?.firstName + " " + user?.lastName}
                            role={(user?.role && showRoleOnSignature) ? user?.role : undefined}
                        />
                        {item.isMainSignature &&
                            <span className="absolute top-3 right-3 h-fit px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                main signature
                            </span>
                        }
                    </div>
                ))}
            </div>
        </Card>
    )
}