import { create } from "zustand";

import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { User } from "@/types/user";

// 로그인 상태 정보
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    isInitialized: false,

    // 초기화 함수(토큰값 불러오기 & 내정보 불러오기)
    initialize: async () => {
      if (get().isInitialized) return;

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        set({ accessToken, refreshToken });

        try {
          const res = await client.get(API_ENDPOINTS.USERS.ME);
          set({
            user: res.data,
            isLoggedIn: true,
            isInitialized: true,
          });
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            accessToken: null,
            refreshToken: null,
            isInitialized: true,
          });
        }
      } else {
        set({ isInitialized: true });
      }
    },

    // 토큰값 업데이트
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      set({ accessToken, refreshToken });
    },

    // 로그인 및 내정보 업데이트
    login: (user) => {
      set({
        user,
        isLoggedIn: true,
      });
    },

    // 로그아웃
    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      set({
        accessToken: null,
        refreshToken: null,
        isInitialized: true,
      });
    },
  };
});

export default useAuthStore;
