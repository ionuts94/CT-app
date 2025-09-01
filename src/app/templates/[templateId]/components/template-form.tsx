import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { Label as ShadLabel } from "@/components/ui/label"
import { Input as ShadInput } from "@/components/ui/input"
import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Form } from "@/components/ui/form"
import { RichTextEditor } from "@/components/rich-text-editor"

type Props = {

}

export const TemplateForm: React.FC<Props> = ({ }) => {
  return (
    <form className="w-2/3 flex flex-col gap-4">
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

          <RichTextEditor />
        </FormRow>
      </Card>
    </form>
  )
}

export const FormRow: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest} />
  )
}

export const Label: React.FC<HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }> = ({ className, htmlFor, ...rest }) => {
  return (
    <ShadLabel className="font-semibold text-lg" htmlFor={htmlFor} {...rest} />
  )
}

export const Input: React.FC<HTMLAttributes<HTMLInputElement>> = ({ className, ...rest }) => {
  return (
    <ShadInput className={cn("h-auto px-4 py-2 !text-[16px] rounded-lg border border-sidebar-primary shadow-sm bg-card-secondary flex items-center justify-center", className)} {...rest} />
  )
} 