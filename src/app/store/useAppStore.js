import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

const useAppStore = create((set) => ({
    fetchedUserData: null,
    isFetchingData: false,

    fetchUserData: async (profileId) => {
        set({isFetchingData: true})
        try {
            const response = await axiosInstance.get('/profile/:profileId')
            set({fetchedUserData: response.data})
        } catch (error) {
            console.log("Error fetching user data ", error.message)
        } finally {
            set({isFetchingData: false})
        }
    }
}))

export {
    useAppStore
}