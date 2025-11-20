import { ReceiptText, Send, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionSubtitle, SectionTitle } from "./shared"
import { Text } from "@/components/topography"
import { ReactNode } from "react"

type Props = {

}

export const HowItWorks: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[100px] bg-[rgb(245,248,255)]">
      <LandingPageWidth>
        <SectionHeaderContainer>
          <SectionTitle>Cum funcționează Contract Transparent?</SectionTitle>
          <SectionSubtitle>3 pași simpli ca să trimiți și să semnezi contracte digitale</SectionSubtitle>
        </SectionHeaderContainer>
      </LandingPageWidth>
      <div className="flex flex-col items-center md:flex-row justify-center gap-[40px] mt-[80px] relative">
        <img src="./assets/landing-images/line.png" className="absolute top-0 hidden md:block" />
        <HowItWorksElement
          icon={<ReceiptText size={54} />}
          title="Creezi contractul"
          body="Pornești de la un template sau încarci documentul tău. Editezi rapid în rich text și setezi părțile care semnează."
          step="|"
        />

        <HowItWorksElement
          icon={<Send size={54} />}
          title="Trimiți spre semnare"
          body="Introduci emailul destinatarului, iar platforma trimite automat linkul securizat. Tot procesul durează doar câteva secunde."
          step="||"
        />

        <HowItWorksElement
          icon={<Signature size={54} />}
          title="Semnați și finalizați"
          body="Ambele părți semnează digital, iar contractul este blocat și salvat. Poți accesa oricând documentul complet, cu tot istoricul lui."
          step="|||"
        />
      </div>
    </div>
  )
}

type HowItWorksElementProps = {
  icon: ReactNode,
  title: string,
  body: string,
  step: string
}

const HowItWorksElement: React.FC<HowItWorksElementProps> = ({ icon, title, body, step = "l" }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[350px]">
      <div className="size-[112px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px] relative">
        {icon}
        <div className="absolute shadow-md top-[-10px] right-[-10px] size-[36px] flex items-center justify-center rounded-full bg-white text-black font-semibold">
          {step}
        </div>
      </div>
      <Text className="text-[24px] leading-[35px] font-[600] text-center text-[#14141f] mb-[15px] tracking-[-0.8px]">{title}</Text>
      <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">{body}</Text>
    </div>
  )
}