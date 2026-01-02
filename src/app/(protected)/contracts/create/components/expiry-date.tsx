import { Label } from "@/components/form-elements"
import { CardDescription } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"

type Props = {
    onSelectDate: (newDate: Date | null) => any,
    ctaText: string,
    additionalInfo: string | React.ReactNode
}

export const ExpiryDate: React.FC<Props> = ({ onSelectDate, ctaText, additionalInfo }) => {
    const [checked, setChecked] = useState(false)

    const handleRevealClick = (_checked: boolean) => {
        if (!_checked) onSelectDate(null)
        setChecked(_checked)
    }

    return (
        <div className="flex flex-col gap-2">
            <Label className="cursor-pointer w-fit">
                <input
                    type="checkbox"
                    aria-label={ctaText}
                    checked={checked}
                    onChange={(e) => handleRevealClick(e.target.checked)}
                    className="size-4 cursor-pointer"
                />
                {ctaText}
            </Label>

            {checked &&
                <>
                    <DatePicker onSelectDate={onSelectDate} />
                    <CardDescription>{additionalInfo}</CardDescription>
                </>
            }
        </div>
    )
}