import { Card } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"
import { Text } from "@/components/topography"

type Props = {

}

export const PredefinedAssistantSection: React.FC<Props> = ({ }) => {
  const riskAssessments = [
    "Taxa de intarziere 1.5% lunar dupa scadenta",
    "Clauza de confidentialitate larga fara exceptii definite"
  ]

  const summary = "Acordul acopera servicii de design, termen de plata 15 zile, transfer IP dupa plata integrala si confidentialitate reciproca. Reziliere posibila pentru incalcare materiala cu termen de remediere de 14 zile."

  return (
    <div>
      <AssistantSection title="Semnale de risc">
        {riskAssessments.map((item, index) => (
          <Card key={index} className="p-4 rounded-lg flex flex-row gap-1 items-start">
            <TriangleAlert className="size-[16px] text-warning mt-[4px] shrink-0" />
            <Text>{item}</Text>
          </Card>
        ))}
      </AssistantSection>

      <AssistantSection title="Rezumat">
        <Card className="p-4">
          <Text>{summary}</Text>
        </Card>
      </AssistantSection>
    </div>
  )
}

type AssistantSectionProps = {
  title: string,
  children?: React.ReactNode
}

export const AssistantSection: React.FC<AssistantSectionProps> = ({ title, children }) => {
  return (
    <div className="p-4 flex flex-col gap-2 border-b">
      <Text size="sm" weight="semibold" className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full">{title}</Text>
      {children}
    </div>
  )
}