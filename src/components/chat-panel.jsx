"use client"
import { useState, useRef, useEffect } from "react"
import { Hash, Users, Send, Smile, Plus, Image as ImageIcon } from "lucide-react"
import { useAuthStore } from "@/app/store/useAuthStore"

export function ChatPanel({ type, item }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const { user } = useAuthStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // For cohorts, only admin can send messages
    if (type === "cohort" && user?.role !== "admin") {
      return
    }

    const newMessage = {
      id: Date.now(),
      content: message,
      author: user?.username || user?.email || "Anonymous",
      timestamp: new Date(),
      avatar: user?.avatarUrl || null,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  if (!item) {
    return (
      <div className="flex-1 bg-[#313338] flex items-center justify-center">
        <div className="text-center text-[#949ba4]">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Select a {type === "cohort" ? "cohort" : "team"} to view chat
          </p>
        </div>
      </div>
    )
  }

  const isAdmin = user?.role === "admin"
  const canSendMessage = type === "team" || (type === "cohort" && isAdmin)

  return (
    <div className="flex-1 bg-[#313338] flex flex-col">
      {/* Chat Header */}
      <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1e1f22]">
        <div className="flex items-center gap-2">
          {type === "cohort" ? (
            <Hash className="w-5 h-5 text-[#80848e]" />
          ) : (
            <Users className="w-5 h-5 text-[#80848e]" />
          )}
          <h2 className="font-semibold text-white">{item.name}</h2>
        </div>
        <div className="ml-auto">
          <span className="text-xs text-[#949ba4]">
            {type === "cohort" ? "Cohort Chat (Admin Only)" : "Team Chat"}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-[#949ba4] mt-8">
            <div className="w-16 h-16 rounded-full bg-[#5865f2] flex items-center justify-center mx-auto mb-4">
              {type === "cohort" ? (
                <Hash className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Welcome to {item.name}!
            </h3>
            <p className="text-sm">
              {type === "cohort"
                ? "This is the beginning of the cohort chat. Only admins can send messages here."
                : "This is the beginning of your team chat. Start collaborating!"}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 hover:bg-[#2e3035] p-2 rounded">
              <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center flex-shrink-0">
                {msg.avatar ? (
                  <img
                    src={msg.avatar}
                    alt={msg.author}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {msg.author.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">
                    {msg.author}
                  </span>
                  <span className="text-xs text-[#949ba4]">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-[#dbdee1] text-sm break-words">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4">
        {!canSendMessage ? (
          <div className="bg-[#2b2d31] rounded-lg p-3 text-center">
            <p className="text-sm text-[#949ba4]">
              Only admins can send messages in cohort chats
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="relative">
            <div className="bg-[#383a40] rounded-lg flex items-center">
              <button
                type="button"
                className="p-3 text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${item.name}`}
                className="flex-1 bg-transparent text-[#dbdee1] placeholder-[#6d6f78] outline-none py-3 text-sm"
              />
              <button
                type="button"
                className="p-3 text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-3 text-[#b5bac1] hover:text-[#dbdee1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
