import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Info } from "lucide-react"

type Props = {

}

export const HowItWorksDialog: React.FC<Props> = ({ }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="bg-white text-black/80 hover:bg-amber-50 p-4">
            <Info size={14} />
            How it works
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