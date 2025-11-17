import { H1, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Bot, MessageCircleMore, Receipt, ReceiptText, ShieldEllipsis, Signature } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"

type Props = {

}

export const Benefits: React.FC<Props> = ({ }) => {
  return (
    <div className="flex flex-col gap-[80px] items-center justify-center bg-white py-[110px]">
      <LandingPageWidth className="flex flex-col">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Text className="uppercase text-primary font-semibold text-[16px] leading-[24px]">Beneficii</Text>
          <H1 className="max-w-[600px] text-center text-[#0f172a]">Tot ce ai nevoie pentru a încheia contracte fără stres</H1>
        </div>
      </LandingPageWidth>
      <LandingPageWidth className="max-w-full">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center justify-center gap-4 px-4">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]"><ReceiptText size={38} /></div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">Creare rapidă</TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">Pornești din template-uri flexibile și editezi contractele instant.</Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]"><Signature size={38} /></div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">Semnătură digitală</TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">Semnezi documentele online cu un click, rapid și fără birocrație.</Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center ">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]"><Bot size={38} /></div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">Asistență AI</TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">Primești verificări automate și explicații clare direct în pagină.</Text>
          </div>

          <div className="w-full hidden lg:flex flex-col items-center justify-center ">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]"><MessageCircleMore size={38} /></div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">Comentarii & colaborare</TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">Discuți și negociezi termenii contractului direct în document.</Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="size-[64px] flex items-center justify-center rounded-lg bg-primary text-white mb-[25px]"><ShieldEllipsis size={38} /></div>
            <TextCTA className="text-[18px] leading-[24px] font-[600] text-center text-[#0f172a] mb-[8px]">Securitate & transparență</TextCTA>
            <Text className="text-[16px] leading-[24px] font-[400] text-[#475569] text-center">Fiecare modificare este înregistrată, vizibilă și sigură pentru toți.</Text>
          </div>
        </div>
      </LandingPageWidth>
      <LandingPageWidth>
        <div className="p-8 pb-0 rounded-t-[24px] bg-blue-500/20 shadow-md lg:mt-10">
          <div className="rounded-t-[16px] overflow-hidden">
            <img className="w-full object-contain max-w-[1200px]" src="./assets/landing-images/dash_1.png" />
          </div>
        </div>
      </LandingPageWidth>
    </div >
  )
}