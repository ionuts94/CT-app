import { Card } from "@/components/ui/card"

type Props = {
    companyName: string,
    primaryColor: string
}

export const BrandContractPreview: React.FC<Props> = ({ companyName, primaryColor }) => {
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
                Aceasta este o scurtă previzualizare a modului în care apare brandingul dvs. în contractele vizibile pentru client.
                Linkurile și acțiunile utilizează culoarea principală, iar evidențierile folosesc accentul
            </span>
        </Card>
    )
}