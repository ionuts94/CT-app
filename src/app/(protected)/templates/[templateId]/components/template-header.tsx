"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { PageHeader, PageHeading } from "@/components/page-header"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { Eye, Save, Trash } from "lucide-react"
import { DeleteTemplateAlertDialog } from "./delete-template-alert-dialog"

type Props = {
  templateId?: string;
}

export const TemplateHeader: React.FC<Props> = ({ templateId }) => {
  const { form, isSavingTemplate, handleSaveTemplate } = useTemplateContext()
  const { formState } = form

  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Creaza Sablon</PageHeading>
        {/* <PageSubHeading>Aici iti poti gestiona si organiza toate sabloanele</PageSubHeading> */}
      </PageHeader>
      <div className="flex items-stretch gap-1">
        {templateId &&
          <DeleteTemplateAlertDialog templateId={templateId} />
        }
        <ButtonWithLoading
          variant="default"
          className="cursor-pointer p-3"
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
    </div>
  )
}