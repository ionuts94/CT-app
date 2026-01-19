import { H1, Text } from "@/components/topography"
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
          <SectionTitle>Everything you need to close contracts without stress</SectionTitle>
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
              Professional templates and an intuitive editor help you create and send complete contracts in just minutes.
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
              No printing or heavy PDFs. The entire signing process is digital, fast, and legally recognised across the EU.
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
              Get automatic checks and clear explanations for clauses, so your client understands everything instantly.
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
              Discuss and negotiate contract terms directly in the document, without emails, with a clear, shared history.
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
              Every change is logged, visible, and protected, giving both parties complete confidence in the document.
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
