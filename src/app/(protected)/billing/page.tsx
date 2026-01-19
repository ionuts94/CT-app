import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import { SubscriptionPlanCard } from "./components/subscription-plan-card";
import UserService from "@/services/users";

export default async function BillingPage() {
  const { data, error } = await withSafeService(() => UserService.getCurrentUserWithSubscription())

  console.log(data)

  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>Billing</PageHeading>
          <PageSubHeading>
            Manage your subscription, usage, and invoices.
          </PageSubHeading>
        </PageHeader>
        <SubscriptionPlanCard
          subscription={data?.subscription}
          user={data?.user!}
        />
      </PageContainer>
    </main>
  )
}
