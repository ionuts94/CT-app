import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"

type Props = {
    companyName?: string,
    primaryColor?: string,
    userName?: string,
    signature?: string,
    instructions?: string
}

const DEFAULTS = {
    companyName: "Nume Companie",
    primaryColor: "black",
    userName: "Dragos Popescu",
    signature: "",
    instructions: "Aceasta este o scurtă previzualizare a contractului."
}

export const OnboardingContractPreview: React.FC<Props> = ({
    companyName,
    primaryColor = DEFAULTS.primaryColor,
    userName,
    signature,
    instructions = DEFAULTS.instructions
}) => {
    return (
        <Card className="p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-red-200 rounded-sm"></div>
                    <p className="text-xl font-semibold" style={{ color: primaryColor }}>{companyName}</p>
                </div>
                <div className="bg-muted/40 w-fit py-2 px-4 rounded-full text-sm font-bold text-secondary-foreground">
                    Draft
                </div>
            </div>
            <span className="border text-md text-color-secondary p-4 rounded-sm border-dashed">
                {instructions}
            </span>
            <div className="grid grid-cols-2">
                <Text size="sm" weight="semibold">{companyName} - {userName}</Text>
                <div className="flex justify-end">
                    <Text size="sm" weight="semibold">Semnatura</Text>
                </div>
            </div>
        </Card>
    )
}

const d = "Aceasta este o scurtă previzualizare a modului în care apare brandingul dvs. în contractele vizibile pentru client. Linkurile și acțiunile utilizează culoarea principală, iar evidențierile folosesc accentul"