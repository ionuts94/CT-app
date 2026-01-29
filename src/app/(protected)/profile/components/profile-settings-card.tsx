"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { FormRow, Input, Label } from "@/components/form-elements"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Save } from "lucide-react"
import { useUserContext } from "@/contexts/user-context"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { InputImage } from "@/components/image-upload-input"
import { ChangeEvent } from "react"
import CTStorage from "@/sdk/storage"
import { BUCKETS } from "@/constants/buckets"
import { v4 as uuid } from "uuid"
import { toast } from "sonner"
import CTUser from "@/sdk/user"
import { useRouter } from "next/navigation"

type Props = {

}

export const ProfileSettingsCard: React.FC<Props> = ({ }) => {
    const router = useRouter()
    const { user } = useUserContext()

    const form = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phone: user?.phone,
            role: user?.role,
            profilePictureUrl: user?.profilePictureUrl
        }
    })

    const { watch, register, setValue, handleSubmit, formState } = form

    const values = watch()

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const { data } = await CTStorage.storeFile({
            file,
            bucket: BUCKETS.profilePictures,
            filePath: `${file.name}-${uuid()}`,
        })

        if (!data) {
            return toast.error("Failed to upload picture")
        }

        setValue("profilePictureUrl", data.fileUrl)
    }

    const handleFormSubmit = handleSubmit(async () => {
        const { error } = await CTUser.updateUser(user?.id!, values)
        if (error) return toast.error(error)
        toast.success("Changes saved successfully")
        router.refresh()
    })

    return (
        <Card className="p-4 w-full">
            {/* <div>
                <Text size="lg" weight="semibold">Profile</Text>
                <Text size="sm" className="text-muted-foreground">Personal information and contact details.</Text>
            </div> */}
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-4 items-center justify-center lg:items-start">
                    <Text className="font-semibold">Profile picture</Text>
                    <div className="size-40">
                        <InputImage
                            defaultPreviewUrl={user?.profilePictureUrl || undefined}
                            className="rounded-full overflow-hidden"
                            onImageChange={handleImageChange}
                            placeholder="Upload image"
                            fillMode="cover"
                        />
                    </div>
                </div>
                <FormRow className="flex-col lg:flex-row gap-4 items-center">
                    <FormRow>
                        <Label>First name</Label>
                        <Input {...register("firstName")} />
                    </FormRow>
                    <FormRow>
                        <Label>Last name</Label>
                        <Input {...register("lastName")} />
                    </FormRow>
                </FormRow>
                <FormRow className="flex-col lg:flex-row gap-4 items-center">
                    <FormRow>
                        <Label>Email</Label>
                        <Input {...register("email")} />
                    </FormRow>
                    <FormRow>
                        <Label>Phone number</Label>
                        <Input {...register("phone")} />
                    </FormRow>
                </FormRow>
                <FormRow className="flex-col lg:flex-row gap-4 items-center">
                    <FormRow>
                        <Label>Role</Label>
                        <Input {...register("role")} />
                    </FormRow>
                    <FormRow />
                </FormRow>
                <ButtonWithLoading
                    disabled={formState.isSubmitting}
                    loading={formState.isSubmitting}
                    className="w-full lg:w-fit ml-auto !px-8 py-3"
                >
                    <Save />
                    Save changes
                </ButtonWithLoading>
            </form>
        </Card>
    )
}