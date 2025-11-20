import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"

type Props = {

}

export const FeatureHighlight: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-white">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionLabel>Transparent și Simplu</SectionLabel>
          <SectionTitle className="max-w-fit text-center">Un mod modern și sigur de a gestiona contractele</SectionTitle>
          <SectionSubtitle className="text-center">Îți centralizezi toate contractele, discuțiile și semnăturile într-o singură platformă. Claritate totală pentru tine și pentru client.</SectionSubtitle>
        </SectionHeaderContainer>
      </LandingPageWidth>
    </div>
  )
}