import { PageContainer } from "@/components/layout";
import { PageHeader, PageHeading, PageSubHeading } from "@/components/page-header";

export default async function ProfilePage() {
  return (
    <main className="min-h-screen" key={"default"}>
      <PageContainer className="flex flex-col gap-4">
        <PageHeader>
          <PageHeading>Profilul meu</PageHeading>
          <PageSubHeading>Gestioneaza informatiile tale de baza si in care apari in aplicatie.</PageSubHeading>
        </PageHeader>

        Profile page
      </PageContainer>
    </main>
  )
}