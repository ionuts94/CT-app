"use client"

import { T_ViewContract } from "@/types/services/contracts"
import { Button } from "./ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

type Props = {
  contract: T_ViewContract
}

export const DownloadContractButton: React.FC<Props> = ({ contract }) => {
  const startDownload = async () => {
    if (!contract.signedPdfUrl) return

    try {
      const response = await fetch(contract.signedPdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${contract.title}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()

      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      toast.error("Nu am putut descarca contractul. Eroare: " + err.message)
    }
  }

  if (contract.status !== "FULLY_SIGNED" || !contract.signedPdfUrl) {
    return null;
  }

  return (
    <Button onClick={startDownload}>
      <Download />
      Descarca PDF
    </Button>
  )
}