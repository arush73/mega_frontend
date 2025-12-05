import { axiosInstance } from "@/lib/axios"

export const messageService = {
  // Get all messages for a chat
  getAllMessages: async (chatId) => {
    const response = await axiosInstance.get(`/chat-app/messages/${chatId}`)
    return response.data
  },

  // Send a message
  sendMessage: async (chatId, content, attachments = []) => {
    const formData = new FormData()
    
    if (content) {
      formData.append("content", content)
    }

    // Add attachments if any
    if (attachments.length > 0) {
      attachments.forEach((file) => {
        formData.append("attachments", file)
      })
    }

    const response = await axiosInstance.post(
      `/chat-app/messages/${chatId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return response.data
  },

  // Delete a message
  deleteMessage: async (chatId, messageId) => {
    const response = await axiosInstance.delete(
      `/chat-app/messages/${chatId}/${messageId}`
    )
    return response.data
  },
}
