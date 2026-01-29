import { PactlyLogo } from "@/components/logo"
import { LeftChevronSvg } from "@/components/svgs/chevrons"
import { Body, H2, Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ReceiptText } from "lucide-react"
import Link from "next/link"

type Props = {
  children?: React.ReactNode,
  heading: string,
  subHeading: string
}

export const AuthFormCard: React.FC<Props> = ({ heading, subHeading, children }) => {
  return (
    <div className="w-full max-w-[800px] p-4">
      <div className="text-primary font-bold flex flex-col gap-6 items-start mb-10">
        <Link href={"/"}>
          <PactlyLogo className="h-[44px] md:h-[60px]" />
        </Link>
      </div>

      <div className="flex flex-col gap-2 mb-6 items-start">
        <Button asChild variant="link" className="!p-0 mb-2">
          <Link href="/" className="flex items-center gap-1 !p-0">
            <ChevronLeft />
            <Text>Home page</Text>
          </Link>
        </Button>
        <H2>{heading}</H2>
        <Body className="text-color-secondary">{subHeading}</Body>
      </div>
      {children}
    </div>
  )
}