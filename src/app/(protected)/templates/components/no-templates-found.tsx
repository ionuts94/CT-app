"use client"

import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Layers, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"

type Props = {

}

export const NoTemplatesFound: React.FC<Props> = ({ }) => {
  const router = useRouter()
  const goToNewTemplate = () => router.push("/templates/new")

  return (
    <Card className="p-6 w-full max-w-[500px]">
      <div className="w-fit rounded-full p-2 bg-secondary">
        <Layers className="text-secondary-foreground" size={24} />
      </div>
      <Text size="lg" weight="bold">
        Nu ai încă niciun șablon de contract
      </Text>
      <Text>
        Creează primul tău șablon pentru a trimite contracte mai rapid și mai consecvent.
        Poți porni de la zero sau poți cere ajutorul asistentului virtual.
      </Text>
      <Button className="cursor-pointer p-3" onClick={goToNewTemplate}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREEAZA SABLON
        </TextCTA>
      </Button>
    </Card>
  )
}