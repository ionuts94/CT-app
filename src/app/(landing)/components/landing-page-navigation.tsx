"use client"

import { PactlyLogo } from "@/components/logo"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDialog } from "@/hooks/use-dialog"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react/jsx-runtime"

export const LandingPageMobileNavigation: React.FC = () => {
  const { isOpen, toggleDialog, closeDialog } = useDialog()

  return (
    <Sheet open={isOpen} onOpenChange={toggleDialog}>
      <SheetTrigger className="">
        <Menu size={24} className="text-color-secondary" />
      </SheetTrigger>
      <SheetContent className="bg-background !w-[90vw]">
        <SheetHeader>
          <SheetTitle>
            <PactlyLogo className="h-[40px]" />
          </SheetTitle>
          <SheetDescription>

          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          {MOBILE_LINKS.map((item, index) => (
            <Fragment key={index}>
              <Link onClick={closeDialog} key={index} href={item.href} className="text-color-secondary">
                {item.label}
              </Link>
              {index < MOBILE_LINKS.length - 1 && <div className="h-[2px] w-full bg-sidebar-primary/50 rounded-lg" />}
            </Fragment>
          ))}
        </div>
        <SheetFooter>
          <NavSignInButton />
          <NavSignUpButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const LandingPageDesktopNavigation: React.FC<{ isSticky: boolean }> = ({ isSticky }) => {
  return (
    <div className="flex items-center w-full justify-center relative">
      <nav className="">
        <ul className="flex gap-8">
          {DESKTOP_LINKS.map((item, index) => (
            <li key={index} className="font-[600] cursor-pointer text-[18px] hover:text-primary">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 absolute right-0">
        <NavSignInButton className={isSticky ? "py-2" : ""} />
        <NavSignUpButton className={isSticky ? "py-2" : ""} />
      </div>
    </div >
  )
}

type Props = {
  className?: string
}

export const NavSignInButton: React.FC<Props> = ({ className }) => {
  return (
    <Button
      asChild
      className={cn(
        "shadow-sm px-6 py-3 bg-white border-1 border-black/10 text-black hover:bg-primary/70 hover:text-white",
        className
      )}>
      <Link href="/sign-in">
        <TextCTA className="font-bold">
          Sign in
        </TextCTA>
      </Link>
    </Button>
  )
}

export const NavSignUpButton: React.FC<Props> = ({ className }) => {
  return (
    <Button asChild className={cn("px-6 py-3", className)}>
      <Link href="/sign-up">
        <TextCTA className="font-bold">
          Create free account
        </TextCTA>
      </Link>
    </Button>
  )
}


const MOBILE_LINKS = [
  {
    label: "Home page",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/#pricing",
  },
  {
    label: "How it works",
    href: "/#howitworks",
  },
  {
    label: "Contact",
    href: "/contact"
  }
]

const DESKTOP_LINKS = [
  {
    label: "Pricing",
    href: "/#pricing",
  },
  {
    label: "How it works",
    href: "/#howitworks",
  },
  {
    label: "Contact",
    href: "/contact"
  }
]
