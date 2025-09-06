"use client"

import { AIReviewTemplate } from "@/actions/post/template/ai-review-template"
import { useAITemplate } from "@/hooks/use-ai-template"
import { T_AITemplateHookReturn } from "@/types/template/ai-template-context"
import { createContext, useContext } from "react"

type T_AITemplateContext = T_AITemplateHookReturn & {

}

const AiTemplateContext = createContext<T_AITemplateContext>({
    templateInputs: undefined,
    currentTemplateRichText: undefined,
    setCurrentTemplateRichText: () => null as any,
    aiGenerateLoading: false,
    aiGenerateTemplate: () => null as any,
    aiReviewLoading: false,
    runAITemplateReview: () => null as any,
    aiFixLoading: false,
    runAIFixTemplate: () => null as any
})


type Props = {
    children: React.ReactNode
}

export const AITemplateContext: React.FC<Props> = ({ children }) => {
    const {
        templateInputs,
        currentTemplateRichText,
        setCurrentTemplateRichText,
        aiGenerateLoading,
        aiGenerateTemplate,
        aiReviewLoading,
        runAITemplateReview,
        aiFixLoading,
        runAIFixTemplate
    } = useAITemplate()

    return (
        <AiTemplateContext.Provider
            value={{
                templateInputs,
                currentTemplateRichText,
                setCurrentTemplateRichText,
                aiGenerateLoading,
                aiGenerateTemplate,
                aiReviewLoading,
                runAITemplateReview,
                aiFixLoading,
                runAIFixTemplate
            }}
        >
            {children}
        </AiTemplateContext.Provider>
    )
}

export const useAITemplateContext = () => {
    const ctx = useContext(AiTemplateContext)
    return ctx;
}