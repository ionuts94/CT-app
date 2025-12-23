"use client"

import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { TemplateCard } from "../../templates/components/template-card"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import CTTemplate from "@/sdk/templates"
import { NoTemplatesFound } from "../../templates/components/no-templates-found"
import { Text } from "@/components/topography"

type Props = {

}

export const NewContractDialog: React.FC<Props> = ({ }) => {
  const query = useQuery({ queryKey: ['templates'], queryFn: () => CTTemplate.getAuthUserTemplates({}) })
  const templates = query.data?.data || []

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>()
  const userHasTemplates = templates && templates?.length > 0

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-3">
          <Plus strokeWidth={3} />
          <TextCTA weight="extrabold">
            CREEAZA CONTRACT
          </TextCTA>
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[1200px] flex-col gap-10">
        <DialogTitle className="text-center">
          Alege sablonul din care sa porneasca contractul
        </DialogTitle>
        {userHasTemplates ? (
          <>
            <div className="flex w-full max-w-[1200px]">
              {templates?.map(template => (
                <div
                  key={template.id}
                  className={cn(
                    "p-4 rounded-lg w-full max-w-[350px] border-[2px] border-transparent",
                    selectedTemplateId === template.id && "border-primary"
                  )}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  <TemplateCard
                    template={template}
                  />
                </div>
              ))}
            </div>
            <DialogFooter className="flex items-center !justify-center">
              <Button className="px-4 py-4" asChild>
                <Link href={`/contracts/create?t=${selectedTemplateId || 'new'}`}>
                  <TextCTA>
                    Creeaza contract
                  </TextCTA>
                </Link>
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="w-full flex-col gap-4 flex h-full items-center justify-center">
            <NoTemplatesFound />
            <Text>sau</Text>
            <Button className="" variant="link" asChild>
              <Link href={`/contracts/create?t=new`}>
                <TextCTA>
                  Creeaza contract fara șablon
                </TextCTA>
              </Link>
            </Button>
          </div>
        )}

        {/* <DialogFooter className="flex items-center !justify-center">
          <Button className="px-4 py-4" asChild>
            <Link href={`/contracts/create?t=${selectedTemplateId}`}>
              <TextCTA>
                Creeaza contract
              </TextCTA>
            </Link>
          </Button>
        </DialogFooter> */}

      </DialogContent>
    </Dialog>
  )
}