import { PageContainer } from "@/components/layout";
import { ContractsHeader } from "./components/contracts-header";
import { ContractsTable } from "./components/contracts-table";
import { ContractsFilterBar } from "./components/contracts-filter-bar";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import ContractService from "@/services/contracts";
import ContractAllowanceService from "@/services/contract-allowance";
import AuthService from "@/services/auth";
import { redirect } from "next/navigation";
import { KPIStats } from "../dashboard/components/kpi-stats";

type Props = {
  searchParams: Promise<{
    status: string
  }>
}

export default async function ContractsPage({ searchParams }: Props) {
  const { status } = await searchParams
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  if (!authUser) return redirect("/")
  const { data: contractsData, error: contractsError } = await withSafeService(() => ContractService.getUserContracts({ status, userId: authUser.id }))

  const response = await fetch("http://localhost:3001/pdf/generate", {
    method: "POST",
    headers: {
      "x-internal-token": "1234",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contractId: "2498c1b9-9578-4870-b81c-eaa2edb86f24",
      html
    })
  })

  console.log("Response")
  console.log(await response.json())

  return (
    <main className="min-h-screen" key={status || "default"}>
      <PageContainer className="flex flex-col gap-4">
        <ContractsHeader />
        <KPIStats userId={authUser.id} />
        <ContractsFilterBar status={status} />
        <ContractsTable contracts={contractsData || []} key={status || "default"} />
      </PageContainer>
    </main>
  )
}

const html = `<p><span style="font-size: 28px;"><strong>Contract de Furnizare cu Retaileri</strong></span></p><p></p><p></p><p><span style="font-size: 18px;"><strong>Preambul și Părți</strong></span></p><p></p><p>Acest contract este încheiat între Furnizor, cu sediul la {{ADRESA_FURNIZOR}}, reprezentat prin {{REPRESENTANT_FURNIZOR}} și Retailer, cu sediul la {{ADRESA_RETAILER}}, reprezentat prin {{REPRESENTANT_RETAILER}}. Acest contract a fost încheiat la {{DATA_INCHEIERII}} în {{LOCUL_INCHEIERII}}.</p><p></p><p><span style="font-size: 18px;"><strong>Obiectul Contractului / Scopul</strong></span></p><p></p><p>Obiectul prezentului contract este furnizarea de către Furnizor a 40 de tone de cireșe pe an pentru Retailer, timp de 5 ani. Livrarea se va face la adresa menționată de Retailer.</p><p></p><p></p><p><span style="font-size: 18px;"><strong>Preț, Facturare și Plăți</strong></span></p><p></p><p>Prețul pentru cireșe este de 15 £ per kilogram. Plata trebuie efectuată în termen de {{TERMEN_PLATA_ZILE}} zile de la emiterea facturii. Pedepsele pentru plățile întârziate vor fi de 0,1% pe zi. Furnizorul va emite facturi conform reglementărilor în vigoare. Indexarea prețurilor nu va fi aplicată pe durata acestui contract.</p><p></p><p></p><p><span style="font-size: 18px;"><strong>Durată și Cronologie</strong></span></p><p></p><p>Perioada contractului este de 5 ani, cu datele de început și sfârșit stabilite la semnarea acestui contract. Prezentul contract se poate prelungi cu acordul ambelor părți.</p><p></p><p></p><p><span style="font-size: 18px;"><strong>Obligațiile Părților</strong></span></p><p></p><p>Furnizorul se angajează să furnizeze 40 de tone de cireșe pe an pentru 5 ani. Retailerul se angajează să plătească contravaloarea mărfii conform termenelor stabilite.</p><p></p><p></p><p><span style="font-size: 18px;"><strong>Confidențialitate</strong></span></p><p>Părțile sunt de acord să păstreze confidențialitatea informațiilor contractuale, cu excepția cazurilor prevăzute de lege. Cadrul de confidențialitate va supraviețui terminării acestui contract.</p><p><span style="font-size: 18px;"><strong>Protecția Datelor (GDPR)</strong></span></p><p>Ambelor părți li se solicită să se conformeze prevederilor GDPR, cu respectarea minimă a securității. Rolurile de operator și de procesor, dacă sunt aplicabile, vor fi stabilite conform legii.</p><p><span style="font-size: 18px;"><strong>Forța Majoră</strong></span></p><p>În caz de forță majoră, partea afectată trebuie să notifice cealaltă parte în termen de 5 zile de la producerea evenimentului. Contractul poate fi reziliat după 60 de zile de la notificare, în cazul în care evenimentele de forță majoră persistă.</p><p><span style="font-size: 18px;"><strong>Reziliere</strong></span></p><p>Contractul poate fi reziliat cu un preaviz de {{PREAVIZ_ZILE}} de zile. În caz de încălcare, partea prejudiciată poate rezilia contractul după un termen de remediere de 5 zile. Pentru încălcări grave, rezilierea poate deveni efectivă imediat.</p><p><span style="font-size: 18px;"><strong>Legea Aplicabilă și Dispute</strong></span></p><p>Contractul este guvernat de legea română. Orice litigii vor fi soluționate de către instanța din {{JURISDICTIE}} sau printr-o procedură de arbitraj.</p><p><span style="font-size: 18px;"><strong>Notificări</strong></span></p><p>Orice comunicări trebuie să fie făcute prin canalele de comunicare agreate. Termenii notificărilor vor fi respectați conform legii. Adresele de e-mail de contact sunt {{EMAIL_FURNIZOR}} pentru Furnizor și {{EMAIL_RETAILER}} pentru Retailer.</p><p><span style="font-size: 18px;"><strong>Cesiune, Modificări și Acordul Întreg</strong></span></p><p>Contractul nu poate fi cedat sau modificat fără acordul ambelor părți. Acest contract reprezintă întreaga înțelegere între părți și înlocuiește orice alte discuții sau acorduri anterioare.</p>`