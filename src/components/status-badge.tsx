import { cn } from "@/lib/utils"
import { ContractStatus } from "@prisma/client";
import { Check, CircleX, Clock, LucideIcon, Pen, ShieldX } from "lucide-react";

type Props = {
  status: ContractStatus;
  className?: string
}

type T_ContractStatusOptions = {
  colors: string,
  icon: LucideIcon,
  label: string,
}



// const map: Record<Status, string> = {
//   DRAFT: "bg-muted text-foreground/70",
//   PENDING: "bg-amber-100 text-amber-800",
//   SIGNED: "bg-emerald-100 text-emerald-800",
//   DECLINED: "bg-rose-100 text-rose-800",
//   EXPIRED: "bg-slate-200 text-slate-700",
// }

const ContractStatusOptions: Record<ContractStatus, T_ContractStatusOptions> = {
  DRAFT: {
    colors: "bg-muted text-foreground/70",
    icon: Pen,
    label: "DRAFT",
  },
  OUT_FOR_SIGNATURE: {
    colors: "bg-warning text-white",
    icon: Clock,
    label: "PENDING"
  },
  FULLY_SIGNED: {
    colors: "bg-success text-white",
    icon: Check,
    label: "SIGNED"
  },
  DECLINED: {
    colors: "bg-destructive text-white",
    icon: CircleX,
    label: "DECLINED"
  },
  EXPIRED: {
    colors: "bg-slate-200 text-slate-700",
    icon: ShieldX,
    label: "EXPIRED"
  },
}

export const StatusBadge: React.FC<Props> = ({ status, className }) => {
  const IconComponent = ContractStatusOptions[status].icon
  return (
    <span className={cn(
      "w-full max-w-[100px] inline-flex items-center justify-center px-4 py-2 gap-2 text-xs font-semibold rounded-full",
      ContractStatusOptions[status].colors, className
    )}>
      <IconComponent className="whitespace-nowrap shrink-0" size={14} />
      {ContractStatusOptions[status].label}
    </span>
  )
}