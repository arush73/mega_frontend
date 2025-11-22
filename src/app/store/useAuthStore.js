import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  user: null,
  isRegistering: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isuserChecked: false,
  isSSO: false,
  isRegistrationSuccessfull:false,

  checkUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/current-user");
      console.log("Checking auth: ", response.data);

      response.data.data.username = response.data.data.email

      set({ user: response.data.data });
    } catch (error) {
      console.log("error checking auth: ", error.message);
      set({ user: null });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  registerUser: async (data) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      console.log("User registeres successfully: ", response.data);

      set({ isRegistrationSuccessfull: response.data.success ? true : false });
      set({ user: response.data.data });
      toast("user registered successfully");
    } catch (error) {
      console.log("Error registering the user: ", error.message);
      toast("failed to register");
      set({ user: null });
    } finally {
      set({ isRegistering: false });
    }
  },

  loginUser: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await axiosInstance.post("/auth/login", data);

      console.log("user loggedIn successfully: ", response.data);

      set({ user: response.data });
      toast("loggedIn successfully");
    } catch (error) {
      console.log("Error loggingIn the user: ", error.message);
      toast("failed to login");
      set({ user: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast("user loggedOut successfully");
    } catch (error) {
      console.log("failed to logout: ", error.message);
      toast("failed to logout");
    }
  },

  SSOHandler: async (name) => {
    try {
      set({ isSSO: true });

      let response;

      if (name === "google")
        response = await axiosInstance.get("/auth/google");

      if (name === "github")
        response = await axiosInstance.get("/auth/github");

      console.log("This is the response: ", response.data)

      set({ user: response.data });
    } catch (error) {
      console.log("failed to login through SSO: ", error.message);
      toast(`${name} not working 🥲`);
    } finally {
      set({ isSSO: false });
    }
  },
}));