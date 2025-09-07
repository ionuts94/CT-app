"use client"

import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Save } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {

}

export const TemplateHeader: React.FC<Props> = ({ }) => {
  const router = useRouter()

  const goToNewTemplate = () => router.push("/templates/new")

  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Creaza Sablon</PageHeading>
        {/* <PageSubHeading>Aici iti poti gestiona si organiza toate sabloanele</PageSubHeading> */}
      </PageHeader>
      <div className="flex items-stretch gap-1">
        <Button variant="outline" className="hover:bg-transparent hover:text-primary hover:opacity-75">
          <Eye strokeWidth={3} />
          <TextCTA>
            Previzualizeaza
          </TextCTA>
        </Button>
        <Button className="cursor-pointer p-3" variant="default" onClick={goToNewTemplate}>
          <Save strokeWidth={3} />
          <TextCTA weight="extrabold">
            SALVEAZA SABLON
          </TextCTA>
        </Button>
      </div>
    </div>
  )
}