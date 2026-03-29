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
            Stop sending contracts like it&apos;s still 2012
          </SectionTitle>

          <SectionSubtitle className="text-center max-w-[700px]">
            Create, discuss, and sign contracts in one place. Start free with 3 included
            contracts. No card required.
          </SectionSubtitle>
        </SectionHeaderContainer>

        <Button className="px-8 py-4 font-medium shadow text-lg mt-12 mx-auto block" asChild>
          <Link href="/sign-up" className="block w-fit">
            Create a free account
          </Link>
        </Button>
      </LandingPageWidth>
    </div>
  )
}