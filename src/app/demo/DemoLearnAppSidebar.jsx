"use client"
import * as React from "react"
import { Users, GraduationCap, Command } from "lucide-react"
import { DemoNavUser } from "./DemoNavUser"
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
import { ModeToggle } from "@/components/mode-toggle"

export function DemoLearnAppSidebar({ onItemSelect, selectedItem, activeTab, onTabChange, cohorts, teams, ...props }) {
  const { setOpen } = useSidebar()

  // Mock user for demo
  const user = {
    name: "Demo User",
    email: "demo@clarityhub.com",
    avatar: "https://github.com/shadcn.png",
  }

  const navItems = [
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

  // Find active item based on activeTab
  const activeItem = navItems.find(item => item.type === activeTab) || navItems[1]
  const displayItems = activeItem?.items || []

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* LEFT SIDEBAR - Icons for Cohorts/Teams */}
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
                    <Command className="size-4" />
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
                        onTabChange(item.type)
                        onItemSelect(null) // Reset selection when changing tabs
                        setOpen(true)
                      }}
                      isActive={activeTab === item.type}
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
          <ModeToggle/>
          <DemoNavUser user={user} />
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
                  {activeItem?.icon && <activeItem.icon className="size-12 text-muted-foreground/50 mb-4" />}
                  <p className="text-sm text-muted-foreground mb-1">
                    No {activeItem?.title?.toLowerCase()} found
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {activeItem?.type === "cohorts"
                      ? "You haven't joined any cohorts yet"
                      : "You're not part of any teams yet"}
                  </p>
                </div>
              ) : (
                displayItems.map((item) => (
                  <button
                    key={item.id || item._id}
                    onClick={() => onItemSelect(item)}
                    className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 transition-colors w-full text-left ${
                      selectedItem?._id === item._id ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    <div className="flex w-full items-center gap-3">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                        {activeItem?.type === "cohorts" ? (
                          <GraduationCap className="size-5" />
                        ) : (
                          <Users className="size-5" />
                        )}
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
                  </button>
                ))
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
