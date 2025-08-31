import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {

}

export const ContractsHeader: React.FC<Props> = ({ }) => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Contracte</PageHeading>
        <PageSubHeading>Aici iti poti gestiona si organiza toate contractele</PageSubHeading>
      </PageHeader>
      <Button className="cursor-pointer p-3" variant={"outline"}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREAZA CONTRACT
        </TextCTA>
      </Button>
    </div>
  )
}