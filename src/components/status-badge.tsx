import { cn } from "@/lib/utils"

type Props = {
  status: Status;
  className?: string
}

type Status = "DRAFT" | "PENDING" | "SIGNED" | "DECLINED" | "EXPIRED"

// const map: Record<Status, string> = {
//   DRAFT: "bg-muted text-foreground/70",
//   PENDING: "bg-amber-100 text-amber-800",
//   SIGNED: "bg-emerald-100 text-emerald-800",
//   DECLINED: "bg-rose-100 text-rose-800",
//   EXPIRED: "bg-slate-200 text-slate-700",
// }

const map: Record<Status, string> = {
  DRAFT: "bg-muted text-foreground/70",
  PENDING: "bg-warning text-white",
  SIGNED: "bg-success text-white",
  DECLINED: "bg-destructive text-white",
  EXPIRED: "bg-slate-200 text-slate-700",
}

export const StatusBadge: React.FC<Props> = ({ status, className }) => {
  return (
    <span className={cn(
      "w-full max-w-[100px] inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-semibold",
      map[status], className
    )}>
      {status}
    </span>
  )
}