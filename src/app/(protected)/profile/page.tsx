import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";
import { ProfileSettingsCard } from "../settings/components/profile-settings-card";

export default async function ProfilePage() {
  return (
    <main className="min-h-screen" key={"default"}>
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>My profile</PageHeading>
          <PageSubHeading>
            Manage your basic information and how you appear in the application.
          </PageSubHeading>
        </PageHeader>
        <ProfileSettingsCard />
      </PageContainer>
    </main>
  )
}
