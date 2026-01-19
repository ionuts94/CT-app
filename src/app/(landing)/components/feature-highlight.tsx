import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"

type Props = {}

export const FeatureHighlight: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-white">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionLabel>Transparent & Simple</SectionLabel>
          <SectionTitle className="max-w-fit text-center">
            A modern and secure way to manage contracts
          </SectionTitle>
          <SectionSubtitle className="text-center">
            Centralise all your contracts, discussions, and signatures in a single platform.
            Complete clarity for you and your clients.
          </SectionSubtitle>
        </SectionHeaderContainer>
      </LandingPageWidth>
    </div>
  )
}
