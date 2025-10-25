import { Card, CardContent } from "@/components/ui/card"
import { AlarmClock, PenLine } from "lucide-react"
import { Text } from "@/components/topography"

type Props = {

}

export const UpcomingNext: React.FC<Props> = ({ }) => {
  return (
    <Card className="flex flex-row px-4">
      <div className="w-full flex gap-3 items-center">
        <AlarmClock className="text-warning" />
        <Text size="md"><b>3</b> contracte aproape de expirare</Text>
      </div>
      <div className="w-full flex gap-3 items-center">
        <PenLine className="text-color-secondary size-5" />
        <Text size="md"><b>2</b> contracte asteapta semnatura</Text>
      </div>
    </Card>
  )
}