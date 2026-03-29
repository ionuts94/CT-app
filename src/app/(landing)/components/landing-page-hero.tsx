import { Button } from "@/components/ui/button"
import { LandingPageWidth } from "./landing-page-width"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import Link from "next/link"

type Props = {}

export const LandingPageHero: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[40px] lg:py-0 lg:h-[calc(100vh-96px)] flex items-center justify-center">
      <LandingPageWidth className="flex flex-col gap-10 items-center lg:flex-row">

        <div className="w-full flex flex-col gap-5 justify-center items-center lg:items-start">
          <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Interactive contracts for modern teams
          </div>

          <Text
            as="h1"
            className="text-[44px] leading-[54px] lg:text-[64px] lg:leading-[76px] font-bold -tracking-[2px] text-center lg:text-left"
          >
            Contracts that work like web pages, not PDFs
          </Text>

          <Text
            as="h2"
            className="text-[16px] leading-[26px] lg:text-[20px] lg:leading-[32px] text-center lg:text-left text-slate-600 max-w-[720px]"
          >
            Create, send, discuss, and sign contracts in one place. Let both sides
            comment on clauses, ask questions, and move faster without email
            back-and-forth or final_final_v7.docx.
          </Text>

          <div className="flex flex-col items-center lg:items-start gap-3 lg:mt-6">
            <Button className="w-fit py-5 px-8" asChild>
              <Link href="/sign-up">
                <TextCTA>
                  Start free
                </TextCTA>
              </Link>
            </Button>

            <Text className="text-sm text-slate-500 text-center lg:text-left">
              3 free contracts included. No card required.
            </Text>
          </div>
        </div>

        <div className="w-full flex justify-center pl-[40px] md:pl-0 md:items-center lg:pl-[80px]">
          <div className="w-full relative md:w-fit lg:w-full">
            <img src="./assets/landing-images/c.png" />
            <img
              src="./assets/landing-images/small_1.png"
              className="absolute top-[10%] translate-x-[-50%]"
            />
            <img
              src="./assets/landing-images/small_2.png"
              className="absolute top-[30%] translate-x-[-50%]"
            />
            <img
              src="./assets/landing-images/small_3.png"
              className="h-[40%] max-h-[200px] absolute bottom-[-5%] right-0"
            />
            <img
              src="./assets/landing-images/arrow.png"
              className="absolute bottom-0 translate-y-[80%] translate-x-[-80%]"
            />
          </div>

          <div className="size-[300px] bg-green-500 rounded-full blur-[250px] absolute z-[-1]" />
        </div>

      </LandingPageWidth>
    </div>
  )
}