import { z } from "zod";


export const CreateTemplateSchema = z.object({
  title: z.string().min(1, "Titlul sablonului este obligatoriu"),
  category: z.string().min(1, "Categoria sablonului este obligatorie"),
  content: z.string().min(200, "Continutul sablonului trebuie sa fie de minim 200 caractere"),
})

export type T_CreateTemplateSchema = z.infer<typeof CreateTemplateSchema>


export const AiTemplateWriteSchema = z.object({
  contractType: z.string().min(1, "Tip contract este necesar pentru a intelege mai bine cerinta"),
  industry: z.string().min(1, "Industria joaca un rol important in intelegerea contractului. Te rugam sa selectezi o industrie"),
  tone: z.string().optional(),
  termPeriod: z.string(),
  description: z.string().min(1, "Pentru o generare cat mai precisa avem nevoie de cat mai multe detalii")
})

export type T_AiTemplateWriteSchema = z.infer<typeof AiTemplateWriteSchema>