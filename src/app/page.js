"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Loader } from "@/components/ui/loader"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/app/store/useAppStore"
import { useAuthStore } from "@/app/store/useAuthStore"
import { Hash, Users } from "lucide-react"
import { useChannelStore } from "@/app/store/useChannelStore"

export default function Page() {
  const { user, checkUser, isCheckingUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { isInitialDataBeingFetched } = useAppStore()

  // uncomment after dev is complete
  // useEffect(() => {
  //   checkUser()
  // }, [])

  // useEffect(() => {
  //   if(user){
  //     setLoading(false)
  //     router.push('/home')
  //   }
  // }, [user])

  // useEffect(() => {
  //   setLoading(isInitialDataBeingFetched || isCheckingUser)
  // }, [isInitialDataBeingFetched, isCheckingUser])

  return (

    loading ? <Loader /> : 
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        }
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <ChannelContent />
      </SidebarInset>
    </SidebarProvider>
  )
}

// Channel Content Component
function ChannelContent() {
  const { activeChannel, channelType, channelData } = useChannelStore()

  if (!activeChannel) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="text-center">
          <Hash className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
            Welcome to TeamBuilder
          </h2>
          <p className="text-muted-foreground">
            Select a cohort or team from the sidebar to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4"
        />
        <div className="flex items-center gap-2">
          {channelType === 'cohort' ? (
            <Hash className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Users className="h-5 w-5 text-muted-foreground" />
          )}
          <h1 className="text-lg font-semibold">{channelData?.name}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {channelType === 'cohort' ? 'Cohort Channel' : 'Team Channel'}
          </span>
        </div>
      </header>

      {/* Channel Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {channelType === 'cohort' ? (
          <CohortChannelView cohort={channelData} />
        ) : (
          <TeamChannelView team={channelData} />
        )}
      </div>
    </div>
  )
}

// Cohort Channel View
function CohortChannelView({ cohort }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">About this Cohort</h2>
        <div className="space-y-2 text-muted-foreground">
          <p><strong>Cohort:</strong> {cohort?.name}</p>
          <p><strong>ID:</strong> {cohort?.id}</p>
          <p className="mt-4">
            This is your cohort's main channel. Here you can discuss course materials, 
            share resources, and collaborate with fellow students.
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Messages</h3>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-semibold">
              JD
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">John Doe</span>
                <span className="text-xs text-muted-foreground">2:30 PM</span>
              </div>
              <p className="text-sm">Welcome to the cohort! Let&apos;s make this an amazing learning experience together.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-secondary text-secondary-foreground rounded-full h-10 w-10 flex items-center justify-center font-semibold">
              AS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Alice Smith</span>
                <span className="text-xs text-muted-foreground">2:45 PM</span>
              </div>
              <p className="text-sm">Excited to be here! Looking forward to collaborating with everyone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Team Channel View
function TeamChannelView({ team }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Team Information</h2>
        <div className="space-y-2 text-muted-foreground">
          <p><strong>Team:</strong> {team?.name}</p>
          <p><strong>ID:</strong> {team?.id}</p>
          <p><strong>Cohort:</strong> {team?.cohortId}</p>
          <p className="mt-4">
            This is your team&apos;s private channel. Coordinate on projects, 
            share code, and work together to achieve your goals.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['John Doe', 'Alice Smith', 'Bob Johnson'].map((member, idx) => (
            <div key={idx} className="rounded-lg border bg-card p-4 flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                {member.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold">{member}</p>
                <p className="text-xs text-muted-foreground">Team Member</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Team Chat</h3>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-semibold">
              BJ
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Bob Johnson</span>
                <span className="text-xs text-muted-foreground">3:15 PM</span>
              </div>
              <p className="text-sm">Hey team! I&apos;ve pushed the latest changes to the repo. Please review when you get a chance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
