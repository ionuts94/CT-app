import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import Image from "next/image"

type Props = {
    companyName?: string,
    primaryColor?: string,
    userName?: string,
    signature?: string,
    instructions?: string,
    logoUrl?: string
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
    instructions = DEFAULTS.instructions,
    logoUrl
}) => {
    return (
        <Card className="p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    {logoUrl &&
                        <div className="h-8 bg-red-200 rounded-sm relative">
                            <img src={logoUrl} alt="logo-preview" className="h-full" />
                        </div>
                    }
                    <p className="text-xl font-semibold" style={{ color: primaryColor }}>{companyName}</p>
                </div>
                <div className="bg-muted/40 w-fit py-2 px-4 rounded-full text-sm font-bold text-secondary-foreground">
                    Draft
                </div>
            </div>
            <span className="border text-md text-color-secondary p-4 rounded-sm border-dashed">
                {instructions}
            </span>
            <div className="flex flex-col gap-6">
                <Text size="sm" weight="semibold">{companyName} - {userName}</Text>
                <div className="flex items-start flex-col gap-2">
                    <Text size="sm" weight="semibold">Semnatura</Text>
                    {signature && <img className="h-14 w-fit object-contain" src={signature} alt="signature" />}
                </div>
            </div>
        </Card>
    )
}

const d = "Aceasta este o scurtă previzualizare a modului în care apare brandingul dvs. în contractele vizibile pentru client. Linkurile și acțiunile utilizează culoarea principală, iar evidențierile folosesc accentul"