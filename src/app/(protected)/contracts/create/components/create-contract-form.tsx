import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Card } from "@/components/ui/card"
import { Template } from "@prisma/client"

type Props = {
  template?: Template
}

export const CreateContractForm: React.FC<Props> = ({ template }) => {
  return (
    <form className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <FormRow>
            <Label htmlFor="template-title">
              Titlu Sablon
              <RequiredFieldMark />
            </Label>
            <Input id="template-title" />
            <InvalidInputError>{ }</InvalidInputError>
          </FormRow>

          <FormRow>
            <Label htmlFor="template-caterogry">
              Categorie Sablon
              <RequiredFieldMark />
            </Label>
            <Input id="template-caterogry" />
            <InvalidInputError>{ }</InvalidInputError>
          </FormRow>

        </Card>
        <Card className="p-4">
          <FormRow>
            <InvalidInputError>{ }</InvalidInputError>
            <RichTextEditor
              content={template?.content as string || ""}
            // onChange={(htmlString) => debouncedSetContent(htmlString)}
            />
          </FormRow>
        </Card>
      </div>
      <div className="w-1/3">
        {/* <AiTemplateReview /> */}
        ceva
      </div>
    </form>
  )
}