import Link from "next/link"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"
import { Button } from "@/components/ui/button"

export const PricingPlans: React.FC = ({ }) => {
  return (
    <div className="py-[110px]">
      <LandingPageWidth className="flex flex-col gap-[40px]">
        <SectionHeaderContainer>
          <SectionLabel>Prețuri simple și transparente</SectionLabel>
          <SectionTitle className="hidden md:block">Plătești doar pentru numărul de contracte.</SectionTitle>
          <SectionSubtitle className="text-center">Toate funcționalitățile sunt incluse în orice plan.</SectionSubtitle>
        </SectionHeaderContainer>
        <div className="mx-auto w-full max-w-[680px] flex flex-col gap-4 items-center justify-center">
          <PricingCard
            pricingTitle="Trial"
            pricingDetails="3 contracte gratuite — fără obligații."
            price={<p className="text-xl font-bold text-primary">0 €</p>}
          />

          <PricingCard
            pricingTitle="Pay as You Go"
            pricingDetails="Plătești doar când ai nevoie — fără abonament lunar."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">5 € / contract</p>}
          />

          <PricingCard
            pricingTitle="Starter"
            pricingDetails="5 contracte incluse lunar — ideal pentru freelanceri."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">15 € / lună</p>}
          />

          <PricingCard
            isMostPopular
            pricingTitle="Team"
            pricingDetails="20 contracte incluse — perfect pentru echipe mici."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">30 € / lună</p>}
          />

          <PricingCard
            pricingTitle="Business"
            pricingDetails="50 contracte incluse — cel mai bun cost per contract."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">50 € / lună</p>}
          />

          <div className="mt-12">
            <Button className="px-8 py-4 font-medium shadow text-lg" asChild>
              <Link href="/sign-up">
                Creează-ți cont gratuit
              </Link>
            </Button>
          </div>
        </div>
      </LandingPageWidth>
    </div>
  )
}

type PricingCardProps = {
  pricingTitle: string,
  pricingDetails: string,
  price: React.ReactNode,
  isMostPopular?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ pricingTitle, pricingDetails, price, isMostPopular }) => {
  return (
    <div className="w-full flex justify-between items-center border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
      <div>
        {isMostPopular &&
          <span className="h-fit px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
            Cel mai popular
          </span>
        }
        <p className="font-semibold text-gray-800 text-[24px] flex items-center justify-between w-full">{pricingTitle}</p>
        <div className="md:hidden">
          {price}
        </div>
        <p className="text-gray-600 text-[16px]">{pricingDetails}</p>
      </div>
      <div className="hidden md:block">
        {price}
      </div>
    </div>
  )
}