import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

const useProfileStore = create((set) => ({
    fetchedUserData: null,
    isFetchingProfileData: false,

    fetchUserProfileData: async (profileId) => {
        set({isFetchingProfileData: true})
        try {
            const response = await axiosInstance.get(`/profile/${profileId}`)
            set({fetchedUserData: response.data})
        } catch (error) {
            console.log("Error fetching user data ", error.message)
        } finally {
            set({isFetchingProfileData: false})
        }
    },

    addProfileData: async (profileData) => {
        try {
            const response = await axiosInstance.post('/profile', profileData)
            return response.data
        } catch (error) {
            console.log("Error adding user profile data ", error.message)
        }
    }
}))

export {
    useProfileStore
}