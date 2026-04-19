import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { NotAffiliateYet } from "./components/not-affiliate-yet/not-afiliate-yet";
import AffiliateService from "@/services/affiliate";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import AuthService from "@/services/auth";
import { redirect } from "next/navigation";
import { AffiliateDashboard } from "./components/affiliates-dashboard/afiliates-dashboard";

export default async function AfiliatesPage() {
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  if (!authUser) {
    return redirect("/sing-in")
  }

  const {
    data: affiliateAccountData,
    error: affiliateAccountError
  } = await withSafeService(() => AffiliateService.getAffiliateAccountByUserId({ userId: authUser?.id }))

  if (!affiliateAccountData) {
    return <NotAffiliateYet />
  }

  return (
    <main className="min-h-screen">
      <PageContainer className="flex flex-col gap-4">
        <AffiliateDashboard />
      </PageContainer>
    </main>
  )
}