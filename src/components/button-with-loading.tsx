import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"

interface ButtonWithLoadingProps extends ButtonProps {
  loading?: boolean,
}

export const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({ loading, children, ...rest }) => {
  return (
    <Button className='flex w-[200px]' disabled={loading} {...rest}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  )
}