import { Card } from "@/components/ui/card"
import { Signature } from "@prisma/client"
import { Text } from "@/components/topography"
import { CreateNewSignatureDialog } from "./create-new-signature-dialog"
import { Input, Label } from "@/components/form-elements"

type Props = {
    signatures: Signature[]
}

export const SignatureSettingsCard: React.FC<Props> = ({ signatures }) => {
    console.log(signatures)

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
                    <Input className="size-4" type="checkbox" />
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