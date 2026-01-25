import { cn } from "@/lib/utils"

type Props = {
  variant?: "light" | "dark",
  className?: string
}

export const PactlyLogo: React.FC<Props> = ({ variant = "light", className }) => {
  if (variant === "dark") {
    return <img src="./assets/logo/pactly-logo-dark.png" className={cn("", className)} />
  }
  return (
    <img src="/assets/logo/pactly-logo-light.png" className={cn("", className)} />
  )
}