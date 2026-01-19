import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { envs } from "@/constants/envs"
import { Check, FileText, Layers } from "lucide-react"
import Link from "next/link"

type Props = {
  receiverEmail: string,
  newContractId: string
}

export const ContractSentSuccessfully: React.FC<Props> = ({ receiverEmail, newContractId }) => {
  const baseUrl = envs.NEXT_PUBLIC_URL

  return (
    <Card className="mx-auto w-full max-w-[800px] px-2 lg:p-[30px] flex flex-col items-center text-center">
      <div className="bg-[#10b981]/10 size-[50px] flex items-center justify-center rounded-lg shadow-sm">
        <Check color="#10b981" />
      </div>
      <Text size="xl" weight="bold" className="text-black">
        Contract sent successfully
      </Text>
      <Text className="text-color-secondary">
        We&apos;ll notify you once the recipient reviews or signs the contract.
        You can view the contract or return to the contracts page.
      </Text>
      <div className="w-full bg-muted/40 rounded-lg border-[2px] p-4 flex justify-between items-center">
        <Text size="sm" className="text-color-secondary">Recipient</Text>
        <Text weight="bold">{receiverEmail}</Text>
      </div>
      <div className="flex flex-col gap-2 w-full lg:w-fit lg:flex-row">
        <Link href={baseUrl + "/c/view-contract?c=" + newContractId}>
          <Button className="p-4 border border-primary">
            <FileText />
            <TextCTA>View contract</TextCTA>
          </Button>
        </Link>
        <Link href={baseUrl + "/contracts"}>
          <Button variant="outline" className="p-4">
            <Layers />
            <TextCTA>Back to contracts</TextCTA>
          </Button>
        </Link>
      </div>
      <Text className="text-color-secondary">
        Didn&apos;t reach them? You can resend the contract from the contract page or the contracts list.
      </Text>
    </Card >
  )
}
