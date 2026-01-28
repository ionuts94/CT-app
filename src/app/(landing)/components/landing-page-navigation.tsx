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
import { Menu } from "lucide-react"
import Link from "next/link"

export const LandingPageMobileNavigation: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="">
        <Menu size={32} className="text-color-secondary" />
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle>
            <PactlyLogo className="h-[40px]" />
          </SheetTitle>
          <SheetDescription>

          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col">
          {LINKS.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.label}
            </Link>
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

export const LandingPageDesktopNavigation: React.FC = () => {
  return (
    <div className="flex items-center w-full justify-center relative">
      <nav className="">
        <ul className="flex gap-8">
          {LINKS.map((item, index) => (
            <li key={index} className="font-[600] cursor-pointer text-[18px] hover:text-primary">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 absolute right-0">
        <NavSignInButton />
        <NavSignUpButton />
      </div>
    </div >
  )
}

type Props = {

}

export const NavSignInButton: React.FC<Props> = ({ }) => {
  return (
    <Button asChild className="shadow-sm px-6 py-3 bg-white border-1 border-black/10 text-black hover:bg-primary/70 hover:text-white">
      <Link href="/sign-in">
        <TextCTA className="font-bold">
          Sign in
        </TextCTA>
      </Link>
    </Button>
  )
}

export const NavSignUpButton: React.FC<Props> = () => {
  return (
    <Button asChild className="px-6 py-3">
      <Link href="/sign-up">
        <TextCTA className="font-bold">
          Create free account
        </TextCTA>
      </Link>
    </Button>
  )
}


const LINKS = [
  {
    label: "Pricing",
    href: "/#pricing",
  },
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Contact",
    href: "/#contact"
  }
]
