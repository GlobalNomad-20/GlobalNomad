import { NextRequest, NextResponse } from "next/server";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { setTokenCookies } from "@/lib/client/auth";

// 카카오 로그인 성공 시, 리다이렉트 되는 callback api
const GET = async (request: NextRequest) => {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "signin";
  const baseURL = process.env.NEXTAUTH_URL || origin;
  const redirectUri = `${baseURL}/api/auth/kakao/callback`;

  if (!code)
    return NextResponse.redirect(
      `${baseURL}/auth/error?message=${encodeURIComponent("인가 코드가 없습니다.")}`,
    );

  try {
    const endpoint =
      state === "signup"
        ? API_ENDPOINTS.OAUTH.SIGN_UP("kakao")
        : API_ENDPOINTS.OAUTH.SIGN_IN("kakao");
    const body =
      state === "signup"
        ? { nickname: "카카오유저", redirectUri, token: code }
        : { redirectUri, token: code };

    const apiUrl = `${BASE_URL}${endpoint}`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // 로그인 시 403 => 회원가입으로 리다이렉트
    if (state !== "signup" && res.status === 403) {
      return NextResponse.redirect(
        `${baseURL}/auth/error?message=${encodeURIComponent("회원 정보가 없습니다. 가입이 필요합니다.")}`,
      );
    }

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.redirect(
        `${baseURL}/auth/error?message=${encodeURIComponent(data.message || "알 수 없는 이유로 인증에 실패했습니다.")}`,
      );
    }

    await setTokenCookies(data);
    return NextResponse.redirect(baseURL);
  } catch {
    return NextResponse.redirect(
      `${baseURL}/auth/error?message=${encodeURIComponent("로그인 처리 중 오류")}`,
    );
  }
};

export { GET };
