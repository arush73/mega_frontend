"use client"

import * as React from "react"
import { Hash, Users, ChevronDown, ChevronRight } from "lucide-react"

import { NavUser } from "@/components/nav-user"
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useProfileStore } from "@/app/store/useProfileStore"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useAppStore } from "@/app/store/useAppStore"
import { useChannelStore } from "@/app/store/useChannelStore"

export function AppSidebar({
  ...props
}) {
  // Mock user data - replace with actual user data from your store
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.jpg",
    cohorts: [
      { name: "Web Dev Cohort 2024", id: "cohort-1" },
      { name: "Data Science Bootcamp", id: "cohort-2" },
      { name: "Mobile App Development", id: "cohort-3" },
    ],
    teams: [
      { name: "Team Alpha", id: "team-1", cohortId: "cohort-1" },
      { name: "Team Beta", id: "team-2", cohortId: "cohort-1" },
      { name: "ML Warriors", id: "team-3", cohortId: "cohort-2" },
      { name: "React Ninjas", id: "team-4", cohortId: "cohort-3" },
    ]
  }

  const { activeChannel, setActiveChannel } = useChannelStore()
  const [cohortsOpen, setCohortsOpen] = React.useState(true)
  const [teamsOpen, setTeamsOpen] = React.useState(true)

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden"
      {...props}
    >
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <Hash className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">TeamBuilder</span>
            <span className="text-xs text-muted-foreground">Workspace</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* COHORTS SECTION */}
        <Collapsible
          open={cohortsOpen}
          onOpenChange={setCohortsOpen}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider">Cohorts</span>
                {cohortsOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {user.cohorts.map((cohort) => (
                    <SidebarMenuItem key={cohort.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveChannel(cohort.id, 'cohort', cohort)}
                        isActive={activeChannel === cohort.id}
                        className="group/item"
                      >
                        <Hash className="size-4" />
                        <span>{cohort.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* TEAMS SECTION */}
        <Collapsible
          open={teamsOpen}
          onOpenChange={setTeamsOpen}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider">Teams</span>
                {teamsOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {user.teams.map((team) => (
                    <SidebarMenuItem key={team.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveChannel(team.id, 'team', team)}
                        isActive={activeChannel === team.id}
                        className="group/item"
                      >
                        <Users className="size-4" />
                        <span>{team.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}


// This is sample data
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Inbox",
//       url: "#",
//       icon: Inbox,
//       isActive: true,
//     },
//     {
//       title: "Drafts",
//       url: "#",
//       icon: File,
//       isActive: false,
//     },
//     {
//       title: "Sent",
//       url: "#",
//       icon: Send,
//       isActive: false,
//     },
//     {
//       title: "Junk",
//       url: "#",
//       icon: ArchiveX,
//       isActive: false,
//     },
//     {
//       title: "Trash",
//       url: "#",
//       icon: Trash2,
//       isActive: false,
//     },
//   ],
//   mails: [
//     {
//       name: "William Smith",
//       email: "williamsmith@example.com",
//       subject: "Meeting Tomorrow",
//       date: "09:34 AM",
//       teaser:
//         "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
//     },
//     {
//       name: "Alice Smith",
//       email: "alicesmith@example.com",
//       subject: "Re: Project Update",
//       date: "Yesterday",
//       teaser:
//         "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
//     },
//     {
//       name: "Bob Johnson",
//       email: "bobjohnson@example.com",
//       subject: "Weekend Plans",
//       date: "2 days ago",
//       teaser:
//         "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
//     },
//     {
//       name: "Emily Davis",
//       email: "emilydavis@example.com",
//       subject: "Re: Question about Budget",
//       date: "2 days ago",
//       teaser:
//         "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
//     },
//     {
//       name: "Michael Wilson",
//       email: "michaelwilson@example.com",
//       subject: "Important Announcement",
//       date: "1 week ago",
//       teaser:
//         "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
//     },
//     {
//       name: "Sarah Brown",
//       email: "sarahbrown@example.com",
//       subject: "Re: Feedback on Proposal",
//       date: "1 week ago",
//       teaser:
//         "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
//     },
//     {
//       name: "David Lee",
//       email: "davidlee@example.com",
//       subject: "New Project Idea",
//       date: "1 week ago",
//       teaser:
//         "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
//     },
//     {
//       name: "Olivia Wilson",
//       email: "oliviawilson@example.com",
//       subject: "Vacation Plans",
//       date: "1 week ago",
//       teaser:
//         "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
//     },
//     {
//       name: "James Martin",
//       email: "jamesmartin@example.com",
//       subject: "Re: Conference Registration",
//       date: "1 week ago",
//       teaser:
//         "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
//     },
//     {
//       name: "Sophia White",
//       email: "sophiawhite@example.com",
//       subject: "Team Dinner",
//       date: "1 week ago",
//       teaser:
//         "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
//     },
//   ],
// }

// export function AppSidebar({
//   ...props
// }) {
//   // Note: I'm using state to show active item.
//   // IRL you should use the url/router.

//   // const { user } = useAuthStore()

//   const user = {
//   cohort: [
//     {name: "cohort 1", id: 1},
//     {name: "cohort 2", id: 2},
//     {name: "cohort 3", id: 3},
//   ]
// }
  
  
//   // user.cohort = [{name, id}]


//   const data = {
//     user: {
//       name: "shadcn",
//       email: "m@example.com",
//       avatar: "/avatars/shadcn.jpg",
//     },
//     navMain: [
//       ...user.cohort.map((cohort) => {
//         return {
//           title: cohort.name,
//           url: `#cohort-${cohort.id}`,
//           icon: File,
//           isActive: false,
//         }
//       })
//     ],
//     mails: [
//       {
//         name: "William Smith",
//         email: "williamsmith@example.com",
//         subject: "Meeting Tomorrow",
//         date: "09:34 AM",
//         teaser:
//           "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
//       },
//     ]
//   }
//   const [activeItem, setActiveItem] = React.useState(data.navMain[0])
//   const [mails, setMails] = React.useState(data.mails)
//   const { setOpen } = useSidebar()

//   return (
//     <Sidebar
//       collapsible="icon"
//       className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
//       {...props}>
//       {/* This is the first sidebar */}
//       {/* We disable collapsible and adjust width to icon. */}
//       {/* This will make the sidebar appear as icons. */}
//       <Sidebar
//         collapsible="none"
//         className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
//         <SidebarHeader>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
//                 <a href="#">
//                   <div
//                     className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
//                     <Command className="size-4" />
//                   </div>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-medium">Acme Inc</span>
//                     <span className="truncate text-xs">Enterprise</span>
//                   </div>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupContent className="px-1.5 md:px-0">
//               <SidebarMenu>
//                 {data.navMain.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       tooltip={{
//                         children: item.title,
//                         hidden: false,
//                       }}
//                       onClick={() => {
//                         setActiveItem(item)
//                         const mail = data.mails.sort(() => Math.random() - 0.5)
//                         setMails(mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)))
//                         setOpen(true)
//                       }}
//                       isActive={activeItem?.title === item.title}
//                       className="px-2.5 md:px-2">
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//         <SidebarFooter>
//           <NavUser user={data.user} />
//         </SidebarFooter>
//       </Sidebar>
//       {/* This is the second sidebar */}
//       {/* We disable collapsible and let it fill remaining space */}
//       <Sidebar collapsible="none" className="hidden flex-1 md:flex">
//         <SidebarHeader className="gap-3.5 border-b p-4">
//           <div className="flex w-full items-center justify-between">
//             <div className="text-foreground text-base font-medium">
//               {activeItem?.title}
//             </div>
//             <Label className="flex items-center gap-2 text-sm">
//               <span>Unreads</span>
//               <Switch className="shadow-none" />
//             </Label>
//           </div>
//           <SidebarInput placeholder="Type to search..." />
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarGroup className="px-0">
//             <SidebarGroupContent>
//               {mails.map((mail) => (
//                 <a
//                   href="#"
//                   key={mail.email}
//                   className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0">
//                   <div className="flex w-full items-center gap-2">
//                     <span>{mail.name}</span>{" "}
//                     <span className="ml-auto text-xs">{mail.date}</span>
//                   </div>
//                   <span className="font-medium">{mail.subject}</span>
//                   <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
//                     {mail.teaser}
//                   </span>
//                 </a>
//               ))}
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//     </Sidebar>
//   );
// }
