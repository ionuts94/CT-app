import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { envs } from "@/constants/envs"
import { Check, FileText, Layers } from "lucide-react"
import Link from "next/link"

type Props = {
  reciverEmail: string,
  newContractId: string
}

export const ContractSentSuccessfully: React.FC<Props> = ({ reciverEmail, newContractId }) => {
  const baseUrl = envs.NEXT_PUBLIC_URL

  return (
    <Card className="mx-auto w-full max-w-[800px] px-2 lg:p-[30px] flex flex-col items-center text-center">
      <div className="bg-[#10b981]/10 size-[50px] flex items-center justify-center rounded-lg shadow-sm">
        <Check color="#10b981" />
      </div>
      <Text size="xl" weight="bold" className="text-black">Contractul a fost trimis destinatarului</Text>
      <Text className="text-color-secondary">Te anuntam cand il vor revizui sau semna. Poti vedea contractul sau te poti intoarce la pagina de contracte</Text>
      <div className="w-full bg-muted/40 rounded-lg border-[2px] p-4 flex justify-between items-center">
        <Text size="sm" className="text-color-secondary">Destinatar</Text>
        <Text weight="bold">{reciverEmail}</Text>
      </div>
      <div className="flex flex-col gap-2 w-full lg:w-fit lg:flex-row">
        <Link href={baseUrl + "/view-contract/" + newContractId}>
          <Button className="p-4 border border-primary">
            <FileText />
            <TextCTA>Vezi contractul</TextCTA>
          </Button>
        </Link>
        <Link href={baseUrl + "/contracts"}>
          <Button variant="outline" className="p-4">
            <Layers />
            <TextCTA>Inapoi la Contracte</TextCTA>
          </Button>
        </Link>
      </div>
      <Text className="text-color-secondary">
        Nu a ajuns la ei? Poti retrimite din pagina contractului sau din pagina de contracte.
      </Text>
    </Card >
  )
}