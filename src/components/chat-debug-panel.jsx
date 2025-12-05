"use client"
import { useEffect } from "react"
import { useChatStore } from "@/app/store/useChatStore"
import { useAuthStore } from "@/app/store/useAuthStore"
import { Loader2, MessageSquare, Users } from "lucide-react"

/**
 * ChatDebugPanel - A debug component to test chat functionality
 * This component helps verify that the chat system is working correctly
 */
export function ChatDebugPanel() {
  const { user } = useAuthStore()
  const { chats, isLoadingChats, fetchChats } = useChatStore()

  useEffect(() => {
    if (user) {
      fetchChats()
    }
  }, [user, fetchChats])

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Please log in to view chats</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg">Chat Debug Panel</h3>
      </div>

      <div className="space-y-4">
        {/* User Info */}
        <div className="p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium text-gray-700">Logged in as:</p>
          <p className="text-sm text-gray-600">
            {user.username || user.email}
          </p>
          <p className="text-xs text-gray-500">Role: {user.role || "user"}</p>
        </div>

        {/* Chats List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Your Chats:</p>
            <button
              onClick={fetchChats}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Refresh
            </button>
          </div>

          {isLoadingChats ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            </div>
          ) : chats.length === 0 ? (
            <div className="p-3 bg-gray-50 rounded text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">No chats yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Select a cohort or team to start chatting
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {chat.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {chat.isGroupChat ? "Group Chat" : "One-on-One"}
                      </p>
                      {chat.lastMessage && (
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          Last: {chat.lastMessage.content}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      {chat.participants?.length || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-xs font-medium text-blue-900 mb-1">
            How to test:
          </p>
          <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
            <li>Select a cohort or team from the sidebar</li>
            <li>The chat panel will load messages</li>
            <li>Type a message and press Enter or click Send</li>
            <li>Open another browser window to see real-time updates</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
