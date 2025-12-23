"use client"

import { useAITemplate } from "@/hooks/use-ai-template"
import CTTemplate from "@/sdk/templates"
import { T_AITemplateHookReturn } from "@/types/template/ai-template-context"
import { CreateTemplateSchema, T_CreateTemplateSchema } from "@/validators/template.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Template } from "@prisma/client"
import { useRouter } from "next/navigation"
import { BaseSyntheticEvent, createContext, useContext, useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

type T_TemplateContext = T_AITemplateHookReturn & {
    form: UseFormReturn<T_CreateTemplateSchema, any, T_CreateTemplateSchema>,
    handleSaveTemplate: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<any>,
    isSavingTemplate: boolean
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
    handleSaveTemplate: async () => { },
    isSavingTemplate: false
})

type Props = {
    children: React.ReactNode,
    templateData?: Template
}

export const TemplateProvider: React.FC<Props> = ({ children, templateData }) => {
    const [isSavingTemplate, setIsSavingTemplate] = useState(false)
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
        setIsSavingTemplate(true)
        const { error } = await CTTemplate.create(values)
        if (error) return toast.error(error)
        toast.success("Sablonul a fost creeat")
        router.replace("/templates")
        setIsSavingTemplate(false)
    }
    const handleUpdateTemplate = async (values: Template) => {
        setIsSavingTemplate(true)
        const { error } = await CTTemplate.update(values)
        if (error) return toast.error(error)
        toast.success("Sablonul a fost actualizat cu succes")
        router.replace("/templates")
        setIsSavingTemplate(false)
    }


    useEffect(() => {
        if (currentTemplateRichText)
            form.setValue("content", currentTemplateRichText)
    }, [currentTemplateRichText])

    return (
        <TemplateContext.Provider
            value={{
                isSavingTemplate,
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