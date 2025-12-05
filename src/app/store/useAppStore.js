import { create } from "zustand"
import { axiosInstance } from "@/lib/axios"

const useAppStore = create((set) => ({
  isInitialDataBeingFetched: false,
  initialUserData: null,

  fetchInitialUserData: async (userId) => {
    set({ isInitialDataBeingFetched: true })
    try {
      const response = await axiosInstance.get(`/profile/me/${userId}`)
      set({ initialUserData: response.data.data })
    } catch (error) {
      console.log("Error fetching user data ", error.message)
    } finally {
      set({ isInitialDataBeingFetched: false })
    }
  },
}))

export { useAppStore }
