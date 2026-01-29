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
    <div className="flex flex-col items-start gap-2 justify-between md:flex-row">
      <PageHeader>
        <PageHeading>Templates</PageHeading>
        <PageSubHeading>
          Manage and organise all your contract templates in one place
        </PageSubHeading>
      </PageHeader>
      <Button className="cursor-pointer p-3 w-full md:w-fit" variant={"outline"} onClick={goToNewTemplate}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREATE TEMPLATE
        </TextCTA>
      </Button>
    </div>
  )
}
