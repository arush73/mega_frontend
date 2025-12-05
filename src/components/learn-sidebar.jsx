"use client"

import * as React from "react"
import { Users, GraduationCap, Shield, Hash } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useCohortStore } from "@/app/store/useCohortStore"
import { useTeamStore } from "@/app/store/useTeamStore"

export function LearnSidebar({ ...props }) {
  const { user } = useAuthStore()
  const { cohorts } = useCohortStore()
  const { teams } = useTeamStore()
  const { setOpen } = useSidebar()

  // Navigation items based on user role
  const navItems = React.useMemo(() => {
    const items = [
      {
        title: "Cohorts",
        icon: GraduationCap,
        type: "cohorts",
        items: cohorts || [],
      },
      {
        title: "Teams",
        icon: Users,
        type: "teams",
        items: teams || [],
      },
    ]

    // Add Admin panel if user is admin
    if (user?.role === "ADMIN") {
      items.push({
        title: "Admin",
        icon: Shield,
        type: "admin",
        items: [],
      })
    }

    return items
  }, [cohorts, teams, user?.role])

  const [activeItem, setActiveItem] = React.useState(navItems[0])
  const [displayItems, setDisplayItems] = React.useState(navItems[0]?.items || [])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* LEFT SIDEBAR - Icons for Cohorts/Teams/Admin */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GraduationCap className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">ClarityHub</span>
                    <span className="truncate text-xs">Learning</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setDisplayItems(item.items || [])
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavUser
            user={{
              name: user?.username || user?.email || "User",
              email: user?.email || "",
              avatar: user?.avatar || "https://via.placeholder.com/200x200.png",
            }}
          />
        </SidebarFooter>
      </Sidebar>

      {/* MIDDLE SIDEBAR - List of Cohorts/Teams */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium flex items-center gap-2">
              {activeItem?.icon && <activeItem.icon className="size-5" />}
              {activeItem?.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
            </div>
          </div>
          <SidebarInput placeholder={`Search ${activeItem?.title?.toLowerCase()}...`} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {displayItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <activeItem.icon className="size-12 text-muted-foreground/50 mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">
                    No {activeItem?.title?.toLowerCase()} found
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {activeItem?.type === "cohorts"
                      ? "You haven't joined any cohorts yet"
                      : activeItem?.type === "teams"
                      ? "You're not part of any teams yet"
                      : "No items available"}
                  </p>
                </div>
              ) : (
                displayItems.map((item) => (
                  <a
                    href="#"
                    key={item.id || item._id}
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 transition-colors"
                  >
                    <div className="flex w-full items-center gap-3">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                        <Hash className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {(item.startDate || item.members) && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
                        {item.startDate && (
                          <span>
                            Started: {new Date(item.startDate).toLocaleDateString()}
                          </span>
                        )}
                        {item.members && (
                          <span className="ml-auto flex items-center gap-1">
                            <Users className="size-3" />
                            {Array.isArray(item.members) ? item.members.length : 0} members
                          </span>
                        )}
                      </div>
                    )}
                  </a>
                ))
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
