import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { PartyRole } from "@prisma/client"

type Props = {
  firstName?: string,
  lastName?: string,
  profilePictureUrl?: string | null,
  size?: "sm" | "md" | "lg" | "xl",
  className?: string,
  fallbackClassName?: string,
  partyRole: PartyRole
}

export const UserAvatar: React.FC<Props> = ({
  firstName,
  lastName,
  profilePictureUrl,
  className,
  fallbackClassName,
  size = "sm",
  partyRole = ""
}) => {
  return (
    <Avatar
      className={cn(
        size === "sm" && "",
        size === "md" && "size-[30px] lg:size-[42px]",
        size === "lg" && "size-[46px] lg:size-[58px]",
        size === "xl" && "size-[62px] lg:size-[74px]",
        className
      )}
    >
      <AvatarImage src={profilePictureUrl || undefined} />
      <AvatarFallback
        className={cn(
          size === "sm" && "",
          size === "md" && "text-[14px] lg:text-[18px]",
          size === "lg" && "text-[20px] lg:text-[24px]",
          size === "xl" && "text-[26px] lg:text-[30px]",
          partyRole === "SIGNER" && "bg-secondary text-secondary-foreground",
          partyRole === "SYSTEM" && "bg-secondary-foreground text-white",
          partyRole === "SENDER" && "bg-primary text-white"
        )}
      >
        {(firstName?.[0] || "A").toUpperCase() + (lastName?.[0] || "A").toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}