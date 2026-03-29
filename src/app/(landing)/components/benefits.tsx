import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Bot, Clock, MessageCircleMore, ShieldEllipsis, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionTitle } from "./shared"

type Props = {}

export const Benefits: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col gap-[80px] items-center justify-center py-[110px] bg-slate-100">
      <LandingPageWidth className="flex flex-col">
        <SectionHeaderContainer>
          <SectionLabel>Why Pactly</SectionLabel>
          <SectionTitle>Everything you need to get contracts signed without the usual chaos</SectionTitle>
        </SectionHeaderContainer>
      </LandingPageWidth>

      <LandingPageWidth className="max-w-full">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center justify-center gap-4 px-4">

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Clock size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Create contracts faster
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Start from a template or create from scratch and prepare contracts in minutes, not hours.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Signature size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Sign online
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Send a secure link and let recipients sign directly in the browser, without printing, scanning, or extra friction.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <Bot size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              AI clause explanations
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Help recipients understand tricky clauses, ask questions, and get answers before they sign.
            </Text>
          </div>

          <div className="w-full hidden lg:flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <MessageCircleMore size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Negotiate in one place
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              Comment directly on clauses, request changes, and keep discussions out of messy email threads.
            </Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]">
              <ShieldEllipsis size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">
              Track every step
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">
              See what was sent, viewed, signed, declined, or changed with a clear history for every contract.
            </Text>
          </div>

        </div>
      </LandingPageWidth>
    </div>
  )
}