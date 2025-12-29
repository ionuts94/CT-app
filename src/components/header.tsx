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
import { useUserContext } from "@/contexts/user-context"
import Link from "next/link"
import { UserAvatar } from "./user-avatar"

type Props = {
  user: User
}

export const Header: React.FC<Props> = ({ }) => {
  const router = useRouter()
  const { user } = useUserContext()

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
            <UserAvatar
              firstName={user?.firstName}
              lastName={user?.lastName}
              profilePictureUrl={user?.profilePictureUrl}
              partyRole="SENDER"
            />
            <Text size="sm">{user?.firstName} {user?.lastName}</Text>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="font-semibold">Contul meu</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="py-3 cursor-pointer" asChild>
                <Link href="/profile">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                Setări cont
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut} className="py-3 cursor-pointer">
              Deconectare
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageWidth>
    </header>
  )
}
