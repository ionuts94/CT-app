import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { NewContractDialog } from "./new-contract-dialog"

type Props = {

}

export const ContractsHeader: React.FC<Props> = ({ }) => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Contracte</PageHeading>
        <PageSubHeading>Aici iti poti gestiona si organiza toate contractele</PageSubHeading>
      </PageHeader>
      <NewContractDialog />
    </div>
  )
}