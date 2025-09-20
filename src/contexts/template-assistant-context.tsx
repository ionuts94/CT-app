"use client"

import { CreateTemplate } from "@/actions/post/template"
import { AIReviewTemplate } from "@/actions/post/template/ai-review-template"
import { useAITemplate } from "@/hooks/use-ai-template"
import { T_AITemplateHookReturn } from "@/types/template/ai-template-context"
import { CreateTemplateSchema, T_CreateTemplateSchema } from "@/validators/template.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { BaseSyntheticEvent, createContext, useContext, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

type T_TemplateContext = T_AITemplateHookReturn & {
    form: UseFormReturn<T_CreateTemplateSchema, any, T_CreateTemplateSchema>,
    handleSaveTemplate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<any>
}

const TemplateContext = createContext<T_TemplateContext>({
    templateInputs: undefined,
    currentTemplateRichText: undefined,
    setCurrentTemplateRichText: () => null as any,
    aiGenerateLoading: false,
    aiGenerateTemplate: () => null as any,
    aiReviewLoading: false,
    runAITemplateReview: () => null as any,
    aiFixLoading: false,
    runAIFixTemplate: () => null as any,
    form: null as any,
    handleSaveTemplate: async () => { }
})


type Props = {
    children: React.ReactNode
}

export const TemplateProvider: React.FC<Props> = ({ children }) => {
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

    const form = useForm<T_CreateTemplateSchema>({
        resolver: zodResolver(CreateTemplateSchema),
        defaultValues: {
            title: "",
            category: "",
            content: ""
        }
    })

    const { handleSubmit } = form

    const handleSaveTemplate = handleSubmit(async (values: T_CreateTemplateSchema) => {
        const { } = await CreateTemplate(values)
    })

    useEffect(() => {
        if (currentTemplateRichText)
            form.setValue("content", currentTemplateRichText)
    }, [currentTemplateRichText])

    return (
        <TemplateContext.Provider
            value={{
                templateInputs,
                currentTemplateRichText,
                setCurrentTemplateRichText,
                aiGenerateLoading,
                aiGenerateTemplate,
                aiReviewLoading,
                runAITemplateReview,
                aiFixLoading,
                runAIFixTemplate,
                form,
                handleSaveTemplate
            }}
        >
            {children}
        </TemplateContext.Provider>
    )
}

export const useTemplateContext = () => {
    const ctx = useContext(TemplateContext)
    return ctx;
}