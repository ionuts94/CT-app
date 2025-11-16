import { PageWidth } from "@/components/layout"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement>

export const LandingPageWidth: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <PageWidth className={cn("max-w-[1320px] mx-auto px-4", className)} {...rest}>
      {children}
    </PageWidth>
  )
}