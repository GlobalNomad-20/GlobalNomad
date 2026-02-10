import { cookies } from "next/headers";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { COOKIE_OPTIONS, TOKEN_MAX_AGE } from "@/constants/cookieConstants";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// 토큰 갱신
const refreshTokens = async (refreshToken: string): Promise<TokenPair | null> => {
  try {
    const res = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.TOKENS}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
};

// 쿠키에 토큰 저장
const setTokenCookies = async (tokens: TokenPair) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_MAX_AGE.ACCESS,
  });
  cookieStore.set("refreshToken", tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_MAX_AGE.REFRESH,
  });
};

// 쿠키에서 토큰 삭제
const clearTokenCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

// 서버 컴포넌트용: 인증된 fetch
const fetchWithAuth = async <T>(url: string, options: RequestInit = {}): Promise<T | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    console.log("❌ [fetchWithAuth] 토큰이 존재하지 않습니다.");
    return null;
  }

  const token = accessToken || refreshToken;

  try {
    const res = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
};

export { clearTokenCookies, fetchWithAuth, refreshTokens, setTokenCookies };
