"use client"
import { Hash, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function DiscordSidebar({ items, type, onSelectItem, selectedItem }) {
  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col h-screen">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1e1f22] bg-[#2b2d31]">
        <h2 className="font-semibold text-white">
          {type === "cohorts" ? "Cohorts" : "Teams"}
        </h2>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto pt-3 px-2">
        {items.length === 0 ? (
          <div className="px-2 py-4 text-center text-sm text-[#949ba4] italic">
            No {type === "cohorts" ? "cohorts" : "teams"} available
          </div>
        ) : (
          <div className="space-y-1">
            {items.map((item) => (
              <button
                key={item._id}
                onClick={() => onSelectItem(item)}
                className={cn(
                  "w-full px-2 py-2 flex items-center gap-2 text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1] rounded transition-colors",
                  selectedItem?._id === item._id && "bg-[#404249] text-white"
                )}
              >
                {type === "cohorts" ? (
                  <Hash className="w-5 h-5 text-[#80848e] flex-shrink-0" />
                ) : (
                  <Users className="w-5 h-5 text-[#80848e] flex-shrink-0" />
                )}
                <span className="text-sm truncate flex-1 text-left">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
