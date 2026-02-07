import { NextRequest, NextResponse } from "next/server";

import { COOKIE_OPTIONS, PUBLIC_PATH, TOKEN_MAX_AGE } from "@/constants/cookieConstants";
import { refreshTokens } from "@/lib/client/auth";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/")) return NextResponse.next();

  if (
    PUBLIC_PATH.some((p) => {
      return pathname.startsWith(p);
    })
  )
    return NextResponse.next();

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  //   accessToken 있으면 헤더에 추가
  if (accessToken) {
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    return NextResponse.next({ request: { headers } });
  }

  // refreshToken으로 갱신 시도
  if (refreshToken) {
    const tokens = await refreshTokens(refreshToken);

    if (tokens) {
      const headers = new Headers(request.headers);
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);

      const response = NextResponse.next({ request: { headers } });
      response.cookies.set("accessToken", tokens.accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: TOKEN_MAX_AGE.ACCESS,
      });

      response.cookies.set("refreshToken", tokens.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: TOKEN_MAX_AGE.REFRESH,
      });
      return response;
    }

    // 갱신 실패 시 쿠키 삭제
    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path*",
};
