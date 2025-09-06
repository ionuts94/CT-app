import { T_AiTemplateWriteSchema } from "@/validators/template.validator"
import { TemplateReviewOutput } from "@/types/template/ai-review-template"

export type T_AIGenerateTemplateReturn = {
    templateRichTextString?: string,
    error?: string | null
}

export type T_AIReviewTemplateReturn = {
    reviewData: TemplateReviewOutput | undefined,
    error?: string | null
}

export type T_AIFixTemplateReturn = {
    fixedData: ContractFixOutputSelective | undefined;
    error: string | null | undefined;
}

export type T_AITemplateHookReturn = {
    templateInputs: T_AiTemplateWriteSchema | undefined,
    currentTemplateRichText: string | undefined,
    setCurrentTemplateRichText: (content: string) => any

    aiGenerateLoading: boolean,
    aiGenerateTemplate: (templateDetails: T_AiTemplateWriteSchema) => Promise<T_AIGenerateTemplateReturn>

    aiReviewLoading: boolean,
    runAITemplateReview: ({ initialInput, templateRichTextString }: T_AITemplateReviewInputs) => Promise<T_AIReviewTemplateReturn>

    aiFixLoading: boolean,
    runAIFixTemplate: ({ baseInput, baseHtml, issues }: T_AiFixTemplateArgs) => Promise<T_AIFixTemplateReturn>
}