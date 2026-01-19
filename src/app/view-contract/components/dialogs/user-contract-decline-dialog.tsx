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

export const UserContractDeclineDialog: React.FC<Props> = ({ contract }) => {
  const router = useRouter()
  const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog()

  const form = useForm({
    defaultValues: {
      declineReason: "",
    },
  })

  const { watch, formState } = form
  const { declineReason } = watch()
  const isLoading = formState.isSubmitting

  const handleDeclineContract = async () => {
    const { error } = await CTContract.declineContract({
      contractId: contract.id,
      failedReason: declineReason,
    })

    if (error) {
      return toast.error("Failed to decline the contract. Please try again.")
    }

    toast.success("The contract has been declined.")
    router.refresh()
    closeDialog()
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={openDialog}
          variant="secondary"
          className="px-10 py-4"
        >
          Decline contract
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Decline contract</DialogTitle>
          <DialogDescription>
            This action is final. Once declined, the contract can no longer be
            signed, modified, or reused. Please continue only if you are certain.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleDeclineContract)}>
          <Textarea
            {...form.register("declineReason")}
            className="min-h-[100px] max-h-[150px]"
            placeholder="Optional. Add a short reason for declining this contract."
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
              Decline contract
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
