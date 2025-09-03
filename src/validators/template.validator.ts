import { z } from "zod";

export const AiTemplateWriteSchema = z.object({
  contractType: z.string().min(1, "Tip contract este necesar pentru a intelege mai bine cerinta"),
  industry: z.string().min(1, 'Industria joaca un rol important in intelegerea contractului. Te rugam sa selectezi o industrie'),
  tone: z.string().optional(),
  termPeriod: z.string(),
  description: z.string().min(1, "Pentru o generare cat mai precisa avem nevoie de cat mai multe detalii")
})

export type T_AiTemplateWriteSchema = z.infer<typeof AiTemplateWriteSchema>