import { createStore, useStore } from "zustand";
import { useContext } from "react";

import { User } from "@/types/user";
import { AuthStoreContext } from "@/app/_providers/AuthProvider";
import { client } from "@/lib/client/client";
import { API_ENDPOINTS } from "@/constants/apiEndPoint";

// 로그인 상태 정보
export interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const createAuthStore = (init?: Partial<AuthState>) => {
  return createStore<AuthState>((set) => {
    return {
      user: null,

      login: (user) => {
        set({ user: user });
      },

      logout: async () => {
        await client.post(API_ENDPOINTS.AUTH.LOGOUT);
        set({
          user: null,
        });
      },

      ...init,
    };
  });
};

export const useAuthStore = <T>(selector: (s: AuthState) => T) => {
  const store = useContext(AuthStoreContext);
  return useStore(store!, selector);
};
