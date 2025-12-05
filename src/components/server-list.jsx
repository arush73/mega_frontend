"use client"
import { Hash, Users, Settings, LogOut } from "lucide-react"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function ServerList({ activeTab, onTabChange }) {
  const { logOut } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await logOut()
    router.push("/home")
  }

  return (
    <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2">
      {/* Cohort Tab */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => onTabChange("cohorts")}
            className={cn(
              "w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center group relative",
              activeTab === "cohorts" ? "bg-[#5865f2] rounded-[16px]" : "bg-[#313338] hover:bg-[#5865f2]"
            )}
          >
            <Hash className={cn("w-6 h-6", activeTab === "cohorts" ? "text-white" : "text-[#dcddde]")} />
            <div
              className={cn(
                "absolute left-0 w-1 bg-white rounded-r transition-all duration-200",
                activeTab === "cohorts" ? "h-10" : "h-0 group-hover:h-5"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p className="font-semibold">Cohorts</p>
        </TooltipContent>
      </Tooltip>

      {/* Team Tab */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => onTabChange("teams")}
            className={cn(
              "w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center group relative",
              activeTab === "teams" ? "bg-[#5865f2] rounded-[16px]" : "bg-[#313338] hover:bg-[#5865f2]"
            )}
          >
            <Users className={cn("w-6 h-6", activeTab === "teams" ? "text-white" : "text-[#dcddde]")} />
            <div
              className={cn(
                "absolute left-0 w-1 bg-white rounded-r transition-all duration-200",
                activeTab === "teams" ? "h-10" : "h-0 group-hover:h-5"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p className="font-semibold">Teams</p>
        </TooltipContent>
      </Tooltip>

      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35363c] rounded-full my-1" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-12 h-12 rounded-[24px] bg-[#313338] hover:bg-[#5865f2] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center group relative">
            <Settings className="w-5 h-5 text-[#b5bac1] group-hover:text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p className="font-semibold">Settings</p>
        </TooltipContent>
      </Tooltip>

      {/* Logout */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-[24px] bg-[#313338] hover:bg-[#ed4245] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center group relative"
          >
            <LogOut className="w-5 h-5 text-[#b5bac1] group-hover:text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p className="font-semibold">Logout</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
