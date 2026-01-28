import { Signature } from "@prisma/client"
import { Card } from "./ui/card"
import { Text } from "./topography"
import { cn } from "@/lib/utils"

type Props = {
  signature: Signature,
  isSelected?: boolean,
  companyName: string,
  userName: string,
  role?: string,
  className?: string
}

export const SignatureItem: React.FC<Props> = ({ signature, isSelected, companyName, userName, role, className }) => {
  return (
    <Card className={cn("p-4 rounded-lg relative", isSelected && "border-primary", className)}>
      <div className="w-fit flex flex-col gap-4">
        <div>
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {companyName}
          </Text>
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {userName} {" "}
            {role &&
              <>
                - {" "}
                <span className="opacity-70 font-semibold">
                  {role}
                </span>
              </>
            }
          </Text>
        </div>
        {signature.imageUrl &&
          <div className="w-full flex justify-center">
            <img src={signature.imageUrl} className="h-10 w-fit" />
          </div>
        }
      </div>
      {isSelected && <div className="absolute pointer-events-none top-0 left-0 bg-primary/5 z-10 h-full w-full rounded-lg" />}
    </Card>
  )
}