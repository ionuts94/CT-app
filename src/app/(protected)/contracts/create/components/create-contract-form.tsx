"use client"

import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { Card, CardTitle } from "@/components/ui/card"
import { Signature, Template } from "@prisma/client"

type Props = {
  template?: Template,
  signatures?: Signature[]
}

export const CreateContractForm: React.FC<Props> = ({ template, signatures }) => {
  return (
    <form className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <Label htmlFor="template-title">
            Titlu Sablon:
            <Text size="lg" weight="bold">{template?.title}</Text>
          </Label>
        </Card>

        <Card className="p-4">
          <FormRow>
            <InvalidInputError>{ }</InvalidInputError>
            <RichTextEditor
              content={template?.content as string || ""}
              // onChange={(htmlString) => debouncedSetContent(htmlString)}
              showAiHelper={false}
            />
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Selecteaza Semnatura</CardTitle>
          <FormRow>
            {signatures?.map(signature => (
              <SignatureItem
                key={signature.id}
                signature={signature}
                isSelected
              />
            ))}
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Trimite Contractul</CardTitle>
          <FormRow className="flex-row ">
            <FormRow>
              <Label>Nume Destinatar</Label>
              <Input />
            </FormRow>
            <FormRow>
              <Label>Email Destinatar</Label>
              <Input />
            </FormRow>
          </FormRow>
          <FormRow>
            <Label>Mesaj optional</Label>
            <Textarea />
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