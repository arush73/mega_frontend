"use client"
import { useState, useEffect } from "react"
import { ChatPanel } from "./chat-panel"
import { initializeChatForItem } from "@/services/chatUtils"
import { useChatStore } from "@/app/store/useChatStore"
import { Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

/**
 * ChatPanelWrapper - Wraps ChatPanel with auto-initialization logic
 * This component automatically creates a chat for the selected cohort/team if it doesn't exist
 */
export function ChatPanelWrapper({ type, item }) {
  const [isInitializing, setIsInitializing] = useState(false)
  const [initError, setInitError] = useState(null)
  const [initializedChat, setInitializedChat] = useState(null)
  const { chats, fetchChats } = useChatStore()

  useEffect(() => {
    const initializeChat = async () => {
      if (!item) {
        setInitializedChat(null)
        setInitError(null)
        return
      }

      setIsInitializing(true)
      setInitError(null)

      try {
        // First, check if a chat already exists in the store
        const existingChat = chats.find(
          (chat) => chat.name === item.name && chat.isGroupChat
        )

        if (existingChat) {
          setInitializedChat(existingChat)
          setIsInitializing(false)
          return
        }

        // If not found in store, try to fetch all chats first
        await fetchChats()

        // Check again after fetching
        const chatAfterFetch = chats.find(
          (chat) => chat.name === item.name && chat.isGroupChat
        )

        if (chatAfterFetch) {
          setInitializedChat(chatAfterFetch)
          setIsInitializing(false)
          return
        }

        // If still not found, create a new chat
        const chat = await initializeChatForItem(item, type)
        setInitializedChat(chat)
        
        // Refresh chats to include the new one
        await fetchChats()
        
        toast.success(`Chat created for ${item.name}`)
      } catch (error) {
        console.error("Error initializing chat:", error)
        setInitError(error.message || "Failed to initialize chat")
        toast.error("Failed to initialize chat. Please try again.")
      } finally {
        setIsInitializing(false)
      }
    }

    initializeChat()
  }, [item, type, chats, fetchChats])

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="flex-1 bg-[#313338] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#5865f2] animate-spin" />
          <p className="text-[#dbdee1] text-lg">Initializing chat...</p>
          <p className="text-[#949ba4] text-sm mt-2">
            Setting up {item?.name}
          </p>
        </div>
      </div>
    )
  }

  // Show error state if initialization failed
  if (initError) {
    return (
      <div className="flex-1 bg-[#313338] flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-[#ed4245]" />
          <p className="text-[#dbdee1] text-lg mb-2">Failed to initialize chat</p>
          <p className="text-[#949ba4] text-sm mb-4">{initError}</p>
          <button
            onClick={() => {
              setInitError(null)
              setIsInitializing(true)
            }}
            className="px-4 py-2 bg-[#5865f2] text-white rounded hover:bg-[#4752c4] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Render the actual ChatPanel with the initialized chat
  return <ChatPanel type={type} item={initializedChat || item} />
}
