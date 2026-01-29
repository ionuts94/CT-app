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
        <Button className="cursor-pointer p-3 w-full md:w-fit">
          <Plus strokeWidth={3} />
          <TextCTA weight="extrabold">
            CREATE CONTRACT
          </TextCTA>
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:!max-w-[1200px] flex-col gap-10">
        <DialogTitle className="text-center">
          Choose a template to start your contract
        </DialogTitle>

        {userHasTemplates ? (
          <>
            <div className="flex w-full lg:max-w-[1200px] overflow-auto pb-4">
              {templates?.map(template => (
                <div
                  key={template.id}
                  className={cn(
                    "!p-2 rounded-lg w-full lg:max-w-[350px] border-[2px] border-transparent flex items-center justify-center",
                    selectedTemplateId === template.id && "border-primary"
                  )}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  <TemplateCard template={template} />
                </div>
              ))}
            </div>

            <DialogFooter className="flex items-center !justify-center">
              <Button className="px-4 py-4" asChild>
                <Link href={`/contracts/create?t=${selectedTemplateId || 'new'}`}>
                  <TextCTA>
                    Create contract
                  </TextCTA>
                </Link>
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="w-full flex-col gap-4 flex h-full items-center justify-center">
            <NoTemplatesFound />
            <Text>or</Text>
            <Button variant="link" asChild>
              <Link href={`/contracts/create?t=new`}>
                <TextCTA>
                  Create contract without a template
                </TextCTA>
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
