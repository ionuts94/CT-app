import { NavSignInButton, NavSignUpButton } from "@/app/(landing)/components/landing-page-navigation"
import { PactlyLogo } from "@/components/logo"
import { PROTECTED_LINKS } from "@/components/sidebar"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useDialog } from "@/hooks/use-dialog"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react/jsx-runtime"

export const ProtectedMobileNavigation: React.FC = () => {
  const { isOpen, toggleDialog, closeDialog } = useDialog()

  return (
    <Sheet open={isOpen} onOpenChange={toggleDialog} >
      <SheetTrigger className="">
        <Menu size={24} className="text-color-secondary" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-background !w-[90vw]">
        <SheetHeader>
          <SheetTitle>
            <PactlyLogo className="h-[40px]" />
          </SheetTitle>
          <SheetDescription>

          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          {PROTECTED_LINKS.map((item, index) => (
            <Fragment key={index}>
              <Link onClick={closeDialog} key={index} href={item.href} className="text-color-secondary">
                {item.label}
              </Link>
              {index < PROTECTED_LINKS.length - 1 && <div className="h-[2px] w-full bg-sidebar-primary/50 rounded-lg" />}
            </Fragment>
          ))}
        </div>
        <SheetFooter>
          © {new Date().getFullYear()} Pactly
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}