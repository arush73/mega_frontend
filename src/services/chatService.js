import { axiosInstance } from "@/lib/axios"

export const chatService = {
  // Get all chats for the current user
  getAllChats: async () => {
    const response = await axiosInstance.get("/chat-app/chats")
    return response.data
  },

  // Search available users to chat with
  searchUsers: async () => {
    const response = await axiosInstance.get("/chat-app/chats/users")
    return response.data
  },

  // Create or get one-on-one chat
  createOrGetOneOnOneChat: async (receiverId) => {
    const response = await axiosInstance.post(`/chat-app/chats/c/${receiverId}`)
    return response.data
  },

  // Create a group chat
  createGroupChat: async (name, participants) => {
    const response = await axiosInstance.post("/chat-app/chats/group", {
      name,
      participants,
    })
    return response.data
  },

  // Get group chat details
  getGroupChatDetails: async (chatId) => {
    const response = await axiosInstance.get(`/chat-app/chats/group/${chatId}`)
    return response.data
  },

  // Rename group chat
  renameGroupChat: async (chatId, name) => {
    const response = await axiosInstance.patch(`/chat-app/chats/group/${chatId}`, {
      name,
    })
    return response.data
  },

  // Delete group chat
  deleteGroupChat: async (chatId) => {
    const response = await axiosInstance.delete(`/chat-app/chats/group/${chatId}`)
    return response.data
  },

  // Delete one-on-one chat
  deleteOneOnOneChat: async (chatId) => {
    const response = await axiosInstance.delete(`/chat-app/chats/remove/${chatId}`)
    return response.data
  },

  // Leave group chat
  leaveGroupChat: async (chatId) => {
    const response = await axiosInstance.delete(`/chat-app/chats/leave/group/${chatId}`)
    return response.data
  },

  // Add participant to group chat
  addParticipant: async (chatId, participantId) => {
    const response = await axiosInstance.post(
      `/chat-app/chats/group/${chatId}/${participantId}`
    )
    return response.data
  },

  // Remove participant from group chat
  removeParticipant: async (chatId, participantId) => {
    const response = await axiosInstance.delete(
      `/chat-app/chats/group/${chatId}/${participantId}`
    )
    return response.data
  },
}
