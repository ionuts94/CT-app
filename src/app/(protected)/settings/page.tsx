import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { ProfileSettingsCard } from "./components/profile-settings-card";
import { CompanySettingsCard } from "./components/company-settings-card";
import { SignatureSettingsCard } from "./components/signature-settings-card";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import UserService from "@/services/users";
import SignatureService from "@/services/signatures";

export default async function SettingPage() {
  const [
    { data: userWithCompanyData, error: userWithCompanyError },
    { data: signaturesData, error: signaturesError },
  ] = await Promise.all([
    withSafeService(() => UserService.getCurrentUserWithCompany()),
    withSafeService(() => SignatureService.getAuthUserSignatures())
  ])

  const company = userWithCompanyData?.user.company

  return (
    <main className="min-h-screen" key={"default"}>
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>Settings</PageHeading>
          <PageSubHeading>
            Manage your company branding and signatures.
          </PageSubHeading>
        </PageHeader>
        <div className="flex gap-4 flex-col lg:flex-row">
          <CompanySettingsCard company={company} />
          <SignatureSettingsCard signatures={signaturesData || []} />
        </div>
      </PageContainer>
    </main>
  )
}