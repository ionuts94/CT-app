import { ReceiptText } from "lucide-react"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { LandingPageWidth } from "./landing-page-width"
import { TextCTA } from "@/components/topography/cta"
import Link from "next/link"

type Props = {

}

export const LandingPageHeader: React.FC<Props> = ({ }) => {
  return (
    <header className="border-b">
      <LandingPageWidth className="flex flex-row items-center justify-between h-[94px]">
        <Link href="/" className="flex items-center cursor-pointer">
          <ReceiptText className="text-primary" size={40} />
          <Text size="lg" weight="extrabold" className="uppercase leading-4">
            Contract <br />Transparent
          </Text>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary"><Link href="/#pricing">Prețuri</Link></li>
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary"><Link href="/#howitworks">Funcționalități</Link></li>
            {/* <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Întrebări frecvente</li> */}
            {/* <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Blog</li> */}
            <li className="font-[600] cursor-pointer text-[18px] hover:text-primary"><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="hidden md:flex gap-2">
          <Link href="/sign-in">
            <Button className="px-6 py-3 bg-white border-1 border-black/10 text-black hover:bg-primary/70 hover:text-white">
              <TextCTA className="font-bold">
                Autentificare
              </TextCTA>
            </Button>
          </Link>
          <Button asChild>
            <Link href="/sign-up">
              <TextCTA className="font-bold">
                Creează cont gratuit
              </TextCTA>
            </Link>
          </Button>
        </div>
      </LandingPageWidth>
    </header>
  )
}