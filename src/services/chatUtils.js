import { chatService } from "./chatService"

/**
 * Chat initialization utilities
 * These functions help create and manage chats for cohorts and teams
 */

/**
 * Create or get a chat for a cohort
 * @param {Object} cohort - Cohort object with _id, name, and members
 * @returns {Promise<Object>} Chat object
 */
export const getOrCreateCohortChat = async (cohort) => {
  try {
    // For cohorts, we create a group chat with all members
    // The cohort admin should be the chat admin

    // First, try to get existing chats and find one for this cohort
    const allChats = await chatService.getAllChats()
    const existingChat = allChats.data?.find(
      (chat) => chat.name === cohort.name && chat.isGroupChat
    )

    if (existingChat) {
      return existingChat
    }

    // If no chat exists, create a new group chat
    // Note: This requires the cohort to have members
    if (!cohort.members || cohort.members.length === 0) {
      throw new Error("Cohort has no members")
    }

    // Create group chat with cohort members
    const chatResponse = await chatService.createGroupChat(
      cohort.name,
      cohort.members.map((member) => member._id || member)
    )

    return chatResponse.data
  } catch (error) {
    console.error("Error creating cohort chat:", error)
    throw error
  }
}

/**
 * Create or get a chat for a team
 * @param {Object} team - Team object with _id, name, and members
 * @returns {Promise<Object>} Chat object
 */
export const getOrCreateTeamChat = async (team) => {
  try {
    // For teams, we create a group chat with all members

    // First, try to get existing chats and find one for this team
    const allChats = await chatService.getAllChats()
    const existingChat = allChats.data?.find(
      (chat) => chat.name === team.name && chat.isGroupChat
    )

    if (existingChat) {
      return existingChat
    }

    // If no chat exists, create a new group chat
    if (!team.members || team.members.length === 0) {
      throw new Error("Team has no members")
    }

    // Create group chat with team members
    const chatResponse = await chatService.createGroupChat(
      team.name,
      team.members.map((member) => member._id || member)
    )

    return chatResponse.data
  } catch (error) {
    console.error("Error creating team chat:", error)
    throw error
  }
}

/**
 * Initialize chat when a cohort or team is selected
 * This function should be called when user selects a cohort/team
 * @param {Object} item - Cohort or team object
 * @param {string} type - "cohort" or "team"
 * @returns {Promise<Object>} Chat object
 */
export const initializeChatForItem = async (item, type) => {
  if (!item) {
    throw new Error("No item provided")
  }

  try {
    if (type === "cohort") {
      return await getOrCreateCohortChat(item)
    } else if (type === "team") {
      return await getOrCreateTeamChat(item)
    } else {
      throw new Error(`Invalid type: ${type}`)
    }
  } catch (error) {
    console.error(`Error initializing ${type} chat:`, error)
    throw error
  }
}

/**
 * Check if a chat exists for a given item
 * @param {Object} item - Cohort or team object
 * @param {Array} chats - Array of existing chats
 * @returns {Object|null} Chat object if found, null otherwise
 */
export const findChatForItem = (item, chats) => {
  if (!item || !chats) return null

  return chats.find((chat) => chat.name === item.name && chat.isGroupChat)
}

/**
 * Format chat name for display
 * @param {Object} chat - Chat object
 * @returns {string} Formatted chat name
 */
export const formatChatName = (chat) => {
  if (!chat) return ""

  if (chat.isGroupChat) {
    return chat.name
  }

  // For one-on-one chats, show the other participant's name
  // This assumes the chat has participants populated
  if (chat.participants && chat.participants.length === 2) {
    const otherParticipant = chat.participants.find(
      (p) => p._id !== chat.currentUserId
    )
    return otherParticipant?.username || otherParticipant?.email || "Unknown"
  }

  return chat.name
}

/**
 * Get chat participants excluding current user
 * @param {Object} chat - Chat object
 * @param {string} currentUserId - Current user's ID
 * @returns {Array} Array of participant objects
 */
export const getOtherParticipants = (chat, currentUserId) => {
  if (!chat || !chat.participants) return []

  return chat.participants.filter((p) => p._id !== currentUserId)
}

/**
 * Check if user is admin of a chat
 * @param {Object} chat - Chat object
 * @param {string} userId - User's ID
 * @returns {boolean} True if user is admin
 */
export const isUserChatAdmin = (chat, userId) => {
  if (!chat || !userId) return false

  return chat.admin?._id === userId || chat.admin === userId
}

/**
 * Get unread message count for a chat
 * Note: This is a placeholder. Implement based on your read receipt system
 * @param {Object} chat - Chat object
 * @returns {number} Unread message count
 */
export const getUnreadCount = (chat) => {
  // TODO: Implement based on your read receipt system
  return 0
}

/**
 * Sort chats by last message timestamp
 * @param {Array} chats - Array of chat objects
 * @returns {Array} Sorted array of chats
 */
export const sortChatsByLastMessage = (chats) => {
  if (!chats) return []

  return [...chats].sort((a, b) => {
    const aTime = a.lastMessage?.createdAt || a.updatedAt
    const bTime = b.lastMessage?.createdAt || b.updatedAt

    return new Date(bTime) - new Date(aTime)
  })
}
