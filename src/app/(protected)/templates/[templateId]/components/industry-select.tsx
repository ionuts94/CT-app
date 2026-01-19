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
          <SelectLabel>Industry</SelectLabel>
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
  { value: "marketing_ads", label: "Marketing & Advertising" },
  { value: "consulting", label: "Consulting" },
  { value: "creative_services", label: "Creative Services" },
  { value: "construction_real_estate", label: "Construction & Real Estate" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare & Medical Services" },
  { value: "pharma_meddevices", label: "Pharmaceuticals & Medical Devices" },
  { value: "finance_fintech", label: "Finance & Fintech" },
  { value: "legal", label: "Legal & Notary Services" },
  { value: "hr_recruitment", label: "Human Resources & Recruitment" },
  { value: "education", label: "Education & E-learning" },
  { value: "nonprofit", label: "Non-profit / NGO" },
  { value: "public_sector", label: "Public Sector / Government" },
  { value: "transport_logistics", label: "Transport & Logistics" },
  { value: "travel_hospitality", label: "Travel & Hospitality (HoReCa)" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "agriculture", label: "Agriculture & Agri-food" },
  { value: "energy", label: "Energy (Oil, Gas & Renewables)" },
  { value: "telecom_it", label: "Telecommunications & IT Infrastructure" },
  { value: "media_entertainment", label: "Media, Entertainment & Gaming" },
  { value: "automotive", label: "Automotive & Mobility" },
  { value: "fashion_beauty", label: "Fashion, Beauty & Cosmetics" },
  { value: "security", label: "Security & Protection Services" },
  { value: "events", label: "Events & Conferences" },
  { value: "rnd", label: "Research & Development" },
  { value: "web3_crypto", label: "Web3 / Crypto" },
  { value: "home_services", label: "Home Services" },
  { value: "freelance", label: "Freelancers & Solopreneurs" },
  { value: "other", label: "Other industry…" },
]
