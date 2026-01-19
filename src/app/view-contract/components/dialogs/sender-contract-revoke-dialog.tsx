"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { Textarea } from "@/components/form-elements"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
      revokeReason: "",
    },
  })

  const { watch, formState } = form
  const { revokeReason } = watch()
  const isLoading = formState.isSubmitting

  const handleRevokeContract = async () => {
    const { error } = await CTContract.revokeContract({
      contractId: contract.id,
      failedReason: revokeReason,
    })

    if (error) {
      return toast.error("Failed to revoke the contract. Please try again.")
    }

    toast.success("The contract has been successfully revoked.")
    router.refresh()
    closeDialog()
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={openDialog}
          variant="destructive"
          className="px-10 py-4"
        >
          Revoke contract
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke contract</DialogTitle>
          <DialogDescription>
            This action is permanent. Once revoked, the contract can no longer be
            modified, signed, or reused. Please confirm only if you are certain.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleRevokeContract)}>
          <Textarea
            {...form.register("revokeReason")}
            className="min-h-[100px] max-h-[150px]"
            placeholder="Optional. Add a short reason for revoking this contract."
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeDialog}
            >
              Cancel
            </Button>

            <ButtonWithLoading
              loading={isLoading}
              variant="destructive"
            >
              Revoke contract
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
