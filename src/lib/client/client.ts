import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import useAuthStore from "@/store/useAuthStore";
import { BASE_URL, REFRESH_URL } from "@/constants/apiEndPoint";

export const client = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 처리
client.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 처리
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 토큰 재발급 요청 자체가 실패한 경우 로그아웃
      if (originalRequest.url === REFRESH_URL) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } else {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

// 토큰 재발급 함수
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) return null;

    const response = await axios.post(REFRESH_URL, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    useAuthStore.getState().setTokens(accessToken, newRefreshToken);

    return accessToken;
  } catch {
    return null;
  }
};
