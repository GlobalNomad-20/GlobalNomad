import { create } from "zustand";

import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { User } from "@/types/user";

// 로그인 상태 정보
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    isLoggedIn: false,
    isInitialized: false,

    // 초기화 함수(토큰값 불러오기 & 내정보 불러오기)
    initialize: async () => {
      if (get().isInitialized) return;

      try {
        const res = await client.get(API_ENDPOINTS.USERS.ME);
        set({
          user: res.data,
          isLoggedIn: true,
          isInitialized: true,
        });
      } catch {
        set({
          isInitialized: true,
        });
      }
    },

    // 로그인 및 내정보 업데이트
    login: (user) => {
      set({
        user,
        isLoggedIn: true,
      });
    },

    // 로그아웃
    logout: async () => {
      await client.post(API_ENDPOINTS.AUTH.LOGOUT);
      set({
        user: null,
        isInitialized: true,
      });
    },
  };
});

export default useAuthStore;
