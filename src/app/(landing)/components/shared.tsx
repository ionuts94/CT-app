import { HTMLAttributes } from "react"
import { H1, Text } from "@/components/topography"
import { cn } from "@/lib/utils"

type Props = HTMLAttributes<HTMLHeadingElement>

export const SectionHeaderContainer: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={cn("flex flex-col gap-4 items-center justify-center", className)} {...rest}>
      {children}
    </div>
  )
}

export const SectionLabel: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <Text
      className={cn("uppercase text-primary font-semibold text-[16px] leading-[24px]", className)}
      {...rest}
    >
      {children}
    </Text>
  )
}


export const SectionTitle: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <H1 className={cn("max-w-[600px] text-center text-[#0f172a]", className)} {...rest}>
      {children}
    </H1>
  )
}

export const SectionSubtitle: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <Text className={cn("text-[18px] font-[400] text-[#344054] leading-[30px]", className)} {...rest}>
      {children}
    </Text>
  )
}