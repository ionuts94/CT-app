import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type Props = {

}

export const CancelSubscriptionDialog: React.FC<Props> = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
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
                    <AlertDialogAction>
                        Cancel subscription
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
