import { T_ViewContract } from "@/actions/post/contracts"
import { ViewContractPageHeader } from "@/components/view-contract-page-header"

type Props = {
  contract: T_ViewContract
}

export const PageHeader: React.FC<Props> = ({ contract }) => {
  return (
    <ViewContractPageHeader contract={contract}>

    </ViewContractPageHeader>
  )
}