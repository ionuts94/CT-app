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
          <SelectLabel>Tone</SelectLabel>
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
  { value: "professional_clear", label: "Professional & clear" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "concise", label: "Concise" },
  { value: "persuasive", label: "Persuasive" },
  { value: "neutral", label: "Neutral" },
  { value: "legalese", label: "Legal (formal language)" },
  { value: "plain_language", label: "Plain language" },
]