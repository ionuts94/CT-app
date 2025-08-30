import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode,
  className?: string,
}

export const PageWidth: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={cn("px-[20px]", className)}>
      {children}
    </div>
  )
}

type PageContainerProps = Props & {

}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className, ...rest }) => {
  return (
    <PageWidth
      className={cn("py-[20px]", className)}
      {...rest}
    >
      {children}
    </PageWidth>
  )
}