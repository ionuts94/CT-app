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
import { Calendar, ChevronLeft, Gauge, Home, Inbox, ReceiptText, Search, Settings } from "lucide-react"
import Link from "next/link"
import { Text } from "./topography"

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <Sidebar collapsible="icon" className="bg-background px-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            className={cn(
              "flex justify-center items-center text-primary py-5",
              isExpanded && " justify-start"
            )}
          >
            <ReceiptText size={40} />
            {isExpanded &&
              <Text size="lg" weight="extrabold" className="uppercase leading-4">
                Contract <br />Transparent
              </Text>
            }
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
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
                    tooltip={item.title}
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
      <SidebarFooter className="h-[100px]">
        <SidebarMenu>
          <SidebarMenuItem onClick={toggleSidebar}>
            <SidebarMenuButton
              tooltip="Expand Sidebar"
              className="items-center justify-center"
            >
              <div className="w-fit p-2 cursor-pointer rounded-lg hover:bg-sidebar-primary"              >
                <ChevronLeft
                  style={{ fontSize: 40 }}
                  strokeWidth={2}
                  className={cn(
                    "transition-all duration-500 ease-in-out",
                    !isExpanded && "rotate-z-180"
                  )}
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
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