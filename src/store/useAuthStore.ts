import { create } from "zustand";
import { axiosInstance } from "../lib";
import type { AuthUserType, FormDataType } from "../@types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface UseAuthType {
  authUser: AuthUserType | null;
  isLoginLoading: boolean;
  signin: (data: FormDataType) => Promise<void>;
  signup: (data: FormDataType) => Promise<void>;
  checkUser: () => Promise<void>;
  isCheckingUserLoader: boolean;
}

export const useAuthStore = create<UseAuthType>((set) => ({
  authUser: null,
  isLoginLoading: false,
  isCheckingUserLoader: false,

  checkUser: async () => {
    set({ isCheckingUserLoader: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data }); // 1 data => extra
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isCheckingUserLoader: false });
    }
  },

  signin: async (data) => {
    set({ isLoginLoading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-in", data);
      set({ authUser: res.data.data }); // 1 data => extra
      toast.success("Sign-in completed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isLoginLoading: false });
    }
  },

  signup: async (data) => {
    set({ isLoginLoading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set({ authUser: res.data.data }); // 1 data => extra
      toast.success("Sign-up completed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isLoginLoading: false });
    }
  },
}));
