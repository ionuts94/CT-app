"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { FormRow, Input, Label } from "@/components/form-elements"
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

type Props = {
    company?: Company
}

export const CompanySettingsCard: React.FC<Props> = ({ company }) => {
    const form = useForm({
        defaultValues: {
            name: company?.name || "",
            cui: company?.cui || "",
            domain: company?.emailDomain || "",
            regNumber: company?.regNumber || "",
            logoUrl: company?.logoUrl || "",
            primaryColor: company?.colorPrimary || "#000",
            secondaryColor: company?.colorSecondary || "#000",
            accentColor: company?.colorAccent || "#000",
        },
    })

    const { register, handleSubmit, watch, setValue, reset } = form

    const values = watch()

    const onColorChange = (
        name: "primaryColor" | "secondaryColor" | "accentColor",
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


    return (
        <Card className="p-4 w-full">
            <div>
                <Text size="lg" weight="semibold">Company</Text>
                <Text size="sm" className="text-muted-foreground">How your companny appears in contracts and emails</Text>
            </div>
            <form className="flex flex-col gap-4">
                <FormRow>
                    <Label>Company name</Label>
                    <Input {...register("name")} />
                </FormRow>

                <FormRow>
                    <Label>Registration number</Label>
                    <Input {...register("regNumber")} />
                </FormRow>

                <FormRow>
                    <Label>Domain</Label>
                    <Input {...register("domain")} />
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
                    </FormRow>

                    <FormRow className="flex flex-col pt-1">
                        <FormRow>
                            <Label>Primary color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.primaryColor}
                                onChange={(val) => onColorChange("primaryColor", val)}
                            />
                        </FormRow>

                        <FormRow>
                            <Label>Secondary color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.secondaryColor}
                                onChange={(val) => onColorChange("secondaryColor", val)}
                            />
                        </FormRow>

                        <FormRow>
                            <Label>Accent color</Label>
                            <ColorPicker
                                className="bg-muted/40"
                                value={values.accentColor}
                                onChange={(val) => onColorChange("accentColor", val)}
                            />
                        </FormRow>
                    </FormRow>
                </FormRow>

                <ButtonWithLoading className="ml-auto !px-8 py-3">
                    <Save />
                    Save branding
                </ButtonWithLoading>
            </form>
        </Card>
    )
}