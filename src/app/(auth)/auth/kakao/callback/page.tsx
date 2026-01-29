"use client";

import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import useAuthStore from "@/store/useAuthStore";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const isProcessing = useRef(false);

  const handleGoHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("인가 코드가 없습니다.");
      return;
    }

    if (isProcessing.current) return;
    isProcessing.current = true;

    const handleKakaoAuth = async () => {
      try {
        const redirectUri = `${window.location.origin}/auth/kakao/callback`;
        const state = searchParams.get("state") || "signin";

        let response: AxiosResponse;

        if (state == "signup") {
          // 회원가입
          response = await client.post(API_ENDPOINTS.OAUTH.SIGN_UP("kakao"), {
            nickname: "카카오유저",
            redirectUri,
            token: code,
          });
        } else {
          // 로그인
          try {
            response = await client.post(API_ENDPOINTS.OAUTH.SIGN_IN("kakao"), {
              redirectUri,
              token: code,
            });
          } catch {
            window.location.href = "/auth/kakao?state=signup";
            return;
          }
        }

        const data = response.data;

        if (response.status >= 300) {
          setError(data.message || "로그인 처리 중 오류가 발생했습니다.");
          return;
        }

        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
        useAuthStore.getState().login(data.user);

        router.push("/");
      } catch {
        console.log("error:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");
      }
    };

    handleKakaoAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={handleGoHome}
          className="rounded-lg bg-gray-200 px-4 py-2 text-black transition-colors
            hover:bg-gray-300"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-gray-500">로그인 처리 중...</div>
    </div>
  );
};

export default KakaoCallbackPage;
