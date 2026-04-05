"use client"

import { Card } from "@/components/ui/card"
import { TemplateVariables } from "./template-variables"
import { UseFormReturn } from "react-hook-form"
import { T_ContractPayload } from "@/validators/contract.validator"

type Props = {
  form: UseFormReturn<T_ContractPayload>
}

export const ContractControlsSidebar: React.FC<Props> = ({ form }) => {
  return (
    <Card className="w-full h-fit py-4">
      <TemplateVariables form={form} />
    </Card>
  )
}