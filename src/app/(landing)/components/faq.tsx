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

type Props = {}

export const FaQ: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-white" id="faq">
      <LandingPageWidth className="flex flex-col gap-[40px]">
        <SectionHeaderContainer>
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle>Helpful information</SectionTitle>
          <SectionSubtitle>Quick answers to the most common questions.</SectionSubtitle>
        </SectionHeaderContainer>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[1052px] mx-auto"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <AcordionTitle>1. Are contracts signed here legally valid?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. The digital signature used is legally recognised across the European Union.
              </AcordionBody>
              <AcordionBody>
                Each signature generates a complete audit trail including timestamp, IP address, and signer identity.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <AcordionTitle>2. Does my client need to create an account?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                No. The client receives a secure link and can sign directly from their browser, without an account or installation.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <AcordionTitle>3. Can I edit contracts before sending them?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. You can edit any section using our rich text editor, add or remove clauses, and customise branding.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <AcordionTitle>4. What happens if someone requests changes?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                All comments and discussions take place directly inside the document.
              </AcordionBody>
              <AcordionBody>
                Changes are saved automatically and the full history remains visible to both parties.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <AcordionTitle>5. Can I upload my own contracts?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. You can upload them as text or paste the content, then edit everything directly in the platform.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              <AcordionTitle>6. What happens after I use the 3 free contracts?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                You&apos;ll be prompted to upgrade to one of our plans: Pay as You Go, Starter, Team, or Business.
              </AcordionBody>
              <AcordionBody>
                You choose based on how many contracts you send each month.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              <AcordionTitle>7. Is my data secure?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. All data is encrypted, stored on EU-based servers, and protected using modern security standards.
              </AcordionBody>
              <AcordionBody>
                Only you and your client have access to the documents.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              <AcordionTitle>8. Can I download signed contracts?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. You can download the final contract, the audit log, and previous versions at any time.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              <AcordionTitle>9. Can I work with my team in the same company?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. With the Team and Business plans, you can add multiple members with different roles and permissions.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>
              <AcordionTitle>10. Can the platform explain clauses to my client?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. The AI assistant translates clauses into plain language and answers client questions for full clarity.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger>
              <AcordionTitle>11. What if I lose access to my account?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                You can recover access using the email recovery option.
              </AcordionBody>
              <AcordionBody>
                Your contracts remain securely stored and can always be restored.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger>
              <AcordionTitle>12. Can I change my plan at any time?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. You can upgrade or downgrade your plan at any time.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13">
            <AccordionTrigger>
              <AcordionTitle>13. How does Pay as You Go billing work?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                You pay per contract sent, with no subscription and no hidden costs.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14">
            <AccordionTrigger>
              <AcordionTitle>14. Can I use the platform for recurring contracts?</AcordionTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <AcordionBody>
                Yes. You can create your own templates and reuse them instantly whenever needed.
              </AcordionBody>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </LandingPageWidth>

      <section className="w-full pt-[100px] border-t border-gray-200 mt-4">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Didn&apos;t find what you were looking for?
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Contact us and we&apos;ll reply quickly at{" "}
            <a
              href="mailto:support@contracttransparent.com"
              className="text-primary font-medium hover:underline"
            >
              support@contracttransparent.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

export const AcordionTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <Text className="text-[24px] leading-[35px] font-[600] text-[#14141f] tracking-[-0.8px]">
    {children}
  </Text>
)

export const AcordionBody: React.FC<PropsWithChildren> = ({ children }) => (
  <Text className="text-[16px] leading-[24px] font-[400] text-[#475569]">
    {children}
  </Text>
)
