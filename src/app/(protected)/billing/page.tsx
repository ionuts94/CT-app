import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import UserService from "@/services/users";
import { PlanCard } from "./components/plan-card";

export default async function BillingPage() {
  const { data, error } = await withSafeService(() => UserService.getCurrentUserWithSubscription())

  const userPlan = data?.user.subscription?.plan || "FREE"

  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>Facturare</PageHeading>
          <PageSubHeading>Gestionează-ți abonamentul, consumul și facturile.</PageSubHeading>
        </PageHeader>
        <PlanCard
          subscription={data?.user.subscription}
        />
      </PageContainer>
    </main>
  )
}