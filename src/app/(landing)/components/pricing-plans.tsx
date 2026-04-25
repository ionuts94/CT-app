import Link from "next/link"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"
import { Button } from "@/components/ui/button"

export const PricingPlans: React.FC = ({ }) => {
  return (
    <div className="py-[110px] bg-slate-100" id="pricing">
      <LandingPageWidth className="flex flex-col gap-[40px]">

        <SectionHeaderContainer>
          <SectionLabel>Pricing</SectionLabel>

          <SectionTitle className="hidden md:block">
            One signed deal pays for months of Pactly
          </SectionTitle>

          <SectionSubtitle className="text-center max-w-[720px]">
            Simple pricing based on how many contracts you send.
          </SectionSubtitle>
        </SectionHeaderContainer>

        <div className="mx-auto w-full max-w-[680px] flex flex-col gap-4 items-center justify-center">

          <PricingCard
            pricingTitle="Trial"
            pricingDetails="Try Pactly with 3 free contracts. No card required."
            price={<p className="text-xl font-bold text-primary">€0</p>}
          />

          <PricingCard
            pricingTitle="Pay as you go"
            pricingDetails="Perfect if you only send contracts occasionally."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£5 / contract</p>}
          />

          <PricingCard
            pricingTitle="Starter"
            pricingDetails="Up to 10 contracts per month. Ideal for freelancers and small businesses."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£25 / month</p>}
          />

          <PricingCard
            isMostPopular
            pricingTitle="Team"
            pricingDetails="Up to 30 contracts per month for growing teams that send contracts regularly."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£50 / month</p>}
          />

          <PricingCard
            pricingTitle="Business"
            pricingDetails="Up to 80 contracts per month for companies with higher contract volume."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£80 / month</p>}
          />

          <div className="mt-12">
            <Button className="px-8 py-4 font-medium shadow text-lg" asChild>
              <Link href="/sign-up">
                Create a free account
              </Link>
            </Button>
          </div>

        </div>
      </LandingPageWidth>
    </div>
  )
}

type PricingCardProps = {
  pricingTitle: string
  pricingDetails: string
  price: React.ReactNode
  isMostPopular?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  pricingTitle,
  pricingDetails,
  price,
  isMostPopular,
}) => {
  return (
    <div className="w-full flex justify-between items-center border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
      <div>

        {isMostPopular && (
          <span className="h-fit px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
            Most popular
          </span>
        )}

        <p className="font-semibold text-gray-800 text-[24px] flex items-center justify-between w-full">
          {pricingTitle}
        </p>

        <div className="md:hidden">
          {price}
        </div>

        <p className="text-gray-600 text-[16px]">
          {pricingDetails}
        </p>

      </div>

      <div className="hidden md:block">
        {price}
      </div>
    </div>
  )
}