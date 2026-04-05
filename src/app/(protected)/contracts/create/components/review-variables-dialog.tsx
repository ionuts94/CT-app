import { ContractContentView } from "@/app/view-contract/components/contract-content-view"
import { ContractViewSignatures } from "@/app/view-contract/components/contract-view-signatures"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Text } from "@/components/topography"
import { useDialog } from "@/hooks/use-dialog"

type Props = {
  disabled?: boolean,
  onConfirm: () => void,
  content: string,
}

export const ReviewVariablesDialog: React.FC<Props> = ({ disabled, onConfirm, content }) => {
  const { isOpen, toggleDialog } = useDialog()

  const contentHtml = content
    ?.toString()
    .replace(/<p>(<br\s*\/?>)?<\/p>/g, "<p>&nbsp;</p>")

  const handleConfirm = () => {
    onConfirm()
    toggleDialog(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>
          Apply changes and review
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-300">
        <DialogHeader>
          <DialogTitle>Review changes</DialogTitle>
          <DialogDescription> Here you can review the changes you made to the template variables before applying them to the contract.</DialogDescription>
        </DialogHeader>

        <Card className="p-0 gap-0 max-h-[500px] overflow-auto w-full rounded-md">
          <div className="px-4 py-3 lg:px-10 overflow-y-auto border-b">
            <div
              className="break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: contentHtml as any }}
            />
          </div>
        </Card>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => toggleDialog(false)}>
            Back
          </Button>
          <Button
            onClick={handleConfirm}
          >
            Confirm changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}