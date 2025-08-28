"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Calendar, Gauge, Home, Inbox, Search, Settings } from "lucide-react"
import Link from "next/link"

// const items = [
//   { href: "/", label: "Dashboard" },
//   { href: "/contracts", label: "Contracts" },
//   { href: "/templates", label: "Templates" },
//   { href: "/billing", label: "Billing" },
//   { href: "/settings", label: "Settings" },
// ]

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar()
  const isExpaned = state === "expanded"

  return (
    <Sidebar collapsible="icon" className="bg-red-200 w-[200px]">
      <div onClick={toggleSidebar}>sss</div>
      <SidebarHeader />
      <SidebarContent className="bg-background px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "p-1 rounded-lg hover:bg-[#E5E7EB]",
                    index === 0 && "bg-[#E5E7EB] shadow-sm"
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-[#E5E7EB]",
                      index === 0 ? "text-[#111827]" : "text-[#374151] "
                    )}

                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Gauge,
  },
  {
    title: "Contracte",
    url: "/contracts",
    icon: Inbox,
  },
  {
    title: "Sabloane",
    url: "/templates",
    icon: Calendar,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]