"use client"
import { Hash, Users, Calendar, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function MiddlePanel({ type, items, onSelectItem, selectedItem }) {
  if (!type) {
    return (
      <div className="flex-1 bg-[#313338] flex items-center justify-center">
        <div className="text-center text-[#949ba4]">
          <Hash className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a section from the sidebar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#313338] flex flex-col">
      {/* Header */}
      <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1e1f22]">
        <div className="flex items-center gap-2">
          {type === "cohorts" ? (
            <Hash className="w-5 h-5 text-[#80848e]" />
          ) : (
            <Users className="w-5 h-5 text-[#80848e]" />
          )}
          <h2 className="font-semibold text-white">
            {type === "cohorts" ? "All Cohorts" : "All Teams"}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center text-[#949ba4] mt-8">
            <p>No {type === "cohorts" ? "cohorts" : "teams"} available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {items.map((item) => (
              <button
                key={item._id}
                onClick={() => onSelectItem(item)}
                className={cn(
                  "p-4 rounded-lg bg-[#2b2d31] hover:bg-[#35373c] transition-colors text-left border-2 border-transparent",
                  selectedItem?._id === item._id && "border-[#5865f2]"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#5865f2] flex items-center justify-center flex-shrink-0">
                    {type === "cohorts" ? (
                      <Hash className="w-6 h-6 text-white" />
                    ) : (
                      <Users className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg mb-1 truncate">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-[#949ba4] line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[#949ba4]">
                      {type === "cohorts" ? (
                        <>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {item.startDate
                                ? new Date(item.startDate).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserCircle className="w-3 h-3" />
                            <span>{item.studentCount || 0} students</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1">
                            <UserCircle className="w-3 h-3" />
                            <span>
                              {item.members?.length || 0} members
                            </span>
                          </div>
                          {item.cohortId && (
                            <div className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              <span>Cohort: {item.cohortId}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
