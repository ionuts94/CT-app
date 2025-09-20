"use client"

import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { AiTemplateReview } from "./ai-template-review"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-emelemts"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

type Props = {

}

export const TemplateForm: React.FC<Props> = ({ }) => {
  const { currentTemplateRichText, form } = useTemplateContext()

  const { register, watch, formState } = form
  const values = watch()
  const { errors } = formState

  useEffect(() => {
    if (currentTemplateRichText)
      form.setValue("content", currentTemplateRichText)
  }, [currentTemplateRichText])

  return (
    <form className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <FormRow>
            <Label htmlFor="template-title">
              Titlu Sablon
              <RequiredFieldMark />
            </Label>
            <Input {...register("title")} id="template-title" />
            <InvalidInputError>{errors.title?.message}</InvalidInputError>
          </FormRow>

          <FormRow>
            <Label htmlFor="template-caterogry">
              Categorie Sablon
              <RequiredFieldMark />
            </Label>
            <Input {...register("category")} id="template-caterogry" />
            <InvalidInputError>{errors.category?.message}</InvalidInputError>
          </FormRow>

        </Card>
        <Card className="p-4">
          <FormRow>
            <InvalidInputError>{errors.content?.message}</InvalidInputError>
            <RichTextEditor
              content={values.content}
              onChange={(htmlString) => form.setValue("content", htmlString)}
            />
          </FormRow>
        </Card>
      </div>
      <div className="w-1/3">
        <AiTemplateReview />
      </div>
    </form>
  )
}