import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail } from "lucide-react"

type Props = {

}

export const InviteUserDialog: React.FC<Props> = ({ }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="p-4">
            <Mail size={14} />
            Invite someone
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>

          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}