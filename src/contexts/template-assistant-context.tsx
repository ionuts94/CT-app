"use client"

import { CreateTemplate, UpdateTemplate } from "@/actions/post/template"
import { AIReviewTemplate } from "@/actions/post/template/ai-review-template"
import { useAITemplate } from "@/hooks/use-ai-template"
import { T_AITemplateHookReturn } from "@/types/template/ai-template-context"
import { CreateTemplateSchema, T_CreateTemplateSchema } from "@/validators/template.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Template } from "@prisma/client"
import { useRouter } from "next/navigation"
import { BaseSyntheticEvent, createContext, useContext, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

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
    children: React.ReactNode,
    templateData?: Template
}

export const TemplateProvider: React.FC<Props> = ({ children, templateData }) => {
    const router = useRouter()
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
            title: templateData?.title || "",
            category: templateData?.category || "",
            content: templateData?.content as string || ""
        }
    })
    const isEditing = !!templateData
    const { handleSubmit } = form

    const handleSaveTemplate = handleSubmit(async (values: T_CreateTemplateSchema) => {
        if (isEditing) return handleUpdateTemplate({ ...templateData, ...values })
        handleCreateTemplate(values)
    })

    const handleCreateTemplate = async (values: T_CreateTemplateSchema) => {
        const { error } = await CreateTemplate(values)
        if (error) return toast.error(error)
        toast.success("Sablonul a fost creeat")
        router.replace("/templates")
    }
    const handleUpdateTemplate = async (values: Template) => {
        const { error } = await UpdateTemplate({ template: values })
        if (error) return toast.error(error)
        toast.success("Sablonul a fost actualizat cu succes")
        router.replace("/templates")
    }


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