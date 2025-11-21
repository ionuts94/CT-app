import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Text } from "@/components/topography"
import { PropsWithChildren } from "react"
import { Button } from "@/components/ui/button"

type Props = {

}

export const FaQ: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-white">
      <LandingPageWidth className="flex flex-col gap-[40px]">
        <SectionHeaderContainer>
          <SectionLabel>FaQ's</SectionLabel>
          <SectionTitle>Informații utile</SectionTitle>
          <SectionSubtitle>Răspunsuri rapide la cele mai comune întrebări.</SectionSubtitle>
        </SectionHeaderContainer>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[1052px] mx-auto"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="">
              <AcordionTitle>1. Contractele semnate aici sunt valide legal?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Semnătura digitală folosită este recunoscută legal în Uniunea Europeană.</AcordionBody>
              <AcordionBody>Fiecare semnătură generează un audit complet cu timestamp, IP și identitatea semnatarului.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <AcordionTitle>
                2. Trebuie să își facă și clientul cont?
              </AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Nu. Clientul primește un link securizat și poate semna direct din browser, fără cont și fără instalări.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <AcordionTitle>3. Pot edita contractele înainte de a le trimite?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Poți modifica orice secțiune în editorul nostru rich text, poți adăuga clauze noi, elimina clauze sau personaliza branding-ul.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <AcordionTitle>4. Ce se întâmplă dacă cineva cere modificări?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Toate comentariile și discuțiile se pot face direct în document, în secțiunea dedicată. </AcordionBody>
              <AcordionBody>Modificările sunt salvate automat, iar istoricul rămâne vizibil pentru ambele părți.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <AcordionTitle>5. Pot să încarc contractele mele proprii?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Le poți încărca în format text sau copy-paste, după care le editezi direct în platformă.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <AcordionTitle>6. Ce se întâmplă când consum cele 3 contracte gratuite?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Vei primi opțiunea să faci upgrade către unul dintre planurile noastre (Pay as You Go, Starter, Team sau Business).</AcordionBody>
              <AcordionBody>Alegi în funcție de câte contracte trimiți lunar.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              <AcordionTitle>7. Datele mele sunt în siguranță?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Toate datele sunt criptate, stocate pe servere din UE și protejate prin standarde moderne de securitate.</AcordionBody>
              <AcordionBody>Doar dumneavoastră și clientul aveți acces la documente.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              <AcordionTitle>8. Pot descărca contractele semnate?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Poți descărca în orice moment contractul final, audit log-ul și versiunile anterioare.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>
              <AcordionTitle>9. Pot să lucrez cu echipa mea în aceeași companie?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da, în planurile Team și Business poți avea mai mulți membri, cu roluri și permisiuni diferite.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              <AcordionTitle>10. Platforma poate explica clauzele către client?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Asistentul AI traduce clauzele în limbaj simplu și răspunde la întrebările clientului, pentru claritate totală.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger>
              <AcordionTitle>11. Ce se întâmplă dacă pierd accesul la cont?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>E suficient să folosești opțiunea de recuperare prin email.</AcordionBody>
              <AcordionBody>Contractele tale rămân stocate în siguranță și pot fi recuperate oricând.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-12">
            <AccordionTrigger>
              <AcordionTitle>12. Pot să schimb planul oricând?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Poți trece la un plan mai mare sau mai mic oricând.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-13">
            <AccordionTrigger>
              <AcordionTitle>13. Cum se facturează contractele în Pay as You Go?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Plătești individual pentru fiecare contract trimis, fără abonament lunar și fără costuri ascunse.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-14">
            <AccordionTrigger>
              <AcordionTitle>14. Pot folosi platforma și pentru contracte recurente?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>Da. Poți crea template-uri proprii și le poți reutiliza oricând, instant.</AcordionBody>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LandingPageWidth>
      <section className="w-full pt-[100px] border-t border-gray-200 mt-4">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Nu ai găsit ce cauți?
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Scrie-ne și răspundem rapid:{" "}
            <a
              href="mailto:support@contracttransparent.com"
              className="text-primary font-medium hover:underline"
            >
              support@contracttransparent.com
            </a>
          </p>
        </div>
      </section>
    </div >
  )
}


export const AcordionTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text className="text-[24px] leading-[35px] font-[600] text-[#14141f] tracking-[-0.8px]">
      {children}
    </Text>
  )
}

export const AcordionBody: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
      {children}
    </Text>
  )
}