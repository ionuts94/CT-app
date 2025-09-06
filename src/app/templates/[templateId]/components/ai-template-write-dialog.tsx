"use client"

import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-emelemts"
import { AiSvg } from "@/components/svgs/ai-svg"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IndustrySelect } from "./industry-select"
import { ToneSelect } from "./tone-select"
import { useForm } from "react-hook-form"
import { Text } from "@/components/topography"
import { AiTemplateWriteSchema, T_AiTemplateWriteSchema } from "@/validators/template.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { AIGenerateTemplate } from "@/actions/post/template/ai-generate-template"
import { useState } from "react"
import { useAITemplate } from "@/hooks/use-ai-template"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { useAITemplateContext } from "@/contexts/template-assistant-context"
import { useDialog } from "@/hooks/use-dialog"


type Props = {
  onGenerateTemplate: (template: string) => any
}

export const AiTemplateWriteDialog: React.FC<Props> = ({ onGenerateTemplate = () => null }) => {
  const { isOpen, openDialog, closeDialog, toggleModal } = useDialog()

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal()}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} variant="outline" className="bg-white group">
          <AiSvg className="size-5 group-hover:text-white" />
          Ajuta-ma sa scriu<span className="font-bold">(AI)</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[98vw] md:max-w-[940px]">
        <DialogHeader>
          <DialogTitle className="flex items-center p-2 rounded-md bg-[#eef2ff] text-[#1D4ED8] w-fit px-4">
            <AiSvg className="size-5 group-hover:text-white" />
            Asistent AI
          </DialogTitle>
          <DialogDescription>
            Completează câteva detalii. Câmpurile marcate cu steluță sunt obligatorii.
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
  const { aiGenerateLoading, aiGenerateTemplate } = useAITemplateContext()

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
          <Label><RequiredFieldMark />Tip contract</Label>
          <Input disabled={aiGenerateLoading} {...register("contractType")} placeholder="ex. Acord servicii / MSA / NDA" />
          <InvalidInputError>{errors.contractType?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label><RequiredFieldMark />Industrie</Label>
          <IndustrySelect disabled={aiGenerateLoading} onChange={handleIndustryChange} placeholder="Selecreaza industria" />
          <InvalidInputError>{errors.industry?.message}</InvalidInputError>
        </FormRow>
      </FormRow>
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label>Ton</Label>
          <ToneSelect disabled={aiGenerateLoading} onChange={handleToneChange} placeholder="Selecteaza tonul contractului" />
          <InvalidInputError>{errors.tone?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label>Durata contractului</Label>
          <Input disabled={aiGenerateLoading} {...register("termPeriod")} placeholder="ex. 12 luni" />
          <InvalidInputError>{errors.termPeriod?.message}</InvalidInputError>
        </FormRow>
      </FormRow>
      <FormRow>
        <Label><RequiredFieldMark />Spune-ne ce ai nevoie</Label>
        <Textarea {...register("description")} placeholder="ex: Contract de inchiriere apartament; chirie 600 EUR, garantie 1 luna, utilitati pe chirias, stare initiala, mici reparatii pe chirias, reziliere cu 30 zile." />
        <InvalidInputError>{errors.description?.message}</InvalidInputError>
      </FormRow>
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button type="button" variant="outline">Anuleaza</Button>
        </DialogClose>
        <ButtonWithLoading
          type="submit"
          loading={aiGenerateLoading}
        >
          {aiGenerateLoading
            ? "Se proceseaza"
            : "Genereaza Draftul"
          }
        </ButtonWithLoading>
      </DialogFooter>
    </form>
  )
}

// test case:

// Sunt un freelancer si urmeaza sa preiau un proiect. proiectul consta intr-o platforma de loialitate intre distribuitori, magazine si consumatori

// Platforma consta in:

// O aplicatie web: distirubitorii creaza oferte pentru magazine, magazinele isi gestioneaza ofertele
// O aplicatie mobil: pentru consumatori

// Plata este de 20 de $ pe ora