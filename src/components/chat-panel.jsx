"use client"
import { useState, useRef, useEffect } from "react"
import {
  Hash,
  Users,
  Send,
  Smile,
  Plus,
  Loader2,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useChatStore } from "@/app/store/useChatStore"
import { useSocket } from "@/hooks/useSocket"
import { toast } from "sonner"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import EmojiPicker from "emoji-picker-react"
import { cn } from "@/lib/utils"

export function ChatPanel({ type, item, variant = "discord" }) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)

  const { user } = useAuthStore()
  const {
    currentChat,
    messages,
    isLoadingMessages,
    isSendingMessage,
    setCurrentChat,
    sendMessage: sendMessageAction,
    deleteMessage,
    startTyping,
    stopTyping,
  } = useChatStore()

  // Initialize socket connection
  const { isConnected } = useSocket()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update current chat when item changes
  useEffect(() => {
    if (item?._id) {
      setCurrentChat(item)
    } else {
      setCurrentChat(null)
    }
  }, [item, setCurrentChat])

  const handleTyping = () => {
    if (!currentChat?._id) return

    if (!isTyping) {
      setIsTyping(true)
      startTyping(currentChat._id)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      stopTyping(currentChat._id)
    }, 3000)
  }

  const isAdmin = user?.role === "admin" || user?.role === "ADMIN"
  const canSendMessage = type === "team" || (type === "cohort" && isAdmin)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || !currentChat?._id) return

    // For cohorts, only admin can send messages
    if (type === "cohort" && !isAdmin) {
      toast.error("Only admins can send messages in cohort chats")
      return
    }

    const messageContent = message.trim()
    setMessage("")

    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false)
      stopTyping(currentChat._id)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }

    try {
      await sendMessageAction(currentChat._id, messageContent)
      // Focus back on input
      inputRef.current?.focus()
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
      // Restore message if sending failed
      setMessage(messageContent)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!currentChat?._id) return

    try {
      await deleteMessage(currentChat._id, messageId)
      toast.success("Message deleted")
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("Failed to delete message")
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  // Theme configuration
  const theme = {
    discord: {
      bg: "bg-[#313338]",
      header: "bg-[#313338] border-[#1e1f22]",
      text: "text-white",
      subText: "text-[#949ba4]",
      messageHover: "hover:bg-[#2e3035]",
      inputBg: "bg-[#383a40]",
      inputText: "text-[#dbdee1]",
      placeholder: "placeholder-[#6d6f78]",
      icon: "text-[#b5bac1] hover:text-[#dbdee1]",
      divider: "border-[#1e1f22]",
      emojiTheme: "dark",
      ownMessageIcon: "text-[#ed4245] hover:bg-[#ed4245]/10",
      loaderColor: "text-[#5865f2]",
      avatarBg: "bg-[#5865f2]",
      link: "text-[#00a8fc]",
      messageText: "text-[#dbdee1]",
      welcomeIconBg: "bg-[#5865f2]",
      welcomeIconText: "text-white",
    },
    clean: {
      bg: "bg-background",
      header: "bg-background border-border",
      text: "text-foreground",
      subText: "text-muted-foreground",
      messageHover: "hover:bg-muted/50",
      inputBg: "bg-muted",
      inputText: "text-foreground",
      placeholder: "placeholder-muted-foreground",
      icon: "text-muted-foreground hover:text-foreground",
      divider: "border-border",
      emojiTheme: "auto",
      ownMessageIcon: "text-destructive hover:bg-destructive/10",
      loaderColor: "text-primary",
      avatarBg: "bg-primary",
      link: "text-primary hover:underline",
      messageText: "text-foreground",
      welcomeIconBg: "bg-primary/10",
      welcomeIconText: "text-primary",
    }
  }[variant]

  if (!item) {
    return (
      <div className={cn("flex-1 flex items-center justify-center", theme.bg)}>
        <div className={cn("text-center", theme.subText)}>
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Select a {type === "cohort" ? "cohort" : "team"} to view chat
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex-1 flex flex-col", theme.bg)}>
      {/* Chat Header */}
      <div className={cn("h-12 px-4 flex items-center shadow-sm border-b", theme.header)}>
        <div className="flex items-center gap-2">
          {type === "cohort" ? (
            <Hash className={cn("w-5 h-5", theme.subText)} />
          ) : (
            <Users className={cn("w-5 h-5", theme.subText)} />
          )}
          <h2 className={cn("font-semibold", theme.text)}>{item.name}</h2>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={cn("text-xs", theme.subText)}>Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-yellow-500" />
              <span className={cn("text-xs", theme.subText)}>Connecting...</span>
            </div>
          )}
          <span className={cn("text-xs", theme.subText)}>
            {type === "cohort" ? "Cohort Chat (Admin Only)" : "Team Chat"}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className={cn("w-8 h-8 animate-spin", theme.loaderColor)} />
          </div>
        ) : messages.length === 0 ? (
          <div className={cn("text-center mt-8", theme.subText)}>
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", theme.welcomeIconBg)}>
              {type === "cohort" ? (
                <Hash className={cn("w-8 h-8", theme.welcomeIconText)} />
              ) : (
                <Users className={cn("w-8 h-8", theme.welcomeIconText)} />
              )}
            </div>
            <h3 className={cn("text-xl font-semibold mb-2", theme.text)}>
              Welcome to {item.name}!
            </h3>
            <p className="text-sm">
              {type === "cohort"
                ? "This is the beginning of the cohort chat. Only admins can send messages here."
                : "This is the beginning of your team chat. Start collaborating!"}
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.sender?._id === user?._id
            return (
              <div
                key={msg._id}
                className={cn("flex items-start gap-3 p-2 rounded group", theme.messageHover)}
              >
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", theme.avatarBg)}>
                  {msg.sender?.avatar ? (
                    <img
                      src={msg.sender.avatar}
                      alt={msg.sender.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {(msg.sender?.username || msg.sender?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={cn("font-semibold text-sm", theme.text)}>
                      {msg.sender?.username || msg.sender?.email || "Unknown"}
                    </span>
                    <span className={cn("text-xs", theme.subText)}>
                      {formatTimestamp(msg.createdAt)}
                    </span>
                  </div>
                  <p className={cn("text-sm break-words", theme.messageText)}>
                    {msg.content}
                  </p>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn("block text-sm", theme.link)}
                        >
                          📎 {attachment.url.split("/").pop()}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {isOwnMessage && (
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className={cn("opacity-0 group-hover:opacity-100 p-1 rounded transition-all", theme.ownMessageIcon)}
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4">
        {!canSendMessage ? (
          <div className={cn("rounded-lg p-3 text-center", theme.inputBg)}>
            <p className={cn("text-sm", theme.subText)}>
              Only admins can send messages in cohort chats
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="relative">
            <div className={cn("rounded-lg flex items-center", theme.inputBg)}>
              <button
                type="button"
                className={cn("p-3 transition-colors", theme.icon)}
                title="Add attachment (coming soon)"
              >
                <Plus className="w-5 h-5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  handleTyping()
                }}
                placeholder={`Message ${item.name}`}
                className={cn("flex-1 bg-transparent outline-none py-3 text-sm", theme.inputText, theme.placeholder)}
                disabled={isSendingMessage}
              />
              <button
                type="button"
                className={cn("p-3 transition-colors", theme.icon)}
                title="Add emoji"
              >
                   <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="p-2 hover:bg-black/10 rounded transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </PopoverTrigger>

        {/* EMOJI PICKER POPUP */}
        <PopoverContent 
          className="p-0 border-0 bg-transparent shadow-2xl" 
          side="top" 
          align="end"
          sideOffset={8}
        >
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setMessage((prev) => prev + emojiData.emoji)
              }}
              theme={theme.emojiTheme}
              height={450}
              width={350}
              searchPlaceHolder="Search emoji..."
              previewConfig={{
                showPreview: false
              }}
              skinTonesDisabled={false}
              emojiStyle="native"
              lazyLoadEmojis={true}
            />
          </div>
        </PopoverContent>
      </Popover>
              </button>
              <button
                type="submit"
                disabled={!message.trim() || isSendingMessage}
                className={cn("p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", theme.icon)}
              >
                {isSendingMessage ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
