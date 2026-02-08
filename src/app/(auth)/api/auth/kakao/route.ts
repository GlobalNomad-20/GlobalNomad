import { NextRequest, NextResponse } from "next/server";

// 카카오 로그인 버튼 클릭 시, 카카오 인증 페이지로 리다이렉트 시키는 api
const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state") || "signin";

  const clientId = process.env.KAKAO_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/kakao/callback`;

  const kakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;

  return NextResponse.redirect(kakaoAuthUri);
};

export { GET };
