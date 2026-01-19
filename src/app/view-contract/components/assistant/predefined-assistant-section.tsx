import { Card } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"
import { Text } from "@/components/topography"

type Props = {}

export const PredefinedAssistantSection: React.FC<Props> = ({ }) => {
  const riskAssessments = [
    "Late payment fee of 1.5% per month applied after the due date",
    "Broad confidentiality clause without clearly defined exceptions",
  ]

  const summary =
    "The agreement covers design services, a 15-day payment term, transfer of intellectual property rights upon full payment, and mutual confidentiality obligations. Termination is allowed in case of material breach, subject to a 14-day cure period."

  return (
    <div>
      <AssistantSection title="Potential risks">
        {riskAssessments.map((item, index) => (
          <Card
            key={index}
            className="p-4 rounded-lg flex flex-row gap-2 items-start"
          >
            <TriangleAlert className="size-[16px] text-warning mt-[4px] shrink-0" />
            <Text>{item}</Text>
          </Card>
        ))}
      </AssistantSection>

      <AssistantSection title="Summary">
        <Card className="p-4">
          <Text>{summary}</Text>
        </Card>
      </AssistantSection>
    </div>
  )
}

type AssistantSectionProps = {
  title: string
  children?: React.ReactNode
}

export const AssistantSection: React.FC<AssistantSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="p-4 flex flex-col gap-2 border-b">
      <Text
        size="sm"
        weight="semibold"
        className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full w-fit"
      >
        {title}
      </Text>
      {children}
    </div>
  )
}
