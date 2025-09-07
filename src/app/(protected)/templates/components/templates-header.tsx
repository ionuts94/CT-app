"use client"

import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {

}

export const TemplatesHeader: React.FC<Props> = ({ }) => {
  const router = useRouter()

  const goToNewTemplate = () => router.push("/templates/new")

  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Saboloane</PageHeading>
        <PageSubHeading>Aici iti poti gestiona si organiza toate sabloanele</PageSubHeading>
      </PageHeader>
      <Button className="cursor-pointer p-3" variant={"outline"} onClick={goToNewTemplate}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREEAZA SABLON
        </TextCTA>
      </Button>
    </div>
  )
}