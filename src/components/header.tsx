"use client"

import { PageWidth } from "./layout"
import { ChevronDown } from "lucide-react"
import { Searchbar } from "./searchbar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Text } from "./topography"
import { User } from "@prisma/client"
import CTAuth from "@/sdk/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
  user: User
}

export const Header: React.FC<Props> = ({ user }) => {
  const router = useRouter()

  const handleLogOut = async () => {
    const { error } = await CTAuth.signOut()
    if (error) return toast.error(error)
    toast.success("Success")
    router.replace("/")
  }

  return (
    <header className="h-18 border-b border-border sticky top-0 left-0 bg-app z-50">
      <PageWidth className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          {/* <div className="text-primary font-bold">
            <ReceiptText size={30} />
          </div> */}
          <Searchbar />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 border-[2px] rounded-lg border-sidebar-primary flex gap-3 items-center cursor-pointer">
            <Avatar>
              <AvatarImage src="https://images.pexels.com/photos/686094/pexels-photo-686094.jpeg" />
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>
            <Text size="lg">{user.firstName} {user.lastName}</Text>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="py-3 cursor-pointer">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="py-3 cursor-pointer">Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="py-3 cursor-pointer">Email</DropdownMenuItem>
                    <DropdownMenuItem className="py-3 cursor-pointer">Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-3 cursor-pointer">More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="py-3 cursor-pointer">
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-3 cursor-pointer">GitHub</DropdownMenuItem>
            <DropdownMenuItem className="py-3 cursor-pointer">Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut} className="py-3 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageWidth>
    </header>
  )
}
