import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Bot, Clock, MessageCircleMore, ShieldEllipsis, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionTitle } from "./shared"

type Props = {}

export const Benefits: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col gap-[80px] items-center justify-center bg-white py-[110px]">
      <LandingPageWidth className="flex flex-col">
        <SectionHeaderContainer>
          <SectionLabel>Benefits</SectionLabel>
          <SectionTitle>Everything you need to close contracts with confidence</SectionTitle>
        </SectionHeaderContainer>
      </LandingPageWidth>

      <LandingPageWidth className="max-w-full">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center justify-center gap-4 px-4">

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Clock size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Work faster
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Create and send complete contracts in minutes using professional templates and a simple, intuitive editor.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Signature size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Digital signatures
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Skip printing and PDFs. Contracts are signed digitally, quickly, and legally recognised across the EU.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Bot size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              AI-powered assistance
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Automatic checks and clear explanations help clients understand clauses instantly and with confidence.
            </Text>
          </div>

          <div className="w-full hidden lg:flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <MessageCircleMore size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Comments & collaboration
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Discuss and negotiate terms directly in the contract, with a clear history and no email back-and-forth.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <ShieldEllipsis size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Security & transparency
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Every action is logged, visible, and protected, giving both sides full trust in the document.
            </Text>
          </div>

        </div>
      </LandingPageWidth>

      <LandingPageWidth>
        <div className="p-8 pb-0 rounded-t-[24px] bg-blue-500/20 shadow-md lg:mt-10">
          <div className="rounded-t-[16px] overflow-hidden">
            <img
              className="w-full object-contain max-w-[1200px]"
              src="./assets/landing-images/dash_1.png"
            />
          </div>
        </div>
      </LandingPageWidth>
    </div>
  )
}
