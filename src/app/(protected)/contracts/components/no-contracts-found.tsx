"use client"

import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { FileText, Layers, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { NewContractDialog } from "./new-contract-dialog"

type Props = {

}

export const NoContractsFound: React.FC<Props> = ({ }) => {
  const router = useRouter()
  const goToNewTemplate = () => router.push("/templates/new")

  return (
    <Card className="p-6 w-full max-w-[500px]">
      <div className="w-fit rounded-full p-2 bg-secondary">
        <FileText className="text-secondary-foreground" size={24} />
      </div>
      <Text size="lg" weight="bold">
        No contracts to display yet
      </Text>
      <Text>
        Create your first contract or adjust the filters to see relevant results.
        You can start from a template or upload an existing contract.
      </Text>
      {/* <Button className="cursor-pointer p-3" onClick={goToNewTemplate}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREEAZA SABLON
        </TextCTA>
      </Button> */}
      <NewContractDialog />
    </Card>
  )
}
