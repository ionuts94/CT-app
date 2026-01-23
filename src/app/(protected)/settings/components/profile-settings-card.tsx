import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { FormRow, Input, Label } from "@/components/form-elements"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Save } from "lucide-react"

type Props = {

}

export const ProfileSettingsCard: React.FC<Props> = ({ }) => {
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
                        <Input />
                    </FormRow>
                    <FormRow>
                        <Label>Last name</Label>
                        <Input />
                    </FormRow>
                </FormRow>
                <FormRow>
                    <Label>Email</Label>
                    <Input />
                </FormRow>
                <FormRow className="flex-row gap-4 items-center">
                    <FormRow>
                        <Label>Role</Label>
                        <Input />
                    </FormRow>
                    <FormRow>
                        <Label>Phone number</Label>
                        <Input />
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