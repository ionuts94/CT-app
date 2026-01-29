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
import { Calendar, ChevronLeft, LayoutTemplate, Gauge, Home, Inbox, ReceiptText, Search, Settings, Layers, CreditCard } from "lucide-react"
import Link from "next/link"
import { Text } from "./topography"
import { usePath } from "@/hooks/use-path"
import { PactlyLogo } from "./logo"

export function AppSidebar() {
  const { isSelectedPath } = usePath()
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
            {!isExpanded ? (
              <div className="size-10 bg-black/85 rounded-lg aspect-square flex items-center justify-center">
                <Text weight="semibold" size="4xl">
                  P
                </Text>
              </div>

            ) : (
              <div className="size-[14px]" />
            )
            }
            {isExpanded &&
              <PactlyLogo className="h-[36px]" />
            }
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {PROTECTED_LINKS.map((item, index) => {
                const isSelected = isSelectedPath(item.href);

                return (
                  <SidebarMenuItem
                    key={item.label}
                    className={cn(
                      "p-1 rounded-lg hover:bg-sidebar-primary cursor-pointer",
                      isSelected && "bg-sidebar-primary"
                    )}
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        "hover:bg-sidebar-primary",
                        isSelected ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
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

export const PROTECTED_LINKS = [
  // {
  //   label: "Dashboard",
  //   href: "/dashboard",
  //   icon: Gauge,
  // },
  {
    label: "Contracts",
    href: "/contracts",
    icon: Layers,
  },
  {
    label: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]