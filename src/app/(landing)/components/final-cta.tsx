import { Button } from "@/components/ui/button"
import { SectionHeaderContainer, SectionSubtitle, SectionTitle } from "./shared"
import { LandingPageWidth } from "./landing-page-width"

type Props = {

}

export const FinalCta: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px]">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionTitle className="max-w-[700px]">Începe astăzi să semnezi contracte mai rapid și mai sigur</SectionTitle>
          <SectionSubtitle className="text-center max-w-[700px]">
            Creează-ți gratuit contul și folosește cele 3 contracte incluse.
            Fără card. Fără obligații. Doar transparență și încredere.
          </SectionSubtitle>
        </SectionHeaderContainer>
        <Button className="px-8 py-4 font-medium shadow text-lg mt-12 mx-auto block">
          Creează-ți cont gratuit
        </Button>
      </LandingPageWidth>
    </div>
  )
}