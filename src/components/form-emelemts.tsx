import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { Label as ShadLabel } from "./ui/label"
import { Input as ShadInput } from "./ui/input"
import { Textarea as ShadTextarea } from "./ui/textarea"
import { Text, TextProps } from "./topography"

export const FormRow: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} {...rest} />
  )
}

export const Label: React.FC<HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }> = ({ className, htmlFor, ...rest }) => {
  return (
    <ShadLabel className={cn("w-full font-medium text-md text-black/90", className)} htmlFor={htmlFor} {...rest} />
  )
}

export const Input: React.FC<React.ComponentProps<"input">> = ({ className, ...rest }) => {
  return (
    <ShadInput className={cn("w-full h-auto px-4 py-2 rounded-md shadow-sm bg-muted/40 flex items-center border border-sidebar-primary justify-center", className)} {...rest} />
  )
}

export const Textarea: React.FC<React.ComponentProps<"textarea">> = ({ className, ...rest }) => {
  return (
    <ShadTextarea className={cn("w-full min-h-[200px] max-h-[400px] h-auto px-4 py-2 rounded-md shadow-sm bg-muted/40 flex items-center border border-sidebar-primary justify-center", className)} {...rest} />
  )
}

export const InvalidInputError: React.FC<TextProps> = ({ children, ...rest }) => {
  if (!children) return;
  return (<Text size="sm" className="text-destructive font-semibold pl-" {...rest}>{children}</Text>)
}

export const RequiredFieldMark: React.FC = () => {
  return (<span className="text-red-400">*</span>)
}