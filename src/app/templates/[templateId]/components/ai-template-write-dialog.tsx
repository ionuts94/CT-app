"use client"

import { FormRow, Input, Label, Textarea } from "@/components/form-emelemts"
import { AiSvg } from "@/components/svgs/ai-svg"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


type Props = {

}

export const AiTemplateWriteDialog: React.FC<Props> = ({ }) => {
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
            Completează câteva detalii. Generăm un draft de șablon gata de editat.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <AiTemplateWriterForm />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Anuleaza</Button>
          </DialogClose>
          <Button type="submit">Genereaza Draftul</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const AiTemplateWriterForm: React.FC = () => {
  return (
    <form className="flex flex-col gap-2">
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label>Tip contract</Label>
          <Input placeholder="ex. Acord servicii / MSA / NDA" />
        </FormRow>
        <FormRow>
          <Label>Industrie</Label>
          <Input placeholder="ex. Educație, Juridic, Transport, Turism" />
        </FormRow>
      </FormRow>
      <FormRow className="flex-row gap-2">
        <FormRow>
          <Label>Ton</Label>
          <Input placeholder="ex. Profesional & clar" />
        </FormRow>
        <FormRow>
          <Label>Durata contractului</Label>
          <Input placeholder="ex. 12 luni" />
        </FormRow>
      </FormRow>
      <FormRow>
        <Label>Spune-ne ce ai nevoie</Label>
        <Textarea placeholder="ex: Contract de inchiriere apartament; chirie 600 EUR, garantie 1 luna, utilitati pe chirias, stare initiala, mici reparatii pe chirias, reziliere cu 30 zile." />
      </FormRow>
    </form>
  )
}