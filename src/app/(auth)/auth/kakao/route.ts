import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state") || "signin";

  const clientId = process.env.KAKAO_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/auth/kakao/callback`;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;

  return NextResponse.redirect(kakaoAuthUrl);
};

export { GET };
