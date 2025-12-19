
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
    toast.success("Sablonul a fost sters")
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white border-red-400 border-[2px] text-red-400 hover:bg-red-400 hover:text-white">
          <Trash strokeWidth={3} />
          <TextCTA>
            Sterge Sablon
          </TextCTA>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sigur vrei să ștergi acest template?</AlertDialogTitle>
          <AlertDialogDescription>După confirmare, template-ul va fi șters definitiv și nu va mai putea fi recuperat.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="" variant="none">
              Renunță
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <ButtonWithLoading loading={loading} onClick={handleDeleteTemplate} className="bg-white border-red-400 border-[2px] text-red-400 hover:bg-red-400 hover:text-white">
              Șterge definitiv
            </ButtonWithLoading>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}