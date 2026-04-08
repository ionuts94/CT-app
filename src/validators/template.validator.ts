import { z } from "zod";


export const CreateTemplateSchema = z.object({
  title: z.string().min(1, "Template title is mandatory"),
  category: z.string().min(1, "Template category is mandatory"),
  content: z.string().min(200, "Template content must be at least 200 characters long"),
})

export type T_CreateTemplateSchema = z.infer<typeof CreateTemplateSchema>


export const AiTemplateWriteSchema = z.object({
  contractType: z.string().min(1, "Contract type is required to better understand the request"),
  industry: z.string().min(1, "Industry plays an important role in understanding the contract. Please select an industry"),
  tone: z.string().optional(),
  termPeriod: z.string(),
  description: z.string().min(1, "For a more accurate generation, we need as many details as possible")
})

export type T_AiTemplateWriteSchema = z.infer<typeof AiTemplateWriteSchema>