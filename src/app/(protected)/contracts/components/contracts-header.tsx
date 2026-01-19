import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { NewContractDialog } from "./new-contract-dialog"

type Props = {

}

export const ContractsHeader: React.FC<Props> = ({ }) => {
  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Contracts</PageHeading>
        <PageSubHeading>
          Manage and organise all your contracts in one place
        </PageSubHeading>
      </PageHeader>
      <NewContractDialog />
    </div>
  )
}