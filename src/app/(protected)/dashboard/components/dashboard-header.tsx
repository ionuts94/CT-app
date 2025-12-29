"use client"

import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { Body, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUserContext } from "@/contexts/user-context"
import { User } from "@prisma/client"
import { Plus } from "lucide-react"

type Props = {
}

export const DashboardHeader: React.FC<Props> = ({ }) => {
  const { user } = useUserContext()
  return (
    <Card className="p-4">
      <CardContent className="p-0 flex items-center justify-between">
        <PageHeader>
          <PageHeading>Salut, {user?.firstName} {user?.lastName}</PageHeading>
          <PageSubHeading>Gestioneaza si semneaza contracte cu claritate!</PageSubHeading>
        </PageHeader>

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