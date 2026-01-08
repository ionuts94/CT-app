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
    if (error) return toast.error("Nu am putut sterge sablonul. Te rugam sa incerci mai tarziu")
    toast.success("Success")
    router.refresh()
  }

  return (
    <div className="w-fit flex gap-1 items-center ml-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger onClick={startContractFromTemplate} className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <FileText size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Creeaza contract din acest template
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={0}>
        <TooltipTrigger onClick={editTemplate} className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <Pen size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Modifica acest template
        </TooltipContent>
      </Tooltip>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
              <Trash2 size={16} />
            </TooltipTrigger>
            <TooltipContent>
              Sterge template
            </TooltipContent>
          </Tooltip>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sigur vrei să ștergi acest template?</AlertDialogTitle>
            <AlertDialogDescription>
              După confirmare, template-ul va fi șters definitiv și nu va mai putea fi recuperat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Renunță</AlertDialogCancel>
            <AlertDialogAction onPointerDown={handleDeleteTemplate} className={buttonVariants({ variant: "destructive" })}>Șterge definitiv</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}