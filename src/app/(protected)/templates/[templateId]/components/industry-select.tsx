import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Props = {
  className?: string,
  disabled?: boolean,
  placeholder?: string,
  value?: string,
  onChange: (value: string) => any
}

export const IndustrySelect: React.FC<Props> = ({ className, disabled, placeholder, value, onChange = () => null }) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full bg-muted/40 border-sidebar-primary cursor-pointer", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Industrie</SelectLabel>
          {INDUSTRY_OPTIONS.map((opt) => (
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

export const INDUSTRY_OPTIONS: T_SelectOption[] = [
  { value: "software_saas", label: "Software / SaaS" },
  { value: "ecommerce_retail", label: "E-commerce & Retail" },
  { value: "marketing_ads", label: "Marketing & Publicitate" },
  { value: "consulting", label: "Consultanță" },
  { value: "creative_services", label: "Servicii creative" },
  { value: "construction_real_estate", label: "Construcții & Imobiliare" },
  { value: "manufacturing", label: "Producție / Manufacturing" },
  { value: "healthcare", label: "Sănătate & Servicii medicale" },
  { value: "pharma_meddevices", label: "Farmaceutice & Dispozitive medicale" },
  { value: "finance_fintech", label: "Financiar-bancar & Fintech" },
  { value: "legal", label: "Juridic & Notarial" },
  { value: "hr_recruitment", label: "Resurse umane & Recrutare" },
  { value: "education", label: "Educație & E-learning" },
  { value: "nonprofit", label: "ONG / Non-profit" },
  { value: "public_sector", label: "Sector public / Guvernamental" },
  { value: "transport_logistics", label: "Transport & Logistică" },
  { value: "travel_hospitality", label: "Turism & Ospitalitate (HoReCa)" },
  { value: "food_beverage", label: "Alimentație & Băuturi" },
  { value: "agriculture", label: "Agricultură & Agro-food" },
  { value: "energy", label: "Energie (petrol, gaze, regenerabile)" },
  { value: "telecom_it", label: "Telecomunicații & Infrastructură IT" },
  { value: "media_entertainment", label: "Media, Entertainment & Gaming" },
  { value: "automotive", label: "Automotive & Mobilitate" },
  { value: "fashion_beauty", label: "Modă, Beauty & Cosmetice" },
  { value: "security", label: "Securitate & Protecție" },
  { value: "events", label: "Evenimente & Conferințe" },
  { value: "rnd", label: "Cercetare & Dezvoltare" },
  { value: "web3_crypto", label: "Web3 / Crypto" },
  { value: "home_services", label: "Servicii pentru locuință" },
  { value: "freelance", label: "Freelancing / Soloprenori" },
  { value: "other", label: "Altă industrie…" },
]

