import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, Pen, Trash2 } from "lucide-react"

type Props = {

}

export const TemplateCardControls: React.FC<Props> = ({ }) => {
  return (
    <div className="w-fit flex gap-1 items-center ml-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <FileText size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Creeaza contract din acest template
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <Pen size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Modifica acest template
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="p-2 rounded-md border border-gray-300 cursor-pointer  hover:border-primary">
          <Trash2 size={16} />
        </TooltipTrigger>
        <TooltipContent>
          Sterge template
        </TooltipContent>
      </Tooltip>
    </div>
  )
}