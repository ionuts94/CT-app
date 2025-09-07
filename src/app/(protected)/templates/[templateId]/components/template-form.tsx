"use client"

import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { AiTemplateReview } from "./ai-template-review"
import { FormRow, Input, Label } from "@/components/form-emelemts"
import { useAITemplateContext } from "@/contexts/template-assistant-context"

type Props = {

}

export const TemplateForm: React.FC<Props> = ({ }) => {
  const { currentTemplateRichText } = useAITemplateContext()

  return (
    <form className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <FormRow>
            <Label htmlFor="template-title">Titlu Sablon</Label>
            <Input id="template-title" />
          </FormRow>

          <FormRow>
            <Label htmlFor="template-caterogry">Categorie Sablon</Label>
            <Input id="template-caterogry" />
          </FormRow>

        </Card>
        <Card className="p-4">
          <FormRow>
            <RichTextEditor content={currentTemplateRichText} />
          </FormRow>
        </Card>
      </div>
      <div className="w-1/3">
        <AiTemplateReview />
      </div>
    </form>
  )
}