import { Button } from "@/components/ui/button"
import { LandingPageWidth } from "./landing-page-width"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import Link from "next/link"

type Props = {}

export const LandingPageHero: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[40px] lg:py-0 lg:h-[calc(100vh-96px)] flex items-center justify-center">
      <LandingPageWidth className="flex flex-col gap-6 items-center lg:flex-row">

        <div className="w-full flex flex-col gap-4 justify-center items-center lg:items-start">
          <Text as="h1" className="text-[48px] leading-[60px] lg:text-[64px] lg:leading-[80px] font-bold -tracking-[2px] text-center lg:text-left">
            A simpler, safer way to sign contracts
          </Text>

          <Text as="h2" className="text-[16px] leading-[26px] lg:text-[20px] lg:leading-[32px] text-center lg:text-left">
            Create, send, and sign contracts digitally — with built-in AI assistance
            and complete clarity for everyone involved.
          </Text>

          <Button className="w-fit py-5 px-8 lg:mt-10" asChild>
            <Link href="/sign-up">
              <TextCTA>
                Try it for free
              </TextCTA>
            </Link>
          </Button>
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
