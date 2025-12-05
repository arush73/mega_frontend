"use client"
import { useEffect, useState } from "react"
import { Loader } from "@/components/ui/loader"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useCohortStore } from "@/app/store/useCohortStore"
import { useTeamStore } from "@/app/store/useTeamStore"
import { ServerList } from "@/components/server-list"
import { DiscordSidebar } from "@/components/discord-sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { useSocket } from "@/hooks/useSocket"

export default function Page() {
  const { user, checkUser, isCheckingUser } = useAuthStore()
  const { cohorts, setCohorts } = useCohortStore()
  const { teams, setTeams } = useTeamStore()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("teams") // 'cohorts' or 'teams'
  const [selectedItem, setSelectedItem] = useState(null)

    useSocket()

  // Check user authentication
  useEffect(() => {
    checkUser()
  }, [])

  // Redirect if no user after checking
  // useEffect(() => {
  //   if (!isCheckingUser && !user) {
  //     console.log("No user found: ",  user)
  //     router.push("/home")
  //   }
  // }, [user, isCheckingUser, router])

  // Populate cohorts and teams from user object
  useEffect(() => {
    if (user) {
      setCohorts(user.cohort || [])
      setTeams(user.teams || [])
    }
  }, [user, setCohorts, setTeams])

  // Handle tab change from server list
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedItem(null) // Reset selected item when switching tabs
  }

  // Handle item selection from discord sidebar
  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }

  // Show loader while checking user
  if (isCheckingUser) {
    return <Loader />
  }


  // Don't render anything if no user (will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#313338]">
      {/* Left Panel - Server List with Tabs */}
      <ServerList activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Middle Panel - Discord Sidebar with Items */}
      <DiscordSidebar
        items={activeTab === "cohorts" ? cohorts : teams}
        type={activeTab}
        onSelectItem={handleItemSelect}
        selectedItem={selectedItem}
      />

      {/* Right Panel - Chat */}
      <ChatPanel
        type={activeTab === "cohorts" ? "cohort" : "team"}
        item={selectedItem}
      />
    </div>
  )
}
