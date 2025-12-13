// "use client"
// import { useEffect, useState } from "react"
// import { Loader } from "@/components/ui/loader"
// import { useRouter } from "next/navigation"
// import { useAuthStore } from "@/app/store/useAuthStore"
// import { useCohortStore } from "@/app/store/useCohortStore"
// import { useTeamStore } from "@/app/store/useTeamStore"
// import { ServerList } from "@/components/server-list"
// import { DiscordSidebar } from "@/components/discord-sidebar"
// import { ChatPanel } from "@/components/chat-panel"
// import { useSocket } from "@/hooks/useSocket"

// export default function Page() {
//   const { user, checkUser, isCheckingUser } = useAuthStore()
//   const { cohorts, setCohorts } = useCohortStore()
//   const { teams, setTeams } = useTeamStore()
//   const router = useRouter()

//   const [activeTab, setActiveTab] = useState("teams") // 'cohorts' or 'teams'
//   const [selectedItem, setSelectedItem] = useState(null)

//   useSocket()

//   // Check user authentication
//   useEffect(() => {
//     checkUser()
//   }, [])

//   // Redirect if no user after checking
//   // useEffect(() => {
//   //   if (!isCheckingUser && !user) {
//   //     console.log("No user found: ",  user)
//   //     router.push("/home")
//   //   }
//   // }, [user, isCheckingUser, router])

//   // Populate cohorts and teams from user object
//   useEffect(() => {
//     if (user) {
//       setCohorts(user.cohort || [])
//       setTeams(user.teams || [])
//     }
//   }, [user, setCohorts, setTeams])

//   // Handle tab change from server list
//   const handleTabChange = (tab) => {
//     setActiveTab(tab)
//     setSelectedItem(null) // Reset selected item when switching tabs
//   }

//   // Handle item selection from discord sidebar
//   const handleItemSelect = (item) => {
//     setSelectedItem(item)
//   }

//   // Show loader while checking user
//   if (isCheckingUser) {
//     return <Loader />
//   }

//   // Don't render anything if no user (will redirect)
//   if (!user) {
//     return null
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#313338]">
//       {/* Left Panel - Server List with Tabs */}
//       <ServerList activeTab={activeTab} onTabChange={handleTabChange} />

//       {/* Middle Panel - Discord Sidebar with Items */}
//       <DiscordSidebar
//         items={activeTab === "cohorts" ? cohorts : teams}
//         type={activeTab}
//         onSelectItem={handleItemSelect}
//         selectedItem={selectedItem}
//       />

//       {/* Right Panel - Chat */}
//       <ChatPanel
//         type={activeTab === "cohorts" ? "cohort" : "team"}
//         item={selectedItem}
//       />
//     </div>
//   )
// }


"use client"
import { useEffect, useState } from "react"
import { LearnAppSidebar } from "@/components/learn-app-sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useCohortStore } from "@/app/store/useCohortStore"
import { useTeamStore } from "@/app/store/useTeamStore"
import { Loader } from "@/components/ui/loader"
import { useSocket } from "@/hooks/useSocket"
import { Navigate } from "next/navigation"

export default function Page() {
  const { user, checkUser, isCheckingUser } = useAuthStore()
  const { setCohorts } = useCohortStore()
  const { setTeams } = useTeamStore()

  const [activeTab, setActiveTab] = useState("teams") // Default to teams
  const [selectedItem, setSelectedItem] = useState(null)

  useSocket()

  // Check user authentication
  useEffect(() => {
    checkUser()
  }, [checkUser])

  // Populate cohorts and teams from user object
  useEffect(() => {
    if (user) {
      setCohorts(user.cohort || [])
      setTeams(user.teams || [])
    }
  }, [user, setCohorts, setTeams])

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedItem(null) // Reset selection when changing tabs
  }

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }

  // Show loader while checking user
  if (isCheckingUser) {
    return <Loader />
  }

  // Redirect if no user
  // if (!user) {
  //   return <Navigate to="/login" />
  // }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarProvider
        style={{
          "--sidebar-width": "350px",
        }}
      >
        <LearnAppSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
        />

        {/* Right Panel - Chat */}
        {selectedItem ? (
          <ChatPanel
            type={activeTab === "cohorts" ? "cohort" : "team"}
            item={selectedItem}
            variant="clean"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center max-w-md px-4">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome to ClarityHub! 👋
                </h2>
                <p className="text-muted-foreground">
                  Select a {activeTab === "cohorts" ? "cohort" : "team"} from
                  the sidebar to start chatting
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarProvider>
    </div>
  )
}
