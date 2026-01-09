"use client"

import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { AiTemplateReview } from "./ai-template-review"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Save } from "lucide-react"
import { TextCTA } from "@/components/topography/cta"


export const TemplateForm: React.FC = ({ }) => {
  const { currentTemplateRichText, form, isSavingTemplate, handleSaveTemplate } = useTemplateContext()

  const { register, watch, formState } = form
  const values = watch()
  const { errors } = formState

  useEffect(() => {
    if (currentTemplateRichText)
      form.setValue("content", currentTemplateRichText)
  }, [currentTemplateRichText])

  const debouncedSetContent = useDebouncedCallback(
    (html: string) => {
      form.setValue("content", html, { shouldDirty: true, shouldValidate: true })
    },
    500
  )

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
              onChange={(htmlString) => debouncedSetContent(htmlString)}
            />
          </FormRow>
        </Card>
        <ButtonWithLoading
          variant="default"
          className="cursor-pointer p-3 w-fit"
          onClick={handleSaveTemplate}
          loading={isSavingTemplate}
          disabled={isSavingTemplate || !formState.isDirty}
        >
          <Save strokeWidth={3} />
          <TextCTA weight="extrabold">
            SALVEAZA SABLON
          </TextCTA>
        </ButtonWithLoading>
      </div>
      <div className="w-1/3">
        <AiTemplateReview />
      </div>
    </form>
  )
}