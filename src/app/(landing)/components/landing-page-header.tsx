import { ReceiptText } from "lucide-react"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { LandingPageWidth } from "./landing-page-width"
import { TextCTA } from "@/components/topography/cta"

type Props = {

}

export const LandingPageHeader: React.FC<Props> = ({ }) => {
  return (
    <header className="border-b">
      <LandingPageWidth className="flex flex-row items-center justify-between h-[94px]">
        <div className="flex items-center">
          <ReceiptText className="text-primary" size={40} />
          <Text size="lg" weight="extrabold" className="uppercase leading-4">
            Contract <br />Transparent
          </Text>
        </div>
        <nav>
          <ul className="flex gap-8">
            <li className="font-[600] cursor-pointer text-[18px] text-primary hover:opacity-80 ">Home</li>
            <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Pages</li>
            <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Portfolio</li>
            <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Blog</li>
            <li className="font-[600] cursor-pointer text-[18px] hover:opacity-80 ">Contact us</li>
          </ul>
        </nav>
        <div className="flex gap-2">
          <Button className="px-6 py-3 bg-white border-1 border-black/10 text-black">
            <TextCTA className="font-bold">
              Login
            </TextCTA>
          </Button>
          <Button>
            <TextCTA className="font-bold">
              Create account
            </TextCTA>
          </Button>
        </div>
      </LandingPageWidth>
    </header>
  )
}