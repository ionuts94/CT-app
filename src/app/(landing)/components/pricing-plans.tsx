import Link from "next/link"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"
import { Button } from "@/components/ui/button"

export const PricingPlans: React.FC = ({ }) => {
  return (
    <div className="py-[110px]" id="pricing">
      <LandingPageWidth className="flex flex-col gap-[40px]">
        <SectionHeaderContainer>
          <SectionLabel>Simple & transparent pricing</SectionLabel>
          <SectionTitle className="hidden md:block">
            You only pay for the number of contracts you send.
          </SectionTitle>
          <SectionSubtitle className="text-center">
            All features are included in every plan.
          </SectionSubtitle>
        </SectionHeaderContainer>

        <div className="mx-auto w-full max-w-[680px] flex flex-col gap-4 items-center justify-center">
          <PricingCard
            pricingTitle="Trial"
            pricingDetails="3 free contracts. No card required. No commitments."
            price={<p className="text-xl font-bold text-primary">€0</p>}
          />

          <PricingCard
            pricingTitle="Pay as you go"
            pricingDetails="No subscription. Pay only when you need it."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£5 / contract</p>}
          />

          <PricingCard
            pricingTitle="Starter"
            pricingDetails="10 contracts per month — ideal for freelancers."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£25 / month</p>}
          />

          <PricingCard
            isMostPopular
            pricingTitle="Team"
            pricingDetails="30 contracts per month — perfect for small teams."
            price={<p className="text-xl font-bold text-gray-900 whitespace-nowrap">£50 / month</p>}
          />

          <PricingCard
            pricingTitle="Business"
            pricingDetails="80 contracts per month — best value for growing companies."
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
