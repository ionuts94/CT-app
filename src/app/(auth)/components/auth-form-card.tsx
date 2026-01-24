import { PactlyLogo } from "@/components/logo"
import { Body, H2, Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { ReceiptText } from "lucide-react"
import Link from "next/link"

type Props = {
  children?: React.ReactNode,
  heading: string,
  subHeading: string
}

export const AuthFormCard: React.FC<Props> = ({ heading, subHeading, children }) => {
  return (
    <div className="w-full max-w-[800px] p-4">
      <div className="text-primary font-bold flex gap-2 items-center">
        <Link href={"/"}>
          <PactlyLogo className="h-[36px] md:h-[60px] mb-2" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <H2>{heading}</H2>
        <Body className="text-color-secondary">{subHeading}</Body>
      </div>
      {children}
    </div>
  )
}