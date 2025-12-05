"use client"
import { useEffect, useRef } from "react"
import socketService from "@/lib/socket"
import { useChatStore } from "@/app/store/useChatStore"
import { useAuthStore } from "@/app/store/useAuthStore"

export const useSocket = () => {
  const { user } = useAuthStore()
  const {
    handleNewMessage,
    handleMessageDeleted,
    handleNewChat,
    handleLeaveChat,
    handleUpdateGroupName,
    handleTyping,
    handleStopTyping,
  } = useChatStore()

  const socketRef = useRef(null)

  useEffect(() => {
    if (!user) {
      // Disconnect socket if user logs out
      if (socketRef.current) {
        socketService.disconnect()
        socketRef.current = null
      }
      return
    }

    // Get access token from cookies or local storage
    // Since we're using httpOnly cookies, the token is sent automatically
    // But for socket.io, we might need to pass it explicitly
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1]

    if (!socketRef.current && token) {
      // Connect to socket
      const socket = socketService.connect(token)
      socketRef.current = socket

      // Set up event listeners
      socket.on("messageReceived", handleNewMessage)
      socket.on("messageDeleted", handleMessageDeleted)
      socket.on("newChat", handleNewChat)
      socket.on("leaveChat", handleLeaveChat)
      socket.on("updateGroupName", handleUpdateGroupName)
      socket.on("typing", handleTyping)
      socket.on("stopTyping", handleStopTyping)
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off("messageReceived", handleNewMessage)
        socketRef.current.off("messageDeleted", handleMessageDeleted)
        socketRef.current.off("newChat", handleNewChat)
        socketRef.current.off("leaveChat", handleLeaveChat)
        socketRef.current.off("updateGroupName", handleUpdateGroupName)
        socketRef.current.off("typing", handleTyping)
        socketRef.current.off("stopTyping", handleStopTyping)
      }
    }
  }, [
    user,
    handleNewMessage,
    handleMessageDeleted,
    handleNewChat,
    handleLeaveChat,
    handleUpdateGroupName,
    handleTyping,
    handleStopTyping,
  ])

  return {
    socket: socketRef.current,
    isConnected: socketService.isConnected(),
  }
}
