import { cn } from "@/lib/utils"
import { Text } from "./topography"
import { Card } from "./ui/card"

type Props = {
    comment: any
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const { firstName, lastName, imageUrl, partyRole, content, createdAt } = comment
    return (
        <Card className="p-5">
            <div className="flex gap-2 items-center">
                <Avatar firstName={firstName} lastName={lastName} imageUrl={imageUrl} partyRole={partyRole} />
                <div>
                    <div className="flex items-center gap-2">
                        <Text weight="semibold">{firstName} {lastName}</Text>
                        <Text size="sm" className="rounded-full border px-2 py-1">{partyRole}</Text>
                    </div>
                    <Text size="sm" className="text-muted-foreground">Trimis {new Date(createdAt).toLocaleDateString()}</Text>
                </div>
            </div>
            {content &&
                <div className="break-words whitespace-pre-wrap"                >
                    {content}
                </div>
            }
        </Card>
    )
}

type AvatarProps = {
    imageUrl?: string,
    firstName: string,
    lastName: string,
    partyRole: string
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, firstName, lastName, partyRole }) => {
    console.log("partyRole: ", partyRole)
    if (imageUrl) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div
            className={cn(
                "size-10 rounded-full flex items-center justify-center",
                partyRole === "SIGNER" && "bg-secondary text-secondary-foreground",
                partyRole === "SYSTEM" && "bg-secondary-foreground text-white",
                partyRole === "SENDER" && "bg-primary text-white"
            )}
        >
            <Text className="uppercase font-semibold">{firstName[0]}{lastName[0]}</Text>
        </div>
    )
}