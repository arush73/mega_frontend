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
import { toast } from "sonner"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import EmojiPicker from "emoji-picker-react"
import { cn } from "@/lib/utils"

const MOCK_MESSAGES = [
  {
    _id: "m1",
    content: "Welcome to the demo! Feel free to look around.",
    sender: { _id: "system", username: "System", avatar: "" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    _id: "m2",
    content: "You can try sending a message here.",
    sender: { _id: "bot", username: "Demo Bot", avatar: "" },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
]

export function DemoChatPanel({ type, item, variant = "discord" }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Mock user
  const user = { _id: "guest", username: "Guest User", role: "user" }

  // Check permissions
  const isAdmin = user?.role === "admin" || user?.role === "ADMIN"
  const canSendMessage = type === "team" || (type === "cohort" && isAdmin)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Reset messages when item changes (optional, or keep them for demo feel)
  useEffect(() => {
    if (item?._id) {
       // In a real app we'd fetch messages. Here we just reset to mock or keep existing.
       // Let's keep existing for seamless demo feel, or maybe add a "Joined channel" message.
       setMessages(prev => [
         ...prev, 
         {
           _id: `sys-${Date.now()}`,
           content: `Switched to ${item.name}`,
           sender: { _id: "system", username: "System" },
           createdAt: new Date().toISOString()
         }
       ])
    }
  }, [item])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Double check permission
    if (!canSendMessage) {
      toast.error("Only admins can send messages in cohort chats")
      return
    }

    const newMessage = {
      _id: `msg-${Date.now()}`,
      content: message.trim(),
      sender: user,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
    
    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          _id: `bot-${Date.now()}`,
          content: "This is a demo, so your message wasn't actually sent to a server, but it looks cool right?",
          sender: { _id: "bot", username: "Demo Bot" },
          createdAt: new Date().toISOString(),
        }
      ])
    }, 1000)
  }

  const handleDeleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((m) => m._id !== messageId))
    toast.success("Message deleted (locally)")
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

  // Theme configuration (copied from ChatPanel)
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
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={cn("text-xs", theme.subText)}>Demo Mode</span>
            </div>
          <span className={cn("text-xs", theme.subText)}>
            {type === "cohort" ? "Cohort Chat (Admin Only)" : "Team Chat"}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
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
        }
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
                title="Add attachment (demo)"
              >
                <Plus className="w-5 h-5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                placeholder={`Message ${item.name}`}
                className={cn("flex-1 bg-transparent outline-none py-3 text-sm", theme.inputText, theme.placeholder)}
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
                disabled={!message.trim()}
                className={cn("p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", theme.icon)}
              >
                  <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
