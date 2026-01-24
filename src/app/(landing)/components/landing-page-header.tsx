import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { LandingPageWidth } from "./landing-page-width"
import { TextCTA } from "@/components/topography/cta"
import Link from "next/link"
import { PactlyLogo } from "@/components/logo"

type Props = {}

export const LandingPageHeader: React.FC<Props> = ({ }) => {
  return (
    <header className="border-b">
      <LandingPageWidth className="flex flex-row items-center justify-between h-[94px]">
        <Link href="/" className="flex items-center cursor-pointer">
          <PactlyLogo className="h-[40px]" />
        </Link>

        <nav>
          <ul className="flex gap-8">
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary">
              <Link href="/#pricing">Pricing</Link>
            </li>
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary">
              <Link href="/#howitworks">Features</Link>
            </li>
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex gap-2">
          <Link href="/sign-in">
            <Button className="px-6 py-3 bg-white border-1 border-black/10 text-black hover:bg-primary/70 hover:text-white">
              <TextCTA className="font-bold">
                Sign in
              </TextCTA>
            </Button>
          </Link>

          <Button asChild>
            <Link href="/sign-up">
              <TextCTA className="font-bold">
                Create free account
              </TextCTA>
            </Link>
          </Button>
        </div>
      </LandingPageWidth>
    </header>
  )
}
