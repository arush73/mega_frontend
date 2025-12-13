"use client"
import { useState } from "react"
import { DemoLearnAppSidebar } from "./DemoLearnAppSidebar"
import { DemoChatPanel } from "./DemoChatPanel"
import { SidebarProvider } from "@/components/ui/sidebar"

const MOCK_COHORTS = [
  { 
    _id: "c1", 
    name: "Cohort 1", 
    description: "Introduction to Computer Science",
    startDate: "2024-01-01",
    members: new Array(150),
    avatar: "" 
  },
  { 
    _id: "c2", 
    name: "Cohort 2", 
    description: "Advanced Algorithms",
    startDate: "2024-03-15",
    members: new Array(85),
    avatar: "" 
  },
  { 
    _id: "c3", 
    name: "Full Stack Web Dev", 
    description: "MERN Stack Bootcamp",
    startDate: "2024-06-01",
    members: new Array(200),
    avatar: "" 
  },
]

const MOCK_TEAMS = [
  { 
    _id: "t1", 
    name: "Team Alpha", 
    description: "Working on the capstone project",
    members: new Array(4),
    avatar: "" 
  },
  { 
    _id: "t2", 
    name: "Hackathon Team", 
    description: "Winter Hackathon 2024",
    members: new Array(3),
    avatar: "" 
  },
]

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("teams") // Default to teams
  const [selectedItem, setSelectedItem] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedItem(null) // Reset selection when changing tabs
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarProvider
        style={{
          "--sidebar-width": "350px",
        }}
      >
        <DemoLearnAppSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          cohorts={MOCK_COHORTS}
          teams={MOCK_TEAMS}
        />

        {/* Right Panel - Chat */}
        {selectedItem ? (
          <DemoChatPanel
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
                  Welcome to ClarityHub Demo! 👋
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
