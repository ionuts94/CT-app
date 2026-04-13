import { PageContainer } from "@/components/layout"
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header"
import { WhatItIs } from "./what-it-is"
import { HowItWorks } from "./how-it-works"
import { ActivateAffiliateAccount } from "./activate-affiliate-account"

type Props = {

}

export const NotAfiliateYet: React.FC<Props> = ({ }) => {


  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4 max-w-5xl mx-auto">
        <PageHeader>
          <PageHeading>Pactly Affiliate Program</PageHeading>
          <PageSubHeading>
            Invite other users to Pactly and earn 30% from every payment made by the customers you refer.
            <br />
            The page is kept intentionally simple: understand how it works, accept the terms, and activate your affiliate account.
          </PageSubHeading>
        </PageHeader>


        <div className="flex flex-col gap-4">
          <WhatItIs />
          <HowItWorks />
          <ActivateAffiliateAccount />
        </div>



      </PageContainer>
    </main>
  )
}