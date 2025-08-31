import { cn } from "@/lib/utils"
import { Body, Text } from "./topography"

type Props = {
  children: React.ReactNode,
  className?: string
}

export const PageHeader: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {children}
    </div>
  )
}

export const PageHeading: React.FC<Props> = ({ children, className }) => {
  return (
    <Text size="2xl" weight="semibold" className={cn(className)}>
      {children}
    </Text>
  )
}

export const PageSubHeading: React.FC<Props> = ({ children, className }) => {
  return (
    <Body className={cn("text-color-secondary", className)}>
      Gestioneaza si semneaza contracte cu claritate!
    </Body>
  )
}