"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDialog } from "@/hooks/use-dialog"
import CTBilling from "@/sdk/billing"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {

}

export const CancelSubscriptionDialog: React.FC<Props> = () => {
    const router = useRouter()

    const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog()
    const [isProcessing, setIsProcessing] = useState(false)

    const handleCancelSubscription = async () => {
        setIsProcessing(true)
        const { error } = await CTBilling.cancelSubscription()
        setIsProcessing(false)

        if (error) return toast.error("Failed to cancel subscription. Please try again in a few minutes.")
        router.refresh()
        toast.success("Subscription cancelled sucessfully")
        closeDialog()
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={toggleDialog}>
            <AlertDialogTrigger asChild>
                <Button
                    onClick={openDialog}
                    variant="outline"
                    className="w-fit border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                    Cancel subscription
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Cancel your subscription?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Your subscription will remain active until the end of the current billing period.
                        You won’t be charged again unless you choose to resubscribe.
                        <br /><br />
                        You will still have access to your data, but some features may become unavailable
                        once the subscription ends.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Keep subscription
                    </AlertDialogCancel>
                    <ButtonWithLoading
                        loading={isProcessing}
                        disabled={isProcessing}
                        onClick={handleCancelSubscription}
                        variant="destructive"
                    >
                        Cancel subscription
                    </ButtonWithLoading>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
