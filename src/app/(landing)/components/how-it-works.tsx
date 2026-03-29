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
            Create, review, and sign a contract in three simple steps
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
          title="Create your contract"
          body="Start from a template or write your contract from scratch. Add the people who need to review and sign it."
          step="1"
        />

        <HowItWorksElement
          icon={<Send size={54} />}
          title="Review and discuss"
          body="Share a secure link so the other side can read the contract, comment on clauses, ask questions, and request changes."
          step="2"
        />

        <HowItWorksElement
          icon={<Signature size={54} />}
          title="Sign when ready"
          body="Once everyone agrees, sign online and keep the final contract, activity log, and signed version in one place."
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