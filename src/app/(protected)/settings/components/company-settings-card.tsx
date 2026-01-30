"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { FormRow, Input, InvalidInputError, Label } from "@/components/form-elements"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Save } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import { Company } from "@prisma/client"
import { useForm } from "react-hook-form"
import { ChangeEvent } from "react"
import CTStorage from "@/sdk/storage"
import { BUCKETS } from "@/constants/buckets"
import { v4 as uuid } from "uuid"
import { InputImage } from "@/components/image-upload-input"
import { CompanySchema, T_CompanySchema } from "@/validators/company.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import CTCompany from "@/sdk/company"
import { toast } from "sonner"

type Props = {
    company?: Company
}

export const CompanySettingsCard: React.FC<Props> = ({ company }) => {
    const form = useForm<T_CompanySchema>({
        resolver: zodResolver(CompanySchema),
        defaultValues: {
            name: company?.name || "",
            cui: company?.cui || "",
            emailDomain: company?.emailDomain || "",
            regNumber: company?.regNumber || "",
            logoUrl: company?.logoUrl || "",
            colorPrimary: company?.colorPrimary || "#000",
            colorSecondary: company?.colorSecondary || "#000",
            colorAccent: company?.colorAccent || "#000",
        },
    })

    const { register, handleSubmit, watch, setValue, reset, formState } = form
    const { isDirty, errors, isSubmitting } = formState
    const isSubmitDisabled = isSubmitting

    const values = watch()

    const onColorChange = (
        name: "colorPrimary" | "colorSecondary" | "colorAccent",
        value: string
    ) => {
        setValue(name, value)
    }

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const { data } = await CTStorage.storeFile({
            file,
            bucket: BUCKETS.logos,
            filePath: `${file.name}-${uuid()}`,
        })

        setValue("logoUrl", data?.fileUrl || "")
    }

    const handleFormSubmit = async () => {
        console.log(company)

        if (!company) return toast.error("Tehnical error. Please contact support")
        const { error } = await CTCompany.update(company.id, values)
        if (error) return toast.error(error)
        toast.success("Company updated successfully")
    }


    return (
        <Card className="p-4 w-full">
            <div>
                <Text size="lg" weight="semibold">Company</Text>
                <Text size="sm" className="text-muted-foreground">How your companny appears in contracts and emails</Text>
            </div>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                <FormRow>
                    <Label>Company name</Label>
                    <Input {...register("name")} />
                    <InvalidInputError>{errors.name?.message}</InvalidInputError>
                </FormRow>

                <FormRow>
                    <Label>Registration number</Label>
                    <Input {...register("regNumber")} />
                    <InvalidInputError>{errors.regNumber?.message}</InvalidInputError>
                </FormRow>

                <FormRow>
                    <Label>Domain</Label>
                    <Input {...register("emailDomain")} />
                    <InvalidInputError>{errors.emailDomain?.message}</InvalidInputError>
                </FormRow>

                <FormRow className="lg:flex-row gap-6">
                    <FormRow className="lg:w-fit">
                        <Label>Logo</Label>
                        <InputImage
                            onImageChange={handleImageChange}
                            placeholder="Upload logo"
                            defaultPreviewUrl={values.logoUrl}
                        />
                        <Text size="sm" className="text-color-secondary">
                            PNG or SVG, max 8MB.
                            <br />
                            Transparent background recommended.
                        </Text>
                        <InvalidInputError>{errors.logoUrl?.message}</InvalidInputError>
                    </FormRow>

                    <FormRow className="flex flex-col pt-1">
                        <FormRow>
                            <Label>Primary color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.colorPrimary}
                                onChange={(val) => onColorChange("colorPrimary", val)}
                            />
                            <InvalidInputError>{errors.colorPrimary?.message}</InvalidInputError>
                        </FormRow>

                        <FormRow>
                            <Label>Secondary color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.colorSecondary}
                                onChange={(val) => onColorChange("colorSecondary", val)}
                            />
                            <InvalidInputError>{errors.colorSecondary?.message}</InvalidInputError>
                        </FormRow>

                        <FormRow>
                            <Label>Accent color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.colorAccent}
                                onChange={(val) => onColorChange("colorAccent", val)}
                            />
                            <InvalidInputError>{errors.colorAccent?.message}</InvalidInputError>
                        </FormRow>

                    </FormRow>
                </FormRow>

                <ButtonWithLoading disabled={isSubmitDisabled} loading={isSubmitting} className="ml-auto !px-8 py-3">
                    <Save />
                    Save branding
                </ButtonWithLoading>
            </form>
        </Card>
    )
}