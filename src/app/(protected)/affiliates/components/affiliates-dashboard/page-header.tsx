import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { HowItWorksDialog } from "./how-it-works-dialog"
import { InviteUserDialog } from "./invite-user-dialog"

type Props = {

}

export const AffiliatesPageHeader: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
      <PageHeader>
        <PageHeading>Affiliate Dashboard</PageHeading>
        <PageSubHeading>
          Track your balance, manage inivtations, and monitor the customers attributed to your affilaite account.
        </PageSubHeading>
      </PageHeader>
      <div className="flex gap-2 items-center">
        <HowItWorksDialog />
        <InviteUserDialog />
      </div>
    </div>
  )
}