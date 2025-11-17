import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  className?: string,
  disabled?: boolean,
  placeholder?: string,
  value?: string,
  onChange: (value: string) => any
}

export const ToneSelect: React.FC<Props> = ({ className, disabled, placeholder, value, onChange = () => null }) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full bg-muted/40 border-sidebar-primary cursor-pointer", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ton</SelectLabel>
          {TONE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

type T_SelectOption = {
  value: string, label: string
}

export const TONE_OPTIONS: T_SelectOption[] = [
  { value: "professional_clear", label: "Profesional & clar" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Prietenos" },
  { value: "concise", label: "Concis" },
  { value: "persuasive", label: "Persuasiv" },
  { value: "neutral", label: "Neutru" },
  { value: "legalese", label: "Juridic (sobru)" },
  { value: "plain_language", label: "Limbaj simplu" },
]