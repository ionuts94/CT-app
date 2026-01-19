"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Template } from "@prisma/client"
import { FileText, Pen, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
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
import { buttonVariants } from "@/components/ui/button"
import CTTemplate from "@/sdk/templates"
import { toast } from "sonner"

type Props = {
  template: Template
}

export const TemplateCardControls: React.FC<Props> = ({ template }) => {
  const router = useRouter()

  const startContractFromTemplate = (e: React.MouseEvent) => {
    router.push("/contracts/create?t=" + template.id)
  }

  const editTemplate = () => {
    router.push("/templates/" + template.id)
  }

  const handleDeleteTemplate = async () => {
    const { error } = await CTTemplate.deleteTemplate({ templateId: template.id })
    if (error) return toast.error("We couldn’t delete the template. Please try again later.")
    toast.success("Template deleted successfully")
    router.refresh()
  }

  return (
    <div className="w-fit flex gap-1 items-center ml-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger onClick={startContractFromTemplate} className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <FileText size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Create contract from this template
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={0}>
        <TooltipTrigger onClick={editTemplate} className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <Pen size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Edit this template
        </TooltipContent>
      </Tooltip>
      <AlertDialog>
        <AlertDialogTrigger>
          <div>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
                <Trash2 size={16} />
              </TooltipTrigger>
              <TooltipContent>
                Delete template
              </TooltipContent>
            </Tooltip>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              Once confirmed, this template will be permanently deleted and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onPointerDown={handleDeleteTemplate}
              className={buttonVariants({ variant: "destructive" })}
            >
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}