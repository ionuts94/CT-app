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
import { AIGenerateTemplate } from "@/actions/post/template/ai"
import { useState } from "react"


type Props = {
  onGenerateTemplate: (template: string) => any
}

export const AiTemplateWriteDialog: React.FC<Props> = ({ onGenerateTemplate = () => null }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white group">
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
          <AiTemplateWriterForm onGenerateTemplate={onGenerateTemplate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AiTemplateWriterForm: React.FC<Props> = ({ onGenerateTemplate }) => {
  const [templateString, setTemplateString] = useState("")
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

  const { register, watch, handleSubmit, formState } = form
  const values = watch()
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
    console.log(values)
    const { data, error } = await AIGenerateTemplate(values)
    if (data) {
      onGenerateTemplate(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label><RequiredFieldMark />Tip contract</Label>
          <Input {...register("contractType")} placeholder="ex. Acord servicii / MSA / NDA" />
          <InvalidInputError>{errors.contractType?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label><RequiredFieldMark />Industrie</Label>
          <IndustrySelect onChange={handleIndustryChange} placeholder="Selecreaza industria" />
          <InvalidInputError>{errors.industry?.message}</InvalidInputError>
        </FormRow>
      </FormRow>
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label>Ton</Label>
          <ToneSelect onChange={handleToneChange} placeholder="Selecteaza tonul contractului" />
          <InvalidInputError>{errors.tone?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label>Durata contractului</Label>
          <Input {...register("termPeriod")} placeholder="ex. 12 luni" />
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
        <Button type="submit">Genereaza Draftul</Button>
      </DialogFooter>
    </form>
  )
}