"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"

type Props = {

}

export const SendContractDialog: React.FC<Props> = ({ }) => {
  const { register, formState } = useForm({
    defaultValues: {
      receiverName: "",
      receiverEmail: "",
      optionalMessage: ""
    }
  })

  const handleFormSubmit = async () => {

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Send />
          Trimite spre semnare
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Trimite contractul
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <FormRow className="flex-row ">
            <FormRow>
              <Label>Nume Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverName")} placeholder="Dragos Popescu" />
            </FormRow>
            <FormRow>
              <Label>Email Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
            </FormRow>
          </FormRow>
          <FormRow>
            <Label>Mesaj optional</Label>
            <Textarea {...register("optionalMessage")} />
          </FormRow>
          <FormRow>
            <CardTitle>Termen de semnare</CardTitle>
            <CardDescription className="max-w-[600px]">
              Contractul poate fi semnat oricând, implicit.
            </CardDescription>
            <div className="flex gap-2 items-center">
              <input className="size-4" type="checkbox" />
              <Label>Setează un termen de semnare</Label>
            </div>
            <DatePicker />
            <CardDescription>Vom trimite un email de reamintire cu 48 de ore înainte de acest termen.</CardDescription>
          </FormRow>

          <ButtonWithLoading loading={formState.isSubmitting} className="py-4 px-6 w-fit">
            <Send />
            <TextCTA>
              Trimite Contractul
            </TextCTA>
          </ButtonWithLoading>

        </form>
      </DialogContent>
    </Dialog>
  )
}