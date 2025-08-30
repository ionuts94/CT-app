// components/ui/text.tsx
import { cn } from "@/lib/utils"
import { JSX } from "react"

type TextProps = {
  children: React.ReactNode
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold"
  variant?: "primary" | "secondary" | "danger"
  as?: keyof JSX.IntrinsicElements
}

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
}

const weightMap = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
}

const variantMap = {
  primary: "text-foreground",
  secondary: "text-muted-foreground",
  danger: "text-destructive",
}

export function Text({
  children,
  className,
  size = "md",
  weight = "normal",
  variant = "primary",
  as: Tag = "p",
}: TextProps) {
  return (
    <Tag
      className={cn(
        sizeMap[size],
        weightMap[weight],
        // variantMap[variant],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// Shortcuts
export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Text as="h1" size="4xl" weight="extrabold" className={cn("tracking-tight", className)}>
    {children}
  </Text>
)

export const Body = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Text as="p" size="md" weight="normal" className={className}>
    {children}
  </Text>
)

export const Muted = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Text as="span" size="sm" weight="normal" variant="secondary" className={className}>
    {children}
  </Text>
)
