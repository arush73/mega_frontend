import { create } from "zustand"

const useChannelStore = create((set) => ({
  activeChannel: null,
  channelType: null, // 'cohort' or 'team'
  channelData: null,

  setActiveChannel: (channelId, type, data) => {
    set({
      activeChannel: channelId,
      channelType: type,
      channelData: data,
    })
  },

  clearActiveChannel: () => {
    set({
      activeChannel: null,
      channelType: null,
      channelData: null,
    })
  },
}))

export { useChannelStore }
