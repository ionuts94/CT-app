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
        You don&apos;t have any contract templates yet
      </Text>
      <Text>
        Create your first template to send contracts faster and stay consistent.
        Start from scratch or let the virtual assistant help you.
      </Text>
      <Button className="cursor-pointer p-3" onClick={goToNewTemplate}>
        <Plus strokeWidth={3} />
        <TextCTA weight="extrabold">
          CREATE TEMPLATE
        </TextCTA>
      </Button>
    </Card>
  )
}