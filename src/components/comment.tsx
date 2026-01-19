import { CommentWithUser } from "@/types/services/comments"
import { Text } from "./topography"
import { Card } from "./ui/card"
import { UserAvatar } from "./user-avatar"
import { PartyRole } from "@prisma/client"
import { format } from "date-fns"

type Props = {
    comment: CommentWithUser
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const { firstName, lastName, user, partyRole, content, createdAt } = comment

    return (
        <Card className="p-5">
            <div className="flex gap-2 items-center">
                <UserAvatar
                    partyRole={partyRole}
                    size="md"
                    firstName={firstName}
                    lastName={lastName}
                    profilePictureUrl={user?.profilePictureUrl}
                />
                <div>
                    <div className="flex items-center gap-2">
                        <Text weight="semibold">{firstName} {lastName}</Text>
                        <Text size="sm" className="rounded-full border px-2 py-1">{partyRole}</Text>
                    </div>
                    <Text size="sm" className="text-muted-foreground">Sent at {format(createdAt, "dd.MM.yyyy, HH:mm:ss")}</Text>
                </div>
            </div>
            {content &&
                <div className="break-words whitespace-pre-wrap">
                    {content}
                </div>
            }
        </Card>
    )
}