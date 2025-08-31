import { cn } from "@/lib/utils"

type TextCTAVariant = "primary" | "secondary" | "danger" | "success" | "muted"
type TextCTASize = "sm" | "md" | "lg"
type TextCTAWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold"

interface TextCTAProps {
  children: React.ReactNode
  className?: string
  size?: TextCTASize
  weight?: TextCTAWeight
  variant?: TextCTAVariant
  as?: React.ElementType
}

const sizeMap: Record<TextCTASize, string> = {
  sm: "text-xs tracking-wide",
  md: "text-sm tracking-wide",
  lg: "text-base tracking-wide",
}

const weightMap: Record<TextCTAWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
}

const variantMap: Record<TextCTAVariant, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-green-600",
  danger: "text-red-600",
  muted: "text-muted-foreground",
}

export function TextCTA({
  children,
  className,
  size = "md",
  weight = "semibold",
  variant = "primary",
  as: Tag = "span",
}: TextCTAProps) {
  return (
    <Tag
      className={cn(
        "uppercase transition-colors duration-150 select-none",
        sizeMap[size],
        weightMap[weight],
        className
      )}
    >
      {children}
    </Tag>
  )
}
