"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="md:hidden">Menu</Button>
        <div className="hidden md:block text-sm text-muted-foreground">Welcome back 👋</div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="default" size="sm">New Contract</Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full focus:outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user.png" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><a href="/settings">Settings</a></DropdownMenuItem>
            <DropdownMenuItem asChild><a href="/billing">Billing</a></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
