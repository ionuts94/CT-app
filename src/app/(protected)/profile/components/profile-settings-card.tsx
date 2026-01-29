"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { FormRow, Input, Label } from "@/components/form-elements"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Save } from "lucide-react"
import { useUserContext } from "@/contexts/user-context"
import { useForm } from "react-hook-form"

type Props = {

}

export const ProfileSettingsCard: React.FC<Props> = ({ }) => {
    const { user } = useUserContext()

    const form = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phone: user?.phone,
            role: user?.role
        }
    })

    const { watch, register } = form

    return (
        <Card className="p-4 w-full">
            <div>
                <Text size="lg" weight="semibold">Profile</Text>
                <Text size="sm" className="text-muted-foreground">Personal information and contact details.</Text>
            </div>
            <form className="flex flex-col gap-4">
                <FormRow className="flex-row gap-4 items-center">
                    <FormRow>
                        <Label>First name</Label>
                        <Input {...register("firstName")} />
                    </FormRow>
                    <FormRow>
                        <Label>Last name</Label>
                        <Input {...register("lastName")} />
                    </FormRow>
                </FormRow>
                <FormRow>
                    <Label>Email</Label>
                    <Input {...register("email")} />
                </FormRow>
                <FormRow className="flex-row gap-4 items-center">
                    <FormRow>
                        <Label>Role</Label>
                        <Input {...register("role")} />
                    </FormRow>
                    <FormRow>
                        <Label>Phone number</Label>
                        <Input {...register("phone")} />
                    </FormRow>
                </FormRow>
                <ButtonWithLoading className="ml-auto !px-8 py-3">
                    <Save />
                    Save changes
                </ButtonWithLoading>
            </form>
        </Card>
    )
}