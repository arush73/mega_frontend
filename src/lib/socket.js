import { io } from "socket.io-client"

class SocketService {
  constructor() {
    this.socket = null
    this.connected = false
  }

  connect(token) {
    if (this.socket?.connected) {
      return this.socket
    }

    this.socket = io("http://localhost:8080", {
      withCredentials: true,
      auth: {
        token: token,
      },
    })

    this.socket.on("connected", () => {
      console.log("✅ Socket connected successfully")
      this.connected = true
    })

    this.socket.on("disconnect", () => {
      console.log("❌ Socket disconnected")
      this.connected = false
    })

    this.socket.on("socketError", (error) => {
      console.error("Socket error:", error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  joinChat(chatId) {
    this.emit("joinChat", chatId)
  }

  leaveChat(chatId) {
    this.emit("leaveChat", chatId)
  }

  startTyping(chatId) {
    this.emit("typing", chatId)
  }

  stopTyping(chatId) {
    this.emit("stopTyping", chatId)
  }

  getSocket() {
    return this.socket
  }

  isConnected() {
    return this.connected && this.socket?.connected
  }
}

// Create a singleton instance
const socketService = new SocketService()

export default socketService
