import { QueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createStore, useStore } from "zustand";

import { AuthStoreContext } from "@/app/_providers/AuthProvider";
import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { User } from "@/types/user";

// 로그인 상태 정보
export interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: (queryClient: QueryClient) => Promise<void>;
  updateUser: (partialUser: Partial<User>) => void;
}

export const createAuthStore = (init?: Partial<AuthState>) => {
  return createStore<AuthState>((set) => {
    return {
      user: null,
      login: (user) => {
        set({ user: user });
      },
      logout: async (queryClient) => {
        try {
          await client.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
          console.error("로그아웃 API 호출 실패:", error);
        } finally {
          set({ user: null });

          queryClient.clear();
        }
      },
      updateUser: (partialUser) => {
        set((state) => {
          return {
            user: state.user ? { ...state.user, ...partialUser } : null,
          };
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
