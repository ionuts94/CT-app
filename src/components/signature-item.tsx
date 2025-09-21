import { Signature } from "@prisma/client"
import { Card } from "./ui/card"
import { Text } from "./topography"
import { cn } from "@/lib/utils"

type Props = {
  signature: Signature,
  isSelected?: boolean
}

export const SignatureItem: React.FC<Props> = ({ signature, isSelected }) => {
  return (
    <Card className={cn("p-4 rounded-lg gap-2 relative", isSelected && "border-primary")}>
      <Text className="flex gap-2 items-center" size="lg" weight="semibold">
        Software Solutions Group
      </Text>
      <Text className="flex gap-2 items-center" size="lg" weight="semibold">
        Ionut Sandu - {" "}
        <span className="opacity-70 font-semibold">
          Director
        </span>
      </Text>
      {signature.imageUrl &&
        <img src={signature.imageUrl} className="h-10 w-fit" />
      }
      {isSelected && <div className="absolute pointer-events-none top-0 left-0 bg-primary/5 z-10 h-full w-full rounded-lg" />}
    </Card>
  )
}