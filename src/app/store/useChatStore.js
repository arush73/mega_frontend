import { create } from "zustand"
import { chatService } from "@/services/chatService"
import { messageService } from "@/services/messageService"
import socketService from "@/lib/socket"

export const useChatStore = create((set, get) => ({
  // State
  chats: [],
  currentChat: null,
  messages: [],
  isLoadingChats: false,
  isLoadingMessages: false,
  isSendingMessage: false,
  typingUsers: new Set(),

  // Actions
  setCurrentChat: (chat) => {
    const prevChat = get().currentChat

    // Leave previous chat room
    if (prevChat?._id) {
      socketService.leaveChat(prevChat._id)
    }

    // Join new chat room
    if (chat?._id) {
      socketService.joinChat(chat._id)
    }

    set({ currentChat: chat, messages: [] })

    // Load messages for the new chat
    if (chat?._id) {
      get().fetchMessages(chat._id)
    }
  },

  fetchChats: async () => {
    set({ isLoadingChats: true })
    try {
      const response = await chatService.getAllChats()
      set({ chats: response.data || [], isLoadingChats: false })
    } catch (error) {
      console.error("Error fetching chats:", error)
      set({ isLoadingChats: false })
    }
  },

  fetchMessages: async (chatId) => {
    set({ isLoadingMessages: true })
    try {
      const response = await messageService.getAllMessages(chatId)
      // Messages come in descending order, reverse them for display
      const messages = (response.data || []).reverse()
      set({ messages, isLoadingMessages: false })
    } catch (error) {
      console.error("Error fetching messages:", error)
      set({ isLoadingMessages: false, messages: [] })
    }
  },

  sendMessage: async (chatId, content, attachments = []) => {
    set({ isSendingMessage: true })
    try {
      const response = await messageService.sendMessage(
        chatId,
        content,
        attachments
      )

      // Add the new message to the messages array
      set((state) => ({
        messages: [...state.messages, response.data],
        isSendingMessage: false,
      }))

      // Update the chat's last message in the chats list
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat._id === chatId ? { ...chat, lastMessage: response.data } : chat
        ),
      }))

      return response.data
    } catch (error) {
      console.error("Error sending message:", error)
      set({ isSendingMessage: false })
      throw error
    }
  },

  deleteMessage: async (chatId, messageId) => {
    try {
      await messageService.deleteMessage(chatId, messageId)

      // Remove the message from the messages array
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }))
    } catch (error) {
      console.error("Error deleting message:", error)
      throw error
    }
  },

  // Socket event handlers
  handleNewMessage: (message) => {
    const { currentChat, messages } = get()

    // Only add message if it belongs to the current chat
    if (currentChat?._id === message.chat) {
      set({ messages: [...messages, message] })
    }

    // Update the chat's last message in the chats list
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat._id === message.chat ? { ...chat, lastMessage: message } : chat
      ),
    }))
  },

  handleMessageDeleted: (message) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== message._id),
    }))
  },

  handleNewChat: (chat) => {
    set((state) => ({
      chats: [chat, ...state.chats],
    }))
  },

  handleLeaveChat: (chat) => {
    set((state) => ({
      chats: state.chats.filter((c) => c._id !== chat._id),
      currentChat:
        state.currentChat?._id === chat._id ? null : state.currentChat,
      messages: state.currentChat?._id === chat._id ? [] : state.messages,
    }))
  },

  handleUpdateGroupName: (chat) => {
    set((state) => ({
      chats: state.chats.map((c) => (c._id === chat._id ? chat : c)),
      currentChat:
        state.currentChat?._id === chat._id ? chat : state.currentChat,
    }))
  },

  handleTyping: (chatId) => {
    const { currentChat, typingUsers } = get()
    if (currentChat?._id === chatId) {
      const newTypingUsers = new Set(typingUsers)
      newTypingUsers.add(chatId)
      set({ typingUsers: newTypingUsers })
    }
  },

  handleStopTyping: (chatId) => {
    const { typingUsers } = get()
    const newTypingUsers = new Set(typingUsers)
    newTypingUsers.delete(chatId)
    set({ typingUsers: newTypingUsers })
  },

  // Typing indicators
  startTyping: (chatId) => {
    socketService.startTyping(chatId)
  },

  stopTyping: (chatId) => {
    socketService.stopTyping(chatId)
  },

  // Reset store
  reset: () => {
    const { currentChat } = get()
    if (currentChat?._id) {
      socketService.leaveChat(currentChat._id)
    }
    set({
      chats: [],
      currentChat: null,
      messages: [],
      isLoadingChats: false,
      isLoadingMessages: false,
      isSendingMessage: false,
      typingUsers: new Set(),
    })
  },
}))
