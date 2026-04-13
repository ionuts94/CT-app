import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { NotAfiliateYet } from "./components/not-afiliate-yet";

export default async function AfiliatesPage() {
  if (true) {
    return <NotAfiliateYet />
  }

  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>Billing</PageHeading>
          <PageSubHeading>
            Manage your subscription, usage, and invoices.
          </PageSubHeading>
        </PageHeader>

      </PageContainer>
    </main>
  )
}