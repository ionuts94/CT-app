import { ReceiptText, Send, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionSubtitle, SectionTitle } from "./shared"
import { Text } from "@/components/topography"
import { ReactNode } from "react"

type Props = {}

export const HowItWorks: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[100px] bg-[rgb(245,248,255)]" id="howitworks">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionTitle>How Pactly works</SectionTitle>
          <SectionSubtitle className="text-center">
            Three simple steps to send and sign contracts digitally
          </SectionSubtitle>
        </SectionHeaderContainer>
      </LandingPageWidth>

      <div className="flex flex-col items-center md:flex-row justify-center gap-[40px] mt-[80px] relative">
        <img
          src="./assets/landing-images/line.png"
          className="absolute top-0 hidden md:block"
        />

        <HowItWorksElement
          icon={<ReceiptText size={54} />}
          title="Create the contract"
          body="Start from a template or upload your own document. Edit it easily and define the signing parties in seconds."
          step="1"
        />

        <HowItWorksElement
          icon={<Send size={54} />}
          title="Send for signature"
          body="Add the recipient’s email and Pactly sends a secure signing link automatically. No setup, no delays."
          step="2"
        />

        <HowItWorksElement
          icon={<Signature size={54} />}
          title="Sign and finalise"
          body="Both parties sign digitally. The contract is then locked, saved, and always accessible with a complete activity history."
          step="3"
        />
      </div>
    </div>
  )
}

type HowItWorksElementProps = {
  icon: ReactNode
  title: string
  body: string
  step: string
}

const HowItWorksElement: React.FC<HowItWorksElementProps> = ({
  icon,
  title,
  body,
  step,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-[350px]">
      <div className="size-[112px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px] relative">
        {icon}
        <div className="absolute shadow-md top-[-10px] right-[-10px] size-[36px] flex items-center justify-center rounded-full bg-white text-black font-semibold">
          {step}
        </div>
      </div>

      <Text className="text-[24px] leading-[35px] font-[600] text-center text-[#14141f] mb-[15px] tracking-[-0.8px]">
        {title}
      </Text>
      <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
        {body}
      </Text>
    </div>
  )
}
