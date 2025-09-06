import { useEffect, useState } from "react"
import { AIGenerateTemplate } from "@/actions/post/template/ai-generate-template"
import { AIReviewTemplate, T_AITemplateReviewInputs } from "@/actions/post/template/ai-review-template"
import { T_AiTemplateWriteSchema } from "@/validators/template.validator"
import { T_AITemplateHookReturn } from "@/types/template/ai-template-context"
import { AIFixTemplate, T_AiFixTemplateArgs } from "@/actions/post/template/ai-fix-template"


export const useAITemplate = (): T_AITemplateHookReturn => {
    const [currentTemplateRichText, setCurrentTemplateRichText] = useState<string>()
    const [templateInputs, setTemplateInputs] = useState<T_AiTemplateWriteSchema>()

    const [aiGenerateLoading, setAIGenerateLoading] = useState(false)
    const [aiReviewLoading, setAIReviewLoading] = useState(false)
    const [aiFixLoading, setAiFixLoading] = useState(false)

    const aiGenerateTemplate = async (templateDetails: T_AiTemplateWriteSchema) => {
        setAIGenerateLoading(true)
        const { data, error } = await AIGenerateTemplate(templateDetails)
        setAIGenerateLoading(false)
        setCurrentTemplateRichText(data)
        setTemplateInputs(templateDetails)

        return {
            templateRichTextString: data,
            error,
        }
    }

    const runAITemplateReview = async ({ initialInput, templateRichTextString }: T_AITemplateReviewInputs) => {
        setAIReviewLoading(true)
        const { data, error } = await AIReviewTemplate({ initialInput, templateRichTextString })
        setAIReviewLoading(false)

        return {
            reviewData: data,
            error
        }
    }

    const runAIFixTemplate = async ({ baseInput, baseHtml, issues }: T_AiFixTemplateArgs) => {
        setAiFixLoading(true)
        const { data, error } = await AIFixTemplate({
            baseInput,
            baseHtml,
            issues,
        })
        setAiFixLoading(false)

        return {
            fixedData: data,
            error
        }
    }

    return {
        templateInputs,
        currentTemplateRichText,
        setCurrentTemplateRichText,

        aiGenerateLoading,
        aiGenerateTemplate,

        aiReviewLoading,
        runAITemplateReview,

        aiFixLoading,
        runAIFixTemplate,
    }
}