import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Signature as SignatureType } from "@prisma/client"
import { Signature } from "lucide-react"

type Props = {
  currentSignatureId: string
  signatures: SignatureType[]
}

export const SelectSignatureDialog: React.FC<Props> = ({ }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <Signature />
          <Text>Change signature</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Change signature
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}