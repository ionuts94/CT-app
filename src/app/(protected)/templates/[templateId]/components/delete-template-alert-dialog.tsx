"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { TextCTA } from "@/components/topography/cta"
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
import CTTemplate from "@/sdk/templates"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  templateId: string
}

export const DeleteTemplateAlertDialog: React.FC<Props> = ({ templateId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDeleteTemplate = async () => {
    setLoading(true)
    const { error } = await CTTemplate.deleteTemplate({ templateId })
    setLoading(false)
    if (error) return toast.error(error)
    router.replace("/templates")
    toast.success("Template deleted successfully")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white border-red-400 border-[2px] text-red-400 hover:bg-red-400 hover:text-white">
          <Trash strokeWidth={3} />
          <TextCTA>
            Delete template
          </TextCTA>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this template?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once confirmed, this template will be permanently deleted and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="none">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <ButtonWithLoading
              loading={loading}
              onClick={handleDeleteTemplate}
              className="bg-white border-red-400 border-[2px] text-red-400 hover:bg-red-400 hover:text-white"
            >
              Delete permanently
            </ButtonWithLoading>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
