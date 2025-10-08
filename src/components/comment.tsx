import { cn } from "@/lib/utils"
import { Text } from "./topography"
import { Card } from "./ui/card"

type Props = {
    comment: any
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const { firstName, lastName, imageUrl, label, content, createdAt } = comment
    return (
        <Card className="p-5">
            <div className="flex gap-2 items-center">
                <Avatar firstName={firstName} lastName={lastName} imageUrl={imageUrl} label={label.toLowerCase()} />
                <div>
                    <div className="flex items-center gap-2">
                        <Text weight="semibold">{firstName} {lastName}</Text>
                        <Text size="sm" className="rounded-full border px-2 py-1">{label}</Text>
                    </div>
                    <Text size="sm" className="text-muted-foreground">Trimis: {createdAt.toLocaleDateString()}</Text>
                </div>
            </div>
            <div
            // dangerouslySetInnerHTML={{ __html: content }}
            >
                {content}
            </div>
        </Card>
    )
}

type AvatarProps = {
    imageUrl?: string,
    firstName: string,
    lastName: string,
    label: string
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, firstName, lastName, label }) => {
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
                label === "destinatar" && "bg-secondary text-secondary-foreground",
                label === "system" && "bg-secondary-foreground text-white",
                label === "companie" && "bg-primary text-white"
            )}
        >
            <Text className="uppercase font-semibold">{firstName[0]}{lastName[0]}</Text>
        </div>
    )
}