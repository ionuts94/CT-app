import { useState } from "react"
import { AIGenerateTemplate } from "@/actions/post/template/ai-generate-template"
import { AIReviewTemplate, T_AITemplateReviewInputs } from "@/actions/post/template/ai-review-template"
import { T_AiTemplateWriteSchema } from "@/validators/template.validator"

export const useAITemplate = () => {
    const [aiGenerateLoading, setAIGenerateLoading] = useState(false)
    const [aiReviewLoading, setAIReviewLoading] = useState(false)

    const aiGenerateTemplate = async (templateDetails: T_AiTemplateWriteSchema) => {
        setAIGenerateLoading(true)
        const { data, error } = await AIGenerateTemplate(templateDetails)
        setAIGenerateLoading(false)
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

    return {
        aiGenerateLoading,
        aiGenerateTemplate,

        aiReviewLoading,
        runAITemplateReview
    }
}