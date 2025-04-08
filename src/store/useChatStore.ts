import { create } from "zustand";
import { axiosInstance } from "../lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { MessageType, SendMessagePayload, AuthUserType } from "../@types";
import { useAuthStore } from "./useAuthStore";

interface UseChatStoreType {
  users: AuthUserType[];
  messages: MessageType[];
  selectedUser: AuthUserType | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  setSelectedUser: (data: AuthUserType | null) => void;
  getUser: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (data: SendMessagePayload) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<UseChatStoreType>((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUser: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.data });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(
        (err.response?.data as { message?: string })?.message ||
          "Failed to load users"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(
        (err.response?.data as { message?: string })?.message ||
          "Failed to load messages"
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: SendMessagePayload) => {
    const { selectedUser, messages } = get();
    console.log(messageData);

    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(
        (err.response?.data as { message?: string })?.message ||
          "Failed to send message"
      );
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;

    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage: MessageType) => {
      if (newMessage.senderId === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
