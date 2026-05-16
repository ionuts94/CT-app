import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Bot, Clock, MessageCircleMore, ShieldEllipsis, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionTitle } from "./shared"
import { Card } from "@/components/ui/card"

type Props = {}

export const Benefits: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col gap-[80px] items-center justify-center py-[110px] bg-slate-100">
      <LandingPageWidth className="flex flex-col">
        <SectionHeaderContainer>
          <SectionLabel>THE PROBLEM</SectionLabel>
          <SectionTitle>Onboarding breaks down on mobile</SectionTitle>
        </SectionHeaderContainer>
      </LandingPageWidth>

      <LandingPageWidth className="max-w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 px-4">

          <Card className="h-full w-full flex flex-col gap-3 justify-center p-4 lg:max-w-[350px]">
            <div className="size-[48px] shrink-0 flex items-center justify-center rounded-lg bg-primary text-white">
              <Clock size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-[#0f172a]">
              Candidates get stuck with PDFs
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
              Downloading, editing and re-uploading files from a phone is still surprisingly confusing for many users.
            </Text>
          </Card>

          {/* <Card className="h-full w-full flex flex-col gap-3 justify-center p-4 lg:max-w-[350px]">
            <div className="size-[48px] shrink-0 flex items-center justify-center rounded-lg bg-primary text-white">
              <Signature size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-[#0f172a]">
              PDFs slow everything down
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
              Downloading, printing, or switching tools creates unnecessary friction.
            </Text>
          </Card> */}

          <Card className="h-full gap-3 w-full gap-3 flex flex-col justify-center p-4 lg:max-w-[350px]">
            <div className="size-[48px] flex items-center justify-center rounded-lg bg-primary text-white">
              <Bot size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-[#0f172a] mb-[8px]">
              Incomplete documents create follow-up chaos
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
              Missing fields and signing mistakes slow down onboarding and create extra support work.
            </Text>
          </Card>

          <Card className="h-full gap-3 w-full flex flex-col justify-center p-4 lg:max-w-[350px]">
            <div className="size-[48px] flex items-center justify-center rounded-lg bg-primary text-white">
              <MessageCircleMore size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-[#0f172a] mb-[8px]">
              Small friction kills completion rates
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
              Even small UX problems lead to delays, incomplete submissions and abandoned onboarding flows.
            </Text>
          </Card>

          <Card className="h-full gap-3 w-full flex flex-col justify-center p-4 lg:max-w-[350px]">
            <div className="size-[48px] flex items-center justify-center rounded-lg bg-primary text-white">
              <ShieldEllipsis size={38} />
            </div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-[#0f172a] mb-[8px]">
              You don&apos;t know where people got stuck
            </TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
              See when documents are opened, reviewed, commented or signed in real time.
            </Text>
          </Card>

        </div>
      </LandingPageWidth>
    </div>
  )
}