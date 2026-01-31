import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { Template } from "@prisma/client"
import { TemplateCardControls } from "./template-card-controls"

type Props = {
  template: Template,
  className?: string,
  showControls?: boolean
}

export const TemplateCard: React.FC<Props> = ({ template, className, showControls = false }) => {
  const contentHtml = template?.content?.toString().replace(/<p>(<br\s*\/?>)?<\/p>/g, '<p>&nbsp;</p>');
  return (
    <Card className="w-full p-4 flex-col gap-2 opacity-85 transition cursor-pointer">
      <div className="flex items-center justify-between">
        <Text size="lg" weight="bold" className="text-ellipsis line-clamp-1">{template.title}</Text>
        {showControls && <TemplateCardControls template={template} />}
      </div>
      <Text size="xs" className="text-color-secondary">
        Last updated on <span className="font-semibold">{new Date(template.updatedAt).toLocaleDateString()}</span>
      </Text>
      <div className="w-ful h-[150px] bg-blue-50 shadow-sm my-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: contentHtml as string }} />
      {/* <Text className="text-color-secondary">Used on <span className="font-semibold">{template.lastUsedAt || "never"}</span></Text> */}
      <Text size="sm" className="text-color-secondary text-ellipsis line-clamp-1">
        Category: <span className="font-semibold">{template.category}</span>
      </Text>
    </Card>
  )
}