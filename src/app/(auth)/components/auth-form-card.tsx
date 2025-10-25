import { Body, H2, Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { ReceiptText } from "lucide-react"

type Props = {
  children?: React.ReactNode,
  heading: string,
  subHeading: string
}

export const AuthFormCard: React.FC<Props> = ({ heading, subHeading, children }) => {
  return (
    <Card className="w-full max-w-[800px] p-4">
      <div className="text-primary font-bold flex gap-2 items-center">
        <ReceiptText size={30} />
        <Text className="text-black text-md font-semibold">CONTRACT TRANSPARENT</Text>
      </div>
      <div className="flex flex-col gap-2">
        <H2>{heading}</H2>
        <Body className="text-color-secondary">{subHeading}</Body>
      </div>
      {children}
    </Card>
  )
}