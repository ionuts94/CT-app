import { Body, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "@prisma/client"
import { Plus } from "lucide-react"

type Props = {
  user: User
}

export const DashboardHeader: React.FC<Props> = ({ user }) => {
  return (
    <Card className="p-4">
      <CardContent className="p-0 flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <Text size="2xl" weight="semibold">
            Salut, {user.firstName} {user.lastName}
          </Text>
          <Body className="text-color-secondary">
            Gestioneaza si semneaza contracte cu claritate!
          </Body>
        </div>
        <Button className="cursor-pointer p-3">
          <Plus strokeWidth={3} />
          <TextCTA weight="extrabold" variant="secondary">
            CREAZA CONTRACT
          </TextCTA>
        </Button>
      </CardContent>
    </Card>
  )
}