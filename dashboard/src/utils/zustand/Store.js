import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: {
          token: null,
          isVerified: false,
          username: null
        },
        setUser: (response) =>
          set((state) => ({ user: { ...state.user, token: response?.accessToken, username: response?.username, isVerified: response?.isVerified } })),
        removeUser: () =>
          set((state) => ({ user: { ...state.user, token: null, username: null, isVerified: false } })),
      }),
      { name: "tiba_connect_user" }
    )
  )
);
