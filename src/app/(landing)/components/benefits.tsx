import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Download, FilePenLine, Mail, Save, Smartphone } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"
import { Card } from "@/components/ui/card"

type Props = {}

export const Benefits: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col gap-[56px] items-center justify-center py-[110px] bg-slate-100">
      <LandingPageWidth className="flex flex-col">
        <SectionHeaderContainer>
          <SectionLabel>THE PROBLEM</SectionLabel>
          <SectionTitle className="max-w-[720px]">PDFs delay signatures.</SectionTitle>
          <SectionSubtitle className="max-w-[720px] text-center">
            Before your client can sign a PDF, they usually have to complete every step below.
          </SectionSubtitle>
        </SectionHeaderContainer>
      </LandingPageWidth>

      <LandingPageWidth className="flex flex-col gap-6">
        <div className="relative">
          <div className="absolute left-[25px] top-6 bottom-6 w-px bg-slate-300 lg:left-0 lg:right-0 lg:top-[31px] lg:bottom-auto lg:h-px lg:w-full" />

          <div className="grid gap-4 lg:grid-cols-5">
            {PDF_STEPS.map(({ label, description, Icon }, index) => (
              <div key={label} className="relative pl-[68px] lg:pl-0 lg:pt-[58px]">
                <div className="absolute left-0 top-0 z-10 flex size-[52px] items-center justify-center rounded-full border-[6px] border-slate-100 bg-primary text-white shadow-sm lg:left-1/2 lg:-translate-x-1/2">
                  <Icon size={22} />
                </div>

                <Card className="h-full rounded-lg border-slate-200 bg-white p-4 shadow-sm">
                  <Text className="text-[12px] leading-[18px] font-[700] uppercase text-primary">
                    Step {index + 1}
                  </Text>
                  <TextCTA className="mt-1 block text-[18px] leading-[24px] font-[700] text-[#0f172a]">
                    {label}
                  </TextCTA>
                  <Text className="mt-2 text-[14px] leading-[22px] text-[#64748b]">
                    {description}
                  </Text>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-primary/15 bg-white px-5 py-4 shadow-sm">
          <Text className="text-[18px] leading-[30px] font-[500] text-[#334155]">
            Every extra step creates delays, mistakes and follow-up emails. Some contracts take days to come back. Some never do.
          </Text>
        </div>
      </LandingPageWidth>
    </div>
  )
}

const PDF_STEPS = [
  {
    label: "Download it",
    description: "The contract becomes another file your client has to handle.",
    Icon: Download,
  },
  {
    label: "Open it in another app",
    description: "They need the right tool before they can even start signing.",
    Icon: Smartphone,
  },
  {
    label: "Edit it",
    description: "Details, initials and signatures become manual work.",
    Icon: FilePenLine,
  },
  {
    label: "Save it",
    description: "Another version gets created and can easily get misplaced.",
    Icon: Save,
  },
  {
    label: "Send it back",
    description: "You still have to wait for the signed file to return.",
    Icon: Mail,
  },
] as const
