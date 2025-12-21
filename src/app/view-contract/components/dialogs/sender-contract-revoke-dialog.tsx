"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { Textarea } from "@/components/form-elements"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog"
import CTContract from "@/sdk/contracts"
import { T_ViewContract } from "@/types/services/contracts"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
  contract: T_ViewContract
}

export const SenderContractRevokeDialog: React.FC<Props> = ({ contract }) => {
  const router = useRouter()
  const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog()

  const form = useForm({
    defaultValues: {
      failedReason: ""
    }
  })
  const { watch, formState } = form
  const { failedReason } = watch()
  const isLoading = formState.isSubmitting

  const handleDeclineContract = async () => {
    const { error } = await CTContract.revokeContract({
      contractId: contract.id,
      failedReason
    })

    if (error) {
      return toast.error("Failed to decline contract. Error: " + error)
    }
    toast.success("Contractul a fost respins")
    router.refresh()
    closeDialog()
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} variant="destructive" className="p-4 px-10">Retrage Contractul</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Retrage contractul</DialogTitle>
          <DialogDescription>Atentie! Odata retras, contractul nu mai poate fi modificat sau folosit. Retrageti doar daca sunteti complet siguri de aceasta decizie</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleDeclineContract)}>
          <Textarea
            {...form.register("failedReason")}
            className="min-h-[100px] max-h-[150px]"
            placeholder="Optional. Puteti scrie aici motivul pentru care retrageti acest contract"
          />
          <div className="flex justify-end gap-1 pt-4">
            <Button onClick={closeDialog} variant={"secondary"} type="button">Anuleaza</Button>
            <ButtonWithLoading loading={isLoading} className="gap-1" variant={"destructive"}>Retrage contractul</ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}