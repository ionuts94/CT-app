"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { PageHeader, PageHeading } from "@/components/page-header"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { Eye, Save } from "lucide-react"

type Props = {

}

export const TemplateHeader: React.FC<Props> = ({ }) => {
  const { form, handleSaveTemplate } = useTemplateContext()
  const { formState } = form

  return (
    <div className="flex items-center justify-between">
      <PageHeader>
        <PageHeading>Creaza Sablon</PageHeading>
        {/* <PageSubHeading>Aici iti poti gestiona si organiza toate sabloanele</PageSubHeading> */}
      </PageHeader>
      <div className="flex items-stretch gap-1">
        <Button variant="outline" className="hover:bg-transparent hover:text-primary hover:opacity-75">
          <Eye strokeWidth={3} />
          <TextCTA>
            Previzualizeaza
          </TextCTA>
        </Button>
        <ButtonWithLoading
          variant="default"
          className="cursor-pointer p-3"
          onClick={handleSaveTemplate}
          loading={formState.isSubmitting}
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