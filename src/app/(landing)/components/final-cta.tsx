import { Button } from "@/components/ui/button"
import { SectionHeaderContainer, SectionSubtitle, SectionTitle } from "./shared"
import { LandingPageWidth } from "./landing-page-width"
import Link from "next/link"

type Props = {}

export const FinalCta: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-slate-100">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionTitle className="max-w-[700px] text-center">
            Stop chasing signatures. Start closing deals.
          </SectionTitle>

          <SectionSubtitle className="text-center max-w-[700px]">
            You already did the hard part — don&apos;t lose deals at the last step.
          </SectionSubtitle>
        </SectionHeaderContainer>

        <Button className="px-8 py-4 font-medium shadow text-lg mt-12 mx-auto block" asChild>
          <Link href="/sign-up" className="block w-fit">
            Get your next contract signed
          </Link>
        </Button>
      </LandingPageWidth>
    </div>
  )
}