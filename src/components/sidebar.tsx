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
  return (
    <Sidebar collapsible="icon" className="bg-red-200 w-[200px]">
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
                    "p-1 rounded-lg hover:bg-sidebar-primary",
                    index === 0 && "bg-sidebar-primary"
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-sidebar-primary",
                      index === 0 ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
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