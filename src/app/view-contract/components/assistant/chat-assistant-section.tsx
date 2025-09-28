import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { Input } from "@/components/form-elements"

type Props = {

}

export const ChatAssistantSection: React.FC<Props> = ({ }) => {
  const messages = []

  return (
    <div className="flex flex-col h-full justify-between ">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="p-4 flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            {PREDEFINED_QUESTIONS.map((q, index) => (
              <Card key={index} className="p-2 px-4 rounded-full cursor-pointer hover:bg-primary/5">
                <Text size="sm">{q}</Text>
              </Card>
            ))}
          </div>
          <Text size="sm" className="text-center">Sau</Text>

          <Card className="p-4 bg-input">
            <Text>Adreseaza o intrebare despre acest contract...</Text>
            <Input />
          </Card>
        </div>
      </div>
    </div>
  )
}

const PREDEFINED_QUESTIONS = [
  "Explica termenii de plata",
  "Ce se intampla daca reziliez mai devreme?",
  "Rezumatul obligatiilor mele"
]