"use client"

import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { AiSvg } from "@/components/svgs/ai-svg"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IndustrySelect } from "./industry-select"
import { ToneSelect } from "./tone-select"
import { useForm } from "react-hook-form"
import { AiTemplateWriteSchema, T_AiTemplateWriteSchema } from "@/validators/template.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { useDialog } from "@/hooks/use-dialog"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { Text } from "@/components/topography"

type Props = {
  onGenerateTemplate: (template: string) => any
}

export const AiTemplateWriteDialog: React.FC<Props> = ({ onGenerateTemplate = () => null }) => {
  const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog()

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} variant="outline" className="bg-white group w-full lg:w-fit">
          <AiSvg className="size-5 group-hover:text-white" />
          Help me write <span className="font-bold">(AI)</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[98vw] md:max-w-[940px]">
        <DialogHeader>
          <DialogTitle className="flex items-center p-2 rounded-md bg-[#eef2ff] text-[#1D4ED8] w-fit px-4">
            <AiSvg className="size-5 group-hover:text-white" />
            AI Assistant
          </DialogTitle>
          <DialogDescription>
            Fill in a few details. Fields marked with an asterisk are required.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <AiTemplateWriterForm closeDialog={closeDialog} onGenerateTemplate={onGenerateTemplate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

type AiTemplateWriterFormProps = Props & {
  closeDialog?: () => any
}

const AiTemplateWriterForm: React.FC<AiTemplateWriterFormProps> = ({ onGenerateTemplate, closeDialog = () => null }) => {
  const { aiGenerateLoading, aiGenerateTemplate } = useTemplateContext()

  const form = useForm<T_AiTemplateWriteSchema>({
    resolver: zodResolver(AiTemplateWriteSchema),
    defaultValues: {
      contractType: "",
      industry: "",
      tone: "",
      termPeriod: "",
      description: ""
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const handleIndustryChange = (value: string) => {
    form.setValue("industry", value)
    form.trigger("industry")
  }

  const handleToneChange = (value: string) => {
    form.setValue("tone", value)
    form.trigger("tone")
  }

  const handleFormSubmit = async (values: T_AiTemplateWriteSchema) => {
    if (aiGenerateLoading) return;
    const { templateRichTextString, error } = await aiGenerateTemplate(values)
    if (error) {
      return alert(error)
    }

    if (templateRichTextString) {
      onGenerateTemplate(templateRichTextString)
      closeDialog()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label><RequiredFieldMark />Contract type</Label>
          <Input
            disabled={aiGenerateLoading}
            {...register("contractType")}
            placeholder="e.g. Service Agreement / MSA / NDA"
          />
          <InvalidInputError>{errors.contractType?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label><RequiredFieldMark />Industry</Label>
          <IndustrySelect
            disabled={aiGenerateLoading}
            onChange={handleIndustryChange}
            placeholder="Select an industry"
          />
          <InvalidInputError>{errors.industry?.message}</InvalidInputError>
        </FormRow>
      </FormRow>
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label>Tone</Label>
          <ToneSelect
            disabled={aiGenerateLoading}
            onChange={handleToneChange}
            placeholder="Select the contract tone"
          />
          <InvalidInputError>{errors.tone?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label>Contract duration</Label>
          <Input
            disabled={aiGenerateLoading}
            {...register("termPeriod")}
            placeholder="e.g. 12 months"
          />
          <InvalidInputError>{errors.termPeriod?.message}</InvalidInputError>
        </FormRow>
      </FormRow>
      <FormRow>
        <Label><RequiredFieldMark />Tell us what you need</Label>
        <Textarea
          {...register("description")}
          placeholder="e.g. Residential lease agreement; rent £600/month, one-month deposit, utilities paid by tenant, initial condition report, minor repairs covered by tenant, termination with 30 days’ notice."
        />
        <InvalidInputError>{errors.description?.message}</InvalidInputError>
      </FormRow>
      {aiGenerateLoading &&
        <Text size="sm" className="text-color-secondary mt-2 text-center">
          <RequiredFieldMark />
          We’re generating your template using AI.
          This may take a few minutes. Please do not close this window.
        </Text>
      }
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <ButtonWithLoading
          type="submit"
          loading={aiGenerateLoading}
          disabled={aiGenerateLoading}
        >
          {aiGenerateLoading
            ? "Processing…"
            : "Generate draft"
          }
        </ButtonWithLoading>
      </DialogFooter>
    </form>
  )
}